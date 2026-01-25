# 🔧 How to Fix Your Email Issue

## ❌ The Problem

You're receiving emails that say:
> "A message by has been received. Kindly respond at your earliest convenience."

**But no body or file is included!**

### Why This Happens:
Your code was using **ONE template for TWO different purposes**:
1. Admin notification (to you/HR) - needs all application details + resume
2. Applicant confirmation (to the person applying) - needs a thank you message

When the applicant gets an email using the admin template, most fields are empty, resulting in an incomplete message.

---

## ✅ The Solution

You need **TWO separate templates** in EmailJS:

### Step 1: Create the Admin Template (for YOU)
This is the email **YOU receive** with the application details.

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/admin/templates)
2. Click **Create New Template**
3. Copy the content from `EMAIL_TEMPLATES.md` → **Template 1: Admin Notification**
4. **Important Settings:**
   - **To Email:** `Hr@recursivetechsolution.com`
   - **Enable Attachments:** ✅ YES
   - **Attachment field:** `attachment`
   - **Filename field:** `attachmentName`
5. **Save** and copy the **Template ID** (e.g., `template_abc123`)

### Step 2: Create the Applicant Confirmation Template (for THEM)
This is the email **applicants receive** as confirmation.

1. Click **Create New Template** again
2. Copy the content from `EMAIL_TEMPLATES.md` → **Template 2: Applicant Confirmation**
3. **Important Settings:**
   - **To Email:** `{{to_email}}`
   - **To Name:** `{{to_name}}`
   - **From Name:** `Recursive Tech Solution`
   - **Reply To:** `Hr@recursivetechsolution.com`
   - **NO attachments needed**
4. **Save** and copy the **Template ID** (e.g., `template_xyz789`)

### Step 3: Update Your Code

Open [careers.html](careers.html) and update the template IDs:

```javascript
const EMAILJS_CONFIG = {
    publicKey: 'NV9il7cHk3vgpVDTO',
    serviceId: 'service_q0oaqn7',
    adminTemplateId: 'template_2k7bnse',    // YOUR admin template ID
    userTemplateId: 'template_XXXXXXX'       // YOUR applicant template ID
};
```

**Replace:**
- `'template_2k7bnse'` with your actual **admin template ID**
- `'template_XXXXXXX'` with your actual **applicant confirmation template ID**

---

## 📋 Quick Checklist

- [ ] Create Admin Notification template in EmailJS
  - [ ] Enable attachments (`attachment` and `attachmentName` fields)
  - [ ] Set recipient to `Hr@recursivetechsolution.com`
  - [ ] Copy Template ID
- [ ] Create Applicant Confirmation template in EmailJS
  - [ ] Use `{{to_email}}` and `{{to_name}}` variables
  - [ ] NO attachments
  - [ ] Copy Template ID
- [ ] Update `careers.html` with both template IDs
- [ ] Test by submitting a job application
- [ ] Verify you receive the detailed email with resume
- [ ] Verify applicant receives a nice confirmation email

---

## 🧪 Testing

After making changes:

1. Open your careers page
2. Fill out the application form
3. Submit with a test resume
4. Check **two places**:
   - ✅ Your email (`Hr@recursivetechsolution.com`) - should have ALL details + resume
   - ✅ Applicant's email - should have a nice confirmation message

---

## 📝 Template Variables Reference

### Admin Template (You receive)
```
{{from_name}}       - Applicant's name
{{from_email}}      - Applicant's email
{{phone}}           - Phone number
{{linkedin}}        - LinkedIn profile
{{experience}}      - Years of experience
{{message}}         - Cover letter / why they're a fit
{{timestamp}}       - When submitted
{{attachment}}      - Resume file (Base64)
{{attachmentName}}  - Resume filename
```

### Applicant Template (They receive)
```
{{to_name}}         - Their name
{{to_email}}        - Their email
{{position}}        - Job title (Sales Growth Agent)
```

---

## 🆘 Still Having Issues?

1. **Check EmailJS dashboard** for failed sends
2. **Verify template IDs** are correct in careers.html
3. **Check spam folder** for test emails
4. **Ensure attachment fields** are named exactly `attachment` and `attachmentName`
5. **Test with a small PDF** (< 500KB)

---

## 📚 Related Files

- [EMAIL_TEMPLATES.md](EMAIL_TEMPLATES.md) - Full template content to copy/paste
- [careers.html](careers.html) - The file you need to update
- [EMAILJS_SETUP.md](EMAILJS_SETUP.md) - General EmailJS setup guide

---

**Need more help?** Check the [EmailJS Documentation](https://www.emailjs.com/docs/)
