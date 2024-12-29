import { FC, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Surface, Text } from "react-native-paper";
import { useIntl } from "react-intl";

import { useStudentContext } from "../../../context/studentContext";
import { useThemeContext } from "../../../context/themeContext";

const Home: FC = () => {
  const intl = useIntl();
  const { largeFont, mediumFont } = useThemeContext();
  const { info, getInfo, updateInfo } = useStudentContext();
  const { preferred_name } = info;

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
            {intl.formatMessage(
              { id: "common_welcome" },
              { firstName: preferred_name }
            )}
          </Text>
          <Text variant="bodyLarge">
            {intl.formatMessage({ id: "home_description" })}
          </Text>
        </ScrollView>
      </Surface>
    </LinearGradient>
  );
};

export default Home;

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
  },
  scrollContent: {
    paddingBottom: 16,
  },
});
