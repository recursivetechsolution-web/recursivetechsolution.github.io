# 📧 Email Templates - Copy & Paste Ready

Use these templates in your EmailJS dashboard.

---

## Template 1: Admin Notification (You receive this)

### Settings:
- **Template Name:** `New Job Application - Admin`
- **Template ID:** (auto-generated, copy this for careers.html)
- **To Email:** `recursivetechsolution@gmail.com` (or your email)
- **From Name:** `{{from_name}}`
- **From Email:** `{{from_email}}`
- **Enable Attachments:** ✅ YES
  - Attachment field: `attachment`
  - Filename field: `attachmentName`

### Subject:
```
🎯 New Application: {{from_name}} - Sales Growth Agent
```

### Message (Plain Text):
```
NEW JOB APPLICATION RECEIVED
═══════════════════════════════════════

Applicant Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Name:         {{from_name}}
📧 Email:        {{from_email}}
📱 Phone:        {{phone}}
💼 LinkedIn:     {{linkedin}}
📊 Experience:   {{experience}}
📅 Submitted:    {{timestamp}}

Cover Letter / Why They're a Great Fit:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📎 Resume attached: {{attachmentName}}

🔗 Quick Actions:
• Reply to this email to contact the applicant
• Forward to hiring team
• Save resume for review

═══════════════════════════════════════
Sent via Recursive Tech Careers Portal
https://recursivetechsolution.com/careers
```

