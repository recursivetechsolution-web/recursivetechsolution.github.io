// ============================================
// ALTERNATIVE: EmailJS WITHOUT Attachments
// ============================================
// Use this if EmailJS attachment feature doesn't work on free tier
// Instead, it will include a Google Drive/Dropbox upload link

// Replace the form submit handler with this version:

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.innerText = 'Preparing...';

    const file = fileInput.files[0];
    if (!file) {
        formMessage.innerText = 'Please attach your resume';
        formMessage.className = 'error';
        submitBtn.disabled = false;
        submitBtn.innerText = 'Submit Application';
        return;
    }

    try {
        const progressContainer = document.getElementById('progress-container');
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');
        progressContainer.style.display = 'block';
        progressFill.style.width = '30%';
        progressText.textContent = 'Preparing...';

        submitBtn.innerText = 'Sending application...';

        // Collect form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            linkedin: document.getElementById('linkedin').value || 'Not provided',
            experience: document.getElementById('experience').value,
            message: document.getElementById('message').value,
            resumeFileName: file.name,
            resumeSize: (file.size / 1024).toFixed(2) + ' KB',
            timestamp: new Date().toLocaleString()
        };

        progressFill.style.width = '60%';
        progressText.textContent = 'Sending notification...';

        // Send email to admin (you) WITHOUT attachment
        // Instead, ask applicant to upload to Google Drive/Dropbox
        await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.adminTemplateId,
            {
                from_name: formData.name,
                from_email: formData.email,
                phone: formData.phone,
                linkedin: formData.linkedin,
                experience: formData.experience,
                message: formData.message,
                timestamp: formData.timestamp,
                resumeInfo: `${formData.resumeFileName} (${formData.resumeSize}) - Request resume via email reply`
            }
        );

        progressFill.style.width = '90%';
        progressText.textContent = 'Sending confirmation...';

        // Send confirmation email to applicant with upload instructions
        await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.userTemplateId,
            {
                to_name: formData.name,
                to_email: formData.email,
                position: 'Sales Growth Agent',
                upload_instructions: 'Please upload your resume to Google Drive or Dropbox and email the link to recursivetechsolution@gmail.com'
            }
        );

        progressFill.style.width = '100%';
        progressText.textContent = 'Complete!';

        // Success message with next steps
        formMessage.innerHTML = `
            ✅ <strong>Application received!</strong><br>
            <small>Next step: Please email your resume to <strong>recursivetechsolution@gmail.com</strong> 
            or upload it to Google Drive/Dropbox and send us the link.</small>
        `;
        formMessage.className = 'success';
        
        // Reset form
        setTimeout(() => {
            form.reset();
            progressContainer.style.display = 'none';
            progressFill.style.width = '0%';
            fileNameDisplay.textContent = '';
            fileUploadArea.classList.remove('has-file');
        }, 3000);

    } catch (error) {
        console.error("Error submitting form: ", error);
        formMessage.innerHTML = `❌ <strong>Error:</strong> ${error.text || 'Please try again.'}`;
        formMessage.className = 'error';
        progressContainer.style.display = 'none';
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = 'Submit Application';
    }
});

// ============================================
// Email Template for this version:
// ============================================
/*
ADMIN TEMPLATE (no attachment):
Subject: 🎯 New Job Application from {{from_name}}

From: {{from_name}} <{{from_email}}>
Phone: {{phone}}
LinkedIn: {{linkedin}}
Experience: {{experience}}
Applied: {{timestamp}}

MESSAGE:
{{message}}

RESUME:
{{resumeInfo}}

📧 Reply to the applicant to request their resume file.
*/

/*
USER TEMPLATE:
Subject: ✅ Next Step - Upload Your Resume

Hi {{to_name}},

Thank you for your interest in the {{position}} role!

We've received your application details. To complete your application, please:

1. Upload your resume to Google Drive or Dropbox
2. Set sharing to "Anyone with the link can view"
3. Email the link to: recursivetechsolution@gmail.com
   Subject: "Resume for {{to_name}}"

Or simply reply to this email with your resume attached.

We'll review your application within 3-5 business days.

Best regards,
Recursive Tech Team
*/
