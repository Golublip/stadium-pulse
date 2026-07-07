// STADIUM PULSE — DYNAMIC STATE MACHINE & COGNITIVE SIMULATOR

// Initialize Lucide Icons
lucide.createIcons();

// --- STATE MANAGEMENT ---
let currentScenario = 'base';
let currentTimelineStep = 0; // 0 = Reality, 1 = T+5m, 2 = T+10m, 3 = T+30m

// --- SCENARIO DATA SPECIFICATION ---
const scenarioData = {
    base: {
        label: "Base State (Pre-Match)",
        metrics: {
            density: ["1.1/m²", "1.2/m²", "1.3/m²", "1.2/m²"],
            densityClass: ["bg-cyber-emeraldDim text-cyber-emerald", "bg-cyber-emeraldDim text-cyber-emerald", "bg-cyber-emeraldDim text-cyber-emerald", "bg-cyber-emeraldDim text-cyber-emerald"],
            flow: ["97.2%", "96.4%", "95.8%", "96.1%"],
            flowClass: ["bg-cyber-emeraldDim text-cyber-emerald", "bg-cyber-emeraldDim text-cyber-emerald", "bg-cyber-emeraldDim text-cyber-emerald", "bg-cyber-emeraldDim text-cyber-emerald"],
            energy: ["1.9 MW", "1.8 MW", "1.8 MW", "1.7 MW"],
            energySaving: ["-12% SAVINGS", "-14% SAVINGS", "-14% SAVINGS", "-16% SAVINGS"],
            volunteers: ["310 / 450", "342 / 450", "350 / 450", "360 / 450"],
            volunteersClass: ["bg-zinc-800 text-zinc-400", "bg-zinc-800 text-zinc-400", "bg-zinc-800 text-zinc-400", "bg-zinc-800 text-zinc-400"]
        },
        narrator: [
            "**[T+0m - Reality]** The cognitive stadium core is running at baseline efficiency. 62,000 visitors have successfully scanned ticks and are routed toward their respective seats. All spatial zones are operating within comfort thresholds (average density 1.1/m²).",
            "**[T+5m - Prediction]** Core anticipates slight queue buildup at Gate C as train arrivals increase. The *Crowd Agent* is already adjusting concourse LED routing banners to shift incoming vectors toward Gate D.",
            "**[T+10m - Prediction]** Ingress completed. Concourse zones clear. The *Energy Agent* initiates energy sleep mode on escalators E1-E4, reducing passive power draw by 14%.",
            "**[T+30m - Prediction]** Teams are on the field warming up. Seat occupancy reaches 98%. Sound sensors calibrate baseline crowd chants to optimize stadium decibel safety levels."
        ],
        negotiations: [
            "[System] Core connected to all 12 operational sub-agents.",
            "[Security Agent] -> [Crowd Agent]: Synchronized gate ticketing systems. Ingress flow rates clear.",
            "[Energy Agent] -> [Facilities]: Reduced HVAC load in seating zones; pre-cooling stadium cupolas.",
            "[Volunteer Agent] -> [Accessibility Agent]: Placed 40 accessibility helpers at central elevators."
        ],
        incidents: [
            { id: "INC-101", type: "system", title: "Ticketing Synced", desc: "All gate reader systems online.", severity: "clear", time: "Now" },
            { id: "INC-102", type: "system", title: "Weather Update", desc: "Temps holding at 24°C, 0% rain.", severity: "clear", time: "Now" }
        ],
        alertsStatus: "NO INCIDENTS",
        alertsStatusClass: "bg-cyber-emeraldDim text-cyber-emerald border-cyber-emerald/40",
        mapState: {
            heatColors: {
                north: 'rgba(16, 185, 129, 0.2)',
                east: 'rgba(16, 185, 129, 0.2)',
                south: 'rgba(16, 185, 129, 0.2)',
                west: 'rgba(16, 185, 129, 0.2)',
                concourse: 'rgba(16, 185, 129, 0.15)',
                gateC: 'rgba(16, 185, 129, 0.3)',
                gateG: 'rgba(16, 185, 129, 0.3)'
            },
            showAccessibilityRoute: false,
            showRainOverlay: false,
            warningNode: null
        },
        chartData: [45, 52, 60, 58, 55, 52, 48, 55]
    },
    halftime: {
        label: "Halftime Concourse Surge",
        metrics: {
            density: ["2.4/m²", "3.2/m²", "3.9/m²", "2.1/m²"],
            densityClass: ["bg-cyber-amberDim text-cyber-amber", "bg-cyber-amberDim text-cyber-amber", "bg-cyber-roseDim text-cyber-rose", "bg-cyber-emeraldDim text-cyber-emerald"],
            flow: ["92.1%", "84.2%", "71.5%", "94.8%"],
            flowClass: ["bg-cyber-emeraldDim text-cyber-emerald", "bg-cyber-amberDim text-cyber-amber", "bg-cyber-roseDim text-cyber-rose", "bg-cyber-emeraldDim text-cyber-emerald"],
            energy: ["2.2 MW", "2.4 MW", "2.5 MW", "1.9 MW"],
            energySaving: ["-6% SAVINGS", "-4% SAVINGS", "-2% SAVINGS", "-12% SAVINGS"],
            volunteers: ["342 / 450", "410 / 450", "438 / 450", "320 / 450"],
            volunteersClass: ["bg-cyber-cyanDim text-cyber-cyan", "bg-cyber-cyanDim text-cyber-cyan", "bg-cyber-cyanDim text-cyber-cyan", "bg-zinc-800 text-zinc-400"]
        },
        narrator: [
            "**[T+0m - Reality]** Halftime whistle blows. Seating zones discharge 25,000 visitors into the North and East concourse lanes within 90 seconds. Concessions report queue times ascending to 6 minutes.",
            "**[T+5m - Prediction]** *Concession Agent* anticipates overloading at Food Courts 4, 5, and 8. The AI starts pushing contextual, personalized mobile deals ('15% off at West Concourse') to users moving near the center to distribute crowd weight.",
            "**[T+10m - Prediction]** **CRITICAL CONGESTION RISK** concourse density projected to reach 3.9/m² at Sector 112. The *Volunteer Agent* is triggered, generating micro-missions instructing 18 nearby volunteers to establish physical lane dividers.",
            "**[T+30m - Prediction]** Second half begins. Audiences return to seats. Concourse clear, custodial robots dispatched to high-waste zones by the *Waste Agent* before litter accumulates."
        ],
        negotiations: [
            "[Food Agent] -> [Crowd Agent]: Halftime concession queues rising. Dynamic discount codes active.",
            "[Crowd Agent] -> [Volunteer Agent]: Requesting physical flow dividers at Concourse sector 112.",
            "[Volunteer Agent] -> [Field Volunteers]: 18 volunteers dispatched to sector 112 coordinate.",
            "[Waste Agent] -> [Facilities]: Scheduled custodial bots to Concourse A and D."
        ],
        incidents: [
            { id: "INC-201", type: "warning", title: "Concourse Surge", desc: "Density exceeding comfort levels in Sector 112.", severity: "warning", time: "Now" },
            { id: "INC-202", type: "system", title: "Dynamic Routing", desc: "Fans diverted to under-capacity West Concourse.", severity: "clear", time: "Now" }
        ],
        alertsStatus: "1 WARNING ACTIVE",
        alertsStatusClass: "bg-cyber-amberDim text-cyber-amber border-cyber-amber/40",
        mapState: {
            heatColors: {
                north: 'rgba(245, 158, 11, 0.4)',
                east: 'rgba(244, 63, 94, 0.6)',
                south: 'rgba(16, 185, 129, 0.2)',
                west: 'rgba(16, 185, 129, 0.2)',
                concourse: 'rgba(245, 158, 11, 0.5)',
                gateC: 'rgba(16, 185, 129, 0.3)',
                gateG: 'rgba(16, 185, 129, 0.3)'
            },
            showAccessibilityRoute: false,
            showRainOverlay: false,
            warningNode: 'concourseEast'
        },
        chartData: [45, 85, 120, 110, 95, 60, 48, 45]
    },
    rain: {
        label: "Sudden Rainstorm Egress",
        metrics: {
            density: ["2.1/m²", "3.8/m²", "4.5/m²", "1.8/m²"],
            densityClass: ["bg-cyber-amberDim text-cyber-amber", "bg-cyber-roseDim text-cyber-rose", "bg-cyber-roseDim text-cyber-rose", "bg-cyber-emeraldDim text-cyber-emerald"],
            flow: ["90.5%", "78.4%", "62.1%", "95.1%"],
            flowClass: ["bg-cyber-emeraldDim text-cyber-emerald", "bg-cyber-amberDim text-cyber-amber", "bg-cyber-roseDim text-cyber-rose", "bg-cyber-emeraldDim text-cyber-emerald"],
            energy: ["2.6 MW", "2.8 MW", "2.9 MW", "2.0 MW"],
            energySaving: ["-2% SAVINGS", "-1% SAVINGS", "+5% SURGE", "-8% SAVINGS"],
            volunteers: ["360 / 450", "430 / 450", "448 / 450", "310 / 450"],
            volunteersClass: ["bg-cyber-cyanDim text-cyber-cyan", "bg-cyber-cyanDim text-cyber-cyan", "bg-cyber-cyanDim text-cyber-cyan", "bg-zinc-800 text-zinc-400"]
        },
        narrator: [
            "**[T+0m - Reality]** Sudden precipitation starts. Outdoor seats begin rapid evacuation towards covered concourses. The *Weather Agent* flags wet slip-hazard conditions on exposed stairways.",
            "**[T+5m - Prediction]** Heavy crowding predicted at central concourses. Indoor lighting adjustments are made automatically to improve visibility. Dynamic messaging signs switch to 'STAY IN SHELTER' to throttle stairwell flow.",
            "**[T+10m - Prediction]** **SEVERE PRESSURE POINT** detected at North Gate staircase. Friction coefficients dropping due to wet steps. Volunteer teams dispatched with absorbent floor mats and physical guide rope structures.",
            "**[T+30m - Prediction]** Egress flow stabilizing. Seating zone covers deployed. Drainage sensor grids confirm zero localized pooling. Heating nodes activated in open concourses to dry visitor vectors."
        ],
        negotiations: [
            "[Weather Agent] -> [Core]: Rain began. Exposed sectors discharging. Slippage warnings active.",
            "[Energy Agent] -> [Facilities]: Powering up concourse heating, dynamic signage, and drainage pumps.",
            "[Crowd Agent] -> [Volunteer Agent]: Requesting deployment of safety teams to North stairs.",
            "[Volunteer Agent] -> [Field Volunteers]: Safety details dispatched with non-slip equipment."
        ],
        incidents: [
            { id: "INC-301", type: "danger", title: "Heavy Rainstorm", desc: "Exposed seating discharging. Wet stairways in North.", severity: "danger", time: "Now" },
            { id: "INC-302", type: "warning", title: "Stairwell Danger", desc: "High density & slip risk on North staircase.", severity: "warning", time: "Now" }
        ],
        alertsStatus: "2 INCIDENTS ACTIVE",
        alertsStatusClass: "bg-cyber-roseDim text-cyber-rose border-cyber-rose/40",
        mapState: {
            heatColors: {
                north: 'rgba(244, 63, 94, 0.7)',
                east: 'rgba(245, 158, 11, 0.4)',
                south: 'rgba(16, 185, 129, 0.2)',
                west: 'rgba(16, 185, 129, 0.2)',
                concourse: 'rgba(244, 63, 94, 0.5)',
                gateC: 'rgba(16, 185, 129, 0.3)',
                gateG: 'rgba(16, 185, 129, 0.3)'
            },
            showAccessibilityRoute: false,
            showRainOverlay: true,
            warningNode: 'sectorNorth'
        },
        chartData: [45, 90, 140, 115, 80, 50, 48, 45]
    },
    transit: {
        label: "Metro Egress Outage",
        metrics: {
            density: ["1.3/m²", "2.8/m²", "4.1/m²", "1.9/m²"],
            densityClass: ["bg-cyber-emeraldDim text-cyber-emerald", "bg-cyber-amberDim text-cyber-amber", "bg-cyber-roseDim text-cyber-rose", "bg-cyber-emeraldDim text-cyber-emerald"],
            flow: ["95.4%", "81.2%", "58.4%", "93.2%"],
            flowClass: ["bg-cyber-emeraldDim text-cyber-emerald", "bg-cyber-amberDim text-cyber-amber", "bg-cyber-roseDim text-cyber-rose", "bg-cyber-emeraldDim text-cyber-emerald"],
            energy: ["2.0 MW", "2.1 MW", "2.3 MW", "1.7 MW"],
            energySaving: ["-10% SAVINGS", "-11% SAVINGS", "-12% SAVINGS", "-16% SAVINGS"],
            volunteers: ["320 / 450", "390 / 450", "425 / 450", "350 / 450"],
            volunteersClass: ["bg-cyber-cyanDim text-cyber-cyan", "bg-cyber-cyanDim text-cyber-cyan", "bg-cyber-cyanDim text-cyber-cyan", "bg-zinc-800 text-zinc-400"]
        },
        narrator: [
            "**[T+0m - Reality]** The *Transportation Agent* reports a 20-minute signal failure delay on the Metro East Line. 8,000 exiting fans are currently walking towards the transit station platform.",
            "**[T+5m - Prediction]** Platform projected to reach dangerous capacity overload in 7 minutes. Dynamic signage at East Gates is instantly modified to hold egress. Transit ticketing systems temporarily freeze barcode releases.",
            "**[T+10m - Prediction]** **PLATFORM OVERCROWDING AVOIDANCE**: Stadium Pulse initiates holding patterns. Dynamic billboards broadcast live entertainment highlights inside the concourses. Commuters are routed towards Parking Lot Shuttle hubs.",
            "**[T+30m - Prediction]** Metro signals restored. Transportation Agent releases queued transit tickets incrementally, feeding passengers at a rate matching train capacity exactly."
        ],
        negotiations: [
            "[Transport Agent] -> [Core]: Metro East signaling failure detected. Egress blockage imminent.",
            "[Transport Agent] -> [Crowd Agent]: Requested ticket release delay and pedestrian throttling at East Gate.",
            "[Crowd Agent] -> [Facilities]: Active screen adjustments to hold exit surge. Dynamic discount alerts.",
            "[Transport Agent] -> [Bus Agent]: Initiated backup shuttle loops to Parking Lots X and Y."
        ],
        incidents: [
            { id: "INC-401", type: "warning", title: "Metro Line Failure", desc: "Metro East trains delayed by 20 minutes.", severity: "warning", time: "Now" },
            { id: "INC-402", type: "system", title: "Holding Action Active", desc: "Signage holding fans inside concourse hubs.", severity: "clear", time: "Now" }
        ],
        alertsStatus: "1 TRANSIT WARNING",
        alertsStatusClass: "bg-cyber-amberDim text-cyber-amber border-cyber-amber/40",
        mapState: {
            heatColors: {
                north: 'rgba(16, 185, 129, 0.2)',
                east: 'rgba(245, 158, 11, 0.4)',
                south: 'rgba(16, 185, 129, 0.2)',
                west: 'rgba(16, 185, 129, 0.2)',
                concourse: 'rgba(16, 185, 129, 0.2)',
                gateC: 'rgba(244, 63, 94, 0.6)',
                gateG: 'rgba(16, 185, 129, 0.3)'
            },
            showAccessibilityRoute: false,
            showRainOverlay: false,
            warningNode: 'transitHub'
        },
        chartData: [45, 70, 95, 130, 110, 85, 60, 45]
    },
    medical: {
        label: "Accessibility Emergency (Sec 108)",
        metrics: {
            density: ["1.2/m²", "2.1/m²", "2.8/m²", "1.4/m²"],
            densityClass: ["bg-cyber-emeraldDim text-cyber-emerald", "bg-cyber-amberDim text-cyber-amber", "bg-cyber-amberDim text-cyber-amber", "bg-cyber-emeraldDim text-cyber-emerald"],
            flow: ["96.1%", "90.2%", "81.4%", "95.6%"],
            flowClass: ["bg-cyber-emeraldDim text-cyber-emerald", "bg-cyber-emeraldDim text-cyber-emerald", "bg-cyber-amberDim text-cyber-amber", "bg-cyber-emeraldDim text-cyber-emerald"],
            energy: ["2.0 MW", "2.1 MW", "2.1 MW", "1.8 MW"],
            energySaving: ["-10% SAVINGS", "-11% SAVINGS", "-11% SAVINGS", "-14% SAVINGS"],
            volunteers: ["330 / 450", "410 / 450", "425 / 450", "320 / 450"],
            volunteersClass: ["bg-cyber-cyanDim text-cyber-cyan", "bg-cyber-cyanDim text-cyber-cyan", "bg-cyber-cyanDim text-cyber-cyan", "bg-zinc-800 text-zinc-400"]
        },
        narrator: [
            "**[T+0m - Reality]** A cardiac emergency is flagged in Section 108. An elevator failure at Section 120 blocks the default paramedic wheelchair evacuation route.",
            "**[T+5m - Prediction]** Medical response transit bottleneck identified. The *Accessibility Agent* calculates alternative trajectories, dynamically rerouting paramedics through Ramp C, avoiding the stairs.",
            "**[T+10m - Prediction]** **EMERGENCY PATHWAY ACTIVATION**: Visual panels and floor lights illuminate the alternative pathway. The *Volunteer Agent* dispatches 5 nearby helpers to secure Section 108 clearance.",
            "**[T+30m - Prediction]** Patient safely evacuated to the local medical bay. Elevator repair crews dispatched. Seating stands flow metrics restored."
        ],
        negotiations: [
            "[Medical Agent] -> [Core]: Cardiac event detected at Sector 108, Row 12.",
            "[Accessibility Agent] -> [Facilities]: Elevator E-2 outage confirmed. Calculating detour.",
            "[Accessibility Agent] -> [Medical Agent]: detouring response via Concourse corridor B and Ramp C.",
            "[Volunteer Agent] -> [Field Volunteers]: Dispatched 5 volunteers to cordon corridor B."
        ],
        incidents: [
            { id: "INC-501", type: "danger", title: "Medical Emergency", desc: "Cardiac incident in Section 108.", severity: "danger", time: "Now" },
            { id: "INC-502", type: "warning", title: "Elevator Outage", desc: "Section 120 Elevator E-2 offline.", severity: "warning", time: "Now" }
        ],
        alertsStatus: "1 CRITICAL EMERGENCY",
        alertsStatusClass: "bg-cyber-roseDim text-cyber-rose border-cyber-rose/40",
        mapState: {
            heatColors: {
                north: 'rgba(16, 185, 129, 0.2)',
                east: 'rgba(16, 185, 129, 0.2)',
                south: 'rgba(244, 63, 94, 0.4)',
                west: 'rgba(16, 185, 129, 0.2)',
                concourse: 'rgba(16, 185, 129, 0.2)',
                gateC: 'rgba(16, 185, 129, 0.3)',
                gateG: 'rgba(16, 185, 129, 0.3)'
            },
            showAccessibilityRoute: true,
            showRainOverlay: false,
            warningNode: 'elevator120'
        },
        chartData: [45, 55, 62, 58, 52, 48, 46, 45]
    }
};

