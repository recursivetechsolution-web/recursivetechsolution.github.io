# ✅ EmailJS Setup Complete - Template Configuration Guide

## Your Configuration
```
Public Key: NV9iI7cHk3vgpVDTO
Service ID: service_q0oaqn7
Template ID: template_g577dxc
```

## 🎯 How It Works Now

Your `template_g577dxc` will be used for **BOTH**:
1. **Email to HR** (`Hr@recursivetechsolution.com`) - with all application details + resume
2. **Email to Applicant** - confirmation message

---

## 📧 Template Variables You Need to Configure

Go to EmailJS Dashboard → Templates → Edit `template_g577dxc`

### Template Settings:

**To Email:** `{{to_email}}` (this will be dynamic - either HR or applicant)

**From Name:** `Recursive Tech Solution - HR Team`

**From Email:** `Hr@recursivetechsolution.com`

**Reply-To:** `{{from_email}}` (applicant's email for easy replies)

---

### Template Content (Copy This):

**Subject:**
```
{{#if phone}}New Application: {{from_name}} - {{position}}{{else}}Application Confirmed - {{position}}{{/if}}
```

**Body:**
```
Hi {{to_name}},

{{#if phone}}
═══════════════════════════════════════
NEW JOB APPLICATION
═══════════════════════════════════════

Applicant Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Name:         {{from_name}}
📧 Email:        {{from_email}}
📱 Phone:        {{phone}}
💼 LinkedIn:     {{linkedin}}
📊 Experience:   {{experience}}
📅 Submitted:    {{timestamp}}
🎯 Position:     {{position}}

Cover Letter / Why They're a Great Fit:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{{cover_message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📎 Resume: {{my_file_name}} (attached)

Reply to this email to contact the applicant directly.
{{else}}
Thank you for applying for the {{position}} position at Recursive Tech Solution!

We've successfully received your application and our HR team will review it carefully. 

📋 What Happens Next?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Our team reviews your application and resume
2. We match your experience with our requirements  
3. If selected, you'll receive an interview invitation within 3-5 business days
4. We conduct a brief interview (30-45 minutes)
5. If it's a good fit, we'll discuss compensation and next steps

🌐 In the Meantime:
• Learn more about us: https://recursivetechsolution.com
• Check out our AI automation solutions
• Connect with us on social media

We appreciate your interest in joining our team!

Best regards,
The Recursive Tech HR Team

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Questions? Reply to this email.
🌐 recursivetechsolution.com
{{/if}}
```

---

## 📎 Enable File Attachments

In your template settings:

1. Scroll down to **"Attachments"** section
2. **Enable attachments** ✅
3. Set attachment field name: `my_file`
4. Set filename field name: `my_file_name`

---

## 🧪 Test Template Variables

When testing in EmailJS dashboard, use these values:

**For HR Email (with phone):**
```json
{
  "to_name": "HR Team",
  "to_email": "Hr@recursivetechsolution.com",
  "from_name": "John Doe",
  "from_email": "john.doe@example.com",
  "phone": "+1 (555) 123-4567",
  "linkedin": "https://linkedin.com/in/johndoe",
  "experience": "3-5 Years",
  "cover_message": "I have 4 years of B2B SaaS sales experience...",
  "timestamp": "1/24/2026, 3:30 PM",
  "position": "Sales Growth Agent",
  "my_file_name": "John_Doe_Resume.pdf"
}
```

**For Applicant Confirmation (without phone):**
```json
{
  "to_name": "John Doe",
  "to_email": "john.doe@example.com",
  "from_name": "John Doe",
  "from_email": "john.doe@example.com",
  "position": "Sales Growth Agent"
}
```

---

## 🎨 Alternative: Create a Second Template (Recommended)

For better customization, create **2 separate templates**:

### Template 1: Admin Notification
- Template ID: `template_admin_new`
- Only includes application details
- Sent to: `Hr@recursivetechsolution.com`

### Template 2: User Confirmation (current)
- Template ID: `template_g577dxc` (keep current)
- Only includes confirmation message
- Sent to: Applicant's email

Then update `careers.html` config:
```javascript
const EMAILJS_CONFIG = {
    publicKey: 'NV9iI7cHk3vgpVDTO',
    serviceId: 'service_q0oaqn7',
    adminTemplateId: 'template_admin_new',  // New admin template
    userTemplateId: 'template_g577dxc',     // Current confirmation template
};
```

And update the form handler to use `adminTemplateId` for the HR email.

---

## ✅ Quick Test

1. **Update template** with the content above
2. **Enable attachments** in template settings
3. **Test send** from EmailJS dashboard
4. Go to your careers page
5. Fill out the form with your own email
6. Submit
7. Check:
   - ✅ HR email received at `Hr@recursivetechsolution.com`
   - ✅ Resume attached
   - ✅ Confirmation sent to your test email

---

## 📋 Checklist

- [ ] Template `template_g577dxc` updated with new content
- [ ] Attachments enabled (fields: `my_file` and `my_file_name`)
- [ ] To Email set to: `{{to_email}}`
- [ ] From Email set to: `Hr@recursivetechsolution.com`
- [ ] Reply-To set to: `{{from_email}}`
- [ ] IONOS SMTP service connected in EmailJS
- [ ] Test email sent successfully
- [ ] Careers page tested with real submission
- [ ] Both emails received (HR + applicant)

---

## 🚨 If Attachments Don't Work

EmailJS free tier might have attachment limitations. If resumes don't attach:

**Workaround:**
1. Include resume info in email body instead
2. Ask applicant to forward resume via email reply
3. Or upgrade to EmailJS paid plan ($7/month)

---

**Need help?** The template is configured to handle both use cases with a single template using conditional logic (`{{#if phone}}`). This is the smart way to use one template for two purposes!
