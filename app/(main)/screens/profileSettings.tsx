import { FC, useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Avatar,
  Button,
  Divider,
  Menu,
  Surface,
  Text,
} from "react-native-paper";
import { useIntl } from "react-intl";
import * as ImagePicker from "expo-image-picker";

import { useStudentContext } from "../../../context/studentContext";
import { useThemeContext } from "../../../context/themeContext";
import { useLocaleContext } from "../../../context/localeContext";
import useUploadImage from "../../../hooks/useUploadImage";

const ProfileSettings: FC = () => {
  const intl = useIntl();
  const { theme, toggleThemeMode, changeFontStyle, largeFont, mediumFont } =
    useThemeContext();
  const { info, getInfo, updateInfo, updateInfoOnServer } = useStudentContext();
  const { changeLocale } = useLocaleContext();
  const { uploadImage } = useUploadImage();
  const [profilePictureURL, setProfilePictureURL] = useState(
    info.profile_picture_url ?? ""
  );
  const [profilePicturePath, setProfilePicturePath] = useState(
    info.profile_picture_path ?? ""
  );
  const [isPreferredLanguageMenuVisible, setIsPreferredLanguageMenuVisible] =
    useState(false);
  const [preferredLanguage, setPreferredLanguage] = useState(
    info.preferred_language ?? "en"
  );
  const [avatarSrc, setAvatarSrc] = useState(
    info.profile_picture_url ?? info.profile_picture_path ?? ""
  );
  const [isTimeZoneMenuVisible, setIsTimeZoneMenuVisible] = useState(false);
  const [timeZone, setTimeZone] = useState(
    info.time_zone ?? "timeZone_us_pacific"
  );
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(
    intl.formatMessage({ id: "common_settingsSaved_success" })
  );
  const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
    "success"
  );
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  // const [lessonPackageSelected, setLessonPackageSelected] =
  //   useState<LessonPackage>({
  //     id: "3_lessons",
  //     name: "3 Lessons",
  //     price: 114,
  //   });
  const [lessonsRemaining, setLessonsRemaining] = useState(
    info.lessons_remaining || 0
  );

  const handleChooseImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          "Permission denied",
          "You need to allow access to your photos in order to upload an image."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // TODO: figure out what the new way to specify media types is
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setAvatarSrc(result.assets[0].uri);
        setProfilePicturePath(result.assets[0].uri);

        const imageBlob = await fetch(result.assets[0].uri).then((res) =>
          res.blob()
        );
        console.log("Image type:", result.assets[0].uri.split(".").pop());

        console.log("Image ready to upload:", imageBlob);
        // const uploadedImage = await uploadImage(
        //   result.assets[0].uri,
        //   result.assets[0].uri.split(".").pop()!.toLowerCase(),
        //   info.student_id!
        // );

        // if (uploadedImage) {
        //   setProfilePictureURL(uploadedImage.imageURL);
        // }
      }
    } catch (error) {
      console.error("Error choosing image:", error); // TODO: localize
    }
  };

  const handleUpdateSettingsOnServer = async () => {
    if (!info.student_id || info.student_id === "") {
      console.error("Student ID is required to update settings on server");
      return;
    }
    if (!info.email_address || info.email_address === "") {
      console.error("Email address is required to update settings on server");
      return;
    }

    try {
      await updateInfoOnServer({
        student_id: info.student_id,
        email_address: info.email_address,
        preferred_language: preferredLanguage,
        profile_picture_url: profilePictureURL,
        profile_picture_path: profilePicturePath,
        time_zone: timeZone,
      });
    } catch (error) {
      console.error("Error updating settings on server: ", error);
    }
  };

  const handleUpdateSettings = async () => {
    updateInfo({
      ...info,
      preferred_language: preferredLanguage,
      profile_picture_url: profilePictureURL,
      profile_picture_path: profilePicturePath,
      time_zone: timeZone,
      lessons_remaining: lessonsRemaining,
    });
    handleUpdateSettingsOnServer();
  };

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
            {intl.formatMessage({ id: "account_profileSettings" })}
          </Text>
          <Text variant="bodyLarge" style={{ marginBottom: 6 }}>
            {intl.formatMessage({ id: "account_profileSettings_description" })}
          </Text>
          <Divider
            style={{
              marginBottom: 12,
              backgroundColor: theme.dark ? "white" : "black",
            }}
            bold
          />
          <Text variant="titleLarge" style={{ marginBottom: 8 }}>
            {intl.formatMessage({
              id: "account_profileSettings_profilePicture",
            })}
            :
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
              marginBottom: 8,
            }}
          >
            <Avatar.Image
              size={192}
              source={{
                uri: avatarSrc,
              }}
              style={{
                marginBottom: 12,
              }}
            />
          </View>
          <Button
            mode="outlined"
            onPress={handleChooseImage}
            style={{
              marginBottom: 24,
              borderColor: theme.colors.secondary,
            }}
            labelStyle={{
              color: theme.colors.secondary,
              fontFamily: largeFont,
            }}
          >
            {intl.formatMessage({ id: "common_chooseImage" }).toUpperCase()}
          </Button>
          <Text variant="titleLarge" style={{ marginBottom: 8 }}>
            {intl.formatMessage({ id: "common_preferredLanguage" })}:
          </Text>
          <Menu
            visible={isPreferredLanguageMenuVisible}
            onDismiss={() => setIsPreferredLanguageMenuVisible(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setIsPreferredLanguageMenuVisible(true)}
                style={{
                  marginBottom: 24,
                  borderColor: theme.colors.secondary,
                }}
                labelStyle={{
                  color: theme.colors.secondary,
                  fontFamily: largeFont,
                }}
              >
                {intl.formatMessage({
                  id: `common_language_${preferredLanguage}`,
                })}
              </Button>
            }
            style={{ width: "92%" }}
          >
            <Menu.Item
              onPress={() => {
                setPreferredLanguage("en");
                setIsPreferredLanguageMenuVisible(false);
              }}
              leadingIcon={preferredLanguage === "en" ? "check" : ""}
              title={intl.formatMessage({ id: "common_language_en" })}
              titleStyle={{
                fontFamily: preferredLanguage === "en" ? largeFont : mediumFont,
              }}
            />
            <Menu.Item
              onPress={() => {
                setPreferredLanguage("uk");
                setIsPreferredLanguageMenuVisible(false);
              }}
              leadingIcon={preferredLanguage === "uk" ? "check" : ""}
              title={intl.formatMessage({ id: "common_language_uk" })}
              titleStyle={{
                fontFamily: preferredLanguage === "uk" ? largeFont : mediumFont,
              }}
            />
            <Menu.Item
              onPress={() => {
                setPreferredLanguage("ru");
                setIsPreferredLanguageMenuVisible(false);
              }}
              leadingIcon={preferredLanguage === "ru" ? "check" : ""}
              title={intl.formatMessage({ id: "common_language_ru" })}
              titleStyle={{
                fontFamily: preferredLanguage === "ru" ? largeFont : mediumFont,
              }}
            />
            <Menu.Item
              onPress={() => {
                setPreferredLanguage("de");
                setIsPreferredLanguageMenuVisible(false);
              }}
              leadingIcon={preferredLanguage === "de" ? "check" : ""}
              title={intl.formatMessage({ id: "common_language_de" })}
              titleStyle={{
                fontFamily: preferredLanguage === "de" ? largeFont : mediumFont,
              }}
            />
          </Menu>
          <Text variant="titleLarge" style={{ marginBottom: 8 }}>
            {intl.formatMessage({ id: "common_timeZone" })}:
          </Text>
          <Menu
            visible={isTimeZoneMenuVisible}
            onDismiss={() => setIsTimeZoneMenuVisible(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setIsTimeZoneMenuVisible(true)}
                style={{
                  marginBottom: 24,
                  borderColor: theme.colors.secondary,
                }}
                labelStyle={{
                  color: theme.colors.secondary,
                  fontFamily: largeFont,
                }}
              >
                {intl.formatMessage({ id: timeZone })}
              </Button>
            }
            style={{ width: "92%" }}
          >
            <Menu.Item
              onPress={() => {
                setTimeZone("timeZone_us_pacific");
                setIsTimeZoneMenuVisible(false);
              }}
              leadingIcon={timeZone === "timeZone_us_pacific" ? "check" : ""}
              title={intl.formatMessage({ id: "timeZone_us_pacific" })}
              titleStyle={{
                fontFamily:
                  timeZone === "timeZone_us_pacific" ? largeFont : mediumFont,
              }}
            />
            <Menu.Item
              onPress={() => {
                setTimeZone("timeZone_us_mountain");
                setIsTimeZoneMenuVisible(false);
              }}
              leadingIcon={timeZone === "timeZone_us_mountain" ? "check" : ""}
              title={intl.formatMessage({ id: "timeZone_us_mountain" })}
              titleStyle={{
                fontFamily:
                  timeZone === "timeZone_us_mountain" ? largeFont : mediumFont,
              }}
            />
            <Menu.Item
              onPress={() => {
                setTimeZone("timeZone_us_central");
                setIsTimeZoneMenuVisible(false);
              }}
              leadingIcon={timeZone === "timeZone_us_central" ? "check" : ""}
              title={intl.formatMessage({ id: "timeZone_us_central" })}
              titleStyle={{
                fontFamily:
                  timeZone === "timeZone_us_central" ? largeFont : mediumFont,
              }}
            />
            <Menu.Item
              onPress={() => {
                setTimeZone("timeZone_us_eastern");
                setIsTimeZoneMenuVisible(false);
              }}
              leadingIcon={timeZone === "timeZone_us_eastern" ? "check" : ""}
              title={intl.formatMessage({ id: "timeZone_us_eastern" })}
              titleStyle={{
                fontFamily:
                  timeZone === "timeZone_us_eastern" ? largeFont : mediumFont,
              }}
            />
            <Menu.Item
              onPress={() => {
                setTimeZone("timeZone_at_vienna");
                setIsTimeZoneMenuVisible(false);
              }}
              leadingIcon={timeZone === "timeZone_at_vienna" ? "check" : ""}
              title={intl.formatMessage({ id: "timeZone_at_vienna" })}
              titleStyle={{
                fontFamily:
                  timeZone === "timeZone_at_vienna" ? largeFont : mediumFont,
              }}
            />
            <Menu.Item
              onPress={() => {
                setTimeZone("timeZone_ua_kyiv");
                setIsTimeZoneMenuVisible(false);
              }}
              leadingIcon={timeZone === "timeZone_ua_kyiv" ? "check" : ""}
              title={intl.formatMessage({ id: "timeZone_ua_kyiv" })}
              titleStyle={{
                fontFamily:
                  timeZone === "timeZone_ua_kyiv" ? largeFont : mediumFont,
              }}
            />
          </Menu>
          <Text variant="titleLarge" style={{ marginBottom: 8 }}>
            {/* {intl.formatMessage({ id: "account_profileSettings_totalLessonsRemaining" }, { lessonsRemaining })}: */}
            Total lessongs remaining:
          </Text>
          <Text
            variant="bodyLarge"
            style={{
              marginBottom: 8,
              fontFamily: largeFont,
              width: "100%",
              textAlign: "center",
            }}
          >
            {lessonsRemaining}
          </Text>
          <Button
            mode="outlined"
            onPress={() => setIsPaymentDialogOpen(true)}
            style={{
              marginBottom: 36,
              borderColor: theme.colors.secondary,
            }}
            labelStyle={{
              color: theme.colors.secondary,
              fontFamily: largeFont,
            }}
          >
            {intl
              .formatMessage({
                id: "account_profileSettings_buyMoreLessons",
              })
              .toUpperCase()}
          </Button>
          <View style={styles.bottomBox}>
            <Button
              labelStyle={{
                fontFamily: largeFont,
                // @ts-ignore
                color: theme.colors.textPrimary,
              }}
              style={{
                // @ts-ignore
                backgroundColor: theme.colors.secondaryLight,
              }}
              mode="contained"
              onPress={handleUpdateSettings}
            >
              {intl.formatMessage({ id: "common_settings_save" }).toUpperCase()}
            </Button>
          </View>
        </ScrollView>
      </Surface>
    </LinearGradient>
  );
};

export default ProfileSettings;

const styles = StyleSheet.create({
  bottomBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 24,
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
