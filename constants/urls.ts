import Constants from "expo-constants";

const {
  // @ts-ignore
  MAIN_SERVER_URL,
  // @ts-ignore
  VIDEO_SERVER_URL,
  // @ts-ignore
  MAIN_CHAT_SERVER_URL,
  // @ts-ignore
  CHAT_UPLOADS_SERVER_URL,
  // @ts-ignore
  CHAT_SERVER_URL,
  // @ts-ignore
  HTTP_CHAT_SERVER_URL,
  // @ts-ignore
  PAYMENT_SERVER_URL,
  // @ts-ignore
  OPENAI_API_KEY,
  // @ts-ignore
  STRIPE_PUBLISHABLE_KEY,
  // @ts-ignore
  MOBILE_HASHING_SERVER_URL,
} = Constants.expoConfig!.extra;

export const getMainServerURL = () => MAIN_SERVER_URL;
export const getVideoServerURL = () => VIDEO_SERVER_URL;
export const getMainChatServerURL = () => MAIN_CHAT_SERVER_URL;
export const getChatUploadsServerURL = () => CHAT_UPLOADS_SERVER_URL;
export const getChatServerURL = () => CHAT_SERVER_URL;
export const getHTTPChatServerURL = () => HTTP_CHAT_SERVER_URL;
export const getPaymentServerURL = () => PAYMENT_SERVER_URL;
export const getOpenaiApiKey = () => OPENAI_API_KEY;
export const getStripePublishableKey = () => STRIPE_PUBLISHABLE_KEY;
export const getMobileHashingServerURL = () => MOBILE_HASHING_SERVER_URL;