### Message (HTML Version) - OPTIONAL:
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; max-width: 650px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #0ea5e9 0%, #0077b6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { background: #f8f9fa; padding: 30px; border: 1px solid #dee2e6; }
        .info-row { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #0ea5e9; border-radius: 4px; }
        .label { font-weight: bold; color: #0ea5e9; display: inline-block; width: 120px; }
        .value { color: #333; }
        .message-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border: 1px solid #dee2e6; }
        .footer { background: #343a40; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px; }
        .attachment { background: #d4edda; color: #155724; padding: 10px; border-radius: 4px; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎯 New Job Application</h1>
        <p>Sales Growth Agent Position</p>
    </div>
    
    <div class="content">
        <h2>Applicant Details</h2>
        
        <div class="info-row">
            <span class="label">👤 Name:</span>
            <span class="value">{{from_name}}</span>
        </div>
        
        <div class="info-row">
            <span class="label">📧 Email:</span>
            <span class="value"><a href="mailto:{{from_email}}">{{from_email}}</a></span>
        </div>
        
        <div class="info-row">
            <span class="label">📱 Phone:</span>
            <span class="value">{{phone}}</span>
        </div>
        
        <div class="info-row">
            <span class="label">💼 LinkedIn:</span>
            <span class="value"><a href="{{linkedin}}" target="_blank">{{linkedin}}</a></span>
        </div>
        
        <div class="info-row">
            <span class="label">📊 Experience:</span>
            <span class="value">{{experience}}</span>
        </div>
        
        <div class="info-row">
            <span class="label">📅 Submitted:</span>
            <span class="value">{{timestamp}}</span>
        </div>
        
        <h3>Why They're a Great Fit:</h3>
        <div class="message-box">
            {{message}}
        </div>
        
        <div class="attachment">
            📎 <strong>Resume Attached:</strong> {{attachmentName}}
        </div>
    </div>
    
    <div class="footer">
        <p>Sent via Recursive Tech Careers Portal</p>
        <p><a href="https://recursivetechsolution.com/careers" style="color: #0ea5e9;">recursivetechsolution.com/careers</a></p>
    </div>
</body>
</html>
```

---

## Template 2: Applicant Confirmation (They receive this)

### Settings:
- **Template Name:** `Application Confirmation - User`
- **Template ID:** (auto-generated, copy this for careers.html)
- **To Email:** `{{to_email}}`
- **To Name:** `{{to_name}}`
- **From Name:** `Recursive Tech Solution`
- **From Email:** Your verified email or noreply@yourdomain.com
- **Reply To:** `recursivetechsolution@gmail.com`

### Subject:
```
✅ Application Received - {{position}} @ Recursive Tech
```

### Message (Plain Text):
```
Hi {{to_name}},

Thank you for applying for the {{position}} position at Recursive Tech Solution!

We've successfully received your application and our team will review it carefully. If your experience and skills match what we're looking for, we'll reach out within 3-5 business days to schedule an interview.

What Happens Next?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Our team reviews your application and resume
2. We match your experience with our requirements
3. If selected, you'll receive an interview invitation
4. We conduct a brief interview (30-45 minutes)
5. If it's a good fit, we'll discuss next steps!

In the Meantime:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Learn more about us: https://recursivetechsolution.com
• Check out our services and solutions
• Connect with us on social media
• Feel free to reach out with questions

We appreciate your interest in joining our team!

Best regards,
The Recursive Tech Team

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 Questions? Reply to this email
🌐 recursivetechsolution.com
📍 Remote-first company

This is an automated confirmation. Your application is being reviewed.
```

### Message (HTML Version) - OPTIONAL:
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.8; color: #333; max-width: 600px; margin: 0 auto; background: #f4f4f4; }
        .container { background: white; margin: 20px auto; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #0ea5e9 0%, #0077b6 100%); color: white; padding: 40px 20px; text-align: center; }
        .header h1 { margin: 0 0 10px 0; font-size: 28px; font-weight: 700; }
        .header p { margin: 0; font-size: 16px; opacity: 0.9; }
        .content { padding: 40px 30px; }
        .greeting { font-size: 18px; color: #333; margin-bottom: 20px; }
        .intro { font-size: 16px; line-height: 1.6; margin-bottom: 30px; }
        .section { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0ea5e9; }
        .section h2 { margin: 0 0 15px 0; color: #0ea5e9; font-size: 18px; }
        .steps { list-style: none; padding: 0; }
        .steps li { padding: 10px 0; padding-left: 30px; position: relative; }
        .steps li:before { content: "✓"; position: absolute; left: 0; color: #0ea5e9; font-weight: bold; font-size: 18px; }
        .cta-box { background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%); padding: 25px; border-radius: 8px; text-align: center; margin: 30px 0; }
        .cta-box h3 { margin: 0 0 15px 0; color: #0077b6; }
        .button { display: inline-block; background: #0ea5e9; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: 600; margin: 10px 5px; }
        .button:hover { background: #0284c7; }
        .footer { background: #1e293b; color: #94a3b8; padding: 30px; text-align: center; font-size: 14px; }
        .footer a { color: #0ea5e9; text-decoration: none; }
        .signature { margin-top: 30px; font-style: italic; color: #64748b; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✅ Application Received!</h1>
            <p>We're excited to review your application</p>
        </div>
        
        <div class="content">
            <div class="greeting">
                Hi <strong>{{to_name}}</strong>,
            </div>
            
            <div class="intro">
                Thank you for applying for the <strong>{{position}}</strong> position at Recursive Tech Solution! 🎉
                <br><br>
                We've successfully received your application and our team will review it carefully. If your experience and skills match what we're looking for, we'll reach out within <strong>3-5 business days</strong> to schedule an interview.
            </div>
            
            <div class="section">
                <h2>📋 What Happens Next?</h2>
                <ul class="steps">
                    <li>Our team reviews your application and resume</li>
                    <li>We match your experience with our requirements</li>
                    <li>If selected, you'll receive an interview invitation</li>
                    <li>We conduct a brief interview (30-45 minutes)</li>
                    <li>If it's a good fit, we discuss compensation and start date!</li>
                </ul>
            </div>
            
            <div class="cta-box">
                <h3>🌐 Learn More About Us</h3>
                <p>While you wait, explore what we do and how we're changing the game:</p>
                <a href="https://recursivetechsolution.com" class="button">Visit Our Website</a>
            </div>
            
            <div class="section">
                <h2>💡 In the Meantime</h2>
                <p>
                    • <strong>Explore our services:</strong> See the cutting-edge solutions we build<br>
                    • <strong>Connect with us:</strong> Follow our journey on social media<br>
                    • <strong>Have questions?</strong> Feel free to reply to this email<br>
                    • <strong>Prepare for interview:</strong> Think about your sales wins and strategies
                </p>
            </div>
            
            <div class="signature">
                We appreciate your interest in joining our team!<br>
                <strong>– The Recursive Tech Team</strong>
            </div>
        </div>
        
        <div class="footer">
            <p>
                <strong>Recursive Tech Solution</strong><br>
                Building the future with AI automation<br>
                Remote-first • Global team
            </p>
            <p style="margin-top: 20px;">
                📧 <a href="mailto:recursivetechsolution@gmail.com">recursivetechsolution@gmail.com</a><br>
                🌐 <a href="https://recursivetechsolution.com">recursivetechsolution.com</a>
            </p>
            <p style="margin-top: 20px; font-size: 12px; color: #64748b;">
                This is an automated confirmation. Your application is being reviewed.<br>
                Please do not reply directly to this email if sent from a no-reply address.
            </p>
        </div>
    </div>
</body>
</html>
```

---

## Quick Setup Instructions

### In EmailJS Dashboard:

1. **Create Template 1** (Admin):
   - Copy subject from above
   - Choose Plain Text OR HTML version
   - Paste content
   - Enable attachments ✅
   - Set attachment fields: `attachment` and `attachmentName`
   - Set To Email: your email address
   - Save & copy Template ID

2. **Create Template 2** (User):
   - Copy subject from above
   - Choose Plain Text OR HTML version  
   - Paste content
   - Set To Email: `{{to_email}}`
   - Set To Name: `{{to_name}}`
   - Set Reply-To: your email address
   - Save & copy Template ID

3. **Update careers.html:**
   - Paste both Template IDs into the config object
   - Test with your email first
   - Deploy!

---

## Testing Variables

When testing templates in EmailJS dashboard, use these test values:

```json
{
  "from_name": "John Doe",
  "from_email": "john.doe@example.com",
  "phone": "+1 (555) 123-4567",
  "linkedin": "https://linkedin.com/in/johndoe",
  "experience": "3-5 Years",
  "message": "I have 4 years of B2B SaaS sales experience with a proven track record of exceeding quotas. I'm excited about AI automation and would love to help Recursive Tech grow.",
  "timestamp": "1/24/2026, 3:30 PM",
  "to_name": "John Doe",
  "to_email": "john.doe@example.com",
  "position": "Sales Growth Agent",
  "attachmentName": "John_Doe_Resume.pdf"
}
```

---

## Customization Ideas

### Make it yours:
- Replace "Recursive Tech Solution" with your brand name
- Add your logo (use image URL in HTML version)
- Change color scheme (replace #0ea5e9 with your brand color)
- Add social media links
- Include team photo or company culture snippets
- Add FAQ section in confirmation email
- Include salary range or benefits preview

### Advanced:
- Add calendar link for automatic interview scheduling
- Include video message from CEO/founder
- Add referral program info
- Link to company blog or case studies
- Include "what to expect in interview" section

---

**Pro Tip:** Test both plain text and HTML versions on different email clients (Gmail, Outlook, Apple Mail) before going live!
