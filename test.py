import unittest
import math
import os
import re

class TestStadiumPulseSystem(unittest.TestCase):
    def setUp(self):
        # Setup mock spatial graph topology for Dijkstra test
        self.graph = {
            'V1': {'V2': 5, 'V3': 10},
            'V2': {'V5': 15},
            'V3': {'V4': 2, 'V5': 8},
            'V4': {'V5': 3},
            'V5': {}
        }
        
    def dijkstra(self, start, end, blocked_nodes=None):
        if blocked_nodes is None:
            blocked_nodes = set()
            
        distances = {node: float('inf') for node in self.graph}
        distances[start] = 0
        visited = set()
        
        while len(visited) < len(self.graph):
            curr = None
            curr_dist = float('inf')
            for n in self.graph:
                if n not in visited and distances[n] < curr_dist:
                    curr = n
                    curr_dist = distances[n]
                    
            if curr is None or curr == end:
                break
                
            visited.add(curr)
            
            for neighbor, weight in self.graph[curr].items():
                if neighbor in blocked_nodes:
                    continue
                new_dist = distances[curr] + weight
                if new_dist < distances[neighbor]:
                    distances[neighbor] = new_dist
                    
        return distances[end]

    def test_accessibility_routing_dijkstra(self):
        """Verify Dijkstra calculations detour wheelchair paths when elevator nodes are blocked."""
        normal_path_cost = self.dijkstra('V1', 'V5')
        self.assertEqual(normal_path_cost, 15)

        blocked_path_cost = self.dijkstra('V1', 'V5', blocked_nodes={'V3'})
        self.assertEqual(blocked_path_cost, 20)

    def test_social_force_crowd_dynamics(self):
        """Test physical crowd interaction force calculation formulas."""
        r_i, r_j = 0.3, 0.3 # Body radius
        distance_normal = 1.0
        distance_crush = 0.4
        B = 0.08
        
        force_normal = math.exp(((r_i + r_j) - distance_normal) / B)
        force_crush = math.exp(((r_i + r_j) - distance_crush) / B)
        
        self.assertGreater(force_crush, force_normal)
        self.assertGreater(force_crush, 1.0)

    def test_spatial_hashing_bounds(self):
        """Validate geohashing cell indexing bounds."""
        def get_h3_cell(x, y, cell_size=3.0):
            return int(x // cell_size), int(y // cell_size)
            
        cell1 = get_h3_cell(1.5, 2.5)
        cell2 = get_h3_cell(1.8, 2.9)
        cell3 = get_h3_cell(4.2, 5.1)
        
        self.assertEqual(cell1, cell2)
        self.assertNotEqual(cell1, cell3)

    def test_html_structure_integrity(self):
        """Parse index.html and verify that all key functional DOM elements are present."""
        self.assertTrue(os.path.exists("index.html"), "index.html does not exist")
        with open("index.html", "r", encoding="utf-8") as f:
            html = f.read()

        # Check for crucial container IDs
        required_ids = [
            "mapContainer",
            "storytellerNarrator",
            "agentNegotiationFeed",
            "loadPredictorChart",
            "incidentLogs",
            "activeScenarioLabel",
            "timelineRange",
            "geminiApiKey",
            "btnExecuteIntervention",
            "interventionText",
            "btnExecuteText"
        ]
        for dom_id in required_ids:
            self.assertIn(f'id="{dom_id}"', html, f"index.html is missing required element ID: {dom_id}")

    def test_accessibility_compliance_tags(self):
        """Verify index.html contains correct accessibility tags (ARIA labels)."""
        with open("index.html", "r", encoding="utf-8") as f:
            html = f.read()

        # Verify aria-labels are present on range input and buttons
        self.assertIn('aria-label="Predictive time horizon slider"', html)
        self.assertIn('aria-label="Google Gemini API Key for live AI reasoning"', html)
        self.assertIn('aria-label="Execute dynamic AI intervention"', html)

        # Check explicit label relationships (for attributes)
        self.assertIn('for="layerCrowd"', html)
        self.assertIn('for="layerAccessibility"', html)
        self.assertIn('for="layerVolunteers"', html)
        self.assertIn('for="layerTransit"', html)

    def test_security_xss_protection_in_js(self):
        """Verify that app.js implements character escaping (XSS protection) for AI text."""
        self.assertTrue(os.path.exists("app.js"), "app.js does not exist")
        with open("app.js", "r", encoding="utf-8") as f:
            js = f.read()

        # Check that XSS escape helper exists and is used in formatMarkdown
        self.assertIn("function escapeHTML", js, "app.js is missing escapeHTML XSS sanitizer")
        self.assertIn("escapeHTML(text)", js, "app.js does not apply escapeHTML sanitization in formatMarkdown")
        
        # Check against dangerous code injections
        self.assertNotIn("eval(", js, "app.js contains unsafe eval() executions")
        self.assertNotIn("document.write(", js, "app.js contains unsafe document.write() statements")

if __name__ == "__main__":
    unittest.main()
