import unittest
import math

class TestStadiumPulseAlgorithms(unittest.TestCase):
    def setUp(self):
        # Setup mock spatial graph topology
        # Nodes: V1 (Sector 108), V2 (Concourse B), V3 (Elevator 120), V4 (Ramp C), V5 (Egress)
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
            # Find closest unvisited node
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
        """Verify Dijkstra calculations reroute wheelchairs correctly when elevator E-2 is offline."""
        # Under normal conditions, shortest path V1 -> V3 (elevator) -> V4 -> V5 is 10 + 2 + 3 = 15
        normal_path_cost = self.dijkstra('V1', 'V5')
        self.assertEqual(normal_path_cost, 15)

        # Elevator V3 is offline. Détour should calculate V1 -> V2 -> V5 with cost 5 + 15 = 20
        blocked_path_cost = self.dijkstra('V1', 'V5', blocked_nodes={'V3'})
        self.assertEqual(blocked_path_cost, 20)

    def test_social_force_dynamics(self):
        """Test physical crowd interaction force calculation formulas."""
        # Social Force Model formula: force = exp((radius - distance) / B)
        r_i, r_j = 0.3, 0.3 # 30cm body radius per person
        distance_normal = 1.0 # 1 meter separation
        distance_crush = 0.4  # 40cm separation (crowding)
        B = 0.08 # force scale
        
        force_normal = math.exp(((r_i + r_j) - distance_normal) / B)
        force_crush = math.exp(((r_i + r_j) - distance_crush) / B)
        
        # Verify force increases exponentially under high density
        self.assertGreater(force_crush, force_normal)
        self.assertGreater(force_crush, 1.0) # Signifies physical push forces

    def test_spatial_hashing_bounds(self):
        """Validate spatial geohashing calculations fit coordinate boundaries."""
        # Simple coordinate projection to 3mx3m cells
        def get_h3_cell(x, y, cell_size=3.0):
            return int(x // cell_size), int(y // cell_size)
            
        x1, y1 = 1.5, 2.5
        x2, y2 = 1.8, 2.9
        x3, y3 = 4.2, 5.1
        
        cell1 = get_h3_cell(x1, y1)
        cell2 = get_h3_cell(x2, y2)
        cell3 = get_h3_cell(x3, y3)
        
        self.assertEqual(cell1, cell2) # Same H3 cell
        self.assertNotEqual(cell1, cell3) # Different cells

if __name__ == "__main__":
    unittest.main()
