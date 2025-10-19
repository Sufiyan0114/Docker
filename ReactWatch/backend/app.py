from flask import Flask, jsonify, request, Response
from flask_cors import CORS
from prometheus_client import Counter, generate_latest, CONTENT_TYPE_LATEST

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Sample data
tasks = [
    {"id": 1, "title": "Learn DevOps"}
]

# Prometheus metrics
REQUEST_COUNT = Counter("request_count_total", "Total HTTP requests", ["method", "endpoint"])

@app.route('/tasks/', methods=['GET'])
def get_tasks():
    REQUEST_COUNT.labels(method="GET", endpoint="/tasks").inc()
    return jsonify(tasks)

@app.route('/tasks/', methods=['POST'])
def add_task():
    REQUEST_COUNT.labels(method="POST", endpoint="/tasks").inc()
    new_task = {
        "id": len(tasks) + 1,
        "title": request.json['title']
    }
    tasks.append(new_task)
    return jsonify(new_task), 201

# Metrics endpoint
@app.route("/metrics")
def metrics():
    return Response(generate_latest(), mimetype=CONTENT_TYPE_LATEST)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
