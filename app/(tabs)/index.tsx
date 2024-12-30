import { useState } from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Button,
  HelperText,
  Surface,
  Text,
  TextInput,
} from "react-native-paper";
import { useIntl } from "react-intl";
import { useRouter } from "expo-router";
import bcrypt from "bcryptjs";

import { useStudentContext } from "../../context/studentContext";
import { useThemeContext } from "../../context/themeContext";
import { useLocaleContext } from "../../context/localeContext";
import { getMainServerURL } from "../../constants/urls";
import { View } from "@/components/Themed";

export default function TabOneScreen({ navigation }: any) {
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
      router.push({
        pathname: "/screens/studentInfoForm",
        params: {
          first_name: "Mitchell" as string,
          last_name: "Wintrow" as string,
          email_address: "90mitchwintrow@gmail.com" as string,
        },
      });
      // if (registrationCodeInput === "") {
      //   console.error("Registration code is required"); // TODO: localize; add toast
      //   setIsLoading(false);
      //   return;
      // } else {
      //   const response = await fetch(
      //     `${getMainServerURL()}/validate/registration`,
      //     {
      //       method: "POST",
      //       headers: { "Content-Type": "application/json; charset=UTF-8" },
      //       body: JSON.stringify({ registration_code: registrationCodeInput }),
      //     }
      //   );

      //   if (response.status === 200) {
      //     const body = await response.json();
      //     updateInfo({
      //       first_name: body.first_name,
      //       last_name: body.last_name,
      //       email_address: body.email_address,
      //       theme_mode: "light",
      //       font_style: "Bauhaus",
      //     });
      //     navigation.navigate("/student-form", {
      //       state: {
      //         first_name: body.first_name,
      //         last_name: body.last_name,
      //         email_address: body.email_address,
      //       },
      //     });
      //   } else {
      //     console.error("Registration code is invalid!"); // TODO: localize; add toast
      //   }
      //   setIsLoading(false);
      // }
    } catch (error) {
      console.error("Error registering user:", error); // TODO: localize; add toast
      setIsLoading(false);
      throw error;
    }
  };

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
            labelStyle={{ fontFamily: "Bauhaus-Medium" }}
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
          <Button
            labelStyle={{ fontFamily: "Bauhaus-Medium" }}
            mode="contained"
            textColor="#001524"
            buttonColor="#ffbf69"
            onPress={handleRegistration}
          >
            {intl
              .formatMessage({
                id: isLoginVisible
                  ? "common_login"
                  : "registrationCodeSubmitButton",
              })
              .toUpperCase()}
          </Button>
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
    // boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
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
