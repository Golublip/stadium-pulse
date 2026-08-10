import os
import sys

from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            super().showPage()
        super().save()

    def draw_page_number(self, page_count):
        if self._pageNumber == 1:
            return  # Skip cover page
        self.saveState()
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(colors.HexColor("#00f0ff"))
        self.drawString(54, 755, "STADIUM PULSE")
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#a1a1aa"))
        self.drawString(135, 755, "|  COMPLETE SUBMISSION SUB-PORTFOLIO")
        self.setStrokeColor(colors.HexColor("#27272a"))
        self.setLineWidth(0.75)
        self.line(54, 745, 558, 745)
        
        # Footer
        self.line(54, 55, 558, 55)
        self.drawString(54, 40, "SUBMISSION PORTFOLIO  |  STADIUM PULSE COGNITIVE OS")
        page_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(558, 40, page_text)
        self.restoreState()

def escape_html(text):
    return text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

def build_pdf():
    pdf_filename = "Stadium_Pulse_Complete_Submission.pdf"
    
    # 8.5 x 11 inches (Letter)
    # Margins: 0.75 in (54 pt)
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=70
    )

    styles = getSampleStyleSheet()
    
    # Text styles
    title_style = ParagraphStyle(
        'CoverTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=28,
        leading=34,
        textColor=colors.HexColor("#09090b"),
        spaceAfter=10
    )
    
    subtitle_style = ParagraphStyle(
        'CoverSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor("#71717a"),
        spaceAfter=30
    )

    h1_style = ParagraphStyle(
        'H1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=16,
        leading=20,
        textColor=colors.HexColor("#09090b"),
        spaceBefore=18,
        spaceAfter=10,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'H2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=colors.HexColor("#0f172a"),
        spaceBefore=10,
        spaceAfter=6,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor("#334155"),
        spaceAfter=6
    )

    code_style = ParagraphStyle(
        'Code',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=7,
        leading=9,
        textColor=colors.HexColor("#0f172a"),
        backColor=colors.HexColor("#f8fafc"),
        borderColor=colors.HexColor("#e2e8f0"),
        borderWidth=0.5,
        borderPadding=6,
        spaceAfter=8
    )

    story = []

    # ================= COVER PAGE =================
    story.append(Spacer(1, 120))
    story.append(Paragraph("STADIUM PULSE", title_style))
    story.append(Paragraph("The Living Digital Twin of Every Fan — Complete Submission Portfolio", subtitle_style))
    story.append(Spacer(1, 10))
    
    # Cyan divider line
    d_table = Table([[""]], colWidths=[504], rowHeights=[4])
    d_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#00f0ff")),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(d_table)
    story.append(Spacer(1, 30))

    intro_text = (
        "<b>COMPLETE SUBMISSION ARTIFACT PORTFOLIO</b><br/><br/>"
        "This consolidated PDF portfolio contains the entire, end-to-end documentation, "
        "production systems architecture specifications, and complete source code files "
        "for the <b>Stadium Pulse Smart Stadium Operating System</b> project. This document "
        "serves as a comprehensive artifact submission detailing all technical mechanisms "
        "for evaluation."
    )
    story.append(Paragraph(intro_text, body_style))
    story.append(Spacer(1, 120))
    
    meta_text = (
        "<b>Project Title:</b> Stadium Pulse<br/>"
        "<b>Vertical:</b> Smart Venue Operations, Crowd Safety & Public Infrastructure<br/>"
        "<b>GitHub Repo Link:</b> https://github.com/Golublip/stadium-pulse.git<br/>"
        "<b>Live Deployed Site:</b> https://golublip.github.io/stadium-pulse/<br/>"
        "<b>GCP Project:</b> ambient-bonito-bxfb9"
    )
    story.append(Paragraph(meta_text, body_style))
    story.append(PageBreak())

    # ================= SECTION 1: README =================
    story.append(Paragraph("Section 1: Project Overview & README", h1_style))
    if os.path.exists("README.md"):
        with open("README.md", "r", encoding="utf-8") as f:
            content = f.read()
        
        # Parse simple markdown headings
        lines = content.split('\n')
        for line in lines:
            if line.startswith('# '):
                story.append(Paragraph(escape_html(line[2:]), h1_style))
            elif line.startswith('## '):
                story.append(Paragraph(escape_html(line[3:]), h2_style))
            elif line.strip() == "":
                story.append(Spacer(1, 4))
            else:
                # Handle bullet list
                if line.strip().startswith('* ') or line.strip().startswith('• ') or line.strip().startswith('- '):
                    bullet_text = line.strip()[2:]
                    story.append(Paragraph(f"• {escape_html(bullet_text)}", body_style))
                else:
                    story.append(Paragraph(escape_html(line), body_style))
    else:
        story.append(Paragraph("README.md not found in the local folder.", body_style))
    
    story.append(PageBreak())

    # ================= SECTION 2: SYSTEMS ARCHITECTURE =================
    story.append(Paragraph("Section 2: Systems Architecture Specification", h1_style))
    if os.path.exists("stadium_pulse_architecture.md"):
        with open("stadium_pulse_architecture.md", "r", encoding="utf-8") as f:
            content = f.read()
        
        lines = content.split('\n')
        in_code_block = False
        code_lines = []
        
        for line in lines:
            if line.strip().startswith("```"):
                if in_code_block:
                    # Render code block
                    code_text = "\n".join(code_lines)
                    story.append(Paragraph(escape_html(code_text), code_style))
                    code_lines = []
                    in_code_block = False
                else:
                    in_code_block = True
                continue
            
            if in_code_block:
                code_lines.append(line)
            else:
                if line.startswith('# '):
                    story.append(Paragraph(escape_html(line[2:]), h1_style))
                elif line.startswith('## '):
                    story.append(Paragraph(escape_html(line[3:]), h2_style))
                elif line.startswith('### '):
                    story.append(Paragraph(escape_html(line[4:]), h2_style))
                elif line.strip() == "":
                    story.append(Spacer(1, 4))
                else:
                    if line.strip().startswith('* ') or line.strip().startswith('• ') or line.strip().startswith('- '):
                        bullet_text = line.strip()[2:]
                        story.append(Paragraph(f"• {escape_html(bullet_text)}", body_style))
                    else:
                        story.append(Paragraph(escape_html(line), body_style))
    else:
        story.append(Paragraph("stadium_pulse_architecture.md not found.", body_style))

    story.append(PageBreak())

    # ================= SECTION 3: CODEBASE FILES =================
    story.append(Paragraph("Section 3: Interactive Console Codebase Source Files", h1_style))
    story.append(Paragraph(
        "Below are the primary source code files comprising the frontend operator Twin dashboard "
        "and Python validation suite.",
        body_style
    ))
    
    code_files = [
        ("index.html", "3.1 Frontend HTML Interface Markup"),
        ("app.js", "3.2 Dynamic Simulator Logic & ECharts Setup"),
        ("styles.css", "3.3 Glassmorphic Styling and Animations"),
        ("test.py", "3.4 Automated Testing & Validation Suite"),
        ("Dockerfile", "3.5 Containerized Deployment Config"),
        ("run.py", "3.6 Local Web Server startup script")
    ]
    
    for filename, title in code_files:
        story.append(Paragraph(title, h2_style))
        if os.path.exists(filename):
            with open(filename, "r", encoding="utf-8") as f:
                code_content = f.read()
            
            # Since source code can be long, split it by logical lines so it can break across pages gracefully
            # ReportLab code blocks fail to break across pages if they are inside a single Flowable
            # So we wrap every 40-line chunk into its own Paragraph style.
            lines = code_content.split('\n')
            chunk_size = 45
            for idx in range(0, len(lines), chunk_size):
                chunk = lines[idx:idx+chunk_size]
                chunk_text = "\n".join(chunk)
                story.append(Paragraph(escape_html(chunk_text), code_style))
                story.append(Spacer(1, 4))
        else:
            story.append(Paragraph(f"{filename} not found.", body_style))
        story.append(Spacer(1, 10))

    # Build Document
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"[STADIUM PULSE] Compiled complete submission PDF: {pdf_filename}")

if __name__ == "__main__":
    build_pdf()
