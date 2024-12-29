const SALT = process.env.SALT;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = "http://localhost/oauth2callback";

export const getSalt = () => SALT;
export const getGoogleClientID = () => GOOGLE_CLIENT_ID;
export const getGoogleClientSecret = () => GOOGLE_CLIENT_SECRET;
export const getGoogleRedirectURI = () => GOOGLE_REDIRECT_URI;