// --- RENDER DYNAMIC SVG STADIUM TWIN ---
function renderStadiumSVG() {
    const state = scenarioData[currentScenario].mapState;
    const colors = state.heatColors;

    const svg = `
    <svg viewBox="0 0 800 500" class="w-full h-full max-w-[650px] transition-all duration-500">
        <defs>
            <!-- Background Gradients -->
            <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#00f0ff" stop-opacity="0.05" />
                <stop offset="100%" stop-color="#09090b" stop-opacity="0" />
            </radialGradient>
            
            <linearGradient id="cyberGreen" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#10b981" />
                <stop offset="100%" stop-color="#059669" />
            </linearGradient>

            <!-- Flow Arrow Path Pattern -->
            <pattern id="flowLines" width="20" height="20" patternUnits="userSpaceOnUse">
                <line x1="0" y1="10" x2="20" y2="10" stroke="#00f0ff" stroke-width="2" stroke-dasharray="4,4" />
            </pattern>
        </defs>

        <!-- Glow underlay -->
        <rect width="800" height="500" fill="url(#bgGlow)" />

        <!-- Stadium Outer Ring / Parking & Transit Outer limits -->
        <circle cx="400" cy="230" r="220" fill="none" stroke="#27272a" stroke-width="2" stroke-dasharray="8,8" />
        
        <!-- Parking / Transit Area Node -->
        <g id="transitHub" class="cursor-pointer group">
            <circle cx="650" cy="120" r="24" fill="#18181b" stroke="${state.warningNode === 'transitHub' ? '#f43f5e' : '#27272a'}" stroke-width="2" class="transition-colors duration-500" />
            <circle cx="650" cy="120" r="20" fill="rgba(0, 240, 255, 0.05)" />
            <path d="M 642 120 L 658 120 M 650 112 L 650 128" stroke="#71717a" stroke-width="2" />
            <text x="650" y="154" fill="#a1a1aa" font-size="10" font-family="JetBrains Mono" text-anchor="middle" font-weight="bold">METRO TERMINAL</text>
            ${state.warningNode === 'transitHub' ? '<circle cx="650" cy="120" r="30" fill="none" stroke="#f43f5e" stroke-width="1.5" class="animate-ping" />' : ''}
        </g>

        <!-- Parking Lot Vector -->
        <g id="parkingLot" class="cursor-pointer">
            <circle cx="150" cy="120" r="24" fill="#18181b" stroke="#27272a" stroke-width="2" />
            <text x="150" y="124" fill="#71717a" font-size="12" font-family="JetBrains Mono" text-anchor="middle" font-weight="bold">P3</text>
            <text x="150" y="154" fill="#a1a1aa" font-size="10" font-family="JetBrains Mono" text-anchor="middle" font-weight="bold">SHUTTLE HUB</text>
        </g>

        <!-- Weather Overlay (Rains) -->
        ${state.showRainOverlay ? `
        <g opacity="0.3">
            <line x1="100" y1="20" x2="80" y2="480" stroke="#00f0ff" stroke-width="1.5" stroke-dasharray="10,20" class="animate-rain" />
            <line x1="250" y1="20" x2="230" y2="480" stroke="#00f0ff" stroke-width="1.5" stroke-dasharray="10,20" class="animate-rain" />
            <line x1="400" y1="20" x2="380" y2="480" stroke="#00f0ff" stroke-width="1.5" stroke-dasharray="10,20" class="animate-rain" />
            <line x1="550" y1="20" x2="530" y2="480" stroke="#00f0ff" stroke-width="1.5" stroke-dasharray="10,20" class="animate-rain" />
            <line x1="700" y1="20" x2="680" y2="480" stroke="#00f0ff" stroke-width="1.5" stroke-dasharray="10,20" class="animate-rain" />
        </g>
        ` : ''}

        <!-- Concourse Outer Shell -->
        <ellipse cx="400" cy="230" rx="180" ry="140" fill="${colors.concourse}" stroke="#3f3f46" stroke-width="3" class="transition-all duration-500" />

        <!-- Stadium Seating Stands (4 Sectors) -->
        <!-- North Stand -->
        <path d="M 280 130 C 350 90, 450 90, 520 130 L 490 160 C 440 130, 360 130, 310 160 Z" 
              fill="${colors.north}" stroke="${state.warningNode === 'sectorNorth' ? '#f43f5e' : '#3f3f46'}" stroke-width="2" class="transition-all duration-500 cursor-pointer hover:opacity-80" />
        <text x="400" y="115" fill="#ffffff" font-size="11" font-family="JetBrains Mono" text-anchor="middle" font-weight="bold">NORTH STAND</text>

        <!-- East Stand -->
        <path d="M 540 150 C 600 200, 600 260, 540 310 L 510 280 C 550 250, 550 210, 510 180 Z" 
              fill="${colors.east}" stroke="#3f3f46" stroke-width="2" class="transition-all duration-500 cursor-pointer hover:opacity-80" />
        <text x="580" y="235" fill="#ffffff" font-size="11" font-family="JetBrains Mono" text-anchor="middle" font-weight="bold">EAST STAND</text>

        <!-- South Stand -->
        <path d="M 280 330 C 350 370, 450 370, 520 330 L 490 300 C 440 330, 360 330, 310 300 Z" 
              fill="${colors.south}" stroke="#3f3f46" stroke-width="2" class="transition-all duration-500 cursor-pointer hover:opacity-80" />
        <text x="400" y="355" fill="#ffffff" font-size="11" font-family="JetBrains Mono" text-anchor="middle" font-weight="bold">SOUTH STAND</text>

        <!-- West Stand -->
        <path d="M 260 150 C 200 200, 200 260, 260 310 L 290 280 C 250 250, 250 210, 290 180 Z" 
              fill="${colors.west}" stroke="#3f3f46" stroke-width="2" class="transition-all duration-500 cursor-pointer hover:opacity-80" />
        <text x="220" y="235" fill="#ffffff" font-size="11" font-family="JetBrains Mono" text-anchor="middle" font-weight="bold">WEST STAND</text>

        <!-- Concourse East Risk Node -->
        ${state.warningNode === 'concourseEast' ? `
        <g>
            <circle cx="530" cy="230" r="18" fill="rgba(244, 63, 94, 0.2)" stroke="#f43f5e" stroke-width="2" class="animate-pulse" />
            <circle cx="530" cy="230" r="8" fill="#f43f5e" />
            <circle cx="530" cy="230" r="25" fill="none" stroke="#f43f5e" stroke-width="1" class="animate-ping" />
        </g>
        ` : ''}

        <!-- Pit Field (Green pitch) -->
        <rect x="330" y="180" width="140" height="100" rx="6" fill="#14532d" stroke="#16a34a" stroke-width="2" />
        <ellipse cx="400" cy="230" rx="30" ry="20" fill="none" stroke="#16a34a" stroke-width="1.5" />
        <line x1="400" y1="180" x2="400" y2="280" stroke="#16a34a" stroke-width="1.5" />

        <!-- GATES (Entry & Exit points) -->
        <!-- Gate A -->
        <circle cx="400" cy="70" r="8" fill="#27272a" stroke="#71717a" stroke-width="2" />
        <text x="400" y="58" fill="#a1a1aa" font-size="9" font-family="JetBrains Mono" text-anchor="middle">GATE A</text>

        <!-- Gate C (Transit side) -->
        <g>
            <circle cx="590" cy="180" r="8" fill="#27272a" stroke="${currentScenario === 'transit' ? '#f43f5e' : '#71717a'}" stroke-width="2" class="transition-colors duration-500" />
            <text x="615" y="183" fill="#a1a1aa" font-size="9" font-family="JetBrains Mono">GATE C</text>
        </g>

        <!-- Gate G -->
        <circle cx="210" cy="280" r="8" fill="#27272a" stroke="#71717a" stroke-width="2" />
        <text x="185" y="284" fill="#a1a1aa" font-size="9" font-family="JetBrains Mono">GATE G</text>

        <!-- Emergency Elevator Node -->
        <g id="elevator120" class="cursor-pointer">
            <rect x="295" y="285" width="16" height="16" rx="2" fill="#18181b" stroke="${state.warningNode === 'elevator120' ? '#f43f5e' : '#52525b'}" stroke-width="2" class="transition-colors duration-500" />
            <path d="M 300 293 L 303 290 L 306 293" fill="none" stroke="#a1a1aa" stroke-width="1.5" />
            <path d="M 300 295 L 303 298 L 306 295" fill="none" stroke="#a1a1aa" stroke-width="1.5" />
            ${state.warningNode === 'elevator120' ? '<circle cx="303" cy="293" r="14" fill="none" stroke="#f43f5e" stroke-width="1.5" class="animate-ping" />' : ''}
        </g>

        <!-- REROUTING PATHWAY / ACCESSIBILITY VECTORS -->
        ${state.showAccessibilityRoute ? `
        <!-- DETOUR PATH (Dashed blue glowing arrow) -->
        <g>
            <path id="detourPath" d="M 310 293 Q 320 310, 350 310 T 430 310 T 520 280" 
                  fill="none" stroke="#00f0ff" stroke-width="4" stroke-linecap="round" stroke-dasharray="8,8" class="animate-flow" />
            <text x="430" y="325" fill="#00f0ff" font-size="9" font-family="JetBrains Mono" font-weight="bold" text-anchor="middle">ACTIVE Detour Path (Dijkstra Bypass)</text>
        </g>
        ` : ''}

        <!-- Pedestrian Flow Vectors for Halftime / Transit scenario -->
        ${currentScenario === 'halftime' ? `
        <g>
            <!-- Routing arrows north and south -->
            <path d="M 520 180 Q 480 160, 440 170" fill="none" stroke="#f59e0b" stroke-width="3" stroke-linecap="round" stroke-dasharray="6,6" class="animate-flow" />
            <path d="M 530 280 Q 480 300, 440 290" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" stroke-dasharray="6,6" class="animate-flow" />
            <text x="490" y="150" fill="#f59e0b" font-size="9" font-family="JetBrains Mono" font-weight="bold" text-anchor="middle">Diverting 41% Vector North</text>
        </g>
        ` : ''}

        ${currentScenario === 'transit' ? `
        <g>
            <!-- Transit hold arrows -->
            <path d="M 530 230 Q 560 210, 580 185" fill="none" stroke="#f43f5e" stroke-width="3" stroke-linecap="round" stroke-dasharray="6,6" />
            <!-- Cross barrier -->
            <line x1="565" y1="180" x2="585" y2="200" stroke="#f43f5e" stroke-width="4" />
            <line x1="585" y1="180" x2="565" y2="200" stroke="#f43f5e" stroke-width="4" />
            <text x="530" y="160" fill="#f43f5e" font-size="9" font-family="JetBrains Mono" font-weight="bold" text-anchor="middle">GATE C PEDESTRIAN THRUPUT PAUSED</text>
        </g>
        ` : ''}

    </svg>
    `;
    document.getElementById('mapContainer').innerHTML = svg;
}

