import { FC, useState } from "react";
import { Drawer } from "expo-router/drawer";
import { useRouter } from "expo-router";
import { Avatar, IconButton, Menu } from "react-native-paper";
import { useIntl } from "react-intl";

import { useThemeContext } from "../../context/themeContext";
import { useStudentContext } from "../../context/studentContext";
import { View, Pressable } from "react-native";

const MainLayout: FC = () => {
  const intl = useIntl();
  const router = useRouter();
  const { theme } = useThemeContext();
  const { info, getInfo, updateInfo } = useStudentContext();
  const [isAvatarMenuVisible, setIsAvatarMenuVisible] = useState(false);

  const headerRightAvatar = (
    <Pressable onPress={() => setIsAvatarMenuVisible(true)}>
      <Avatar.Image
        size={40}
        source={{
          uri: info.profile_picture_url,
        }}
        onProgress={() => {}}
      />
    </Pressable>
  );

  return (
    <Drawer
      screenOptions={({ navigation }) => ({
        drawerStyle: {
          backgroundColor: theme.dark
            ? theme.colors.surface
            : theme.colors.background,
        },
        drawerItemStyle: {
          borderRadius: 12,
        },
        drawerLabelStyle: {
          fontFamily: "Bauhaus-Heavy",
          color: theme.colors.textPrimary,
        },
        drawerActiveBackgroundColor: theme.dark
          ? theme.colors.primaryDark
          : theme.colors.primary,
        drawerActiveTintColor: theme.colors.textPrimary,
        headerShown: true,
        headerTitleAlign: "center",
        headerRight: () => (
          <View>
            <Menu
              visible={isAvatarMenuVisible}
              onDismiss={() => setIsAvatarMenuVisible(false)}
              anchor={headerRightAvatar}
              anchorPosition="bottom"
            >
              <Menu.Item
                onPress={() => {
                  setIsAvatarMenuVisible(false);
                  router.push({
                    pathname: "/screens/profileSettings",
                  });
                }}
                title={intl.formatMessage({ id: "account_profileSettings" })}
              />
              <Menu.Item
                onPress={() => {
                  setIsAvatarMenuVisible(false);
                  router.push({
                    pathname: "/screens/settings",
                  });
                }}
                title={intl.formatMessage({ id: "account_appSettings" })}
              />
              <Menu.Item
                onPress={() => {
                  setIsAvatarMenuVisible(false);
                  router.push({
                    pathname: "/login",
                  });
                }}
                title={intl.formatMessage({ id: "common_logout" })}
              />
            </Menu>
          </View>
        ),
        headerStyle: {
          backgroundColor: theme.dark
            ? theme.colors.surfaceDark
            : theme.colors.primary,
        },
        headerTitleStyle: {
          fontFamily: "Bauhaus-Heavy",
          color: theme.colors.textPrimary,
        },
        headerLeft: (props) => (
          <IconButton
            icon="menu"
            iconColor={
              theme.dark
                ? theme.colors.secondaryLight
                : theme.colors.textPrimary
            }
            onPress={() => navigation.openDrawer()}
          />
        ),
      })}
    >
      <Drawer.Screen
        name="screens/studentInfoForm"
        options={{ title: "Student Info Form" }}
      />
      <Drawer.Screen
        name="screens/home"
        options={{ title: intl.formatMessage({ id: "common_home" }) }}
      />
      <Drawer.Screen
        name="screens/classroom"
        options={{ title: intl.formatMessage({ id: "menu_classroom" }) }}
      />
      {/* <Drawer.Screen
        name="screens/chat"
        options={{ title: intl.formatMessage({ id: "menu_chat" }) }}
      /> */}
      <Drawer.Screen
        name="screens/settings"
        options={{ title: intl.formatMessage({ id: "account_appSettings" }) }}
      />
      <Drawer.Screen
        name="screens/profileSettings"
        options={{
          title: intl.formatMessage({ id: "account_profileSettings" }),
        }}
      />
      <Drawer.Screen
        name="/login"
        options={{ title: intl.formatMessage({ id: "common_logout" }) }}
      />
    </Drawer>
  );
};

export default MainLayout;
