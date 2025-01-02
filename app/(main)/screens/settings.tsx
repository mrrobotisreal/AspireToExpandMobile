import { FC, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Button, Divider, Menu, Surface, Text } from "react-native-paper";
import { useIntl } from "react-intl";

import { useStudentContext } from "../../../context/studentContext";
import {
  AppFontFamily,
  ThemeMode,
  useThemeContext,
} from "../../../context/themeContext";

const AppSettings: FC = () => {
  const intl = useIntl();
  const { theme, toggleThemeMode, changeFontStyle, largeFont, mediumFont } =
    useThemeContext();
  const { info, getInfo, updateInfo, updateInfoOnServer } = useStudentContext();

  const [isThemeMenuVisible, setIsThemeMenuVisible] = useState(false);
  const [selectedThemeMode, setSelectedThemeMode] = useState<ThemeMode>(
    info.theme_mode ?? "light"
  );
  const [selectedThemeModeText, setSelectedThemeModeText] = useState(
    info.theme_mode === "dark"
      ? intl.formatMessage({
          id: "account_appSettings_themeMode_darkTheme",
        })
      : intl.formatMessage({
          id: "account_appSettings_themeMode_lightTheme",
        })
  );
  const [isFontMenuVisible, setIsFontMenuVisible] = useState(false);
  const [selectedFontFamily, setSelectedFontFamily] = useState<AppFontFamily>(
    info.font_style ?? "Bauhaus"
  );
  const [selectedFontFamilyText, setSelectedFontFamilyText] = useState(
    intl.formatMessage({ id: "account_appSettings_fontStyle_bauhaus" })
  );
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(
    intl.formatMessage({ id: "common_settingsSaved_success" })
  );
  const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleSelectThemeMode = (value: ThemeMode) => {
    toggleThemeMode(value);
    setSelectedThemeMode(value);
    setSelectedThemeModeText(
      value === "light"
        ? intl.formatMessage({
            id: "account_appSettings_themeMode_lightTheme",
          })
        : intl.formatMessage({
            id: "account_appSettings_themeMode_darkTheme",
          })
    );
  };

  const handleSelectFontStyle = (value: AppFontFamily) => {
    changeFontStyle(value);
    setSelectedFontFamily(value);
    switch (value) {
      case "Bauhaus":
        setSelectedFontFamilyText(
          intl.formatMessage({ id: "account_appSettings_fontStyle_bauhaus" })
        );
        break;
      case "Hummingbird":
        setSelectedFontFamilyText(
          intl.formatMessage({
            id: "account_appSettings_fontStyle_hummingbird",
          })
        );
        break;
      case "LobsterTwo":
        setSelectedFontFamilyText(
          intl.formatMessage({ id: "account_appSettings_fontStyle_lobsterTwo" })
        );
        break;
      case "NexaScript":
        setSelectedFontFamilyText(
          intl.formatMessage({ id: "account_appSettings_fontStyle_nexaScript" })
        );
        break;
      case "NotoSerif":
        setSelectedFontFamilyText(
          intl.formatMessage({ id: "account_appSettings_fontStyle_notoSerif" })
        );
        break;
      case "Roboto":
        setSelectedFontFamilyText(
          intl.formatMessage({ id: "account_appSettings_fontStyle_roboto" })
        );
        break;
      case "Ubuntu":
        setSelectedFontFamilyText(
          intl.formatMessage({ id: "account_appSettings_fontStyle_ubuntu" })
        );
        break;
      default:
        setSelectedFontFamilyText(
          intl.formatMessage({ id: "account_appSettings_fontStyle_bauhaus" })
        );
    }
  };

  const handleUpdateSettingsOnServer = async () => {
    if (!info.student_id || info.student_id === "") {
      console.error("Student ID is required to update settings on server");
      return;
    }
    if (!info.email_address || info.email_address === "") {
      console.error("Email address is required to update settings on server"); // TODO: localize
      return;
    }

    try {
      await updateInfoOnServer({
        student_id: info.student_id,
        email_address: info.email_address,
        theme_mode: selectedThemeMode,
        font_style: selectedFontFamily,
      });
    } catch (error) {
      console.error("Error updating settings on server: ", error); // TODO: localize
    }
  };

  const handleUpdateSettings = () => {
    updateInfo({
      ...info,
      theme_mode: selectedThemeMode,
      font_style: selectedFontFamily,
    });
    handleUpdateSettingsOnServer();
    setToastIsOpen(true);
  };

  // const handleCloseToast = (
  //   event?: React.SyntheticEvent | Event,
  //   reason?: SnackbarCloseReason
  // ) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }

  //   setToastIsOpen(false);
  // };

  const checkForStudentInfo = async () => {
    const storedStudentInfo = await getInfo();

    // TODO: Remove this useEffect in production;
    // This is just for testing purposes to keep info updated during refreshes
    if (storedStudentInfo) {
      updateInfo(storedStudentInfo);
    }
  };

  useEffect(() => {
    checkForStudentInfo();
  }, []);

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
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text variant="headlineMedium">
            {intl.formatMessage({ id: "account_appSettings" })}
          </Text>
          <Text variant="bodyLarge" style={{ marginBottom: 6 }}>
            {intl.formatMessage({ id: "account_appSettings_description" })}
          </Text>
          <Divider
            style={{
              marginBottom: 12,
              backgroundColor: theme.dark ? "white" : "black",
            }}
            bold
          />
          <Text variant="titleLarge" style={{ fontFamily: largeFont }}>
            {intl.formatMessage({ id: "account_appSettings_themeMode" })}:
          </Text>
          <Menu
            visible={isThemeMenuVisible}
            onDismiss={() => setIsThemeMenuVisible(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setIsThemeMenuVisible(true)}
                style={{
                  marginBottom: 16,
                  borderColor: theme.colors.secondary,
                }}
                labelStyle={{
                  color: theme.colors.secondary,
                  fontFamily: largeFont,
                }}
              >
                {selectedThemeModeText}
              </Button>
            }
            style={{ width: "92%" }}
          >
            <Menu.Item
              onPress={() => handleSelectThemeMode("light")}
              title={intl.formatMessage({
                id: "account_appSettings_themeMode_lightTheme",
              })}
              leadingIcon={selectedThemeMode === "light" ? "check" : ""}
              titleStyle={{
                fontFamily:
                  selectedThemeMode === "light" ? largeFont : mediumFont,
              }}
            />
            <Menu.Item
              onPress={() => handleSelectThemeMode("dark")}
              title={intl.formatMessage({
                id: "account_appSettings_themeMode_darkTheme",
              })}
              leadingIcon={selectedThemeMode === "dark" ? "check" : ""}
              titleStyle={{
                fontFamily:
                  selectedThemeMode === "dark" ? largeFont : mediumFont,
              }}
            />
          </Menu>
          <Text variant="titleLarge" style={{ fontFamily: largeFont }}>
            {intl.formatMessage({ id: "account_appSettings_fontStyle" })}:
          </Text>
          <Menu
            visible={isFontMenuVisible}
            onDismiss={() => setIsFontMenuVisible(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setIsFontMenuVisible(true)}
                style={{
                  marginBottom: 24,
                  borderColor: theme.colors.secondary,
                }}
                labelStyle={{
                  color: theme.colors.secondary,
                  fontFamily: largeFont,
                }}
              >
                {selectedFontFamilyText}
              </Button>
            }
            style={{ width: "92%" }}
          >
            <Menu.Item
              onPress={() => handleSelectFontStyle("Bauhaus")}
              title={intl.formatMessage({
                id: "account_appSettings_fontStyle_bauhaus",
              })}
              leadingIcon={selectedFontFamily === "Bauhaus" ? "check" : ""}
              titleStyle={{
                fontFamily:
                  selectedFontFamily === "Bauhaus" ? largeFont : mediumFont,
              }}
            />
            <Menu.Item
              onPress={() => handleSelectFontStyle("Hummingbird")}
              title={intl.formatMessage({
                id: "account_appSettings_fontStyle_hummingbird",
              })}
              leadingIcon={selectedFontFamily === "Hummingbird" ? "check" : ""}
              titleStyle={{
                fontFamily:
                  selectedFontFamily === "Hummingbird" ? largeFont : mediumFont,
              }}
            />
            <Menu.Item
              onPress={() => handleSelectFontStyle("LobsterTwo")}
              title={intl.formatMessage({
                id: "account_appSettings_fontStyle_lobsterTwo",
              })}
              leadingIcon={selectedFontFamily === "LobsterTwo" ? "check" : ""}
              titleStyle={{
                fontFamily:
                  selectedFontFamily === "LobsterTwo" ? largeFont : mediumFont,
              }}
            />
            <Menu.Item
              onPress={() => handleSelectFontStyle("NexaScript")}
              title={intl.formatMessage({
                id: "account_appSettings_fontStyle_nexaScript",
              })}
              leadingIcon={selectedFontFamily === "NexaScript" ? "check" : ""}
              titleStyle={{
                fontFamily:
                  selectedFontFamily === "NexaScript" ? largeFont : mediumFont,
              }}
            />
            <Menu.Item
              onPress={() => handleSelectFontStyle("NotoSerif")}
              title={intl.formatMessage({
                id: "account_appSettings_fontStyle_notoSerif",
              })}
              leadingIcon={selectedFontFamily === "NotoSerif" ? "check" : ""}
              titleStyle={{
                fontFamily:
                  selectedFontFamily === "NotoSerif" ? largeFont : mediumFont,
              }}
            />
            <Menu.Item
              onPress={() => handleSelectFontStyle("Roboto")}
              title={intl.formatMessage({
                id: "account_appSettings_fontStyle_roboto",
              })}
              leadingIcon={selectedFontFamily === "Roboto" ? "check" : ""}
              titleStyle={{
                fontFamily:
                  selectedFontFamily === "Roboto" ? largeFont : mediumFont,
              }}
            />
            <Menu.Item
              onPress={() => handleSelectFontStyle("Ubuntu")}
              title={intl.formatMessage({
                id: "account_appSettings_fontStyle_ubuntu",
              })}
              leadingIcon={selectedFontFamily === "Ubuntu" ? "check" : ""}
              titleStyle={{
                fontFamily:
                  selectedFontFamily === "Ubuntu" ? largeFont : mediumFont,
              }}
            />
          </Menu>
          <View style={styles.bottomBox}>
            <Button
              mode="contained"
              onPress={handleUpdateSettings}
              style={{
                // @ts-ignore
                backgroundColor: theme.colors.secondaryLight,
              }}
              labelStyle={{
                // @ts-ignore
                color: theme.colors.textPrimary,
                fontFamily: largeFont,
              }}
            >
              {intl.formatMessage({ id: "common_settings_save" })}
            </Button>
          </View>
        </ScrollView>
      </Surface>
    </LinearGradient>
  );
};

export default AppSettings;

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
  scrollContent: {
    paddingBottom: 16,
  },
});