// --- INITIALIZE ECHARTS LOAD PREDICTOR ---
let chartInstance = null;

function renderChart() {
    const chartDom = document.getElementById('loadPredictorChart');
    if (!chartInstance) {
        chartInstance = echarts.init(chartDom);
    }
    
    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'axis',
            backgroundColor: '#18181b',
            borderColor: '#27272a',
            textStyle: {
                color: '#fafafa',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 11
            }
        },
        grid: {
            top: '10%',
            left: '5%',
            right: '5%',
            bottom: '5%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['T-15', 'T-10', 'T-5', 'Now', 'T+5', 'T+10', 'T+20', 'T+30'],
            axisLine: { lineStyle: { color: '#3f3f46' } },
            axisLabel: { color: '#71717a', fontSize: 10, fontFamily: 'JetBrains Mono' }
        },
        yAxis: {
            type: 'value',
            splitLine: { lineStyle: { color: '#1e1e24' } },
            axisLabel: { color: '#71717a', fontSize: 10, fontFamily: 'JetBrains Mono' }
        },
        series: [{
            name: 'Vector Density Load (Index)',
            data: scenarioData[currentScenario].chartData,
            type: 'line',
            smooth: true,
            symbolSize: 6,
            lineStyle: {
                color: '#00f0ff',
                width: 2.5,
                shadowBlur: 8,
                shadowColor: 'rgba(0, 240, 255, 0.4)'
            },
            itemStyle: {
                color: '#00f0ff'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgba(0, 240, 255, 0.25)' },
                    { offset: 1, color: 'rgba(0, 240, 255, 0)' }
                ])
            }
        }]
    };
    
    chartInstance.setOption(option);
}

