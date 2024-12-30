import { useState } from "react";
import { StyleSheet } from "react-native";
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
      colors={[
        "#78290f",
        "#ff7d00",
        "#ffbf69",
        "#cbf3f0",
        "#2ec4b6",
        "#006d77",
        "#001524",
      ]}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0 }}
    >
      <Surface style={styles.box}>
        <View style={styles.headerBox}>
          <Text variant="bodySmall" style={styles.titleText}>
            {isLoginVisible
              ? intl.formatMessage({ id: "welcomeScreen_loginTitle" })
              : intl.formatMessage({ id: "welcomeScreen_welcomeTitle" })}
          </Text>
          <Text
            variant="titleLarge"
            style={{
              ...styles.titleText,
              fontFamily: "Bauhaus-Heavy",
            }}
          >
            {intl.formatMessage({ id: "appTitle" })}!
          </Text>
        </View>
        {isLoginVisible ? (
          <View
            style={{
              marginBottom: 20,
            }}
          >
            <Text variant="bodyMedium" style={styles.labelText}>
              {intl.formatMessage({ id: "welcomeScreen_inputEmail" })}:
            </Text>
            <TextInput
              mode="outlined"
              label={intl.formatMessage({ id: "common_emailAddress" })}
              onChangeText={setEmailInput}
              value={emailInput}
              keyboardType="email-address"
              autoCapitalize="none"
              style={{ marginBottom: 12, maxHeight: 60 }}
              contentStyle={{ fontFamily: "BauhausMedium" }}
              outlineStyle={{ borderColor: "#ff7d00" }}
            />
            <Text variant="bodyMedium" style={styles.labelText}>
              {intl.formatMessage({ id: "welcomeScreen_inputPassword" })}:
            </Text>
            <TextInput
              mode="outlined"
              label={intl.formatMessage({ id: "common_passwordTitle" })}
              onChangeText={setPasswordInput}
              value={passwordInput}
              secureTextEntry={!showPassword}
              right={
                <TextInput.Icon
                  icon={showPassword ? "eye-off" : "eye"}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              style={{ marginBottom: 12, maxHeight: 60 }}
              contentStyle={{ fontFamily: "BauhausMedium" }}
              outlineStyle={{ borderColor: "#ff7d00" }}
            />
          </View>
        ) : (
          <View
            style={{
              marginBottom: 20,
            }}
          >
            <Text variant="bodyMedium" style={styles.labelText}>
              {intl.formatMessage({ id: "registrationCodeInputLabel" })}:
            </Text>
            <TextInput
              mode="outlined"
              label={intl.formatMessage({ id: "registrationCodeInputHint" })}
              onChangeText={setRegistrationCodeInput}
              value={registrationCodeInput}
              style={{ marginBottom: 12, height: 56 }}
              outlineStyle={{ borderColor: "#ff7d00" }}
            />
            <HelperText variant="labelSmall" type="info">
              {intl.formatMessage({ id: "registrationCodeInputHelperText" })}
            </HelperText>
          </View>
        )}
        <View style={styles.bottomBox}>
          <Button
            labelStyle={{ fontFamily: "Bauhaus-Heavy" }}
            mode="text"
            textColor="#ff7d00"
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
              labelStyle={{ fontFamily: "Bauhaus-Heavy" }}
              mode="contained"
              textColor="#001524"
              buttonColor="#ffbf69"
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
