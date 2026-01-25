# 🚀 Ready to Test! - Quick Start Guide

## ✅ What's Been Configured

Your [careers.html](careers.html) is now fully set up with:

✅ **EmailJS SDK** - Loaded in `<head>`
✅ **Public Key** - `NV9iI7cHk3vgpVDTO`
✅ **Service ID** - `service_q0oaqn7`
✅ **Template ID** - `template_g577dxc`
✅ **Email sending** - Sends to both HR and applicant
✅ **Resume attachment** - Converted to Base64
✅ **Error handling** - User-friendly messages
✅ **Progress bar** - Visual feedback during submission

---

## 📋 Before You Test - Complete These Steps

### 1. Configure Your EmailJS Template (5 minutes)

Go to: https://dashboard.emailjs.com/admin/templates/template_g577dxc

**Copy the template content from:** [TEMPLATE_SETUP.md](TEMPLATE_SETUP.md)

**Key settings to check:**
- [ ] To Email: `{{to_email}}`
- [ ] From Name: `Recursive Tech Solution - HR Team`
- [ ] From Email: `Hr@recursivetechsolution.com`
- [ ] Reply-To: `{{from_email}}`
- [ ] Attachments: **ENABLED** ✅
  - Attachment field: `my_file`
  - Filename field: `my_file_name`

### 2. Verify IONOS Email Service Connected

In EmailJS Dashboard → Email Services:
- [ ] `service_q0oaqn7` is active
- [ ] Connected to `Hr@recursivetechsolution.com`
- [ ] Test connection works (green checkmark)

---

## 🧪 Testing Steps

### Test 1: Send Test Email from EmailJS Dashboard

1. Go to template `template_g577dxc`
2. Click **"Test It"**
3. Use test data from [TEMPLATE_SETUP.md](TEMPLATE_SETUP.md)
4. Send test email
5. Check `Hr@recursivetechsolution.com` inbox

**Expected:** You receive a formatted email with applicant details

---

### Test 2: Test the Careers Form

1. **Open:** https://recursivetechsolution.com/careers.html
2. **Fill out the form:**
   - Name: Your name
   - Email: **Your personal email** (to get confirmation)
   - Phone: Any number
   - LinkedIn: Any URL
   - Experience: Select any
   - Message: "Test application"
   - Resume: **Upload a PDF file (under 5MB)**

3. **Click Submit**

4. **Watch for:**
   - Progress bar moves through stages
   - Success message appears
   - Form resets after 2 seconds

5. **Check emails:**
   - `Hr@recursivetechsolution.com` - Should receive application with resume attached
   - Your test email - Should receive confirmation message

---

## ✅ What Success Looks Like

### Email to Hr@recursivetechsolution.com:
```
Subject: New Application: [Your Name] - Sales Growth Agent

Body includes:
- All applicant details
- Phone, email, LinkedIn
- Cover message
- Resume attached as PDF
```

### Email to Applicant (you):
```
Subject: Application Confirmed - Sales Growth Agent

Body includes:
- Thank you message
- What happens next
- Timeline (3-5 days)
- Link to website
```

---

## 🐛 Troubleshooting

### "Email failed to send" error
**Check:**
- [ ] Is IONOS email service active in EmailJS?
- [ ] Is template `template_g577dxc` published (not draft)?
- [ ] Are attachments enabled in template settings?
- [ ] Browser console - any specific error code?

**Fix:** Open browser console (F12) and check the error details

---

### Resume not attaching
**Check:**
- [ ] File size under 5MB?
- [ ] File type is PDF, DOC, or DOCX?
- [ ] Template has attachment fields: `my_file` and `my_file_name`?

**Fix:** In EmailJS template settings, verify attachments are enabled

---

### Email goes to spam
**Fix:**
- Check spam folder first
- In IONOS, set up SPF/DKIM records
- Add `Hr@recursivetechsolution.com` to contacts
- EmailJS provides SPF records - ask if needed

---

### Only one email received (not both)
**Check:**
- [ ] Did the form show "100%" progress?
- [ ] Check spam folders for both emails
- [ ] Browser console - any errors?

**Debug:** Open browser console before submitting to see which email failed

---

## 📊 How to Monitor

### Check EmailJS Dashboard:
- **Usage:** Dashboard → Usage (shows emails sent today)
- **History:** Dashboard → Email History (see all sent emails)
- **Quota:** Free tier = 200/month (you're using 2 per application)

### Calculate:
- 2 emails per application
- 200 emails/month ÷ 2 = **100 applications/month max**
- Should be plenty for recruitment!

---

## 🎯 Next Steps After Testing

1. **If test succeeds:**
   - ✅ Deploy to production
   - ✅ Announce job opening
   - ✅ Monitor EmailJS quota

2. **Optional improvements:**
   - Create separate admin template for cleaner emails
   - Add reCAPTCHA for spam protection
   - Customize email HTML for branding
   - Set up email forwarding rules in IONOS

3. **Create a second template (recommended):**
   - See [TEMPLATE_SETUP.md](TEMPLATE_SETUP.md) for instructions
   - Separates admin emails from applicant confirmations
   - Better customization

---

## 📞 Support Resources

**EmailJS Issues:**
- Dashboard: https://dashboard.emailjs.com
- Docs: https://www.emailjs.com/docs/
- Support: support@emailjs.com

**IONOS Email Issues:**
- IONOS Help: https://www.ionos.com/help/email/
- Your IONOS dashboard: https://my.ionos.com

**Your Documentation:**
- Template setup: [TEMPLATE_SETUP.md](TEMPLATE_SETUP.md)
- General setup: [EMAILJS_SETUP.md](EMAILJS_SETUP.md)
- Email templates: [EMAIL_TEMPLATES.md](EMAIL_TEMPLATES.md)
- Migration info: [MIGRATION_SUMMARY.md](MIGRATION_SUMMARY.md)

---

## 🎉 You're All Set!

Just configure the template in EmailJS dashboard and test. The code is ready to go!

**Quick checklist:**
- [ ] Template configured with content from TEMPLATE_SETUP.md
- [ ] Attachments enabled in template
- [ ] IONOS service connected and active
- [ ] Test email sent from EmailJS dashboard ✅
- [ ] Careers form tested with real submission ✅
- [ ] Both emails received (HR + confirmation) ✅

**Once all checked, you're live!** 🚀