// --- UPDATE UI PANELS ON STATE CHANGE ---
function updateDashboard() {
    const data = scenarioData[currentScenario];
    
    // Update Header active label
    document.getElementById('activeScenarioLabel').textContent = data.label;
    
    // Update KPIs
    document.getElementById('kpiDensity').innerHTML = `${data.metrics.density[currentTimelineStep]}<span class="text-sm font-normal text-zinc-400">/m²</span>`;
    
    // Update KPI 1 Trend badge
    const densityTrend = document.getElementById('kpiDensityTrend');
    densityTrend.textContent = getDensityTrendText(data.metrics.density[currentTimelineStep]);
    densityTrend.className = `text-xs px-2 py-0.5 rounded-full font-mono font-semibold ${data.metrics.densityClass[currentTimelineStep]}`;

    // Update KPI 2
    document.getElementById('kpiFlow').textContent = data.metrics.flow[currentTimelineStep];
    const flowTrend = document.getElementById('kpiFlowTrend');
    flowTrend.textContent = getFlowTrendText(data.metrics.flow[currentTimelineStep]);
    flowTrend.className = `text-xs px-2 py-0.5 rounded-full font-mono font-semibold ${data.metrics.flowClass[currentTimelineStep]}`;

    // Update KPI 3
    document.getElementById('kpiEnergy').textContent = data.metrics.energy[currentTimelineStep];
    const energyTrend = document.getElementById('kpiEnergyTrend');
    energyTrend.textContent = data.metrics.energySaving[currentTimelineStep];

    // Update KPI 4
    document.getElementById('kpiVolunteers').textContent = data.metrics.volunteers[currentTimelineStep];
    const volTrend = document.getElementById('kpiVolunteersTrend');
    volTrend.className = `text-xs px-2 py-0.5 rounded-full font-mono font-semibold ${data.metrics.volunteersClass[currentTimelineStep]}`;

    // Update Storyteller Narrator (using formatted markdown/HTML)
    const narratorEl = document.getElementById('storytellerNarrator');
    narratorEl.innerHTML = '';
    
    // Render all narrative items up to current timeline step
    for (let i = 0; i <= currentTimelineStep; i++) {
        const p = document.createElement('p');
        p.className = i === currentTimelineStep ? 'text-cyber-cyan font-semibold border-l-2 border-cyber-cyan pl-2 py-1' : 'text-zinc-400';
        p.innerHTML = formatMarkdown(data.narrator[i]);
        narratorEl.appendChild(p);
    }
    narratorEl.scrollTop = narratorEl.scrollHeight;

    // Update Agent Negotiation logs
    const negotiationEl = document.getElementById('agentNegotiationFeed');
    negotiationEl.innerHTML = '';
    data.negotiations.forEach(log => {
        const div = document.createElement('div');
        div.className = 'border-b border-zinc-800 pb-1.5 hover:bg-zinc-800/40 p-1 rounded transition-colors';
        div.innerHTML = colorizeLog(log);
        negotiationEl.appendChild(div);
    });
    negotiationEl.scrollTop = negotiationEl.scrollHeight;

    // Update Incident panel
    const incidentEl = document.getElementById('incidentLogs');
    incidentEl.innerHTML = '';
    
    const alertCountBadge = document.getElementById('alertCount');
    alertCountBadge.textContent = data.alertsStatus;
    alertCountBadge.className = `text-xs font-mono border px-2 py-0.5 rounded font-bold uppercase ${data.alertsStatusClass}`;

    data.incidents.forEach(inc => {
        const item = document.createElement('div');
        let sevClass = '';
        let icon = 'info';
        
        if (inc.severity === 'danger') {
            sevClass = 'border-cyber-rose/30 bg-cyber-roseDim text-cyber-rose';
            icon = 'shield-alert';
        } else if (inc.severity === 'warning') {
            sevClass = 'border-cyber-amber/30 bg-cyber-amberDim text-cyber-amber';
            icon = 'alert-triangle';
        } else {
            sevClass = 'border-zinc-800 bg-zinc-900/60 text-zinc-300';
            icon = 'check-circle';
        }
        
        item.className = `border rounded-lg p-3 ${sevClass} flex gap-3 text-xs`;
        item.innerHTML = `
            <div class="mt-0.5"><i data-lucide="${icon}" class="w-4 h-4"></i></div>
            <div class="flex-1">
                <div class="font-bold flex justify-between">
                    <span>${inc.title}</span>
                    <span class="text-[10px] opacity-60 font-mono">${inc.time}</span>
                </div>
                <p class="opacity-80 mt-1 font-mono">${inc.desc}</p>
            </div>
        `;
        incidentEl.appendChild(item);
    });
    lucide.createIcons();

    // Render Stadium Map
    renderStadiumSVG();

    // Render charts
    renderChart();
}

