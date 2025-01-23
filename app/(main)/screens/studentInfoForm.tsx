import { FC, useState } from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Button,
  Dialog,
  Divider,
  HelperText,
  Icon,
  Menu,
  Portal,
  Surface,
  Text,
  TextInput,
} from "react-native-paper";
import { ScrollView, View } from "react-native";
import { useIntl } from "react-intl";
import { useLocalSearchParams } from "expo-router";

import { useStudentContext } from "../../../context/studentContext";
import { useThemeContext } from "../../../context/themeContext";

const StudentInfoForm: FC = () => {
  const intl = useIntl();
  const { first_name, last_name, email_address } = useLocalSearchParams();
  const { theme, gradientColors, mediumFont, largeFont } = useThemeContext();
  // const { generateKeyPair } = useEncryption(); // TODO: Implement encryption
  const [nativeLanguage, setNativeLanguage] = useState("");
  const [nativeLanguageText, setNativeLanguageText] = useState("");
  const [isNativeLanguageMenuOpen, setIsNativeLanguageMenuOpen] =
    useState(false);
  const [preferredLanguage, setPreferredLanguage] = useState("");
  const [preferredLanguageText, setPreferredLanguageText] = useState("");
  const [isPreferredLanguageMenuOpen, setIsPreferredLanguageMenuOpen] =
    useState(false);
  const [enteredFirstName, setEnteredFirstName] = useState<string>(
    first_name as string
  );
  const [isFirstNameValid, setIsFirstNameValid] = useState(true);
  const [firstNameError, setFirstNameError] = useState<string | null>(null);
  const [enteredPreferredName, setEnteredPreferredName] = useState<string>(
    first_name as string
  );
  const [isPreferredNameValid, setIsPreferredNameValid] = useState(true);
  const [preferredNameError, setPreferredNameError] = useState<string | null>(
    null
  );
  const [enteredLastName, setEnteredLastName] = useState<string>(
    last_name as string
  );
  const [isLastNameValid, setIsLastNameValid] = useState(true);
  const [lastNameError, setLastNameError] = useState<string | null>(null);
  const [emailAddress, setEmailAddress] = useState<string>(
    email_address as string
  );
  const [isEmailAddressValid, setIsEmailAddressValid] = useState(true);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const [isConfirmInfoDialogOpen, setIsConfirmInfoDialogOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(true);
  const [toastMessage, setToastMessage] = useState(
    intl.formatMessage({
      id: "welcomeScreen_snackbarSuccessfulRegistration",
    })
  );
  const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
    "success"
  );
  const [isLoading, setIsLoading] = useState(false);

  const validateFirstName = (firstName: string) => {
    if (!firstName || firstName.length < 2) {
      setIsFirstNameValid(false);
      // TODO: add translation strings
      setFirstNameError(
        intl.formatMessage({
          id: "studentInfoForm_firstNameErrorText_tooShort",
        })
      );
    } else if (firstName.length > 30) {
      setIsFirstNameValid(false);
      setFirstNameError(
        intl.formatMessage({
          id: "studentInfoForm_firstNameErrorText_tooLong",
        })
      );
    } else if (!firstName.match(/^[a-zA-Z]+$/)) {
      // TODO: Add support for international characters
      setIsFirstNameValid(false);
      setFirstNameError(
        intl.formatMessage({
          id: "studentInfoForm_firstNameErrorText_invalid",
        })
      );
    } else {
      setIsFirstNameValid(true);
      setFirstNameError(null);
    }
  };
  const handleFirstNameInput = (firstName: string) => {
    setEnteredFirstName(firstName);
    validateFirstName(firstName);
  };

  const validatePreferredName = (preferredName: string) => {
    if (!preferredName || preferredName.length < 2) {
      setIsPreferredNameValid(false);
      // TODO: add translation strings
      setPreferredNameError(
        intl.formatMessage({
          id: "studentInfoForm_preferredNameErrorText_tooShort",
        })
      );
    } else if (preferredName.length > 30) {
      setIsPreferredNameValid(false);
      setPreferredNameError(
        intl.formatMessage({
          id: "studentInfoForm_preferredNameErrorText_tooLong",
        })
      );
    } else if (!preferredName.match(/^[a-zA-Z]+$/)) {
      // TODO: Add support for international characters, some symbols, and numbers
      setIsPreferredNameValid(false);
      setPreferredNameError(
        intl.formatMessage({
          id: "studentInfoForm_preferredNameErrorText_invalid",
        })
      );
    } else {
      setIsPreferredNameValid(true);
      setPreferredNameError(null);
    }
  };
  const handlePreferredNameInput = (preferredName: string) => {
    setEnteredPreferredName(preferredName);
    validatePreferredName(preferredName);
  };

  const validateLastName = (lastName: string) => {
    if (!lastName || lastName.length < 2) {
      setIsLastNameValid(false);
      // TODO: add translation strings
      setLastNameError(
        intl.formatMessage({
          id: "studentInfoForm_lastNameErrorText_tooShort",
        })
      );
    } else if (lastName.length > 30) {
      setIsLastNameValid(false);
      setLastNameError(
        intl.formatMessage({
          id: "studentInfoForm_lastNameErrorText_tooLong",
        })
      );
    } else if (!lastName.match(/^[a-zA-Z]+$/)) {
      // TODO: Add support for international characters
      setIsLastNameValid(false);
      setLastNameError(
        intl.formatMessage({
          id: "studentInfoForm_lastNameErrorText_invalid",
        })
      );
    } else {
      setIsLastNameValid(true);
      setLastNameError(null);
    }
  };
  const handleLastNameInput = (lastName: string) => {
    setEnteredLastName(lastName);
    validateLastName(lastName);
  };

  const validateEmailAddress = (email: string) => {
    if (!emailRegex.test(email)) {
      setIsEmailAddressValid(false);
      setEmailError(
        intl.formatMessage({ id: "studentInfoForm_emailErrorText_invalid" })
      );
    } else {
      setIsEmailAddressValid(true);
      setEmailError(null);
    }
  };
  const handleEmailInput = (email: string) => {
    setEmailAddress(email);
    validateEmailAddress(email);
  };

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      setIsPasswordValid(false);
      setPasswordError(
        intl.formatMessage({
          id: "studentInfoForm_passwordErrorText_lengthTooShort",
        })
      );
    } else if (password.length > 16) {
      setIsPasswordValid(false);
      setPasswordError(
        intl.formatMessage({
          id: "studentInfoForm_passwordErrorText_lengthTooLong",
        })
      );
    } else if (!password.match(/[a-z]/)) {
      setIsPasswordValid(false);
      setPasswordError(
        intl.formatMessage({
          id: "studentInfoForm_passwordErrorText_lowercase",
        })
      );
    } else if (!password.match(/[A-Z]/)) {
      setIsPasswordValid(false);
      setPasswordError(
        intl.formatMessage({
          id: "studentInfoForm_passwordErrorText_uppercase",
        })
      );
    } else if (!password.match(/[0-9]/)) {
      setIsPasswordValid(false);
      setPasswordError(
        intl.formatMessage({ id: "studentInfoForm_passwordErrorText_number" })
      );
    } else if (!password.match(/[!@#$%^&*]/)) {
      setIsPasswordValid(false);
      setPasswordError(
        intl.formatMessage({
          id: "studentInfoForm_passwordErrorText_specialCharacter",
        })
      );
    } else {
      setIsPasswordValid(true);
      setPasswordError(null);
    }
  };
  const handlePasswordInput = (password: string) => {
    setPassword(password);
    validatePassword(password);
  };

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
            ? theme.colors.surfaceDark
            : theme.colors.background,
        }}
      >
        <ScrollView style={styles.scrollContent}>
          <Text
            variant="headlineMedium"
            style={{ color: theme.colors.textPrimary }}
          >
            {intl.formatMessage(
              { id: "common_welcome" },
              { firstName: enteredFirstName }
            )}
          </Text>
          <Text
            variant="bodyMedium"
            style={{ marginBottom: 12, color: theme.colors.textPrimary }}
          >
            {intl.formatMessage({ id: "studentInfoForm_description" })}
          </Text>
          <Text
            variant="bodyLarge"
            style={{
              fontFamily: largeFont,
              marginBottom: 6,
              color: theme.colors.textPrimary,
            }}
          >
            {intl.formatMessage({ id: "studentInfoForm_nativeLanguageLabel" })}:
          </Text>
          <Menu
            visible={isNativeLanguageMenuOpen}
            onDismiss={() => setIsNativeLanguageMenuOpen(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setIsNativeLanguageMenuOpen(true)}
                style={{
                  marginBottom: 8,
                  borderColor: theme.colors.textButtonSecondary,
                }}
                labelStyle={{
                  color: theme.colors.textButtonSecondary,
                  fontFamily: largeFont,
                }}
              >
                {nativeLanguage === ""
                  ? intl.formatMessage({
                      id: "studentInfoForm_selectNativeLanguage",
                      defaultMessage: "Select your native language",
                    })
                  : nativeLanguageText}
              </Button>
            }
            style={{ width: "84%" }}
            contentStyle={{
              backgroundColor: theme.colors.surface,
              borderRadius: 8,
            }}
          >
            <Menu.Item
              onPress={() => {
                setNativeLanguage("uk");
                setNativeLanguageText("Українська мова");
                setIsNativeLanguageMenuOpen(false);
              }}
              title="Українська мова"
              titleStyle={{
                color: theme.colors.textPrimary,
                fontFamily: nativeLanguage === "uk" ? largeFont : mediumFont,
              }}
              leadingIcon={() =>
                nativeLanguage === "uk" ? (
                  <Icon source="check" size={26} color="limegreen" />
                ) : null
              }
            />
            <Menu.Item
              onPress={() => {
                setNativeLanguage("ru");
                setNativeLanguageText("Русский язык");
                setIsNativeLanguageMenuOpen(false);
              }}
              title="Русский язык"
              titleStyle={{
                color: theme.colors.textPrimary,
                fontFamily: nativeLanguage === "ru" ? largeFont : mediumFont,
              }}
              leadingIcon={() =>
                nativeLanguage === "ru" ? (
                  <Icon source="check" size={26} color="limegreen" />
                ) : null
              }
            />
            <Menu.Item
              onPress={() => {
                setNativeLanguage("de");
                setNativeLanguageText("Deutsche Sprache");
                setIsNativeLanguageMenuOpen(false);
              }}
              title="Deutsche Sprache"
              titleStyle={{
                color: theme.colors.textPrimary,
                fontFamily: nativeLanguage === "de" ? largeFont : mediumFont,
              }}
              leadingIcon={() =>
                nativeLanguage === "de" ? (
                  <Icon source="check" size={26} color="limegreen" />
                ) : null
              }
            />
            <Menu.Item
              onPress={() => {
                setNativeLanguage("en");
                setNativeLanguageText("English");
                setIsNativeLanguageMenuOpen(false);
              }}
              title="English"
              titleStyle={{
                color: theme.colors.textPrimary,
                fontFamily: nativeLanguage === "en" ? largeFont : mediumFont,
              }}
              leadingIcon={() =>
                nativeLanguage === "en" ? (
                  <Icon source="check" size={26} color="limegreen" />
                ) : null
              }
            />
          </Menu>
          <HelperText
            type="info"
            style={{ marginBottom: 10, color: theme.colors.textSecondary }}
          >
            {intl.formatMessage({
              id: "studentInfoForm_nativeLanguageHelperText",
            })}
          </HelperText>
          <Text
            variant="bodyLarge"
            style={{
              fontFamily: largeFont,
              marginBottom: 6,
              color: theme.colors.textPrimary,
            }}
          >
            {intl.formatMessage({
              id: "studentInfoForm_preferredLanguageLabel",
            })}
            :
          </Text>
          <Menu
            visible={isPreferredLanguageMenuOpen}
            onDismiss={() => setIsPreferredLanguageMenuOpen(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setIsPreferredLanguageMenuOpen(true)}
                style={{
                  marginBottom: 8,
                  borderColor: theme.colors.textButtonSecondary,
                }}
                labelStyle={{
                  color: theme.colors.textButtonSecondary,
                  fontFamily: largeFont,
                }}
              >
                {preferredLanguage === ""
                  ? intl.formatMessage({
                      id: "studentInfoForm_selectPreferredLanguage",
                      defaultMessage: "Select your preferred language",
                    })
                  : preferredLanguageText}
              </Button>
            }
            style={{ width: "84%" }}
            contentStyle={{
              backgroundColor: theme.dark
                ? theme.colors.surfaceDark
                : theme.colors.surface,
            }}
          >
            <Menu.Item
              onPress={() => {
                setPreferredLanguage("en");
                setPreferredLanguageText("English");
                setIsPreferredLanguageMenuOpen(false);
              }}
              title="English"
              titleStyle={{
                color: theme.colors.textPrimary,
                fontFamily: preferredLanguage === "en" ? largeFont : mediumFont,
              }}
              leadingIcon={() =>
                preferredLanguage === "en" ? (
                  <Icon source="check" size={26} color="limegreen" />
                ) : null
              }
            />
            <Menu.Item
              onPress={() => {
                setPreferredLanguage("uk");
                setPreferredLanguageText("Українська мова");
                setIsPreferredLanguageMenuOpen(false);
              }}
              title="Українська мова"
              titleStyle={{
                color: theme.colors.textPrimary,
                fontFamily: preferredLanguage === "uk" ? largeFont : mediumFont,
              }}
              leadingIcon={() =>
                preferredLanguage === "uk" ? (
                  <Icon source="check" size={26} color="limegreen" />
                ) : null
              }
            />
            <Menu.Item
              onPress={() => {
                setPreferredLanguage("ru");
                setPreferredLanguageText("Русский язык");
                setIsPreferredLanguageMenuOpen(false);
              }}
              title="Русский язык"
              titleStyle={{
                color: theme.colors.textPrimary,
                fontFamily: preferredLanguage === "ru" ? largeFont : mediumFont,
              }}
              leadingIcon={() =>
                preferredLanguage === "ru" ? (
                  <Icon source="check" size={26} color="limegreen" />
                ) : null
              }
            />
            <Menu.Item
              onPress={() => {
                setPreferredLanguage("de");
                setPreferredLanguageText("Deutsche Sprache");
                setIsPreferredLanguageMenuOpen(false);
              }}
              title="Deutsche Sprache"
              titleStyle={{
                color: theme.colors.textPrimary,
                fontFamily: preferredLanguage === "de" ? largeFont : mediumFont,
              }}
              leadingIcon={() =>
                preferredLanguage === "de" ? (
                  <Icon source="check" size={26} color="limegreen" />
                ) : null
              }
            />
          </Menu>
          <HelperText
            type="info"
            style={{ marginBottom: 10, color: theme.colors.textSecondary }}
          >
            {intl.formatMessage({
              id: "studentInfoForm_preferredLanguageHelperText",
            })}
          </HelperText>
          <Text
            variant="bodyLarge"
            style={{
              fontFamily: largeFont,
              marginBottom: 6,
              color: theme.colors.textPrimary,
            }}
          >
            {intl.formatMessage({ id: "studentInfoForm_inputFirstName" })}:
          </Text>
          <TextInput
            mode="outlined"
            onChangeText={handleFirstNameInput}
            value={enteredFirstName}
            error={!isFirstNameValid}
            contentStyle={{
              fontFamily: mediumFont,
              color: theme.colors.textPrimary,
            }}
            style={{ backgroundColor: theme.colors.surface }}
            outlineStyle={{
              borderColor: theme.dark
                ? theme.colors.secondaryLight
                : theme.colors.secondary,
              backgroundColor: theme.colors.surface,
            }}
            activeOutlineColor={
              theme.dark ? theme.colors.secondaryLight : theme.colors.secondary
            }
            placeholder={intl.formatMessage({ id: "common_firstName" })}
            placeholderTextColor={theme.colors.textSecondary}
          />
          <HelperText
            type="info"
            style={{ marginBottom: 10, color: theme.colors.textSecondary }}
          >
            {isFirstNameValid
              ? intl.formatMessage({
                  id: "studentInfoForm_inputFirstNameHelperText",
                })
              : firstNameError}
          </HelperText>
          <Text
            variant="bodyLarge"
            style={{
              fontFamily: largeFont,
              marginBottom: 6,
              color: theme.colors.textPrimary,
            }}
          >
            {intl.formatMessage({ id: "studentInfoForm_inputPreferredName" })}:
          </Text>
          <TextInput
            mode="outlined"
            onChangeText={handlePreferredNameInput}
            value={enteredPreferredName}
            error={!isPreferredNameValid}
            contentStyle={{
              fontFamily: mediumFont,
              color: theme.colors.textPrimary,
            }}
            style={{ backgroundColor: theme.colors.surface }}
            outlineStyle={{
              borderColor: theme.dark
                ? theme.colors.secondaryLight
                : theme.colors.secondary,
              backgroundColor: theme.colors.surface,
            }}
            activeOutlineColor={
              theme.dark ? theme.colors.secondaryLight : theme.colors.secondary
            }
            placeholder={intl.formatMessage({ id: "common_preferredName" })}
            placeholderTextColor={theme.colors.textSecondary}
          />
          <HelperText
            type="info"
            style={{ marginBottom: 10, color: theme.colors.textSecondary }}
          >
            {isPreferredNameValid
              ? intl.formatMessage({
                  id: "studentInfoForm_inputPreferredNameHelperText",
                })
              : preferredNameError}
          </HelperText>
          <Text
            variant="bodyLarge"
            style={{
              fontFamily: largeFont,
              marginBottom: 6,
              color: theme.colors.textPrimary,
            }}
          >
            {intl.formatMessage({ id: "studentInfoForm_inputLastName" })}:
          </Text>
          <TextInput
            mode="outlined"
            onChangeText={handleLastNameInput}
            value={enteredLastName}
            error={!isLastNameValid}
            contentStyle={{
              fontFamily: mediumFont,
              color: theme.colors.textPrimary,
            }}
            style={{ backgroundColor: theme.colors.surface }}
            outlineStyle={{
              borderColor: theme.dark
                ? theme.colors.secondaryLight
                : theme.colors.secondary,
              backgroundColor: theme.colors.surface,
            }}
            activeOutlineColor={
              theme.dark ? theme.colors.secondaryLight : theme.colors.secondary
            }
            placeholder={intl.formatMessage({ id: "common_lastName" })}
            placeholderTextColor={theme.colors.textSecondary}
          />
          <HelperText
            type="info"
            style={{ marginBottom: 10, color: theme.colors.textSecondary }}
          >
            {isLastNameValid
              ? intl.formatMessage({
                  id: "studentInfoForm_inputLastNameHelperText",
                })
              : lastNameError}
          </HelperText>
          <Text
            variant="bodyLarge"
            style={{
              fontFamily: largeFont,
              marginBottom: 6,
              color: theme.colors.textPrimary,
            }}
          >
            {intl.formatMessage({ id: "studentInfoForm_emailInputLabel" })}:
          </Text>
          <TextInput
            mode="outlined"
            onChangeText={handleEmailInput}
            value={emailAddress}
            keyboardType="email-address"
            error={!isEmailAddressValid}
            contentStyle={{
              fontFamily: mediumFont,
              color: theme.colors.textPrimary,
            }}
            style={{ backgroundColor: theme.colors.surface }}
            outlineStyle={{
              borderColor: theme.dark
                ? theme.colors.secondaryLight
                : theme.colors.secondary,
              backgroundColor: theme.colors.surface,
            }}
            activeOutlineColor={
              theme.dark ? theme.colors.secondaryLight : theme.colors.secondary
            }
            placeholder={intl.formatMessage({ id: "common_emailAddress" })}
            placeholderTextColor={theme.colors.textSecondary}
          />
          <HelperText
            type="info"
            style={{ marginBottom: 10, color: theme.colors.textSecondary }}
          >
            {isEmailAddressValid
              ? intl.formatMessage({
                  id: "studentInfoForm_inputPreferredNameHelperText",
                })
              : emailError}
          </HelperText>
          <Text
            variant="bodyLarge"
            style={{
              fontFamily: largeFont,
              marginBottom: 6,
              color: theme.colors.textPrimary,
            }}
          >
            {intl.formatMessage({ id: "studentInfoForm_passwordInputLabel" })}:
          </Text>
          <TextInput
            mode="outlined"
            onChangeText={handlePasswordInput}
            value={password}
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
            error={!isPasswordValid}
            contentStyle={{
              fontFamily: mediumFont,
              color: theme.colors.textPrimary,
            }}
            style={{
              backgroundColor: theme.colors.surface,
            }}
            outlineStyle={{
              borderColor: theme.dark
                ? theme.colors.secondaryLight
                : theme.colors.secondary,
              backgroundColor: theme.colors.surface,
            }}
            activeOutlineColor={
              theme.dark ? theme.colors.secondaryLight : theme.colors.secondary
            }
            placeholder={intl.formatMessage({ id: "common_passwordTitle" })}
            placeholderTextColor={theme.colors.textSecondary}
          />
          <HelperText
            type="info"
            style={{ marginBottom: 10, color: theme.colors.textSecondary }}
          >
            {isPasswordValid
              ? intl.formatMessage({
                  id: "studentInfoForm_passwordHelperText",
                })
              : passwordError}
          </HelperText>
          <View style={styles.bottomBox}>
            <Button
              mode="elevated"
              onPress={() => setIsConfirmInfoDialogOpen(true)}
              style={{
                width: "40%",
                backgroundColor: theme.dark
                  ? theme.colors.secondary
                  : theme.colors.secondaryLight,
              }}
              labelStyle={{
                color: theme.colors.textButtonPrimary,
                fontFamily: largeFont,
              }}
            >
              {intl.formatMessage({ id: "common_submit" })}
            </Button>
          </View>
        </ScrollView>
      </Surface>
      <Portal>
        <Dialog
          visible={isConfirmInfoDialogOpen}
          onDismiss={() => setIsConfirmInfoDialogOpen(false)}
          style={{
            backgroundColor: theme.colors.surface,
          }}
        >
          <Dialog.Title>
            <Text
              variant="titleLarge"
              style={{ fontFamily: largeFont, color: theme.colors.textPrimary }}
            >
              {intl.formatMessage({ id: "studentInfoForm_confirmInfoTitle" })}
            </Text>
          </Dialog.Title>
          <Dialog.Content>
            <Divider
              style={{
                marginBottom: 12,
                backgroundColor: theme.dark ? "white" : "black",
              }}
            />
            <Text
              variant="bodyLarge"
              style={{
                fontFamily: largeFont,
                marginBottom: 6,
                color: theme.colors.textPrimary,
              }}
            >
              {intl.formatMessage({
                id: "common_nativeLanguage",
              })}
            </Text>
            <Text
              variant="bodyLarge"
              style={{
                fontFamily: mediumFont,
                marginBottom: 10,
                color: theme.colors.textPrimary,
              }}
            >
              {nativeLanguageText}
            </Text>
            <Text
              variant="bodyLarge"
              style={{
                fontFamily: largeFont,
                marginBottom: 6,
                color: theme.colors.textPrimary,
              }}
            >
              {intl.formatMessage({
                id: "common_preferredLanguage",
              })}
            </Text>
            <Text
              variant="bodyLarge"
              style={{
                fontFamily: mediumFont,
                marginBottom: 10,
                color: theme.colors.textPrimary,
              }}
            >
              {preferredLanguageText}
            </Text>
            <Text
              variant="bodyLarge"
              style={{
                fontFamily: largeFont,
                marginBottom: 6,
                color: theme.colors.textPrimary,
              }}
            >
              {intl.formatMessage({
                id: "common_firstName",
              })}
            </Text>
            <Text
              variant="bodyLarge"
              style={{
                fontFamily: mediumFont,
                marginBottom: 10,
                color: theme.colors.textPrimary,
              }}
            >
              {enteredFirstName}
            </Text>
            <Text
              variant="bodyLarge"
              style={{
                fontFamily: largeFont,
                marginBottom: 6,
                color: theme.colors.textPrimary,
              }}
            >
              {intl.formatMessage({
                id: "common_preferredName",
              })}
            </Text>
            <Text
              variant="bodyLarge"
              style={{
                fontFamily: mediumFont,
                marginBottom: 10,
                color: theme.colors.textPrimary,
              }}
            >
              {enteredPreferredName}
            </Text>
            <Text
              variant="bodyLarge"
              style={{
                fontFamily: largeFont,
                marginBottom: 6,
                color: theme.colors.textPrimary,
              }}
            >
              {intl.formatMessage({
                id: "common_lastName",
              })}
            </Text>
            <Text
              variant="bodyLarge"
              style={{
                fontFamily: mediumFont,
                marginBottom: 10,
                color: theme.colors.textPrimary,
              }}
            >
              {enteredLastName}
            </Text>
            <Text
              variant="bodyLarge"
              style={{
                fontFamily: largeFont,
                marginBottom: 6,
                color: theme.colors.textPrimary,
              }}
            >
              {intl.formatMessage({
                id: "common_emailAddress",
              })}
            </Text>
            <Text
              variant="bodyLarge"
              style={{
                fontFamily: mediumFont,
                marginBottom: 10,
                color: theme.colors.textPrimary,
              }}
            >
              {emailAddress}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              mode="outlined"
              labelStyle={{
                color: theme.colors.textButtonSecondary,
                fontFamily: largeFont,
              }}
              style={{
                borderColor: theme.dark
                  ? theme.colors.secondaryLight
                  : theme.colors.secondary,
                width: "30%",
              }}
              onPress={() => setIsConfirmInfoDialogOpen(false)}
            >
              {intl.formatMessage({ id: "common_cancel" })}
            </Button>
            <Button
              mode="elevated"
              labelStyle={{
                color: theme.colors.textButtonPrimary,
                fontFamily: largeFont,
              }}
              style={{
                backgroundColor: theme.dark
                  ? theme.colors.secondary
                  : theme.colors.secondaryLight,
                width: "36%",
              }}
              onPress={() => setIsConfirmInfoDialogOpen(false)}
            >
              {intl.formatMessage({ id: "common_confirm" })}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </LinearGradient>
  );
};

export default StudentInfoForm;

const styles = StyleSheet.create({
  bottomBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  box: {
    borderRadius: 12,
    backgroundColor: "white",
    padding: 12,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
  },
  headerBox: {
    marginBottom: 10,
  },
  labelText: {
    color: "black",
    fontFamily: "BauhausMedium",
    textAlign: "left",
  },
  scrollContent: {
    paddingBottom: 16,
  },
  titleText: {
    color: "black",
    textAlign: "center",
    fontFamily: "BauhausMedium",
  },
});
