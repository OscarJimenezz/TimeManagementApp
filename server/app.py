from flask import Flask
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

SECRET_KEY = os.getenv('SECRET_KEY')

@app.route('/')
def home():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.getenv('PORT', 5000)))