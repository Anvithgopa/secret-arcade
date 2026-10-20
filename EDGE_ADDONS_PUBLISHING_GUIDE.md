# 🌐 Microsoft Edge Add-ons Publishing Guide for Secret Arcade

> 🟢 **Live Store URL:** [https://microsoftedge.microsoft.com/addons/detail/secret-arcade/aonmpeobhmmlibdiodoechgkocnpncfo](https://microsoftedge.microsoft.com/addons/detail/secret-arcade/aonmpeobhmmlibdiodoechgkocnpncfo)

This guide walks you through submitting **Secret Arcade** to the **Microsoft Edge Add-ons** store.

---

## 📦 1. Your Release Package
The same production `.zip` package built for Chrome works seamlessly on Microsoft Edge without any modifications:
```
release/secret-arcade-v1.0.0.zip
```
- **Size:** ~91 KB
- **Manifest:** Manifest V3
- **Tested & Chromium-Ready:** Chromium APIs (`chrome.storage`, `chrome.runtime`, `chrome.commands`) are fully supported natively by Microsoft Edge.

---

## 🛠️ 2. How to Test Locally in Microsoft Edge

1. Open **Microsoft Edge**.
2. Navigate to `edge://extensions/`.
3. In the left sidebar at the bottom, toggle **Developer mode** to **ON**.
4. Click **Load unpacked** at the top.
5. Select the `./dist` folder.
6. The extension is now loaded in Edge! Click the puzzle piece icon in Edge's toolbar, pin **Secret Arcade**, and test:
   - Popup lobby & cabinets
   - Starting a game & difficulty toggle
   - Escape Mode shortcut (`Ctrl+Shift+X` or `Cmd+Shift+X`)

---

## 🚀 3. Step-by-Step Submission Process

### Step 1: Open Microsoft Partner Center
1. Navigate to: [https://partner.microsoft.com/dashboard/microsoftedge](https://partner.microsoft.com/dashboard/microsoftedge)
2. Sign in with your Microsoft account.
3. If this is your first time:
   - Register as an individual developer.
   - **Cost: $0 / Free** (Unlike Google's $5 fee, Microsoft Edge developer registration is completely free).

---

### Step 2: Create a New Extension
1. Click **"Create new extension"**.
2. Drag and drop your zip file: `release/secret-arcade-v1.0.0.zip`.
3. Wait for the automated validation scan (checks for Manifest V3 and valid syntax).

---

### Step 3: Fill in Store Listing Details

#### **Name**
```
Secret Arcade
```

#### **Short Description (Max 132 characters)**
```
Your tiny escape. A hidden mini arcade inside your browser for quick 5–20 minute breaks with instant disguise mode.
```

#### **Category**
```
Games / Fun
```

#### **Detailed Description**
```markdown
🎮 SECRET ARCADE — YOUR TINY ESCAPE

Need a quick mental reset during work or study? Secret Arcade is a compact, retro-inspired mini-cabinet tucked directly inside your browser toolbar. Designed specifically for healthy 5–20 minute micro-breaks.

🕹️ 8 HAND-CRAFTED RETRO MINI-GAMES:
• Neon Snake — Classic snake reimagined with synthwave grid visuals.
• Brick Breaker — Fast-paced neon paddle & brick-smashing action.
• 2048 Cyber — Smooth numeric slider puzzle with satisfying combos.
• Minesweeper — Tactical grid clearer with modern digital flags.
• Cyber Glider — One-tap flappy physics dodging cyber obstacles.
• Reaction Rush — Test your reflex speed down to the millisecond.
• Memory Match — Cyberpunk glyph and card concentration trainer.
• Tiny Racer — High-speed retro highway lane dodging.

🛡️ BUILT-IN "ESCAPE MODE" (INSTANT DISGUISE):
Press Ctrl+Shift+X (or Cmd+Shift+X on Mac) anytime to instantly conceal your game and display a discreet productivity screen (Calculator, Notes Scratchpad, or System Idle frame).

✨ KEY FEATURES:
• Selectable Difficulty: Low, Medium, and High pacing with score multipliers.
• 8-Bit Chiptune audio & authentic CRT scanlines aesthetic.
• 100% Offline Capable: Play anytime without an internet connection.
• Zero Data Collection: Your scores and preferences stay strictly in your browser.
• Daily 20-min allowance on the Free Tier or unlock Lifetime Unlimited access.

Take your well-deserved break, beat your high score, and return to work recharged!
```

---

### Step 4: Privacy & Permissions Declarations

1. **Permission Justification (`storage`):**
   ```
   The storage permission is used exclusively to save player high scores, user preferences (audio volume, theme, and disguise mode), daily break timer state, and lifetime license activation status locally on the user's device. No data is sent to external servers or tracked.
   ```
2. **Personal Data Collection:** Select **"No"** (this extension does not collect or transmit personal data).
3. **Single Purpose Certification:** Check the certification box.
4. **Privacy Policy URL:** Paste your hosted privacy policy URL (content from `PRIVACY_POLICY.md`).

---

### Step 5: Media & Screenshots
1. **Store Icon:** Upload `public/icons/icon-128.png` (128x128 PNG).
2. **Screenshots:** At least 1 screenshot (1280x800 or 640x400 pixels).

---

### Step 6: Submit
Click **"Publish"** / **"Submit for Review"**.
Review on Microsoft Edge Add-ons typically takes 1 to 3 business days.
