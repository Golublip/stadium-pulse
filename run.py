import http.server
import socketserver
import webbrowser
import threading
import time
import sys
import os

PORT = int(os.environ.get("PORT", 8000))
IS_CONTAINER = os.environ.get("K_SERVICE") is not None
DIRECTORY = "."

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

def start_server():
    # Allow quick reuse of the port
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"\n[STADIUM PULSE] Server successfully started at http://localhost:{PORT}")
        print("[STADIUM PULSE] Press Ctrl+C to terminate the simulator.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n[STADIUM PULSE] Server terminated.")
            sys.exit(0)

def open_browser():
    # Wait 1 second for server to initialize
    time.sleep(1.0)
    url = f"http://localhost:{PORT}/index.html"
    print(f"[STADIUM PULSE] Launching simulator interface: {url}")
    webbrowser.open(url)

if __name__ == "__main__":
    print("=" * 60)
    print("STADIUM PULSE — THE LIVING COGNITIVE STADIUM COHESION SYSTEM")
    print("=" * 60)
    print("[STADIUM PULSE] Initializing neural model simulation Twin...")
    
    # Run browser launcher in separate thread if not in container
    if not IS_CONTAINER:
        threading.Thread(target=open_browser, daemon=True).start()
    
    # Run HTTP Server
    start_server()
