# Custom App Icon Setup

## For Android Icons:
After building your APK, to customize the app icon:

1. **Prepare your icon**: Create a square PNG image (1024x1024 recommended)
2. **Generate icon sizes**: Use an online tool like https://icon.kitchen or Android Asset Studio to generate all required sizes
3. **Place icons in your project**:
   - Copy generated icons to `android/app/src/main/res/` folders:
     - `mipmap-mdpi/ic_launcher.png` (48x48)
     - `mipmap-hdpi/ic_launcher.png` (72x72) 
     - `mipmap-xhdpi/ic_launcher.png` (96x96)
     - `mipmap-xxhdpi/ic_launcher.png` (144x144)
     - `mipmap-xxxhdpi/ic_launcher.png` (192x192)

4. **Rebuild**: Run `npm run build` then `npx cap sync` then rebuild APK

## For iOS Icons:
1. **Prepare your icon**: Create a square PNG image (1024x1024)
2. **Use Xcode**: Open the iOS project in Xcode
3. **Add to App Icons**: In Xcode, go to Images.xcassets > AppIcon and drag your 1024x1024 icon
4. **Rebuild**: Build from Xcode or `npx cap run ios`

## Automatic Icon Generation (RECOMMENDED):
The Capacitor Assets plugin is already installed. To generate your custom icon:
```bash
npx capacitor-assets generate --iconPath src/assets/app-icon.jpeg
```

This will automatically create all required icon sizes for both Android and iOS platforms.