# Resume maintenance

The public downloads are `static/adam_robinson.pdf` and `static/adam_robinson.docx`.
Both are generated from `scripts/resume_content.json` by `scripts/build_resume.py`.
Run the builder with Python 3, `reportlab`, and `python-docx` installed, then render
and inspect both documents before replacing the public downloads.

The September 2026 content comes from Adam Robinson Solutions Architect Resume,
supplied by Adam on September 17. Career dates, selected outcomes, client work,
Beacon Mutual experience, capabilities, and technical foundation are preserved.
The headline matches the site's Senior Software Engineer & Technical Lead
positioning. Layout uses the previous site's restrained teal, black type, and
single-column format, expanded to two pages to preserve the source content.

The generators and content in `scripts/archive/` are historical. Do not use them
to regenerate the current downloads.
