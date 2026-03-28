from flask import Flask, render_template

# Kita kasih tahu Flask kalau folder template & static ada di sini
app = Flask(__name__, 
            static_folder='static',
            template_folder='templates')

@app.route('/')
def home():
    # Ini bakal nyari file index.html di folder templates
    return render_template('index.html')

if __name__ == '__main__':
    # debug=True biar kalau kamu edit code, web otomatis refresh
    app.run(debug=True)