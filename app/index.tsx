import { useState } from "react";
import { Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  ActivityIndicator,
  Button,
  HelperText,
  Surface,
  Text,
  TextInput,
} from "react-native-paper";
import { useIntl } from "react-intl";
import { useRouter } from "expo-router";
// @ts-ignore
import bcrypt from "react-native-bcrypt";
import { google } from "googleapis";

import { useStudentContext } from "../context/studentContext";
import { useThemeContext } from "../context/themeContext";
import { useLocaleContext } from "../context/localeContext";
import { getMainServerURL, getMobileHashingServerURL } from "../constants/urls";
import {
  getSalt,
  getGoogleClientID,
  getGoogleClientSecret,
  getGoogleRedirectURI,
} from "../constants/login";
import { View } from "@/components/Themed";

export default function TabOneScreen() {
  const router = useRouter();
  const intl = useIntl();
  const {
    theme,
    gradientColors,
    toggleThemeMode,
    changeFontStyle,
    smallFont,
    mediumFont,
    largeFont,
  } = useThemeContext();
  const { getInfo, updateInfo, updateInfoOnServer } = useStudentContext();
  const { changeLocale } = useLocaleContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(true);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [registrationCodeInput, setRegistrationCodeInput] = useState("");

  const handleRegistration = async () => {
    setIsLoading(true);
    try {
      // router.push({
      //   pathname: "/screens/studentInfoForm",
      //   params: {
      //     first_name: "Mitchell" as string,
      //     last_name: "Wintrow" as string,
      //     email_address: "90mitchwintrow@gmail.com" as string,
      //   },
      // });

      if (registrationCodeInput === "") {
        console.error("Registration code is required"); // TODO: localize; add toast
        setIsLoading(false);
        return;
      } else {
        const response = await fetch(
          `${getMainServerURL()}/validate/registration`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            body: JSON.stringify({ registration_code: registrationCodeInput }),
          }
        );

        if (response.status === 200) {
          const body = await response.json();
          updateInfo({
            first_name: body.first_name,
            last_name: body.last_name,
            email_address: body.email_address,
            theme_mode: "light",
            font_style: "Bauhaus",
          });
          router.push({
            pathname: "/(main)/screens/studentInfoForm",
            params: {
              first_name: body.first_name as string,
              last_name: body.last_name as string,
              email_address: body.email_address as string,
            },
          });
        } else {
          console.error("Registration code is invalid!"); // TODO: localize; add toast
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error registering user:", error); // TODO: localize; add toast
      setIsLoading(false);
      throw error;
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      if (emailInput === "" || passwordInput === "") {
        console.error("Email address and password are required"); // TODO: localize; add toast
        setIsLoading(false);
        return;
      } else {
        console.log("Logging in...");
        let passwordHash: string;
        console.log(getMobileHashingServerURL());
        const hashResponse = await fetch(
          `${getMobileHashingServerURL()}/hash`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            body: JSON.stringify({ password: passwordInput }),
          }
        );
        if (hashResponse.status === 200) {
          const text = await hashResponse.text();
          console.log("Password hashed successfully:", text);
          passwordHash = text;
        } else {
          console.error("Error hashing password:", hashResponse.statusText); // TODO: localize; add toast
          setIsLoading(false);
          return;
        }

        const response = await fetch(`${getMainServerURL()}/validate/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=UTF-8" },
          body: JSON.stringify({
            email_address: emailInput,
            password: passwordHash,
          }),
        });

        if (response.status === 200) {
          const body = await response.json();
          console.log("Login response:", body);

          updateInfo({
            student_id: body.student_id,
            first_name: body.first_name,
            preferred_name: body.preferred_name,
            last_name: body.last_name,
            email_address: body.email_address,
            native_language: body.native_language,
            preferred_language: body.preferred_language,
            student_since: body.student_since,
            theme_mode: body.theme_mode,
            font_style: body.font_style,
            profile_picture_url: body.profile_picture_url,
            profile_picture_path: body.profile_picture_path,
            time_zone: body.time_zone,
            lessons_remaining: body.lessons_remaining,
            lessons_completed: body.lessons_completed,
          });
          toggleThemeMode(
            !body.theme_mode || body.theme_mode === ""
              ? "light"
              : body.theme_mode
          );
          if (body.preferred_language) {
            changeLocale(body.preferred_language);
          }
          if (body.font_style) {
            changeFontStyle(body.font_style);
          }
          if (body.student_id) {
            // TODO: connect to chat server
            // connectChatWebSocket(body.student_id);
          } else {
            console.error(
              "Student ID not found in response, cannot connect to chat server!"
            ); // TODO: localize; add toast
          }
          if (!body.public_key) {
            // TODO: generate key pair
            // const keyPair = await generateKeyPair();
            // if (keyPair) {
            //   updateInfoOnServer({
            //     student_id: body.student_id,
            //     email_address: emailInput,
            //     public_key: keyPair.publicKey,
            //   });
            // } else {
            //   console.error(
            //     "Error generating key pair, data not being encrypted!"
            //   ); // TODO: localize; add toast
            // }
          }
          router.push({
            pathname: "/(main)/screens/home",
            params: {
              student_id: body.student_id as string,
              first_name: body.first_name as string,
              preferred_name: body.preferred_name as string,
              last_name: body.last_name as string,
              email_address: body.email_address as string,
              native_language: body.native_language as string,
              preferred_language: body.preferred_language as string,
              student_since: body.student_since as string,
              theme_mode: body.theme_mode as string,
              font_style: body.font_style as string,
              profile_picture_url: body.profile_picture_url as string,
              profile_picture_path: body.profile_picture_path as string,
              time_zone: body.time_zone as string,
              lessons_remaining: body.lessons_remaining as number,
              lessons_completed: body.lessons_completed as number,
            },
          });
        } else if (response.status === 401) {
          console.error("Invalid email address or password!"); // TODO: localize; add toast
        } else if (response.status >= 500) {
          console.error("Server error:", response.statusText); // TODO: localize; add toast
        } else {
          console.error("Unknown error:", response.statusText); // TODO: localize; add toast
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error logging in:", error); // TODO: localize; add toast
      setIsLoading(false);
      throw error;
    }
  };

  // TODO: Implement Google OAuth2 login and expo-auth-session

  return (
    <LinearGradient
      style={styles.container}
      colors={gradientColors}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0 }}
    >
      <Surface
        style={{
          ...styles.box,
          backgroundColor: theme.dark
            ? theme.colors.surface
            : theme.colors.background,
        }}
      >
        <View style={styles.headerBox}>
          <Text
            variant="bodySmall"
            style={{
              ...styles.titleText,
              color: theme.colors.textPrimary,
            }}
          >
            {isLoginVisible
              ? intl.formatMessage({ id: "welcomeScreen_loginTitle" })
              : intl.formatMessage({ id: "welcomeScreen_welcomeTitle" })}
          </Text>
          <Text
            variant="titleLarge"
            style={{
              ...styles.titleText,
              color: theme.colors.textPrimary,
              fontFamily: "Bauhaus-Heavy",
            }}
          >
            {intl.formatMessage({ id: "appTitle" })}!
          </Text>
          <Surface
            elevation={5}
            style={{
              borderRadius: 12,
              width: 200,
              height: 200,
              alignSelf: "center",
              marginVertical: 10,
              backgroundColor: theme.dark
                ? theme.colors.surfaceDark
                : theme.colors.surface,
            }}
          >
            <Image
              source={require("../assets/images/appIcon.png")}
              style={{
                width: 200,
                height: 200,
                borderRadius: 12,
              }}
            />
          </Surface>
        </View>
        {isLoginVisible ? (
          <View
            style={{
              marginBottom: 20,
            }}
          >
            <Text
              variant="bodyMedium"
              style={{
                ...styles.labelText,
                color: theme.colors.textPrimary,
                fontFamily: "Bauhaus-Heavy",
              }}
            >
              {intl.formatMessage({ id: "welcomeScreen_inputEmail" })}:
            </Text>
            <TextInput
              mode="outlined"
              onChangeText={setEmailInput}
              value={emailInput}
              keyboardType="email-address"
              autoCapitalize="none"
              style={{
                marginBottom: 12,
                maxHeight: 60,
                backgroundColor: theme.colors.surface,
              }}
              contentStyle={{
                fontFamily: "Bauhaus-Medium",
                color: theme.colors.textPrimary,
              }}
              outlineStyle={{
                borderColor: theme.dark
                  ? theme.colors.secondaryLight
                  : theme.colors.secondary,
                backgroundColor: theme.colors.surface,
              }}
              activeOutlineColor={
                theme.dark
                  ? theme.colors.secondaryLight
                  : theme.colors.secondary
              }
              placeholder={intl.formatMessage({ id: "common_emailAddress" })}
              placeholderTextColor={theme.colors.textSecondary}
            />
            <Text
              variant="bodyMedium"
              style={{
                ...styles.labelText,
                color: theme.colors.textPrimary,
                fontFamily: "Bauhaus-Heavy",
              }}
            >
              {intl.formatMessage({ id: "welcomeScreen_inputPassword" })}:
            </Text>
            <TextInput
              mode="outlined"
              onChangeText={setPasswordInput}
              value={passwordInput}
              secureTextEntry={!showPassword}
              right={
                <TextInput.Icon
                  icon={showPassword ? "eye-off" : "eye"}
                  color={
                    theme.dark
                      ? theme.colors.secondaryLight
                      : theme.colors.secondary
                  }
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              style={{
                marginBottom: 12,
                maxHeight: 60,
                backgroundColor: theme.colors.surface,
              }}
              contentStyle={{
                fontFamily: "Bauhaus-Medium",
                color: theme.colors.textPrimary,
              }}
              outlineStyle={{
                borderColor: theme.dark
                  ? theme.colors.secondaryLight
                  : theme.colors.secondary,
                backgroundColor: theme.colors.surface,
              }}
              activeOutlineColor={
                theme.dark
                  ? theme.colors.secondaryLight
                  : theme.colors.secondary
              }
              placeholder={intl.formatMessage({ id: "common_passwordTitle" })}
              placeholderTextColor={theme.colors.textSecondary}
            />
          </View>
        ) : (
          <View
            style={{
              marginBottom: 20,
            }}
          >
            <Text
              variant="bodyMedium"
              style={{
                ...styles.labelText,
                color: theme.colors.textPrimary,
                fontFamily: "Bauhaus-Heavy",
              }}
            >
              {intl.formatMessage({ id: "registrationCodeInputLabel" })}:
            </Text>
            <TextInput
              mode="outlined"
              onChangeText={setRegistrationCodeInput}
              value={registrationCodeInput}
              style={{
                marginBottom: 12,
                maxHeight: 60,
                backgroundColor: theme.colors.surface,
              }}
              contentStyle={{
                fontFamily: "Bauhaus-Medium",
                color: theme.colors.textPrimary,
              }}
              outlineStyle={{
                borderColor: theme.dark
                  ? theme.colors.secondaryLight
                  : theme.colors.secondary,
                backgroundColor: theme.colors.surface,
              }}
              activeOutlineColor={
                theme.dark
                  ? theme.colors.secondaryLight
                  : theme.colors.secondary
              }
              placeholder={intl.formatMessage({
                id: "registrationCodeInputHint",
              })}
              placeholderTextColor={theme.colors.textSecondary}
            />
            <HelperText
              variant="labelSmall"
              type="info"
              style={{ color: theme.colors.textSecondary }}
            >
              {intl.formatMessage({ id: "registrationCodeInputHelperText" })}
            </HelperText>
          </View>
        )}
        <View style={styles.bottomBox}>
          <Button
            labelStyle={{ fontFamily: "Bauhaus-Heavy" }}
            mode="text"
            textColor={theme.colors.textButtonSecondary}
            onPress={() => setIsLoginVisible(!isLoginVisible)}
          >
            {intl
              .formatMessage({
                id: isLoginVisible
                  ? "welcomeScreen_notRegisteredYetButton"
                  : "welcomeScreen_alreadyRegisteredButton",
              })
              .toUpperCase()}
          </Button>
          {isLoading ? (
            <ActivityIndicator
              animating={true}
              color={theme.colors.primary}
              size="large"
            />
          ) : (
            <Button
              labelStyle={{
                fontFamily: "Bauhaus-Heavy",
                color: theme.colors.textButtonPrimary,
              }}
              mode="elevated"
              buttonColor={
                theme.dark
                  ? theme.colors.secondary
                  : theme.colors.secondaryLight
              }
              onPress={() => {
                setIsLoading(true);
                if (isLoginVisible) {
                  handleLogin();
                } else {
                  handleRegistration();
                }
              }}
            >
              {intl
                .formatMessage({
                  id: isLoginVisible
                    ? "common_login"
                    : "registrationCodeSubmitButton",
                })
                .toUpperCase()}
            </Button>
          )}
        </View>
      </Surface>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bottomBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  box: {
    borderRadius: 12,
    backgroundColor: "white",
    padding: 12,
    width: "90%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerBox: {
    marginBottom: 10,
  },
  labelText: {
    color: "black",
    fontFamily: "Bauhaus-Medium",
    textAlign: "left",
  },
  titleText: {
    color: "black",
    textAlign: "center",
    fontFamily: "Bauhaus-Medium",
  },
});
