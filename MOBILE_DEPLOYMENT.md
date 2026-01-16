# Mobile App Deployment Guide

Your React web app has been successfully converted to a native mobile app using Capacitor!

## App Information
- **App Name**: Activity Create
- **Bundle ID**: com.activitycreate.app
- **Platforms**: iOS and Android

## Prerequisites

### For iOS Development:
- macOS computer
- Xcode 15 or later (download from Mac App Store)
- Apple Developer Account ($99/year for App Store distribution)

### For Android Development:
- Android Studio (download from https://developer.android.com/studio)
- Java Development Kit (JDK) 17 or later

## Development Workflow

### 1. Make Changes to Your App
Edit your React code in the `src/` directory as usual.

### 2. Build and Sync
After making changes, run:
```bash
npm run cap:sync
```
This builds your web app and copies it to both iOS and Android projects.

### 3. Open in Native IDEs

**For iOS:**
```bash
npm run cap:ios
```
This opens Xcode where you can:
- Run the app on the iOS Simulator
- Test on a physical iPhone/iPad (requires Apple Developer account)
- Configure app icons, splash screens, and signing
- Build and submit to the App Store

**For Android:**
```bash
npm run cap:android
```
This opens Android Studio where you can:
- Run the app on an Android Emulator
- Test on a physical Android device
- Configure app icons, splash screens, and signing
- Build and submit to Google Play Store

## Publishing to App Stores

### iOS App Store:

1. **Open Xcode** using `npm run cap:ios`

2. **Configure Signing:**
   - Select your project in Xcode
   - Go to "Signing & Capabilities"
   - Select your Team (requires Apple Developer account)
   - Xcode will automatically manage signing

3. **Add App Icons and Launch Screen:**
   - In Xcode, go to `App` > `Assets.xcassets`
   - Add your app icon (1024x1024px)
   - Customize the splash screen if needed

4. **Archive and Submit:**
   - In Xcode menu: Product > Archive
   - Once archived, click "Distribute App"
   - Follow the wizard to submit to App Store Connect
   - Complete your app listing in App Store Connect
   - Submit for review

### Google Play Store:

1. **Open Android Studio** using `npm run cap:android`

2. **Configure Signing:**
   - In Android Studio, go to Build > Generate Signed Bundle / APK
   - Create a keystore file (keep this safe!)
   - Note down the keystore password

3. **Add App Icons and Splash Screen:**
   - Icons are in `android/app/src/main/res/mipmap-*` folders
   - Replace with your app icons (multiple sizes)

4. **Build Release APK/Bundle:**
   - Build > Generate Signed Bundle / APK
   - Select "Android App Bundle" (recommended)
   - Sign with your keystore
   - Build the release version

5. **Upload to Play Console:**
   - Go to Google Play Console (https://play.google.com/console)
   - Create a new app
   - Fill in app details, screenshots, description
   - Upload your signed App Bundle
   - Submit for review

## Environment Variables

Your app uses environment variables from the `.env` file. For production:

1. Make sure sensitive keys are properly secured
2. Consider using different environment files for development/production
3. Never commit `.env` to version control

## Testing on Physical Devices

### iOS:
- Connect iPhone/iPad via USB
- Select your device in Xcode
- Click "Run" (requires Apple Developer account)

### Android:
- Enable Developer Mode on your Android device
- Enable USB Debugging
- Connect via USB
- Select your device in Android Studio
- Click "Run"

## Helpful Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [iOS App Store Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Google Play Store Guidelines](https://play.google.com/console/about/guides/releasewithconfidence/)
- [Apple Developer Portal](https://developer.apple.com/)
- [Google Play Console](https://play.google.com/console)

## Need Help?

- Capacitor Discord: https://discord.gg/UPYYRhtyzp
- Stack Overflow: Tag your questions with `capacitor` and `ionic-framework`
