import "dotenv/config";

export default {
  expo: {
    name: "AspireWithAlinaMobile",
    slug: "AspireWithAlinaMobile",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/appIcon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    splash: {
      image: "./assets/images/appIcon.png",
      resizeMode: "contain",
      backgroundColor: "#333333",
    },
    ios: {
      icon: "./assets/images/appIcon.png",
      supportsTablet: true,
    },
    android: {
      icon: "./assets/images/appIcon.png",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: ["expo-router"],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      MAIN_SERVER_URL: process.env.MAIN_SERVER_URL,
      WS_VIDEO_SERVER_URL: process.env.WS_VIDEO_SERVER_URL,
      WS_MAIN_CHAT_SERVER_URL: process.env.WS_MAIN_CHAT_SERVER_URL,
      CHAT_UPLOADS_SERVER_URL: process.env.CHAT_UPLOADS_SERVER_URL,
      WS_CHAT_SERVER_URL: process.env.WS_CHAT_SERVER_URL,
      HTTP_CHAT_SERVER_URL: process.env.HTTP_CHAT_SERVER_URL,
      PAYMENT_SERVER_URL: process.env.PAYMENT_SERVER_URL,
      SALT: process.env.SALT,
      STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
      GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
      MOBILE_HASHING_SERVER_URL: process.env.MOBILE_HASHING_SERVER_URL,
    },
  },
};
