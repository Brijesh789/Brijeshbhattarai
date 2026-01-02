from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    # Show environment variable status
    email_set = "✅" if os.environ.get('EMAIL_USER') else "❌"
    pass_set = "✅" if os.environ.get('EMAIL_PASSWORD') else "❌"
    admin_set = "✅" if os.environ.get('ADMIN_EMAIL') else "❌"
    
    return f"""
    <h1>📧 Contact Form API</h1>
    <p>Status: <strong>Running</strong></p>
    <hr>
    <h3>Environment Variables:</h3>
    <p>EMAIL_USER: {email_set} {'Set' if os.environ.get('EMAIL_USER') else 'Not Set'}</p>
    <p>EMAIL_PASSWORD: {pass_set} {'Set' if os.environ.get('EMAIL_PASSWORD') else 'Not Set'}</p>
    <p>ADMIN_EMAIL: {admin_set} {'Set' if os.environ.get('ADMIN_EMAIL') else 'Not Set'}</p>
    <hr>
    <p>Test with: POST /contact with JSON data</p>
    """

@app.route('/contact', methods=['POST'])
def contact():
    try:
        # Get form data
        data = request.json
        
        if not data:
            return jsonify({
                "status": "error",
                "message": "No data received"
            }), 400
        
        # Extract fields
        name = data.get('name', 'Not provided')
        email = data.get('email', 'Not provided')
        phone = data.get('phone', 'Not provided')
        message = data.get('message', 'No message')
        
        print(f"📥 Received contact form:")
        print(f"   Name: {name}")
        print(f"   Email: {email}")
        print(f"   Phone: {phone}")
        print(f"   Message: {message}")
        
        # Send email to yourself
        result = send_contact_email(name, email, phone, message)
        
        if result == "success":
            print(f"✅ Email sent successfully!")
            return jsonify({
                "status": "success",
                "message": "Your message has been sent successfully!"
            }), 200
        else:
            print(f"❌ Email failed: {result}")
            return jsonify({
                "status": "error",
                "message": f"Failed to send email: {result}"
            }), 500
        
    except Exception as e:
        error_msg = str(e)
        print(f"❌ Error in contact endpoint: {error_msg}")
        return jsonify({
            "status": "error",
            "message": f"Server error: {error_msg}"
        }), 500

def send_contact_email(name, sender_email, phone, message):
    """Send contact form submission to your email"""
    
    # Your email credentials (set in Render environment variables)
    your_email = os.environ.get('EMAIL_USER')
    your_password = os.environ.get('EMAIL_PASSWORD')
    admin_email = os.environ.get('ADMIN_EMAIL', 'brijeshbh78901@gmail.com')
    
    print(f"📧 Email setup:")
    print(f"   EMAIL_USER: {your_email}")
    print(f"   EMAIL_PASSWORD: {'Set' if your_password else 'Not set'}")
    print(f"   ADMIN_EMAIL: {admin_email}")
    
    # Check if environment variables are set
    if not your_email or not your_password:
        return "Email credentials not configured in environment variables"
    
    # Email content
    subject = f"New Contact Form Submission from {name}"
    
    # Create plain text version
    text_content = f"""
    NEW CONTACT FORM SUBMISSION
    ===========================
    
    Name: {name}
    Email: {sender_email}
    Phone: {phone if phone else 'Not provided'}
    
    Message:
    {message}
    
    Received at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
    """
    
    # Create message
    msg = MIMEMultipart('alternative')
    msg['From'] = your_email
    msg['To'] = admin_email
    msg['Subject'] = subject
    
    msg.attach(MIMEText(text_content, 'plain'))
    
    # Send email
    try:
        print(f"🔗 Connecting to Gmail SMTP...")
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        print(f"✅ TLS started")
        server.login(your_email, your_password)
        print(f"✅ Logged in to Gmail")
        server.send_message(msg)
        server.quit()
        print(f"✅ Email sent to {admin_email}")
        return "success"
        
    except smtplib.SMTPAuthenticationError:
        return "Gmail authentication failed. Check your email and app password."
    except Exception as e:
        return f"SMTP Error: {str(e)}"

@app.route('/test', methods=['GET'])
def test():
    """Test endpoint to see environment variables"""
    return jsonify({
        "app": "Contact Form API",
        "status": "running",
        "email_user_set": bool(os.environ.get('EMAIL_USER')),
        "email_password_set": bool(os.environ.get('EMAIL_PASSWORD')),
        "admin_email": os.environ.get('ADMIN_EMAIL'),
        "timestamp": datetime.now().isoformat()
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
