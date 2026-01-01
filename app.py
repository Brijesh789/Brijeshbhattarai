from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv
import logging

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure logging
logging.basicConfig(level=logging.INFO)

# Email configuration
EMAIL_HOST = os.getenv('EMAIL_HOST', 'smtp.gmail.com')
EMAIL_PORT = int(os.getenv('EMAIL_PORT', 587))
EMAIL_USER = os.getenv('EMAIL_USER')
EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')
ADMIN_EMAIL = os.getenv('ADMIN_EMAIL', 'brijesh.bhattarai@impacthub.net')

@app.route('/')
def home():
    return jsonify({"message": "Brijesh Bhattarai Contact API", "status": "running"})

@app.route('/send_message', methods=['POST'])
def send_message():
    try:
        # Get form data
        data = request.json
        
        # Validate required fields
        required_fields = ['name', 'email', 'subject', 'message']
        for field in required_fields:
            if field not in data or not data[field].strip():
                return jsonify({
                    "success": False,
                    "message": f"Please provide a valid {field}"
                }), 400
        
        # Extract data
        name = data['name'].strip()
        email = data['email'].strip()
        subject = data['subject'].strip()
        message = data['message'].strip()
        
        # Create email content
        email_subject = f"New Contact Form Message: {subject}"
        
        email_body = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>New Message from Your Website</h2>
            <p><strong>From:</strong> {name} ({email})</p>
            <p><strong>Subject:</strong> {subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: #f4f4f4; padding: 15px; border-left: 4px solid #4CAF50; margin: 10px 0;">
                {message}
            </div>
            <hr>
            <p style="color: #666; font-size: 12px;">
                This message was sent from your website contact form.
            </p>
        </body>
        </html>
        """
        
        # Create MIME message
        msg = MIMEMultipart('alternative')
        msg['Subject'] = email_subject
        msg['From'] = EMAIL_USER
        msg['To'] = ADMIN_EMAIL
        msg['Reply-To'] = email
        
        # Attach HTML version
        html_part = MIMEText(email_body, 'html')
        msg.attach(html_part)
        
        # Send email
        with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT) as server:
            server.starttls()  # Secure the connection
            server.login(EMAIL_USER, EMAIL_PASSWORD)
            server.send_message(msg)
        
        # Log the success
        app.logger.info(f"Message sent from {name} ({email})")
        
        return jsonify({
            "success": True,
            "message": "Your message has been sent successfully!"
        }), 200
        
    except Exception as e:
        app.logger.error(f"Error sending email: {str(e)}")
        return jsonify({
            "success": False,
            "message": f"Failed to send message. Error: {str(e)}"
        }), 500

@app.route('/health')
def health_check():
    return jsonify({"status": "healthy"}), 200

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(debug=False, host='0.0.0.0', port=port)
