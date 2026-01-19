# Activity Create - React Native

A React Native app built with Expo that generates fun activity ideas for different age groups.

## Features

- Shake your phone to get activity suggestions
- Save favorite activities
- Activity history tracking
- Database integration with Supabase
- Works on iOS and Android

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (optional, can use npx)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on your device:
   - Install Expo Go app on your phone
   - Scan the QR code from the terminal

### Running on Simulators/Emulators

**iOS Simulator:**
```bash
npm run ios
```

**Android Emulator:**
```bash
npm run android
```

## Project Structure

```
├── src/
│   ├── App.tsx           # Main app component
│   └── lib/
│       ├── database.ts   # Database operations
│       └── supabase.ts   # Supabase client configuration
├── app.json              # Expo configuration
├── index.js              # App entry point
└── package.json
```

## Technologies Used

- React Native
- Expo
- TypeScript
- Supabase (Database & Auth)
- AsyncStorage (Local storage)
- Expo Sensors (Accelerometer for shake detection)

## Environment Variables

The app uses the following environment variables (configured in `app.json`):
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

## Building for Production

### iOS

1. Configure your bundle identifier in `app.json`
2. Build with EAS:
```bash
npx eas build --platform ios
```

### Android

1. Configure your package name in `app.json`
2. Build with EAS:
```bash
npx eas build --platform android
```

## License

Private
