from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import firebase_admin
from firebase_admin import credentials, db
import networkx as nx
import random
from collections import defaultdict


class RecommendationSystem:
    def __init__(self, genres):
        self.graph = nx.Graph()
        self.user = 'user1'
        self.genres = genres
        self.counter = 0
        self.initialize_graph()
        self.normalize_weights()

    def __str__(self):
        str_rep = ''
        for genre in self.genres:
            str_rep += f'{genre}: {self.graph[self.user][genre]["weight"]}\n'
        return str_rep

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
        if rating and self.graph[self.user][genre]['weight'] < 0.8:
            # Increase weight if user liked the recommendation
            self.graph[self.user][genre]['weight'] += 0.05
        elif not rating and self.graph[self.user][genre]['weight'] > 0.2:
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


app = Flask(__name__)
CORS(app)

# Initialize Firebase Admin SDK
cred = credentials.Certificate('src/scripts/credentials.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://anywriter-a18d6-default-rtdb.europe-west1.firebasedatabase.app'
})
# Connect to the Firebase Realtime Database
works_ref = db.reference('works')
works = works_ref.get()

all_contents = []
for key, value in works.items():
    all_contents.append({'id': key, **value})

genres = [list(work_details.values())[1] for work_details in list(works.values())]
genres = list(set(genres))  

dct = defaultdict(list)

for (id, lst) in works.items():
    dct[list(lst.values())[1]].append(id)

print(dct)

rec_sys = RecommendationSystem(genres)

def send_feedback(genre, like):
    url = 'http://127.0.0.1:5000/recommendations'
    data = {'genre': genre, 'like': like}
    try:
        response = requests.post(url, json=data)
        if response.ok:
            print("Feedback sent successfully")
        else:
            print("Failed to send feedback")
    except Exception as e:
        print("Error:", e)

@app.route('/recommendations', methods=['GET', 'POST'])
def get_recommendations():
    if request.method == 'GET':
        ret =  random.choice(dct[rec_sys.make_recommendations()])
        print(ret)
        return jsonify(ret)
        # Assuming rec_sys is instantiated elsewhere in the code
        # recs = []
        # i = 0
        # while i < 5:
        #     rec = rec_sys.make_recommendations()
        #     if rec in recs:
        #         continue
        #     recs.append(rec)
        #     i += 1
        
        # return [random.choice(dct[elm]) for elm in recs]
            
    elif request.method == 'POST':
        data = request.get_json()
        genre = data.get('genre')
        like = data.get('like')
        if genre and like is not None:
            rec_sys.update_preferences(genre, like)
            print(rec_sys)
            return jsonify({'message': 'Feedback received and processed successfully'}), 200
        else:
            return jsonify({'error': 'Genre and like parameters are required in the request'}), 400



if __name__ == '__main__':
    app.run(debug=True)
