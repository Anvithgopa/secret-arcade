# 🚀 Chrome Web Store Publishing Guide for Secret Arcade

> 🟢 **Live Store URL:** [https://chromewebstore.google.com/detail/secret-arcade/jckaolgojndbcidcomlbjhdmbgmaimep?authuser=0&hl=en](https://chromewebstore.google.com/detail/secret-arcade/jckaolgojndbcidcomlbjhdmbgmaimep?authuser=0&hl=en)

This guide contains everything you need to publish **Secret Arcade** to the Google Chrome Web Store.

---

## 📦 1. Pre-built Release Package
Your production-ready, security-audited extension zip package is generated at:
```
release/secret-arcade-v1.0.0.zip
```
- **Size:** ~91 KB
- **Manifest:** Manifest V3
- **Root Files:** `manifest.json`, `background.js`, `popup.html`, `tab.html`, `assets/`, `icons/`
- **Security:** Zero private API keys, zero remote eval/scripts, zero unnecessary host permissions.

---

## 🛠️ 2. How to Test Locally in Chrome Before Publishing

1. Open Google Chrome.
2. Navigate to `chrome://extensions/`.
3. In the top-right corner, toggle **Developer mode** to **ON**.
4. Click **Load unpacked** in the top-left.
5. Select the `./dist` folder.
6. The extension is now loaded! Click the puzzle icon in Chrome's toolbar and pin **Secret Arcade**.
7. Test the popup, test Escape Mode (`Ctrl+Shift+X` or `Cmd+Shift+X`), and test sound.

---

## 🌐 3. Chrome Web Store Developer Console Submission

### Step 1: Open Developer Dashboard
1. Go to: [https://chrome.google.com/webstore/devconsole](https://chrome.google.com/webstore/devconsole)
2. Sign in with your Google account. (If it's your first time, Google charges a one-time $5 developer registration fee).
3. Click **"+ New Item"**.
4. Drag and drop `release/secret-arcade-v1.0.0.zip`.

---

### Step 2: Store Listing Details (Copy & Paste)

#### **Name**
```
Secret Arcade
```

#### **Summary (Max 132 characters)**
```
Your tiny escape. A hidden mini arcade inside Chrome for quick 5–20 minute breaks with instant disguise mode.
```

#### **Category**
```
Fun / Games
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
• 8-Bit Chiptune audio & authentic CRT scanlines aesthetic.
• 100% Offline Capable: Play anytime without an internet connection.
• Zero Data Collection: Your scores and preferences stay strictly in your browser.
• Daily 20-min allowance on the Free Tier or unlock Lifetime Unlimited access.

Take your well-deserved break, beat your high score, and return to work recharged!
```

---

### Step 3: Privacy & Permissions Declarations (Required by Reviewers)

When asked about permissions and data collection on the **Privacy** tab:

1. **Single Purpose Field:**
   ```
   To provide a collection of lightweight retro mini-arcade games and quick break utilities directly within the browser popup.
   ```

2. **Permission Justification (`storage`):**
   ```
   The storage permission is used exclusively to save player high scores, user preferences (audio volume, theme, and disguise mode), daily break timer state, and lifetime license activation status locally on the user's device. No data is sent to external servers or tracked.
   ```

3. **Data Usage:**
   - Check: *"I certify that this extension complies with the Developer Program Policies."*
   - Check: *"Does not collect or transmit personal data."*

4. **Privacy Policy URL:**
   - Link to your hosted privacy policy (e.g. on GitHub Pages, Notion, or your website using the content from `PRIVACY_POLICY.md`).

---

### Step 4: Graphic Assets Needed

Chrome Web Store requires:
1. **Store Icon:** 128x128 PNG (included in `public/icons/icon-128.png`).
2. **Screenshots:** At least 1 screenshot (1280x800 or 640x400 pixels).
   - Take a quick screenshot of the Arcade popup showing the game catalog and a game in action.
3. **Small Promo Tile (Optional but recommended):** 440x280 PNG.

---

### Step 5: Submit for Review
Click **"Submit for Review"**. Because this extension only requests `storage` and has zero external scripts or host permissions, Chrome Web Store automated scans will pass quickly and manual review typically completes within 24 to 48 hours!
