from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Allow requests from your website

@app.route('/')
def home():
    return "📧 Contact Form API is running!"

@app.route('/contact', methods=['POST'])
def contact():
    try:
        # Get form data
        data = request.json
        
        # Extract fields
        name = data.get('name', 'Not provided')
        email = data.get('email', 'Not provided')
        phone = data.get('phone', 'Not provided')
        message = data.get('message', 'No message')
        
        # Send email to yourself
        send_contact_email(name, email, phone, message)
        
        # Log to Render console (optional)
        print(f"✅ Message sent to email: {name} <{email}>")
        
        return jsonify({
            "status": "success",
            "message": "Your message has been sent successfully!"
        }), 200
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return jsonify({
            "status": "error",
            "message": "Failed to send message. Please try again."
        }), 500

def send_contact_email(name, sender_email, phone, message):
    """Send contact form submission to your email"""
    
    # Your email credentials (set in Render environment variables)
    your_email = os.environ.get('EMAIL_USER')
    your_password = os.environ.get('EMAIL_PASSWORD')
    admin_email = os.environ.get('ADMIN_EMAIL', 'brijesh.bhattarai@impacthub.net')
    
    # Email content
    subject = f"New Contact Form Submission from {name}"
    
    # Create HTML email body
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background: #4CAF50; color: white; padding: 20px; text-align: center; }}
            .content {{ background: #f9f9f9; padding: 20px; border-radius: 5px; }}
            .field {{ margin-bottom: 15px; }}
            .label {{ font-weight: bold; color: #555; }}
            .value {{ color: #333; }}
            .message-box {{ background: white; padding: 15px; border-left: 4px solid #4CAF50; }}
            .footer {{ margin-top: 20px; font-size: 12px; color: #777; text-align: center; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>📬 New Contact Form Submission</h2>
                <p>From your website contact form</p>
            </div>
            
            <div class="content">
                <div class="field">
                    <span class="label">👤 Name:</span><br>
                    <span class="value">{name}</span>
                </div>
                
                <div class="field">
                    <span class="label">📧 Email:</span><br>
                    <span class="value">{sender_email}</span>
                </div>
                
                <div class="field">
                    <span class="label">📞 Phone:</span><br>
                    <span class="value">{phone if phone else 'Not provided'}</span>
                </div>
                
                <div class="field">
                    <span class="label">📝 Message:</span><br>
                    <div class="message-box">
                        {message.replace('\n', '<br>')}
                    </div>
                </div>
                
                <div class="field">
                    <span class="label">🕒 Received at:</span><br>
                    <span class="value">{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</span>
                </div>
            </div>
            
            <div class="footer">
                <p>This message was sent automatically from your website contact form.</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    # Plain text version (for email clients that don't support HTML)
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
    
    # Attach both HTML and plain text versions
    msg.attach(MIMEText(text_content, 'plain'))
    msg.attach(MIMEText(html_content, 'html'))
    
    # Send email (using Gmail SMTP)
    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.starttls()
        server.login(your_email, your_password)
        server.send_message(msg)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
