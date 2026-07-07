# Stadium Pulse — The Living Digital Twin of Every Fan

Stadium Pulse is an autonomous operating system designed for the FIFA World Cup 2026. By converting raw streams (CCTV, ticketing, weather, transport feeds) into anonymous spatial-temporal movement vectors, the platform simulates and predicts potential stadium congestions, safety issues, and operational bottlenecks before they happen.

## Project Structure

* **`stadium_pulse_architecture.md`**: Complete, production-grade systems architecture specification covering database design, multi-agent frameworks, prompt engineering logic, scaling strategies, and privacy safeguards.
* **`index.html`**: Interactive futuristic operator command console.
* **`app.js`**: Core state machine and scenario simulation controller.
* **`styles.css`**: futuristic dark-mode styling sheets, neon animations, and glassmorphism.
* **`run.py`**: Local web server wrapper that launches the interactive simulator dashboard in your default browser.

## How to Run the Simulator

1. Ensure you have Python installed on your system.
2. Run the startup script from your terminal:
   ```bash
   python run.py
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

## Demo Scenarios Supported

You can toggle between 5 critical situations on the footer console:
* **Base State**: Pre-match steady ingress.
* **Halftime Surge**: Halftime rush towards food and retail concessions (Sector 112 risk).
* **Sudden Rain**: Precipitation prompting seating evacuations, creating wet stairs hazards.
* **Transit Delay**: Metro East delays requiring dynamic egress holding controls.
* **Medical Emergency**: Detouring paramedics around a broken elevator at Sector 120.
