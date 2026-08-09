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
SITE_URL = 'https://www.adamrobinson.tech'
GITHUB_URL = 'https://github.com/aaddaamm'
LINKEDIN_URL = 'https://www.linkedin.com/in/adam-robinson-software/'
EMAIL = 'adam@adamrobinson.tech'


def styles():
    base = getSampleStyleSheet()

    def s(name, **kw):
        return ParagraphStyle(name, parent=base['Normal'], **kw)

    return {
        'name': s('name', fontName='Helvetica', fontSize=22, textColor=BLACK,
                  spaceAfter=2, leading=26),
        'subtitle': s('subtitle', fontName='Helvetica', fontSize=8, textColor=TEAL,
                      spaceAfter=3, leading=12, letterSpacing=2),
        'subtitle_meta': s('subtitle_meta', fontName='Helvetica', fontSize=8.5, textColor=TEAL,
                           spaceAfter=3, leading=12),
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
        'skill_row': s('skill_row', fontName='Helvetica', fontSize=9, textColor=BLACK,
                       spaceAfter=2, leading=12),
        'client': s('client', fontName='Helvetica-Bold', fontSize=9.5, textColor=BLACK,
                    spaceBefore=6, spaceAfter=1, leading=13, leftIndent=12),
        'client_period': s('client_period', fontName='Helvetica', fontSize=8.5, textColor=MUTED,
                           spaceAfter=2, leading=12, leftIndent=12),
        'client_body': s('client_body', fontName='Helvetica', fontSize=9.5, textColor=BLACK,
                         spaceAfter=3, leading=14, leftIndent=12),
        'client_list': s('client_list', fontName='Helvetica', fontSize=8.5, textColor=MUTED,
                         spaceAfter=1, leading=11, leftIndent=12),
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
        title='Adam Robinson - Senior Software Engineer',
        author='Adam Robinson',
        subject='Resume for Adam Robinson, Senior Software Engineer and Technical Lead',
        keywords=[
            'senior software engineer',
            'technical lead',
            'React',
            'TypeScript',
            'Node.js',
            'Ruby on Rails',
            'embedded consultant'
        ],
        leftMargin=0.85 * inch,
        rightMargin=0.85 * inch,
        topMargin=0.65 * inch,
        bottomMargin=0.55 * inch,
    )

    st = styles()
    story = []

    # Header
    story.append(Paragraph('Adam Robinson', st['name']))
    story.append(Paragraph(
        'SENIOR SOFTWARE ENGINEER  <font color="#555555">· Providence, RI</font>',
        st['subtitle_meta']
    ))
    story.append(Paragraph(
        f'<link href="{SITE_URL}" color="#555555">adamrobinson.tech</link>  ·  '
        f'<link href="{GITHUB_URL}" color="#555555">GitHub</link>  ·  '
        f'<link href="{LINKEDIN_URL}" color="#555555">LinkedIn</link>  ·  '
        f'<link href="mailto:{EMAIL}" color="#555555">{EMAIL}</link>',
        st['meta']
    ))
    story.append(Spacer(1, 6))

    # Summary
    story.append(rule())
    story.append(Paragraph('SUMMARY', st['section']))
    story.append(Paragraph(
        'I have 15+ years building and modernizing production systems across fintech, healthcare, industrial '
        'technology, and enterprise products. I take ownership of unfamiliar or difficult parts of a product: '
        'read the code, learn the team\'s conventions, and work from the paths closest to the problem. I prefer '
        'well-scoped changes that ship and leave the system and the handoff to the next engineer in better shape. '
        'Recent work spans React, TypeScript/Node.js, and Rails.',
        st['body']
    ))

    # Experience
    story.append(rule())
    story.append(Paragraph('EXPERIENCE', st['section']))

    story.append(Paragraph(company_line('MojoTech', 'Senior Software Engineer'), st['company']))
    story.append(Paragraph('Feb 2015 - Present  ·  Providence, RI', st['period']))
    story.append(Paragraph(
        'Software consultancy. Embedded with client teams across 15+ engagements. '
        '<b>Selected client engagements:</b>',
        st['body']
    ))

    clients = [
        (
            'iCapital', 'May 2024 - present',
            'Co-designed a Rails service that consolidated bulk nominee processing for thousands '
            'of investments. Expanded localization across static and database-backed content and '
            'led the team\'s Supernova v1-to-v2 component library migration.'
        ),
        (
            'Healthcasts', 'Oct 2022 - May 2024',
            'Partnered with Healthcasts across publishing, infrastructure, and identity. Delivered a headless '
            'CMS that cut time-to-publish from weeks to days, then modernized EC2, deployed databases, '
            'and the backend to TypeScript. Unified auth between legacy PHP/CMS and React/CMS applications, '
            'enabling the next phase of an AI-platform overhaul.'
        ),
        (
            'Angi', 'Nov 2020 - Sep 2022',
            "Adapted to an expanded scope during Angi's rebrand, helping consolidate HomeAdvisor flows "
            'into a shared Angi quiz flow in Java/Vue. Also worked in Rails/React at Handy and '
            "Next.js/Contentful at Angie's List, took ownership of a Careers rewrite, and guided interns "
            'through their first production release.'
        ),
        (
            'Shell Techworks', 'Jun 2018 - Jul 2019',
            'At Shell Techworks, a startup-style group inside Shell, built a React/Node.js application '
            'for evaluating least-cost offshore-platform decommissioning paths. Used Ant Design and '
            'LoopBack, iterating quickly to deliver the MVP onsite in Boston.'
        ),
    ]

    for company, period, desc in clients:
        story.append(Paragraph(
            f'<font color="#2A7A7A">-</font>  <b>{company}</b>  <font color="#555555">· {period}</font>',
            st['client']
        ))
        story.append(Paragraph(desc, st['client_body']))

    story.append(Paragraph(
        '<i><font color="#555555">Additional client engagements: Two Sigma · Welltok · Credit Karma · '
        'Schneider Electric · School of Motion · Amica Mutual · AutoRaptor.</font></i>',
        st['client_list']
    ))
    story.append(Spacer(1, 2))

    story.append(Paragraph(company_line('Beacon Mutual Insurance', 'Associate Developer / Production Control'), st['company']))
    story.append(Paragraph('Mar 2011 - Feb 2015  ·  Warwick, RI', st['period']))
    story.append(Paragraph(
        'Progressed from deployment and environment management to full-stack and database development, '
        'building claims, policy, financial transaction, and payment systems in a regulated environment.',
        st['body']
    ))

    # Skills
    story.append(rule())
    story.append(Paragraph('SKILLS', st['section']))
    skills = [
        ('Backend', 'TypeScript, Ruby, SQL, Elixir  ·  Node.js, Ruby on Rails, Express, Phoenix'),
        ('Frontend', 'React, SvelteKit, Vue, Next.js'),
        ('Platform', 'AWS, Vercel, GitHub Actions  ·  Git, Prisma, Strapi, Contentful, Auth0'),
    ]
    for category, items in skills:
        story.append(Paragraph(skill_line(category, items), st['skill_row']))

    doc.build(story)
    print(f'Saved: {OUT}')


if __name__ == '__main__':
    build()
