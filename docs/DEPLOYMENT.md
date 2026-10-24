# Ma3 - Deployment Guide

This guide covers deploying the Ma3 web application to Vercel, Firebase Hosting, and building/installing the Android APK.

---

## Table of Contents

1. [Web Deployment (Vercel)](#web-deployment-vercel)
2. [Web Deployment (Firebase Hosting)](#web-deployment-firebase-hosting)
3. [Android APK Build (GitHub Actions)](#android-apk-build-github-actions)
4. [Installing the APK](#installing-the-apk)
5. [Troubleshooting](#troubleshooting)

---

## Web Deployment (Vercel)

### Prerequisites

- GitHub account with the repository
- Vercel account (free tier available at [vercel.com](https://vercel.com))

### Step-by-Step Deployment

#### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Sign up/Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account

2. **Import Project**
   - Click **"Add New..."** → **"Project"**
   - Select **"Import Git Repository"**
   - Find and select your `mat` repository
   - Click **"Import"**

3. **Configure Project Settings**
   ```
   Framework Preset: Vite
   Root Directory: apps/web
   Build Command: pnpm build
   Output Directory: dist
   Install Command: pnpm install
   ```

4. **Environment Variables** (Optional)
   - Add any required environment variables:
   ```
   VITE_API_URL=https://api.ma3.co.ke
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   ```

5. **Deploy**
   - Click **"Deploy"**
   - Wait for the build to complete (2-3 minutes)
   - Your site will be live at `https://your-project.vercel.app`

#### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Navigate to web app**
   ```bash
   cd apps/web
   ```

4. **Deploy**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? **Select your account**
   - Link to existing project? **N** (first time)
   - Project name? **ma3-web**
   - Directory with code? **./** (current)
   - Override settings? **N**

5. **Production Deployment**
   ```bash
   vercel --prod
   ```

### Custom Domain Setup

1. Go to your project in Vercel Dashboard
2. Click **"Settings"** → **"Domains"**
3. Add your domain: `ma3.co.ke`
4. Follow DNS configuration instructions:
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Or add A record pointing to `76.76.19.19`

### Automatic Deployments

Once connected, Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request

---

## Web Deployment (Firebase Hosting)

Firebase Hosting provides fast, secure hosting for your web app with a global CDN.

### Prerequisites

- Firebase account at [firebase.google.com](https://firebase.google.com)
- Node.js installed
- Firebase CLI installed

### Step-by-Step Deployment

#### 1. Install Firebase CLI

```bash
npm install -g firebase-tools
```

#### 2. Login to Firebase

```bash
firebase login
```

This opens a browser window for Google authentication.

#### 3. Initialize Firebase (First Time Only)

If starting fresh, run from the project root:

```bash
firebase init hosting
```

Select:
- Use existing project: `ma3-app`
- Public directory: `apps/web/dist`
- Configure as SPA: `Yes`
- Set up automatic builds with GitHub: `No` (we use our own CI/CD)

**Note:** The project already includes `firebase.json` and `.firebaserc` configured for Ma3.

#### 4. Build the Web App

```bash
# From project root
pnpm build:web

# Or from apps/web directory
cd apps/web
pnpm build
```

#### 5. Deploy to Firebase

```bash
# From project root
firebase deploy --only hosting:ma3
```

After deployment, your app will be live at: **https://ma3.web.app**

### Custom Domain Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project → **Hosting**
3. Click **"Add custom domain"**
4. Enter: `ma3.co.ke`
5. Follow DNS verification steps:
   - Add TXT record for verification
   - Add A records pointing to Firebase IPs

### Firebase vs Vercel

| Feature | Firebase Hosting | Vercel |
|---------|------------------|--------|
| CDN | Global | Global |
| Free tier | 10GB/month | 100GB/month |
| Custom domain | Yes | Yes |
| Preview deploys | Manual | Automatic |
| Best for | Firebase ecosystem | Git-based workflow |

**Recommendation:** Use Firebase Hosting if you're already using Firebase Auth. Use Vercel for automatic preview deployments on PRs.

---

## Android APK Build (GitHub Actions)

### How It Works

The repository includes a GitHub Actions workflow that automatically builds an Android APK when you push changes to the `main` branch.

### Triggering a Build

#### Automatic Trigger
Push any changes to files in:
- `apps/mobile/**`
- `packages/shared/**`

```bash
git add .
git commit -m "feat: update mobile app"
git push origin main
```

#### Manual Trigger
1. Go to your repository on GitHub
2. Click **"Actions"** tab
3. Select **"Build Android APK"** workflow
4. Click **"Run workflow"** → **"Run workflow"**

### Monitoring the Build

1. Go to **Actions** tab in your GitHub repository
2. Click on the running workflow
3. Watch the build progress (takes ~10-15 minutes)
4. Check each step for any errors

### Downloading the APK

1. **Wait for build to complete** (green checkmark)

2. **Go to the workflow run**
   - Click on the completed workflow run

3. **Download Artifact**
   - Scroll down to **"Artifacts"** section
   - Click **"ma3-apk"** to download
   - This downloads a ZIP file

4. **Extract the APK**
   - Unzip the downloaded file
   - Find `ma3-<commit-hash>.apk`

---

## Installing the APK

### On Android Device

#### Method 1: Direct Transfer

1. **Connect phone to computer** via USB cable

2. **Copy APK to phone**
   - Copy the APK file to your phone's Downloads folder

3. **Enable Unknown Sources**
   - Go to **Settings** → **Security** (or **Privacy**)
   - Enable **"Install unknown apps"** or **"Unknown sources"**
   - On newer Android: Allow your file manager to install apps

4. **Install the APK**
   - Open your file manager
   - Navigate to Downloads
   - Tap on the APK file
   - Tap **"Install"**

#### Method 2: Via ADB (Developer)

1. **Enable USB Debugging** on your phone
   - Settings → About Phone → Tap "Build Number" 7 times
   - Settings → Developer Options → Enable USB Debugging

2. **Install via ADB**
   ```bash
   adb install matatu-connect-<hash>.apk
   ```

#### Method 3: Share via Cloud/Email

1. Upload APK to Google Drive, Dropbox, or email it
2. Download on your phone
3. Install as described above

### On Android Emulator

1. **Start emulator** (Android Studio or standalone)

2. **Drag and drop** the APK onto the emulator window

   OR

3. **Use ADB**
   ```bash
   adb install matatu-connect-<hash>.apk
   ```

---

## Troubleshooting

### Vercel Deployment Issues

#### Build Fails with "pnpm not found"
- Ensure `packageManager` is set in root `package.json`:
  ```json
  "packageManager": "pnpm@9.0.0"
  ```

#### Build Fails with Module Not Found
- Check that `Root Directory` is set to `apps/web`
- Verify all dependencies are in `package.json`

#### Environment Variables Not Working
- Prefix with `VITE_` for Vite apps
- Redeploy after adding variables

### GitHub Actions Build Issues

#### Assets Not Found
The workflow automatically generates placeholder assets if missing. If you still get errors:
1. Run locally: `cd apps/mobile && node scripts/generate-assets.js`
2. Commit and push the generated assets

#### Java/Gradle Errors
- The workflow uses Java 17 (Temurin)
- If you see memory errors, the workflow already sets `-Xmx4g`

#### Expo Prebuild Fails
- Check `app.json` for syntax errors
- Ensure all plugins are installed
- Run locally first: `npx expo prebuild --platform android`

### APK Installation Issues

#### "App not installed" Error
- Uninstall any existing version first
- Check if you have enough storage
- Try enabling "Install from unknown sources"

#### "Parse Error"
- APK might be corrupted - re-download
- Check Android version compatibility (minimum SDK)

#### App Crashes on Launch
- Check if all permissions are granted
- Look at logcat for errors:
  ```bash
  adb logcat | grep -i "ma3"
  ```

---

## Production Checklist

### Before Deploying Web

- [ ] Update `VITE_API_URL` to production API
- [ ] Test all pages and features
- [ ] Check responsive design
- [ ] Verify SEO meta tags
- [ ] Test dark/light mode

### Before Building APK for Release

- [ ] Replace placeholder icons with real designs
  - `assets/icon.png` (1024x1024)
  - `assets/adaptive-icon.png` (1024x1024)
  - `assets/splash.png` (1284x2778)
- [ ] Update `app.json` version and versionCode
- [ ] Test on multiple Android versions
- [ ] Sign APK with release keystore (for Play Store)
- [ ] Test all features on real device

### For Play Store Release

1. Create a signing keystore
2. Configure EAS for production builds
3. Build AAB (Android App Bundle) instead of APK
4. Create Play Store listing
5. Submit for review

---

## Quick Reference

### Vercel Commands
```bash
# Install CLI
npm i -g vercel

# Login
vercel login

# Deploy preview
vercel

# Deploy production
vercel --prod

# List deployments
vercel ls
```

### Expo/EAS Commands
```bash
# Install EAS CLI
npm i -g eas-cli

# Login
eas login

# Configure
eas build:configure

# Build APK (local)
npx expo prebuild --platform android
cd android && ./gradlew assembleRelease

# Build APK (cloud)
eas build --platform android --profile preview

# Build for Play Store
eas build --platform android --profile production
```

### ADB Commands
```bash
# List devices
adb devices

# Install APK
adb install app.apk

# Uninstall app
adb uninstall com.ma3.app

# View logs
adb logcat

# Take screenshot
adb exec-out screencap -p > screenshot.png
```

---

## Support

If you encounter issues:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review GitHub Actions logs for build errors
3. Check Vercel deployment logs
4. Open an issue on GitHub

---

*Last updated: January 2026*