// Helpers to dynamically resolve status based on metrics
function getDensityTrendText(densityStr) {
    const val = parseFloat(densityStr);
    if (val > 3.5) return 'SEVERE';
    if (val > 2.5) return 'WARNING';
    if (val > 1.5) return 'HEAVY';
    return 'OPTIMAL';
}

function getFlowTrendText(flowStr) {
    const val = parseFloat(flowStr);
    if (val < 70) return 'BLOCKED';
    if (val < 85) return 'RESTRICTED';
    return 'STABLE';
}

// Markdown Formatter (Bold parsing)
function formatMarkdown(text) {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-extrabold">$1</strong>');
}

// Colorize Logs for futuristic display
function colorizeLog(log) {
    return log
        .replace(/\[System\]/g, '<span class="text-zinc-500 font-bold">[System]</span>')
        .replace(/\[Weather Agent\]/g, '<span class="text-sky-400 font-bold">[Weather Agent]</span>')
        .replace(/\[Energy Agent\]/g, '<span class="text-yellow-400 font-bold">[Energy Agent]</span>')
        .replace(/\[Crowd Agent\]/g, '<span class="text-cyber-cyan font-bold">[Crowd Agent]</span>')
        .replace(/\[Accessibility Agent\]/g, '<span class="text-purple-400 font-bold">[Accessibility Agent]</span>')
        .replace(/\[Volunteer Agent\]/g, '<span class="text-pink-400 font-bold">[Volunteer Agent]</span>')
        .replace(/\[Transport Agent\]/g, '<span class="text-emerald-400 font-bold">[Transport Agent]</span>')
        .replace(/\[Medical Agent\]/g, '<span class="text-cyber-rose font-bold">[Medical Agent]</span>')
        .replace(/\[Waste Agent\]/g, '<span class="text-amber-500 font-bold">[Waste Agent]</span>')
        .replace(/->/g, '<span class="text-zinc-500 font-extrabold">→</span>');
}

