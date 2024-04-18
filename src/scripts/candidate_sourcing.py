import networkx as nx
import random

class RecommendationSystem:
    def __init__(self, genres):
        self.graph = nx.Graph()
        self.user = 'user1'
        self.genres = genres
        self.counter = 0
        self.initialize_graph()
        self.normalize_weights()

    def initialize_graph(self):
        for genre in self.genres:
            self.graph.add_edge(self.user, genre, weight=1/len(self.genres))

    def make_recommendations(self):
        """
        Make recommendation of one random genre based on the graph probabilities

        return: str
        """
        # Calculate cumulative probabilities
        cumulative_probs = []
        cumulative_prob = 0
        for genre in self.genres:
            cumulative_prob += self.graph[self.user][genre]['weight']
            cumulative_probs.append((genre, cumulative_prob))

        # Select a random number between 0 and 1
        random_num = random.uniform(0, 1)

        # Find the genre corresponding to the random number
        for genre, prob in cumulative_probs:
            if random_num <= prob:
                return genre

    def update_preferences(self, genre, rating: bool):
        """
        Update the graph based on the user's rating keeping the weights normalized (sum of weights = 1)
        """
        # Update the weight based on user rating
        if rating:
            # Increase weight if user liked the recommendation
            self.graph[self.user][genre]['weight'] += 0.05
        else:
            # Decrease weight if user didn't like the recommendation
            self.graph[self.user][genre]['weight'] -= 0.05
        
        # Make sure weights are non-negative
        for genre in self.genres:
            if self.graph[self.user][genre]['weight'] < 0:
                self.graph[self.user][genre]['weight'] = 0
        
        # Normalize weights
        self.counter += 1
        self.normalize_weights()

    def normalize_weights(self):
        """
        Normalize the weights so that their sum equals 1
        """
        total_weight = sum(self.graph[self.user][genre]['weight'] for genre in self.genres)
        for genre in self.genres:
            self.graph[self.user][genre]['weight'] /= total_weight

    def print_graph(self):
        # Draw the graph
        import matplotlib.pyplot as plt
        pos = nx.spring_layout(self.graph)  # Positions for all nodes
        nx.draw(self.graph, pos, with_labels=True, node_size=3000, node_color='skyblue', font_size=10, font_weight='bold')
        # Draw edge labels
        labels = nx.get_edge_attributes(self.graph, 'weight')
        nx.draw_networkx_edge_labels(self.graph, pos, edge_labels=labels)
        # Show plot
        plt.show()

# Example usage with more genres
genres = ['fiction', 'mystery', 'romance', 'science fiction', 'fantasy', 'thriller', 'horror', 'biography']

# Initialize the recommendation system
rec_sys = RecommendationSystem(genres)

# Print the graph visually
rec_sys.print_graph()

# Make recommendations
while True:
    recommendation = rec_sys.make_recommendations()
    print("Recommendation:", recommendation)
    rating = input("Did you like the recommendation? (y/n): ")
    rec_sys.update_preferences(recommendation, rating == 'y')
    rec_sys.print_graph()
