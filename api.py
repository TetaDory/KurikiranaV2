from flask import Flask, jsonify

app = Flask(__name__)

# Dummy Data
data = {
    1: {"temperature": [22, 24, 21, 26, 23, 25, 27, 30, 45], "humidity": [60, 55, 70, 65, 80, 75, 85]},
    2: {"temperature": [28, 26, 29, 31, 30, 32, 33, 35, 38], "humidity": [75, 70, 80, 85, 90, 88, 82]},
}

@app.route('/api/item_data/<int:item_id>')
def get_item_data(item_id):
    if item_id in data:
        return jsonify(data[item_id])
    else:
        return jsonify({'error': 'Item not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)