# 🔑 Get Your Firebase Credentials - Quick Guide

## Where to Find Your Firebase Config

### Option 1: Firebase Console (Web UI)

1. **Go to Firebase Console:**
   - Visit: https://console.firebase.google.com/project/recursivetech-c1bd9/settings/general
   - Or: https://console.firebase.google.com → Select your project → Settings (gear icon) → Project settings

2. **Scroll to "Your apps" section**

3. **If you already have a web app:**
   - Look for the web app icon (`</>`)
   - Click on it or click "Config" radio button
   - Copy the `firebaseConfig` object

4. **If you don't have a web app yet:**
   - Click the web app icon (`</>`) to add a new app
   - Enter app nickname: "Recursive Tech Website"
   - Don't check "Firebase Hosting"
   - Click "Register app"
   - Copy the `firebaseConfig` object shown

### Option 2: Firebase CLI

```bash
firebase apps:sdkconfig web
```

## What to Replace in careers.html

Find this section in [careers.html](careers.html) (around line 200):

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyDqJ5xK8vX3mZ2nQ4wR7pY6tL9sA1bC3dE",        // ← REPLACE
    authDomain: "recursivetech-c1bd9.firebaseapp.com",         // ← REPLACE
    projectId: "recursivetech-c1bd9",                          // ← This should be correct
    storageBucket: "recursivetech-c1bd9.appspot.com",         // ← REPLACE
    messagingSenderId: "123456789012",                         // ← REPLACE
    appId: "1:123456789012:web:abcdef123456"                  // ← REPLACE
};
```

Replace ALL the values with your actual Firebase config.

## Example of Real Firebase Config

Your actual config will look something like this (but with different values):

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyCXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    authDomain: "recursivetech-c1bd9.firebaseapp.com",
    projectId: "recursivetech-c1bd9",
    storageBucket: "recursivetech-c1bd9.appspot.com",
    messagingSenderId: "987654321098",
    appId: "1:987654321098:web:abcd1234efgh5678"
};
```

## ⚠️ Important Notes

1. **The `projectId` should stay `recursivetech-c1bd9`** (based on your DEPLOYMENT.md)
2. All other values need to come from your Firebase Console
3. These credentials are safe to expose in frontend code (they're meant to be public)
4. Security is handled by Firebase rules, not by hiding these credentials

## 🚀 After Getting the Credentials

1. Replace the config in [careers.html](careers.html)
2. Deploy the Firebase rules (see FIREBASE_SETUP.md)
3. Test the application
4. Push changes to GitHub

## Can't Access Firebase Console?

If you don't have access to the Firebase project, you have two options:

### Option A: Create a New Firebase Project
1. Go to https://console.firebase.google.com
2. Click "Add project"
3. Create a new project (e.g., "recursive-tech-new")
4. Follow FIREBASE_SETUP.md to set it up
5. Update the config in careers.html with the new project credentials

### Option B: Use the Placeholder (Not Recommended)
The app won't work with placeholder credentials. You MUST use real ones.

---

**Next Step:** See [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for complete setup instructions.
