#!/usr/bin/env python3
"""Generates static/adam_robinson.pdf directly from structured content."""

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT

TEAL = HexColor('#2A7A7A')
BLACK = HexColor('#0A0A0A')
MUTED = HexColor('#555555')

OUT = '/Users/adam/dotcom/static/adam_robinson.pdf'


def styles():
    base = getSampleStyleSheet()

    def s(name, **kw):
        return ParagraphStyle(name, parent=base['Normal'], **kw)

    return {
        'name': s('name', fontName='Helvetica', fontSize=22, textColor=BLACK,
                  spaceAfter=2, leading=26),
        'subtitle': s('subtitle', fontName='Helvetica', fontSize=8, textColor=TEAL,
                      spaceAfter=3, leading=12, letterSpacing=2),
        'meta': s('meta', fontName='Helvetica', fontSize=9, textColor=MUTED,
                  spaceAfter=2, leading=13),
        'section': s('section', fontName='Helvetica-Bold', fontSize=7.5, textColor=TEAL,
                     spaceBefore=8, spaceAfter=4, leading=12, letterSpacing=1.5),
        'company': s('company', fontName='Helvetica-Bold', fontSize=10, textColor=BLACK,
                     spaceBefore=8, spaceAfter=1, leading=14),
        'period': s('period', fontName='Helvetica', fontSize=8.5, textColor=MUTED,
                    spaceAfter=3, leading=12),
        'body': s('body', fontName='Helvetica', fontSize=9.5, textColor=BLACK,
                  spaceAfter=4, leading=14),
        'skill_row': s('skill_row', fontName='Helvetica', fontSize=9.5, textColor=BLACK,
                       spaceAfter=3, leading=14),
        'client': s('client', fontName='Helvetica-Bold', fontSize=9.5, textColor=BLACK,
                    spaceBefore=6, spaceAfter=1, leading=13, leftIndent=12),
        'client_period': s('client_period', fontName='Helvetica', fontSize=8.5, textColor=MUTED,
                           spaceAfter=2, leading=12, leftIndent=12),
        'client_body': s('client_body', fontName='Helvetica', fontSize=9.5, textColor=BLACK,
                         spaceAfter=3, leading=14, leftIndent=12),
    }


def rule():
    return HRFlowable(width='100%', thickness=0.75, color=TEAL, spaceAfter=4, spaceBefore=4)


def company_line(company, title):
    return f'<font color="#0A0A0A"><b>{company}</b></font>  <font color="#555555">· {title}</font>'


def skill_line(category, items):
    return f'<font color="#2A7A7A"><b>{category}</b></font>{"&nbsp;" * (14 - len(category))}{items}'


def build():
    doc = SimpleDocTemplate(
        OUT,
        pagesize=letter,
        leftMargin=0.85 * inch,
        rightMargin=0.85 * inch,
        topMargin=0.75 * inch,
        bottomMargin=0.75 * inch,
    )

    st = styles()
    story = []

    # Header
    story.append(Paragraph('adam robinson', st['name']))
    story.append(Paragraph('SENIOR SOFTWARE ENGINEER', st['subtitle']))
    story.append(Paragraph('Providence, RI', st['meta']))
    story.append(Paragraph(
        'adamrobinson.tech  ·  github.com/aaddaamm  ·  '
        'linkedin.com/in/adam-robinson-software  ·  adam@adamrobinson.tech',
        st['meta']
    ))
    story.append(Spacer(1, 6))

    # Summary
    story.append(rule())
    story.append(Paragraph('SUMMARY', st['section']))
    story.append(Paragraph(
        'Senior software engineer with over a decade of experience across fintech, healthcare, '
        'and enterprise. Full-stack, backend-leaning — specializing in Rails, Node.js, and '
        'TypeScript. Embeds with existing teams, gets up to speed fast in complex codebases, '
        'and ships reliably. Daily user of AI-assisted development tools.',
        st['body']
    ))

    # Experience
    story.append(rule())
    story.append(Paragraph('EXPERIENCE', st['section']))

    story.append(Paragraph(company_line('MojoTech', 'Senior Software Engineer / Technical Lead'), st['company']))
    story.append(Paragraph('2015 – Present  ·  Providence, RI', st['period']))
    story.append(Paragraph(
        'Delivered across dozens of client engagements as an embedded senior engineer and '
        'technical lead. Selected clients:',
        st['body']
    ))

    clients = [
        (
            'iCapital', 'Staff Augmentation / Senior Engineer', '2024 – present',
            'Embedded on a large-scale alternative investment platform serving wealth managers. '
            'Expanded i18n support across static and database-backed content, co-designed a '
            'Rails service for bulk nominee investment processing, and led a component library '
            'migration (Supernova v1 → v2).'
        ),
        (
            'Healthcasts', 'Technical Lead', '2022 – 2024',
            'Led platform modernization for a medical publishing company. Built a headless CMS '
            'publishing pipeline (Strapi + React), rebuilt AWS infrastructure, and delivered an '
            'Auth0 authentication overhaul unifying login across all platforms — unblocking a '
            'parallel AI initiative in the process.'
        ),
        (
            'Angi', 'Staff Augmentation / Senior Engineer', '2021 – 2022',
            "Delivered across three separate codebases (HomeAdvisor, Handy, Angie's List) in a "
            'single engagement — Vue/Java, Rails/React, and Next.js/Contentful. Mentored a team '
            'of interns through their first fully shipped feature.'
        ),
        (
            'Shell Techworks', 'Software Engineer', '2018 – 2019',
            'Built decommissioning tooling for end-of-life offshore oil platforms. Full-stack '
            'React/Node application. Used the Google Design Sprint process to compress scope '
            'and deliver MVP on schedule onsite in Boston.'
        ),
    ]

    for company, title, period, desc in clients:
        story.append(Paragraph(
            f'<font color="#2A7A7A">▸</font>  <b>{company}</b>  <font color="#555555">· {title} · {period}</font>',
            st['client']
        ))
        story.append(Paragraph(desc, st['client_body']))

    story.append(Paragraph(
        '<i><font color="#555555">Earlier clients include School of Motion, Amica Mutual, and AutoRaptor.</font></i>',
        st['client_body']
    ))
    story.append(Spacer(1, 4))

    story.append(Paragraph(company_line('Beacon Mutual Insurance', 'Software Engineer'), st['company']))
    story.append(Paragraph('2013 – 2016  ·  Warwick, RI', st['period']))
    story.append(Paragraph(
        'Built backend systems for claims and policy management in a regulated, '
        'high-reliability environment. Designed financial transaction and payment processing '
        'systems with strong correctness requirements.',
        st['body']
    ))

    # Skills
    story.append(rule())
    story.append(Paragraph('SKILLS', st['section']))
    skills = [
        ('Backend', 'TypeScript, Ruby, SQL, Elixir  ·  Node.js, Ruby on Rails, Express, Phoenix'),
        ('Frontend', 'React, SvelteKit, Vue, Next.js'),
        ('Cloud', 'AWS  ·  Vercel  ·  GitHub Actions'),
        ('Tools', 'Git, Prisma, Strapi, Contentful, Auth0'),
        ('AI', 'GitHub Copilot, Claude, AMP  (daily — VS Code / Zed)'),
    ]
    for category, items in skills:
        story.append(Paragraph(skill_line(category, items), st['skill_row']))

    doc.build(story)
    print(f'Saved: {OUT}')


if __name__ == '__main__':
    build()
