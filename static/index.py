import os
from datetime import datetime
from pathlib import Path

from flask import Flask, jsonify, render_template, request


def get_project_root() -> Path:
    """Resolve project root (folder that contains `templates/` and `static/`)."""
    root = Path(__file__).resolve().parent.parent
    if (root / "templates").exists():
        return root

    cwd = Path.cwd()
    if (cwd / "templates").exists():
        return cwd

    return root


project_root = get_project_root()
template_dir = project_root / "templates"
static_dir = project_root / "static"

app = Flask(
    __name__,
    template_folder=str(template_dir),
    static_folder=str(static_dir),
    static_url_path="/static",
)
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "nusantara-secret-key-2024")

AI_NAME = "AI Nusantara"


def build_ai_reply(message: str) -> str:
    text = " ".join(message.strip().split())
    lowered = text.lower()

    if not text:
        return "Coba kirim pertanyaan atau pendapatmu dulu, nanti aku bantu jawab."

    keyword_responses = [
        (
            ("integrasi", "sosial"),
            "Integrasi sosial adalah proses menyatukan perbedaan agar masyarakat bisa hidup rukun. Kuncinya ada pada saling menghargai, kerja sama, dan tujuan bersama.",
        ),
        (
            ("pancasila",),
            "Pancasila membantu kita hidup bersama di tengah perbedaan. Nilai utamanya terlihat saat kita adil, menghormati sesama, dan mendahulukan kepentingan bersama.",
        ),
        (
            ("gotong royong",),
            "Gotong royong memperkuat integrasi sosial karena orang belajar saling membantu tanpa membedakan suku, agama, atau latar belakang.",
        ),
        (
            ("toleransi",),
            "Toleransi berarti menghormati perbedaan tanpa harus kehilangan keyakinan sendiri. Sikap ini penting supaya masyarakat tetap damai dan saling percaya.",
        ),
        (
            ("budaya", "keberagaman"),
            "Keberagaman budaya adalah kekuatan bangsa. Saat kita mengenal budaya lain dengan rasa hormat, persatuan justru menjadi semakin kuat.",
        ),
        (
            ("konflik",),
            "Konflik sosial bisa dikurangi lewat dialog, empati, musyawarah, dan aturan yang adil. Fokusnya bukan mencari siapa yang menang, tapi mencari solusi bersama.",
        ),
        (
            ("bhinneka",),
            "Bhinneka Tunggal Ika mengajarkan bahwa berbeda-beda bukan alasan untuk terpecah. Perbedaan justru bisa menjadi dasar persatuan.",
        ),
        (
            ("halo", "hai", "assalamualaikum"),
            "Halo, saya AI Nusantara. Kita bisa diskusi tentang integrasi sosial, Pancasila, toleransi, atau contoh sikap persatuan dalam kehidupan sehari-hari.",
        ),
    ]

    for keywords, response in keyword_responses:
        if any(keyword in lowered for keyword in keywords):
            return response

    return (
        f"Saya menangkap poinmu: \"{text}\". Dalam konteks integrasi sosial, coba lihat tiga hal ini: "
        "1) apa perbedaannya, 2) nilai bersama apa yang bisa menyatukan, 3) tindakan nyata apa yang paling adil dan damai. "
        "Kalau mau, kirim pertanyaan yang lebih spesifik dan saya bantu uraikan."
    )


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
    return render_template("chat.html", ai_name=AI_NAME)


@app.route("/api/chat", methods=["POST"])
def ai_chat():
    data = request.get_json(silent=True) or {}
    message = str(data.get("message", "")).strip()

    if not message:
        return jsonify({"error": "Pesan tidak boleh kosong."}), 400

    reply = build_ai_reply(message)

    return jsonify(
        {
            "assistant": AI_NAME,
            "reply": reply,
            "timestamp": datetime.utcnow().isoformat() + "Z",
        }
    ), 200


@app.route("/api/health")
def health():
    return jsonify({"status": "ok"}), 200


@app.errorhandler(404)
def not_found(error):
    if request.path.startswith("/api/"):
        return jsonify({"error": "Not found"}), 404
    return render_template("index.html"), 404


@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500


application = app

if __name__ == "__main__":
    app.run(debug=False)