// --- INTERACTIVE EVENT LISTENERS ---
// Scenario Buttons
document.querySelectorAll('.scenario-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const targetBtn = e.currentTarget;
        document.querySelectorAll('.scenario-btn').forEach(b => {
            b.className = 'scenario-btn flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-mono font-bold uppercase tracking-wider border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all';
        });
        targetBtn.className = 'scenario-btn active-btn flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-mono font-bold uppercase tracking-wider border transition-all';
        
        currentScenario = targetBtn.dataset.scenario;
        
        // Reset slider to Reality when changing scenario
        currentTimelineStep = 0;
        document.getElementById('timelineRange').value = 0;
        updateTimelineLabel();
        
        updateDashboard();
    });
});

// Timeline Slider
const timelineRange = document.getElementById('timelineRange');
timelineRange.addEventListener('input', (e) => {
    currentTimelineStep = parseInt(e.target.value);
    updateTimelineLabel();
    updateDashboard();
});

// Timeline Markers
document.querySelectorAll('.timeline-marker').forEach(marker => {
    marker.addEventListener('click', (e) => {
        const step = parseInt(e.currentTarget.dataset.step);
        currentTimelineStep = step;
        timelineRange.value = step;
        updateTimelineLabel();
        updateDashboard();
    });
});

