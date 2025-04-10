# Import necessary libraries 
from flask import Flask
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Retrieve SECRET_KEY from the environment variables
SECRET_KEY = os.getenv('SECRET_KEY')

# Define the route for the homepage
@app.route('/')
def home():
    """Render the homepage."""
    return 'Hello, World!'

# Main block to run the app
if __name__ == '__main__':
    # Retrieve PORT from environment variables, defaulting to 5000 if not found
    port = int(os.getenv('PORT', 5000))
    
    # Run the Flask app with debugging enabled and on the specified host and port
    app.run(debug=True, host='0.0.0.0', port=port)