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

  const handleUpdateSettings = async () => {};

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
                uri:
                  avatarSrc ||
                  "https://aspirewithalina.com:8888/uploads/profileImages/df78d663_5801_41ba_ac65_7a7415a2e6c6.png",
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
              title={intl.formatMessage({ id: "common_language_en" })}
            />
            <Menu.Item
              onPress={() => {
                setPreferredLanguage("uk");
                setIsPreferredLanguageMenuVisible(false);
              }}
              title={intl.formatMessage({ id: "common_language_uk" })}
            />
            <Menu.Item
              onPress={() => {
                setPreferredLanguage("ru");
                setIsPreferredLanguageMenuVisible(false);
              }}
              title={intl.formatMessage({ id: "common_language_ru" })}
            />
            <Menu.Item
              onPress={() => {
                setPreferredLanguage("de");
                setIsPreferredLanguageMenuVisible(false);
              }}
              title={intl.formatMessage({ id: "common_language_de" })}
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
              title={intl.formatMessage({ id: "timeZone_us_pacific" })}
            />
            <Menu.Item
              onPress={() => {
                setTimeZone("timeZone_us_mountain");
                setIsTimeZoneMenuVisible(false);
              }}
              title={intl.formatMessage({ id: "timeZone_us_mountain" })}
            />
            <Menu.Item
              onPress={() => {
                setTimeZone("timeZone_us_central");
                setIsTimeZoneMenuVisible(false);
              }}
              title={intl.formatMessage({ id: "timeZone_us_central" })}
            />
            <Menu.Item
              onPress={() => {
                setTimeZone("timeZone_us_eastern");
                setIsTimeZoneMenuVisible(false);
              }}
              title={intl.formatMessage({ id: "timeZone_us_eastern" })}
            />
            <Menu.Item
              onPress={() => {
                setTimeZone("timeZone_at_vienna");
                setIsTimeZoneMenuVisible(false);
              }}
              title={intl.formatMessage({ id: "timeZone_at_vienna" })}
            />
            <Menu.Item
              onPress={() => {
                setTimeZone("timeZone_ua_kyiv");
                setIsTimeZoneMenuVisible(false);
              }}
              title={intl.formatMessage({ id: "timeZone_ua_kyiv" })}
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