function updateTimelineLabel() {
    const labels = ["T+0: REALITY STATE", "T+5m: IMAGINED FUTURE", "T+10m: CRITICAL FUTURE", "T+30m: MITIGATED STATE"];
    document.getElementById('timelineLabel').textContent = labels[currentTimelineStep];
    
    // Highlight active timeline marker text
    document.querySelectorAll('.timeline-marker').forEach((marker, idx) => {
        if (idx === currentTimelineStep) {
            marker.classList.add('active-marker');
            marker.classList.remove('text-zinc-500');
            marker.classList.add('text-cyber-cyan');
        } else {
            marker.classList.remove('active-marker');
            marker.classList.add('text-zinc-500');
            marker.classList.remove('text-cyber-cyan');
        }
    });
}

// --- NEURAL NETWORK CANVAS ANIMATION ---
const canvas = document.getElementById('neuralCanvas');
const ctx = canvas.getContext('2d');

let points = [];
const maxPoints = 50;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initPoints();
}

function initPoints() {
    points = [];
    for (let i = 0; i < maxPoints; i++) {
        points.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1
        });
    }
}

function drawNeuralNetwork() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#09090b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(0, 240, 255, 0.4)';
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.05)';

    for (let i = 0; i < points.length; i++) {
        let p = points[i];
        
        // Move points
        p.x += p.vx;
        p.y += p.vy;

        // Boundaries
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect nodes
        for (let j = i + 1; j < points.length; j++) {
            let p2 = points[j];
            let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < 120) {
                ctx.lineWidth = 1 - dist / 120;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(drawNeuralNetwork);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
drawNeuralNetwork();

// Initialize Dashboard Rendering
window.onload = () => {
    updateDashboard();
};
window.addEventListener('resize', () => {
    if (chartInstance) {
        chartInstance.resize();
    }
});
