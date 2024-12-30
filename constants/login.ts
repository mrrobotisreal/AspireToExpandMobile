import Constants from "expo-constants";

// @ts-ignore
const { SALT, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } =
  Constants.expoConfig!.extra;

export const getSalt = () => SALT;
export const getGoogleClientID = () => GOOGLE_CLIENT_ID;
export const getGoogleClientSecret = () => GOOGLE_CLIENT_SECRET;
export const getGoogleRedirectURI = () => GOOGLE_REDIRECT_URI;
