# Aspire to Expand mobile app (Student version)

_An educational platform for students who want a trustworthy and well built desktop application for learning a new language and more._ 🤓💻📚

## Overview

This app provides students with the ability manage their data, securely pay for classes via Stripe and Paypal, chat via instant messaging, access documents via Google Drive/Docs and S3, use tools such as Google Translate and ChatGPT, attend one-on-one classes with video/audio/screen sharing capabilities and fullscreen view (_NOTE_: support for up to 4 participants, i.e. 1 teacher and 3 students is currently being built), receiving push notifications from teachers and other students, playing games, and more.

## Table of Contents

- [Contact info](#contact-info)
- [Features](#features)
- [Demo](#demo)
- [Installation for development](#installation-for-development)
- [Download production app](#download-production-app)
- [Usage](#usage)
- [Technologies](#technologies)
- [License](#license)

## Contact info

**Developed by:** Mitchell Wintrow

**Email**: owner@winapps.io, mitchellwintrow@gmail.com

## Features

- 🔒 Secure user authentication and authorization, as well as Google SSO _(Under development)_
- 💳 Secure payment and PCI DSS compliance via Stripe and Paypal for classes _(Under development)_
- 🌍 Multi-language support _(Currently supports Ukrainian, Russian, and German. Support is being developed for Spanish, French, Hebrew, Arabic, Chinese, Japanese, Portugeuse, Vietnamese, and Korean. Please reach out for support with any languages not mentioned and we'll see what we can do for you!)_
- 🎥 Encrypted video conferencing and screen sharing with up to 4 partipants via WebRTC _(Under development)_
- 💬 Instant messaging with teachers and other students via WebSockets _(Under development)_
- 🗂️ Integration with S3 (AWS) _(Under development)_
- 📂 Integration with Google Drive/Docs _(Under development)_
- ㊙️ Integration with Google Translate _(Under development)_
- 🤖 Integration with ChatGPT _(Under development)_
- 🎮 Gamification _(Under development)_
- 🔔 Push notifications _(Under development)_

## Demo

![gifDemo](./mobileDemo.gif)

More demos will be added over time...

## Installation for development

**For Mac/Linux**

THE STEPS BELOW NEED TO BE UPDATED FOR MOBILE

```bash
# Step 1: Clone the repo
git clone https://github.com/mrrobotisreal/AspireToExpandMobile.git

# Step 2: Enter project directory and install dependencies
cd AspireToExpandMobile
npm install

# Step 3: Create required environment variables
export MAIN_SERVER_URL=<your-instance-hosting-AspireToExpandServer>
export WS_VIDEO_SERVER_URL=<your-instance-hosting-AspireToExpandClassroomServer>
export WS_CHAT_SERVER_URL=<your-instance-hosting-AspireToExpandChatServer>
export HTTP_CHAT_SERVER_URL=<your-instance-hosting-AspireToExpandChatServer>
export SALT=<your-preferred-salt>
export GOOGLE_CLIENT_ID=<your-google-app-client-id>
export GOOGLE_CLIENT_SECRET=<your-google-app-client-secret>
export STRIPE_SECRET_KEY=<your-stripe-secret-key>
export STRIPE_PUBLISHABLE_KEY=<your-stripe-publishable-key>

# Step 4: Run webpack dev server in one terminal
export NODE_ENV="development"
npm run react-dev

# Step 5: Start the app in another terminal
export NODE_ENV="development"
npm run start-node
```

**For Windows (Powershell)**

THE STEPS BELOW NEED TO BE UPDATED FOR MOBILE

```powershell
# Step 1: Clone the repo
git clone https://github.com/mrrobotisreal/AspireToExpandMobile.git

# Step 2: Enter project directory and install dependencies
cd AspireToExpandMobile
npm install

# Step 3: Create required environment variables
$Env:MAIN_SERVER_URL = <your-instance-hosting-AspireToExpandServer>
$Env:WS_VIDEO_SERVER_URL = <your-instance-hosting-AspireToExpandClassroomServer>
$Env:WS_CHAT_SERVER_URL = <your-instance-hosting-AspireToExpandChatServer>
$Env:HTTP_CHAT_SERVER_URL = <your-instance-hosting-AspireToExpandChatServer>
$Env:SALT = <your-preferred-salt>
$Env:GOOGLE_CLIENT_ID = <your-google-app-client-id>
$Env:GOOGLE_CLIENT_SECRET = <your-google-app-client-secret>
$Env:STRIPE_SECRET_KEY = <your-stripe-secret-key>
$Env:STRIPE_PUBLISHABLE_KEY = <your-stripe-publishable-key>

# Step 4: Run webpack dev server in one terminal
$Env:NODE_ENV = "development"
npm run react-dev

# Step 5: Start the app in another terminal
$Env:NODE_ENV = "development"
npm run wstart-node
```

**For Windows (Command Line)**

THE STEPS BELOW NEED TO BE UPDATED FOR MOBILE

```cmd
rem Step 1: Clone the repo
git clone https://github.com/mrrobotisreal/AspireToExpandMobile.git

rem Step 2: Enter project directory and install dependencies
cd AspireToExpandMobile
npm install

rem Step 3: Create required environment variables
set MAIN_SERVER_URL=<your-instance-hosting-AspireToExpandServer>
set WS_VIDEO_SERVER_URL=<your-instance-hosting-AspireToExpandClassroomServer>
set WS_CHAT_SERVER_URL=<your-instance-hosting-AspireToExpandChatServer>
set HTTP_CHAT_SERVER_URL=<your-instance-hosting-AspireToExpandChatServer>
set SALT=<your-preferred-salt>
set GOOGLE_CLIENT_ID=<your-google-app-client-id>
set GOOGLE_CLIENT_SECRET=<your-google-app-client-secret>
set STRIPE_SECRET_KEY=<your-stripe-secret-key>
set STRIPE_PUBLISHABLE_KEY=<your-stripe-publishable-key>

# Step 4: Run webpack dev server in one terminal
set NODE_ENV="development"
npm run react-dev

# Step 5: Start the app in another terminal
set NODE_ENV="development"
npm run wstart-node
```

**NOTE:** There is an issue with Webpack 5 and bcryptjs. Currently the only way to fix this issue is by manually going into `node_modules/bcryptjs/package.json` and change `"browser"` from this:

```
"browser": "dist/bcrypt.js"
```

To this:

```
"browser": {
  "bin": "dist/bcrypt.js",
  "crypto": false
}
```

This isn't an issue for the finalized app because I'll be building a cross-platform binary with Electron, but for development purposes I felt it was important to include this fix mentioned above.

## Download production app

A download link to the finalized production app version will be posted here...

## Usage

**NOTE**: In order to first log in to this app, you must manually insert a registration code into the MongoDB database on your instance of the AspireToExpandServer with the following properties:

```mongosh
db.students.insertOne({
  "registrationcode":"<your-desired-registration-code>",
  "emailaddress":"<your-email-address>",
  "firstname":"<your-first-name>",
  "lastname":"<your-last-name>"
})
```

## Technologies

![Electron](https://img.shields.io/badge/Electron-2B2E3A?logo=electron&logoColor=fff)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)
![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-000020?logo=expo&logoColor=fff)
![React Native](https://img.shields.io/badge/React_Native-%2320232a.svg?logo=react&logoColor=%2361DAFB)
![React Query](https://img.shields.io/badge/React%20Query-FF4154?logo=reactquery&logoColor=fff)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?logo=mongodb&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?logo=chartdotjs&logoColor=fff)
![Stripe](https://img.shields.io/badge/Stripe-5851DD?logo=stripe&logoColor=fff)
![PayPal](https://img.shields.io/badge/PayPal-003087?logo=paypal&logoColor=fff)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?logo=amazon-web-services&logoColor=white)
![Google Translate](https://img.shields.io/badge/Google_Translate-blue?style=flat&logo=googletranslate&logoColor=white&logoSize=auto)
![Google Drive](https://img.shields.io/badge/Google%20Drive-4285F4?logo=googledrive&logoColor=fff)
![ChatGPT](https://img.shields.io/badge/ChatGPT-74aa9c?logo=openai&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=fff)
![Android](https://img.shields.io/badge/Android-3DDC84?logo=android&logoColor=white)
![iOS](https://img.shields.io/badge/iOS-000000?&logo=apple&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=fff)
![Neovim](https://img.shields.io/badge/Neovim-57A143?logo=neovim&logoColor=fff)
![Visual Studio Code](https://custom-icon-badges.demolab.com/badge/Visual%20Studio%20Code-0078d7.svg?logo=vsc&logoColor=white)
![Static Badge](https://img.shields.io/badge/WinApps-Solutions-%232f56a0?labelColor=%232f56a0&color=%23ff6f00)

## License

This project is licensed under the **Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License**.

- You can view and share this code for **non-commercial purposes** as long as proper credit is given.
- **Forking, modifications, or derivative works are not allowed.**

For the full license text, visit [Creative Commons License](https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode).

---

This product is developed and owned by [WinApps Solutions LLC ©2024](https://winapps.io)

![WinApps Logo](./WinAppsLogo.svg)
