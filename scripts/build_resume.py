#!/usr/bin/env python3
"""Build the site's PDF and Word resume from the same reviewed content.
Requires reportlab and python-docx. Run from any directory.
"""
import json
from pathlib import Path
from html import escape
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.opc.constants import RELATIONSHIP_TYPE as RT

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads(Path(__file__).with_name('resume_content.json').read_text())
TEAL = '#2A7A7A'
LINKS = [('adamrobinson.tech', 'https://www.adamrobinson.tech'), ('GitHub', 'https://github.com/aaddaamm'), ('LinkedIn', 'https://www.linkedin.com/in/adam-robinson-software/'), ('adam@adamrobinson.tech', 'mailto:adam@adamrobinson.tech')]
# Preserve the original site's simple, single-column resume style.
STYLES = {
    'name': (22, 26, 0, 3, 'Helvetica', '#0A0A0A'),
    'subtitle': (9, 13, 0, 3, 'Helvetica', TEAL),
    'meta': (9, 12, 0, 5, 'Helvetica', '#555555'),
    'section': (9, 12, 12, 6, 'Helvetica-Bold', TEAL),
    'role': (10.5, 14, 9, 2, 'Helvetica-Bold', '#0A0A0A'),
    'body': (10, 13.5, 0, 5, 'Helvetica', '#0A0A0A'),
    'bullet': (10, 13.5, 0, 5, 'Helvetica', '#0A0A0A'),
    'small': (9, 12, 0, 5, 'Helvetica', '#555555')
}


def content():
    yield 'name', 'Adam Robinson'
    yield 'subtitle', DATA['headline']
    yield 'meta', 'Providence, RI · Remote'
    yield 'links', ''
    yield 'section', 'Professional Summary'
    yield 'body', DATA['summary']
    yield 'section', 'Selected Outcomes'
    for item in DATA['outcomes']: yield 'bullet', item
    yield 'section', 'Professional Experience'
    yield 'role', 'MojoTech · Senior Software Engineer and Technical Lead'
    yield 'meta', 'Feb 2015–Present · Providence, RI and remote'
    yield 'body', 'Software consultancy · Embedded across 15+ client organizations'
    for index, (company, role, period, bullets) in enumerate(DATA['clients']):
        if index == 2:
            yield 'break', ''
            yield 'small', 'Adam Robinson · Professional Experience continued'
        yield 'role', company + ' · ' + role
        yield 'meta', period + ' · via MojoTech'
        for item in bullets: yield 'bullet', item
    yield 'role', 'Additional Embedded Client Engagements'
    yield 'meta', '2015–2020 · via MojoTech'
    yield 'small', DATA['earlier']
    yield 'role', 'Beacon Mutual Insurance · Associate Developer and Production Control'
    yield 'meta', 'Mar 2011–Feb 2015'
    for item in DATA['beacon']: yield 'bullet', item
    yield 'section', 'Architecture and Delivery Capabilities'
    yield 'small', DATA['capabilities']
    yield 'section', 'Technical Foundation'
    for category, items in DATA['skills']: yield 'small', category + ': ' + items


def build_pdf():
    styles={k:ParagraphStyle(k,fontName=f,fontSize=size,leading=leading,textColor=colors.HexColor(color),spaceBefore=before,spaceAfter=after,keepWithNext=k in ('section','role','meta'),leftIndent=10 if k=='bullet' else 0,firstLineIndent=-8 if k=='bullet' else 0) for k,(size,leading,before,after,f,color) in STYLES.items()}
    story=[]
    for kind,text in content():
        if kind=='break': story.append(PageBreak()); continue
        if kind=='links':
            text=' · '.join(f'<link href="{url}" color="#555555">{label}</link>' for label,url in LINKS)
            story.append(Paragraph(text,styles['meta']));continue
        story.append(Paragraph(('• ' if kind=='bullet' else '')+escape(text),styles[kind]))
    doc=SimpleDocTemplate(str(ROOT/'static/adam_robinson.pdf'),pagesize=letter,leftMargin=54,rightMargin=54,topMargin=40,bottomMargin=38,title='Adam Robinson Resume',author='Adam Robinson')
    def footer(canvas,doc):
        canvas.setFont('Helvetica',8);canvas.setFillColor(colors.HexColor('#555555'));canvas.drawRightString(558,22,str(doc.page))
    doc.build(story,onFirstPage=footer,onLaterPages=footer)


def build_docx():
    doc=Document()
    section=doc.sections[0]
    section.page_width=Inches(8.5);section.page_height=Inches(11)
    section.left_margin=section.right_margin=Inches(.75)
    section.top_margin=Inches(40/72);section.bottom_margin=Inches(38/72)
    doc.core_properties.title='Adam Robinson Resume';doc.core_properties.author='Adam Robinson'
    doc.styles['Normal'].font.name='Arial'
    for style in doc.styles:
        for border in list(style.element.iter(qn('w:pBdr'))):
            border.getparent().remove(border)
    for kind,text in content():
        if kind=='break':doc.add_page_break();continue
        p=doc.add_paragraph()
        if kind=='links':
            for index,(label,url) in enumerate(LINKS):
                if index:p.add_run(' · ')
                h=OxmlElement('w:hyperlink');h.set(qn('r:id'),p.part.relate_to(url,RT.HYPERLINK,is_external=True))
                r=OxmlElement('w:r');pr=OxmlElement('w:rPr');color=OxmlElement('w:color');color.set(qn('w:val'),'555555');pr.append(color);size=OxmlElement('w:sz');size.set(qn('w:val'),'18');pr.append(size);r.append(pr);t=OxmlElement('w:t');t.text=label;r.append(t);h.append(r);p._p.append(h)
            p.paragraph_format.space_after=Pt(5);continue
        size,leading,before,after,font,color=STYLES[kind]
        if kind=='name':p.style=doc.styles['Title']
        if kind=='section':p.style=doc.styles['Heading 1']
        if kind=='role':p.style=doc.styles['Heading 2']
        fmt=p.paragraph_format;fmt.space_before=Pt(before);fmt.space_after=Pt(after);fmt.line_spacing=Pt(leading);fmt.keep_with_next=kind in ('section','role','meta');fmt.widow_control=True
        if kind=='bullet':fmt.left_indent=Pt(10);fmt.first_line_indent=Pt(-8)
        run=p.add_run(('• ' if kind=='bullet' else '')+text)
        run.font.name='Arial';run.font.size=Pt(size);run.font.bold='Bold' in font;run.font.color.rgb=RGBColor.from_string(color[1:])
    doc.save(ROOT/'static/adam_robinson.docx')

if __name__=='__main__':
    build_pdf();build_docx()
