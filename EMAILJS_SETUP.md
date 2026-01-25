# EmailJS Setup Guide for Careers Page

## 🚀 Quick Setup (10 minutes)

### Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up"** (it's free - 200 emails/month)
3. Verify your email address

---

### Step 2: Add Email Service

1. In EmailJS dashboard, click **"Add New Service"**
2. Choose your email provider:
   - **Gmail** (recommended for small teams)
   - **Outlook/Office365**
   - Or use EmailJS's built-in email service
3. Follow the connection wizard
4. **Copy the Service ID** (looks like `service_abc1234`)

---

### Step 3: Create Email Templates

You need **TWO templates**:

#### Template 1: Admin Notification (when someone applies)

1. Click **"Email Templates"** → **"Create New Template"**
2. **Template Name:** `New Job Application`
3. **Template ID:** Copy this (looks like `template_xyz789`)
4. **Content:**

```
Subject: 🎯 New Job Application from {{from_name}}

From: {{from_name}} <{{from_email}}>
Phone: {{phone}}
LinkedIn: {{linkedin}}
Experience: {{experience}}
Applied: {{timestamp}}

MESSAGE:
{{message}}

---
Resume attached: {{attachmentName}}
```

5. **IMPORTANT:** In the template settings:
   - Enable **"Attachments"**
   - Set attachment field name to: `attachment`
   - Set attachment filename field to: `attachmentName`
6. Click **"Save"**

#### Template 2: Applicant Confirmation

1. Create another template
2. **Template Name:** `Application Confirmation`
3. **Template ID:** Copy this
4. **Content:**

```
Subject: ✅ Application Received - Sales Growth Agent @ Recursive Tech

Hi {{to_name}},

Thank you for applying for the Sales Growth Agent position at Recursive Tech Solution!

We've received your application and our team will review it carefully. If your experience matches what we're looking for, we'll reach out within 3-5 business days.

In the meantime, feel free to check out our website and learn more about what we do:
👉 https://recursivetechsolution.com

Best regards,
The Recursive Tech Team

---
This is an automated confirmation. Please do not reply to this email.
```

5. Set **"To Email"** field to: `{{to_email}}`
6. Click **"Save"**

---

### Step 4: Get Your Public Key

1. In EmailJS dashboard, go to **"Account"** → **"General"**
2. Find **"Public Key"** (looks like `aBc123XyZ456`)
3. Copy it

---

### Step 5: Update careers.html

Open `careers.html` and replace these values (around line 190):

```javascript
const EMAILJS_CONFIG = {
    publicKey: 'YOUR_PUBLIC_KEY',           // Paste your Public Key here
    serviceId: 'YOUR_SERVICE_ID',           // Paste Service ID here
    adminTemplateId: 'YOUR_ADMIN_TEMPLATE', // Paste first template ID here
    userTemplateId: 'YOUR_USER_TEMPLATE',   // Paste second template ID here
    recaptchaSiteKey: '6LfYourSiteKey'      // Optional (see Step 6)
};
```

**Example after filling in:**
```javascript
const EMAILJS_CONFIG = {
    publicKey: 'aBc123XyZ456',
    serviceId: 'service_gmail123',
    adminTemplateId: 'template_admin_notif',
    userTemplateId: 'template_user_confirm',
    recaptchaSiteKey: '6LfYourSiteKey'
};
```

---

### Step 6: Optional - Add reCAPTCHA Protection

To prevent spam/abuse:

1. Go to [https://www.google.com/recaptcha/admin](https://www.google.com/recaptcha/admin)
2. Register a new site with **reCAPTCHA v3**
3. Domain: `recursivetechsolution.com` (or your domain)
4. Copy the **Site Key**
5. Replace `recaptchaSiteKey` in the config above
6. Add this check before sending emails:

```javascript
// Add before emailjs.send() in careers.html
grecaptcha.ready(function() {
    grecaptcha.execute('YOUR_SITE_KEY', {action: 'submit'}).then(function(token) {
        // Proceed with sending email
    });
});
```

*(Or skip this if you don't expect abuse)*

---

### Step 7: Test It!

1. Save and deploy `careers.html`
2. Visit your careers page
3. Fill out the form with test data
4. Submit
5. Check:
   - ✅ Your email (should receive application with resume attached)
   - ✅ Test applicant's email (should receive confirmation)

---

## 📧 Email Template Variables Reference

### Admin Template Variables:
- `{{from_name}}` - Applicant's name
- `{{from_email}}` - Applicant's email
- `{{phone}}` - Phone number
- `{{linkedin}}` - LinkedIn URL
- `{{experience}}` - Years of experience
- `{{message}}` - Cover letter message
- `{{timestamp}}` - Submission date/time
- `{{attachment}}` - Resume file (Base64)
- `{{attachmentName}}` - Resume filename

### User Confirmation Template Variables:
- `{{to_name}}` - Applicant's name
- `{{to_email}}` - Where to send confirmation
- `{{position}}` - Job title (auto-filled as "Sales Growth Agent")

---

## 🎨 Customize Email Templates

You can make your emails prettier with HTML:

1. In EmailJS template editor, switch to **HTML mode**
2. Add styling:

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #0ea5e9;">New Application!</h2>
    <p><strong>From:</strong> {{from_name}}</p>
    <p><strong>Email:</strong> {{from_email}}</p>
    <!-- Add more fields -->
</div>
```

---

## 🚨 Troubleshooting

### "Failed to send email" error:
- Check that all IDs are correct in `careers.html`
- Verify email service is connected in EmailJS dashboard
- Check browser console for specific error codes

### Emails going to spam:
- Add SPF/DKIM records (EmailJS provides these)
- Use a custom domain email instead of Gmail
- Ask recipients to whitelist your email

### Resume not attaching:
- Ensure attachment is enabled in template settings
- Field names must match: `attachment` and `attachmentName`
- Check file size is under 5MB

### Hit 200 email limit:
- Upgrade to paid plan ($7/month for 1,000 emails)
- Or switch to alternative service

---

## 📊 Monitoring Usage

- View sent emails: EmailJS Dashboard → **"Email History"**
- Check remaining quota: Dashboard → **"Usage"**
- Set up quota alerts in settings

---

## 🔒 Security Notes

1. **Public Key is safe** - It's meant to be exposed in browser
2. **Domain whitelist** - Enable in EmailJS settings to prevent abuse
3. **reCAPTCHA** - Highly recommended if you get spam
4. **Rate limiting** - EmailJS has built-in protection

---

## 💡 Advanced: Multiple Email Recipients

To send notifications to multiple team members:

In your Admin template, set **"To Email"** to:
```
you@example.com,teammate@example.com,boss@example.com
```

Or use BCC in template settings.

---

Need help? Check [EmailJS Documentation](https://www.emailjs.com/docs/)
