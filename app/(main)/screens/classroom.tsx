import { FC, useState } from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Button,
  Dialog,
  Divider,
  HelperText,
  Icon,
  IconButton,
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

const Classroom: FC = () => {
  const intl = useIntl();
  const { theme, gradientColors, mediumFont, largeFont } = useThemeContext();

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
          flex: 1,
          width: "100%",
          backgroundColor: theme.dark
            ? theme.colors.surfaceDark
            : theme.colors.background,
        }}
      >
        <View></View>
        <View style={styles.controlsBox}>
          <IconButton icon="cog" iconColor={theme.colors.secondary} size={26} />
          <IconButton
            icon="microphone"
            iconColor={theme.colors.secondary}
            size={26}
          />
          <IconButton
            icon="video"
            iconColor={theme.colors.secondary}
            size={26}
          />
          <Button
            mode="elevated"
            labelStyle={{
              fontFamily: largeFont,
              color: theme.colors.textPrimary,
            }}
            style={{
              backgroundColor: theme.dark
                ? theme.colors.secondary
                : theme.colors.secondaryLight,
            }}
          >
            {intl.formatMessage({ id: "classroom_joinClass" }).toUpperCase()}
          </Button>
        </View>
      </Surface>
      <Portal>
        <Dialog visible={false}>
          <Dialog.Title>Dialog Title</Dialog.Title>
          <Dialog.Content>
            <Text>Dialog content</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </LinearGradient>
  );
};

export default Classroom;

const styles = StyleSheet.create({
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
  controlsBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
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
