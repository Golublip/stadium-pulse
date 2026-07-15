import os
import sys

# Ensure reportlab imports work
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
            return  # Skip header/footer on title page
        self.saveState()
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(colors.HexColor("#00f0ff"))
        self.drawString(54, 755, "STADIUM PULSE")
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#a1a1aa"))
        self.drawString(135, 755, "|  SYSTEMS BLUEPRINT & LINKEDIN TOOLKIT")
        self.setStrokeColor(colors.HexColor("#27272a"))
        self.setLineWidth(0.75)
        self.line(54, 745, 558, 745)
        
        # Footer
        self.line(54, 55, 558, 55)
        self.drawString(54, 40, "CONFIDENTIAL  |  FIFA WORLD CUP 2026 COGNITIVE SYSTEMS")
        page_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(558, 40, page_text)
        self.restoreState()

def create_blueprint_pdf(filename="Stadium_Pulse_Blueprint.pdf"):
    # Target 8.5 x 11 inches (Letter)
    # Margins: 0.75 in (54 pt)
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=70
    )

    styles = getSampleStyleSheet()
    
    # Custom styles
    # Primary theme colors: Deep dark zinc (#09090b), Cyan (#00f0ff), Emerald (#10b981)
    title_style = ParagraphStyle(
        'CoverTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=32,
        leading=38,
        textColor=colors.HexColor("#09090b"),
        alignment=0, # Left aligned
        spaceAfter=10
    )
    
    subtitle_style = ParagraphStyle(
        'CoverSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=14,
        leading=18,
        textColor=colors.HexColor("#71717a"),
        alignment=0,
        spaceAfter=30
    )

    h1_style = ParagraphStyle(
        'H1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=colors.HexColor("#09090b"),
        spaceBefore=15,
        spaceAfter=10,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'H2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor("#0f172a"),
        spaceBefore=10,
        spaceAfter=6,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor("#334155"),
        spaceAfter=8
    )

    bullet_style = ParagraphStyle(
        'Bullet',
        parent=body_style,
        leftIndent=15,
        firstLineIndent=-10,
        spaceAfter=4
    )

    code_style = ParagraphStyle(
        'Code',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor("#0f172a"),
        backColor=colors.HexColor("#f8fafc"),
        borderColor=colors.HexColor("#e2e8f0"),
        borderWidth=0.5,
        borderPadding=6,
        spaceAfter=10
    )

    story = []

    # ================= COVER PAGE =================
    story.append(Spacer(1, 100))
    story.append(Paragraph("STADIUM PULSE", title_style))
    story.append(Paragraph("The Living Digital Twin of Every Fan — FIFA World Cup 2026", subtitle_style))
    story.append(Spacer(1, 10))
    
    # Divider line
    d_table = Table([[""]], colWidths=[504], rowHeights=[4])
    d_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#00f0ff")),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(d_table)
    story.append(Spacer(1, 30))

    intro_text = (
        "<b>SYSTEM BLUEPRINT & LINKEDIN TOOLKIT</b><br/><br/>"
        "This blueprint provides a comprehensive operational summary of <b>Stadium Pulse</b>, "
        "the world's first living cognitive stadium operating system. Inside, you will find "
        "the architectural framework, multi-agent communication topology, and real-world final "
        "match demo scenarios. In addition, it contains ready-to-publish LinkedIn post templates "
        "written to drive engagement, demonstrate technical expertise, and showcase generative AI "
        "innovation."
    )
    story.append(Paragraph(intro_text, body_style))
    story.append(Spacer(1, 150))
    
    meta_text = (
        "<b>Author:</b> Golublip & Generative AI Systems Team<br/>"
        "<b>Date:</b> July 2026<br/>"
        "<b>Version:</b> 1.0.0 (Production Blueprint)<br/>"
        "<b>Target Venue:</b> MetLife Stadium, FIFA Final 2026"
    )
    story.append(Paragraph(meta_text, body_style))
    story.append(PageBreak())

    # ================= SECTION 1 =================
    story.append(Paragraph("1. Executive Vision & Core Paradigm", h1_style))
    story.append(Paragraph(
        "Modern smart stadiums are traditionally <b>reactive</b>: they report congestion after queues "
        "have formed, notify security after incidents occur, and clean waste after the match ends. "
        "<b>Stadium Pulse</b> is the world's first <b>cognitive and proactive</b> stadium OS, "
        "treating the venue as a living organism.",
        body_style
    ))
    story.append(Paragraph(
        "By ingesting real-time anonymous data points, the system constructs a continuous digital twin "
        "where every fan, retail worker, and volunteer is modeled as a moving vector in a spatial-temporal grid. "
        "Every second, the system projects 10 parallel future scenarios (T+5m, T+10m, T+20m, T+30m) "
        "to simulate crowd flow, transit patterns, and emergency events. When a future scenario showing "
        "congestion or risk has a high probability, the system initiates 'invisible orchestration' to shift "
        "crowd dynamics and distribute load before any issues emerge in reality.",
        body_style
    ))
    
    story.append(Paragraph("Key Technological Pillars:", h2_style))
    story.append(Paragraph("• <b>The Multiverse Simulator</b>: Continuously imagines parallel future states.", bullet_style))
    story.append(Paragraph("• <b>Invisible Orchestration</b>: Dynamic signage and context-aware notifications route crowd flow.", bullet_style))
    story.append(Paragraph("• <b>Multi-Agent Collaboration</b>: 12 specialized autonomous AI agents negotiate state and coordinate actions.", bullet_style))
    story.append(Paragraph("• <b>Privacy-First Anonymous Design</b>: Spatial hashing (Uber H3 Index) and zero-knowledge tokens ensure zero personal identifiers are tracked.", bullet_style))
    
    story.append(Spacer(1, 15))

    # ================= SECTION 2 =================
    story.append(Paragraph("2. Production Systems Architecture", h1_style))
    story.append(Paragraph(
        "Stadium Pulse is built entirely on a serverless, horizontally-scaling Google Cloud architecture "
        "capable of managing over 5 million concurrent visitors across multiple tournament venues.",
        body_style
    ))

    # Architecture Table
    arch_data = [
        ["Layer", "GCP Component", "Function"],
        ["Ingress", "Pub/Sub & IoT Core", "Ingests CCTV density vectors, GPS transit feeds, and sensor arrays."],
        ["Stream", "Dataflow", "Performs spatial-temporal H3 hashing and vector clustering."],
        ["State DB", "Cloud Spanner", "Stores the transactional, active state of 100,000+ localized nodes."],
        ["Analytics", "BigQuery", "Saves historical flow patterns for model tuning and predictive analysis."],
        ["Orchestration", "Cloud Run (Multi-Agent)", "Hosts the 12 specialized agents communicating via gRPC."],
        ["Gen AI Core", "Vertex AI & Gemini Pro", "Performs semantic analysis, generates dynamic routing, and emergency action plans."]
    ]
    t = Table(arch_data, colWidths=[90, 120, 294])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#0f172a")),
        ('TEXTCOLOR', (0,0), (-1,0), colors.whitesmoke),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0,0), (-1,0), 6),
        ('BACKGROUND', (0,1), (-1,-1), colors.HexColor("#f8fafc")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
        ('FONTNAME', (0,1), (-1,-1), 'Helvetica'),
        ('FONTSIZE', (0,0), (-1,-1), 8.5),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,1), (-1,-1), 6),
    ]))
    story.append(t)
    story.append(PageBreak())

    # ================= SECTION 3 =================
    story.append(Paragraph("3. The 12 Autonomous AI Agents", h1_style))
    story.append(Paragraph(
        "Operations are managed by 12 self-contained, cooperating agents. The agents negotiate "
        "and synchronize using a central operational blackboard:",
        body_style
    ))

    agents_data = [
        ["Agent", "Operational Objective"],
        ["Fan Agent", "Manages individual navigation prompts and anonymous session states."],
        ["Accessibility Agent", "Monitors elevator networks, ramps, and computes detour routing for disabled visitors."],
        ["Emergency Agent", "Triggers dynamic exit routes and coordinates with local responders during crises."],
        ["Medical Agent", "Dispatches medical teams and routes paramedics through open corridors."],
        ["Transportation Agent", "Synchronizes train schedules, bus loops, parking queues, and flight arrivals."],
        ["Food Concession Agent", "Optimizes retail logistics, supply chains, and triggers dynamic discount codes."],
        ["Waste Agent", "Predicts trash accumulation zones and schedules custodial robots."],
        ["Security Agent", "Monitors access points, gate sensors, and bag scanning queues."],
        ["Volunteer Agent", "Pushes real-time micro-missions to volunteer devices."],
        ["Weather Agent", "Monitors rain, wind, and temperatures to adjust facility configurations."],
        ["Energy Agent", "Orchestrates smart grid, HVAC, escalators, and screen power loads."],
        ["Sustainability Agent", "Tracks carbon footprints, water consumption, and food waste metrics."]
    ]
    t2 = Table(agents_data, colWidths=[120, 384])
    t2.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#0f172a")),
        ('TEXTCOLOR', (0,0), (-1,0), colors.whitesmoke),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0,0), (-1,0), 5),
        ('BACKGROUND', (0,1), (-1,-1), colors.HexColor("#f8fafc")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
        ('FONTNAME', (0,1), (-1,-1), 'Helvetica'),
        ('FONTSIZE', (0,0), (-1,-1), 8),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,1), (-1,-1), 5),
    ]))
    story.append(t2)
    story.append(Spacer(1, 15))

    # ================= SECTION 4 =================
    story.append(Paragraph("4. Demo Scenario: Halftime Rain Event", h1_style))
    story.append(Paragraph(
        "To test the cognitive capability of Stadium Pulse, the team built a simulation of the "
        "FIFA World Cup 2026 Final (Score: 1-1 at Halftime) under a sudden rainstorm:",
        body_style
    ))
    story.append(Paragraph("1. <b>Weather Agent</b> detects precipitation and predicts open-stand evacuation.", bullet_style))
    story.append(Paragraph("2. <b>Crowd Agent</b> projects concourse load density rising to 4.2/m² in 5 minutes.", bullet_style))
    story.append(Paragraph("3. <b>Accessibility Agent</b> flags elevator E-2 offline, blocking wheelchair access routes.", bullet_style))
    story.append(Paragraph("4. <b>Orchestrator Agent</b> requests detour routes from Accessibility Agent, which runs Dijkstra bypass calculations.", bullet_style))
    story.append(Paragraph("5. <b>Volunteer Agent</b> triggers micro-missions: dispatches 15 nearby volunteers to redirect flow.", bullet_style))
    story.append(Paragraph("6. <b>Facilities</b> updates digital signs to redirect flow, while the <b>Food Agent</b> triggers flash sales on dry concourses to distribute crowd weight.", bullet_style))
    story.append(PageBreak())

    # ================= SECTION 5 =================
    story.append(Paragraph("5. LinkedIn Content Kit (Post Templates)", h1_style))
    story.append(Paragraph(
        "Use the following posts to share the Stadium Pulse project on LinkedIn. Choose the tone "
        "that best aligns with your audience.",
        body_style
    ))

    # Post 1
    story.append(Paragraph("Option A: The Visionary / Hook-Driven Post", h2_style))
    p1_content = (
        "We built a stadium that behaves like a living organism. 🏟️<br/><br/>"
        "Imagine entering a venue with 80,000 other people. Instead of reacting to problems... "
        "the stadium itself predicts them.<br/><br/>"
        "For the FIFA World Cup 2026, we designed <b>Stadium Pulse</b>: The Living Digital Twin of Every Fan.<br/><br/>"
        "Instead of simple dashboards, Stadium Pulse continuously simulates 10 parallel futures every second. "
        "If a concession queue overflows in 10 minutes, or a sudden rainstorm triggers a rush on open stairs, "
        "the system acts before anything happens. It redirects traffic via dynamic LED signs, dispatches volunteers "
        "with micro-missions, and balances energy grids automatically.<br/><br/>"
        "The tech under the hood:<br/>"
        "• Google Gemini Pro Core for real-time generative reasoning.<br/>"
        "• Cloud Spanner & Dataflow for spatial-temporal H3 geohashing.<br/>"
        "• 12 specialized autonomous AI agents cooperating on a central blackboard.<br/>"
        "• Privacy-first differential privacy & zero-knowledge tokens.<br/><br/>"
        "We have never seen a stadium behave like a cognitive, living system. The future of crowd safety is proactive, "
        "invisible, and powered by Generative AI.<br/><br/>"
        "Check out our open-source codebase: https://github.com/Golublip/stadium-pulse.git<br/><br/>"
        "#GenerativeAI #DigitalTwin #SmartStadium #FIFA2026 #GoogleGemini #CloudComputing"
    )
    story.append(Paragraph(p1_content, code_style))
    story.append(Spacer(1, 15))

    # Post 2
    story.append(Paragraph("Option B: The Deep-Dive Technical Post", h2_style))
    p2_content = (
        "How do you coordinate 100,000+ moving vectors in real-time? 🧠<br/><br/>"
        "Here is the systems architecture for <b>Stadium Pulse</b>, a Living Digital Twin for the FIFA World Cup 2026:<br/><br/>"
        "1. <b>Ingress & Stream</b>: IoT Core & Pub/Sub ingest CCTV density data, transit APIs, and weather feeds. "
        "Dataflow processes this stream in sliding-windows, hashing locations into 3mx3m cells (Uber H3 Index Level 11).<br/><br/>"
        "2. <b>Real-time State</b>: Cloud Spanner keeps global transactional consistency of active crowd coordinates. "
        "Differential privacy adds Laplace noise to telemetry, ensuring zero individual visitor tracking.<br/><br/>"
        "3. <b>Multi-Agent Orchestration</b>: 12 specialized AI agents (Fan, Security, Accessibility, Volunteer, Transit) "
        "run on Cloud Run, communicating via gRPC. They negotiate parameters—e.g., the Transit Agent requesting "
        "the Concession Agent to push dynamic retail sales to delay exit surges during rail delays.<br/><br/>"
        "4. <b>Cognitive Layer</b>: Vertex AI & Gemini Pro consume high-density JSON states of the venue. "
        "It acts as a hyper-parameter optimizer, generating operational narratives and dispatching volunteer micro-missions.<br/><br/>"
        "Proactive orchestration is the new standard for complex physical environments.<br/><br/>"
        "Explore the architecture blueprint: https://github.com/Golublip/stadium-pulse.git<br/><br/>"
        "#CloudArchitecture #SystemDesign #SoftwareEngineering #MultiAgentSystems #GoogleCloud"
    )
    story.append(Paragraph(p2_content, code_style))
    
    # Build Document
    doc.build(story, canvasmaker=NumberedCanvas)

if __name__ == "__main__":
    create_blueprint_pdf()
