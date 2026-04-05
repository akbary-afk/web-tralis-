import os
from flask import Flask, render_template, request, jsonify
from werkzeug.middleware.dispatcher import DispatcherMiddleware
from werkzeug.serving import run_simple

app = Flask(__name__)
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "nusantara-secret!")

# Store messages in memory (for demo purposes)
messages = []

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/materi")
def materi():
    return render_template("materi.html")

@app.route("/video")
def video():
    return render_template("video.html")

@app.route("/quiz")
def quiz():
    return render_template("quiz.html")

@app.route("/chat")
def chat():
    return render_template("chat.html")

@app.route("/api/messages", methods=["GET"])
def get_messages():
    return jsonify(messages)

@app.route("/api/messages", methods=["POST"])
def send_message():
    data = request.get_json()
    if data and "message" in data and "user" in data:
        message_data = {
            "user": data["user"],
            "message": data["message"],
            "timestamp": data.get("timestamp", "")
        }
        messages.append(message_data)
        # Keep only last 50 messages
        if len(messages) > 50:
            messages.pop(0)
        return jsonify({"status": "success"})
    return jsonify({"status": "error"}), 400

# Vercel expects the app to be named 'app'
application = app

if __name__ == "__main__":
    app.run(debug=True)