# 🔥 Firebase Setup Instructions

## ✅ What's Been Done

1. **Firebase rules updated:**
   - ✅ Firestore rules allow job application submissions
   - ✅ Storage rules allow resume uploads (max 5MB, PDF/DOC/DOCX only)

2. **careers.html updated:**
   - ✅ EmailJS removed, Firebase SDK added
   - ✅ Form now uploads resumes to Firebase Storage
   - ✅ Application data saved to Firestore

## 🚀 Firebase Configuration

Your Firebase project: **recursivetech-c1bd9**

### Firebase Config in careers.html:
```javascript
const firebaseConfig = {
    apiKey: "AIzaSyDqJ5xK8vX3mZ2nQ4wR7pY6tL9sA1bC3dE",
    authDomain: "recursivetech-c1bd9.firebaseapp.com",
    projectId: "recursivetech-c1bd9",
    storageBucket: "recursivetech-c1bd9.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef123456"
};
```

**⚠️ IMPORTANT:** The config above contains placeholder values. You need to replace them with your actual Firebase credentials.

## 📋 Step-by-Step Setup

### Step 1: Get Your Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/project/recursivetech-c1bd9/settings/general)
2. Scroll to **Your apps** section
3. Click on the web app icon (`</>`) or "Add app" if none exists
4. Copy your actual Firebase configuration
5. Update the `firebaseConfig` in [careers.html](careers.html) with the real values

### Step 2: Deploy Firebase Rules

You have two options:

#### Option A: Using Firebase CLI (Recommended)
```bash
# Install Firebase CLI if not installed
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase (select your project: recursivetech-c1bd9)
firebase init

# Deploy rules
firebase deploy --only firestore:rules,storage:rules
```

#### Option B: Manual Upload via Console

**Firestore Rules:**
1. Go to [Firestore Rules](https://console.firebase.google.com/project/recursivetech-c1bd9/firestore/rules)
2. Copy content from `firestore.rules`
3. Paste and publish

**Storage Rules:**
1. Go to [Storage Rules](https://console.firebase.google.com/project/recursivetech-c1bd9/storage/rules)
2. Copy content from `storage.rules`
3. Paste and publish

### Step 3: Enable Services in Firebase

1. **Enable Firestore:**
   - Go to [Firestore Database](https://console.firebase.google.com/project/recursivetech-c1bd9/firestore)
   - Click "Create Database"
   - Choose "Start in production mode"
   - Select your region

2. **Enable Storage:**
   - Go to [Storage](https://console.firebase.google.com/project/recursivetech-c1bd9/storage)
   - Click "Get Started"
   - Accept default rules (we'll override with our secure rules)
   - Select your region

### Step 4: Test the Application

1. Open [careers.html](https://recursivetechsolution.com/careers.html)
2. Fill out the job application form
3. Upload a test resume (PDF, DOC, or DOCX - max 5MB)
4. Submit the form
5. Check Firebase Console:
   - **Firestore:** You should see a new document in `applications` collection
   - **Storage:** You should see the resume file in `resumes/` folder

## 📊 How to View Applications

### In Firebase Console:

1. **View Applications:**
   - Go to [Firestore Data](https://console.firebase.google.com/project/recursivetech-c1bd9/firestore/data)
   - Click on `applications` collection
   - You'll see all submitted applications with details

2. **Download Resumes:**
   - Go to [Storage Files](https://console.firebase.google.com/project/recursivetech-c1bd9/storage)
   - Navigate to `resumes/` folder
   - Click any file to download

### Application Data Structure:
```javascript
{
  name: "John Doe",
  email: "john@example.com",
  phone: "+1 (555) 000-0000",
  linkedin: "https://linkedin.com/in/johndoe",
  experience: "3-5",
  message: "I'm a great fit because...",
  resumeFileName: "John_Doe_Resume.pdf",
  resumeURL: "https://firebasestorage.googleapis.com/...",
  timestamp: Timestamp,
  position: "Sales Growth Agent",
  status: "new"
}
```

## 🔒 Security Notes

- ✅ Applications can only be **created** from the frontend (no read/update/delete)
- ✅ Resumes can only be **uploaded** (no public read access)
- ✅ File size limited to 5MB
- ✅ Only PDF, DOC, DOCX files allowed
- ⚠️ **Note:** Without resume attachments, you won't get email notifications. You'll need to check Firebase Console regularly.

## 💡 Optional: Add Email Notifications

If you want email notifications when someone applies:

1. Use Firebase Cloud Functions to trigger emails on new applications
2. Or use Zapier/Make.com to connect Firestore to email
3. Or manually check the Firebase Console daily

## 🆘 Troubleshooting

### "Permission Denied" Error
- Make sure you deployed the Firebase rules
- Check that Firestore and Storage are enabled
- Verify the rules in Firebase Console match the files in this repo

### "Storage Upload Failed"
- Ensure Storage is enabled in Firebase
- Check file size (must be < 5MB)
- Verify file type (PDF, DOC, or DOCX only)

### "Invalid API Key"
- Replace placeholder config with actual Firebase credentials
- Get them from Firebase Console > Project Settings

---

**Current Status:** 🟡 NEEDS FIREBASE CREDENTIALS

Replace the placeholder config in [careers.html](careers.html) with your actual Firebase credentials to make it work!
