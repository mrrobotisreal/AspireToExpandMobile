import { FC, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Button,
  Dialog,
  Divider,
  IconButton,
  Portal,
  Surface,
  Text,
} from "react-native-paper";
import { ContributionGraph, ProgressChart } from "react-native-chart-kit";
import {
  BarChart as GiftedBarChart,
  LineChart as GiftedLineChart,
} from "react-native-gifted-charts";
import { useIntl } from "react-intl";

import { useStudentContext } from "../../../context/studentContext";
import { useThemeContext } from "../../../context/themeContext";
import { ContributionChartValue } from "react-native-chart-kit/dist/contribution-graph/ContributionGraph";

const Home: FC = () => {
  const intl = useIntl();
  const { theme, largeFont, mediumFont } = useThemeContext();
  const { info, getInfo, updateInfo } = useStudentContext();
  const { preferred_name, student_since } = info;
  const studentSinceDate = student_since
    ? new Date(student_since.split(" ")[0])
    : null;
  console.log(
    "studentSinceDate:",
    studentSinceDate ? studentSinceDate.toDateString() : null
  );
  const [isChartDetailsDialogVisible, setIsChartDetailsDialogVisible] =
    useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCount, setSelectedCount] = useState(0);
  const [allProgressLabels, setAllProgressLabels] = useState<string[][]>([
    ["12/04", "12/05", "12/06", "12/07", "12/08", "12/09", "12/10"],
    ["12/11", "12/12", "12/13", "12/14", "12/15", "12/16", "12/17"],
    ["12/18", "12/19", "12/20", "12/21", "12/22", "12/23", "12/24"],
    ["12/25", "12/26", "12/27", "12/28", "12/29", "12/30", "12/31"],
  ]);
  const [allProgressData, setAllProgressData] = useState<number[][]>([
    [0.6, 0.8, 0.9, 0.7, 0.5, 0.4, 0.6],
    [0.4, 0.3, 0.5, 0.7, 0.8, 0.6, 0.4],
    [0.2, 0.4, 0.6, 0.8, 0.5, 0.7, 0.1],
    [0.1, 0.2, 0.4, 0.6, 0.8, 0.5, 0.7],
  ]);
  const [currentProgressIndex, setCurrentProgressIndex] = useState(
    allProgressLabels.length - 1
  );
  const [currentProgressLabels, setCurrentProgressLabels] = useState<string[]>(
    allProgressLabels[currentProgressIndex]
  );
  const [currentProgressData, setCurrentProgressData] = useState<number[]>(
    allProgressData[currentProgressIndex]
  );

  const handleClickNextProgress = () => {
    if (currentProgressIndex < allProgressLabels.length - 1) {
      setCurrentProgressIndex(currentProgressIndex + 1);
      setCurrentProgressLabels(allProgressLabels[currentProgressIndex + 1]);
      setCurrentProgressData(allProgressData[currentProgressIndex + 1]);
    } else {
      setCurrentProgressIndex(0);
      setCurrentProgressLabels(allProgressLabels[0]);
      setCurrentProgressData(allProgressData[0]);
    }
  };
  const handleClickPreviousProgress = () => {
    if (currentProgressIndex > 0) {
      setCurrentProgressIndex(currentProgressIndex - 1);
      setCurrentProgressLabels(allProgressLabels[currentProgressIndex - 1]);
      setCurrentProgressData(allProgressData[currentProgressIndex - 1]);
    } else {
      setCurrentProgressIndex(allProgressLabels.length - 1);
      setCurrentProgressLabels(allProgressLabels[allProgressLabels.length - 1]);
      setCurrentProgressData(allProgressData[allProgressData.length - 1]);
    }
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
            {intl.formatMessage(
              { id: "common_welcome" },
              { firstName: preferred_name }
            )}
          </Text>
          <Text variant="bodyLarge" style={{ marginBottom: 12 }}>
            {intl.formatMessage({ id: "home_description" })}
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
              id: "home_activity",
              defaultMessage: "Activity",
            })}
          </Text>
          <Text variant="bodyLarge" style={{ marginBottom: 8 }}>
            {intl.formatMessage({
              id: "home_activity_description",
              defaultMessage:
                "Your activity for the past week. This includes things such as completed classes, completed assignments, and playing games.",
            })}
          </Text>
          <View style={{ marginBottom: 24 }}>
            <ContributionGraph
              style={{
                marginBottom: 12,
                borderRadius: 12,
                alignSelf: "center",
              }}
              values={[
                {
                  date: "2024-11-02",
                  count: 1,
                },
                {
                  date: "2024-11-03",
                  count: 2,
                },
                {
                  date: "2024-11-04",
                  count: 3,
                },
                {
                  date: "2024-11-05",
                  count: 4,
                },
                {
                  date: "2024-11-06",
                  count: 5,
                },
                {
                  date: "2024-11-30",
                  count: 2,
                },
                {
                  date: "2024-12-01",
                  count: 3,
                },
                {
                  date: "2024-12-02",
                  count: 2,
                },
                {
                  date: "2024-12-05",
                  count: 4,
                },
                {
                  date: "2024-12-15",
                  count: 2,
                },
                {
                  date: "2024-12-30",
                  count: 4,
                },
              ]}
              endDate={new Date("2024-12-29")}
              numDays={90}
              width={340}
              height={220}
              chartConfig={{
                backgroundGradientFrom: "#000000",
                backgroundGradientFromOpacity: 0.8,
                backgroundGradientTo: "#000000",
                backgroundGradientToOpacity: 0.8,
                color: (opacity = 1) => `rgba(250, 214, 33, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(46, 196, 182, ${1})`,
              }}
              tooltipDataAttrs={(value: ContributionChartValue) => {
                // @ts-ignore
                if (value.count && value.count >= 3) {
                  return {
                    // @ts-ignore
                    fill: `rgba(250, 214, 33, ${value.count / 5})`,
                    onPress: () => {
                      // @ts-ignore
                      setSelectedDate(value.date);
                      // @ts-ignore
                      setSelectedCount(value.count);
                      setIsChartDetailsDialogVisible(true);
                    },
                  };
                }
                return {};
              }}
            />
          </View>
          <Text variant="titleLarge" style={{ marginBottom: 8 }}>
            {intl.formatMessage({
              id: "home_classPerformance",
              defaultMessage: "Class Performance",
            })}
          </Text>
          <Text variant="bodyLarge" style={{ marginBottom: 8 }}>
            {intl.formatMessage({
              id: "home_classPerformance_description",
              defaultMessage:
                "Your speaking performance during class for the past 5 classes. This metric is gathered by measuring the amount of time you were speaking during the class. Your goal is to speak at least 50% of the time, and you can see your performance displayed by the yellow colored line in the graph. The turquoise colored line represents the amount of time your teacher spent speaking during the class.",
            })}
          </Text>
          <View style={{ marginBottom: 36 }}>
            <GiftedLineChart
              data={[
                {
                  value: 0,
                  hideDataPoint: true,
                },
                {
                  value: 42,
                  label: "12/12",
                  onPress: () => {
                    console.log("That tickles!!!!");
                    setIsChartDetailsDialogVisible(true);
                    setSelectedDate("12/12");
                    setSelectedCount(42);
                  },
                },
                {
                  value: 53,
                  label: "12/13",
                },
                {
                  value: 61,
                  label: "12/20",
                },
                {
                  value: 43,
                  label: "12/29",
                },
                {
                  value: 50,
                  label: "12/30",
                },
                {
                  value: 78,
                  label: "12/31",
                },
                {
                  value: 67,
                  label: "1/1",
                },
              ]}
              data2={[
                {
                  value: 0,
                  hideDataPoint: true,
                },
                {
                  value: 58,
                  label: "12/12",
                },
                {
                  value: 47,
                  label: "12/13",
                },
                {
                  value: 39,
                  label: "12/20",
                },
                {
                  value: 57,
                  label: "12/29",
                },
                {
                  value: 50,
                  label: "12/30",
                },
                {
                  value: 22,
                  label: "12/31",
                },
                {
                  value: 33,
                  label: "1/1",
                },
              ]}
              rotateLabel
              areaChart
              isAnimated
              animationDuration={1500}
              height={220}
              hideRules
              backgroundColor="rgba(0, 0, 0, 0.8)"
              zIndex1={2}
              zIndex2={1}
              color1="#fada21"
              color2="#2ec4b6"
              dataPointsColor1="#fada21"
              dataPointsColor2="#2ec4b6"
              startFillColor1="#fada21"
              startFillColor2="#2ec4b6"
              startOpacity={0.8}
              endOpacity={0.3}
              initialSpacing={0}
              xAxisLabelTextStyle={{ fontFamily: mediumFont }}
              formatYLabel={(label) => `${label}%`}
              yAxisTextStyle={{ fontFamily: mediumFont }}
              maxValue={100}
              // curved
            />
          </View>
          <Text variant="titleLarge" style={{ marginBottom: 8 }}>
            {intl.formatMessage({
              id: "home_assignmentsScores",
              defaultMessage: "Assignments Scores",
            })}
          </Text>
          <Text variant="bodyLarge" style={{ marginBottom: 8 }}>
            {intl.formatMessage({
              id: "home_assignmentsScores_description",
              defaultMessage:
                "Your scores for the past 5 assignments you've completed.",
            })}
          </Text>
          <View style={{ marginBottom: 24 }}>
            <GiftedBarChart
              data={[
                {
                  value: 91,
                  label: "12/12",
                  sideColor: "#78290f",
                  topColor: "#ff7d00",
                  frontColor: "#ffbf69",
                  onPress: () => console.log("Show me them details bro!"),
                },
                {
                  value: 78,
                  label: "12/13",
                  sideColor: "#78290f",
                  topColor: "#ff7d00",
                  frontColor: "#ffbf69",
                },
                {
                  value: 85,
                  label: "12/20",
                  sideColor: "#78290f",
                  topColor: "#ff7d00",
                  frontColor: "#ffbf69",
                },
                {
                  value: 92,
                  label: "12/29",
                  sideColor: "#78290f",
                  topColor: "#ff7d00",
                  frontColor: "#ffbf69",
                },
                {
                  value: 100,
                  label: "12/30",
                  sideColor: "#78290f",
                  topColor: "#ff7d00",
                  frontColor: "#ffbf69",
                },
                {
                  value: 88,
                  label: "12/31",
                  sideColor: "#78290f",
                  topColor: "#ff7d00",
                  frontColor: "#ffbf69",
                },
              ]}
              backgroundColor="rgba(0, 0, 0, 0.8)"
              formatYLabel={(label) => `${label}%`}
              xAxisLabelTextStyle={{ fontFamily: mediumFont }}
              yAxisTextStyle={{ fontFamily: mediumFont }}
              maxValue={100}
              hideRules
              isThreeD
              side="right"
              isAnimated
              animationDuration={1500}
            />
          </View>
          <Text variant="titleLarge" style={{ marginBottom: 8 }}>
            {intl.formatMessage({
              id: "home_dailyProgress",
              defaultMessage: "Daily Progress",
            })}
          </Text>
          <Text variant="bodyLarge" style={{ marginBottom: 8 }}>
            {intl.formatMessage({
              id: "home_dailyProgress_description",
              defaultMessage:
                "Your daily progress for the past week. Each ring represents one day with the most recent day of the week being the outermost ring and brightest shade of yellow while the least recent day is the innermost ring and dimmest shade of yellow, and the colored portion of the ring represents the amount of progress you made that day. The more progress you make, the more yellow the ring will be. Your amount of progress is calculated by comparing the amount of time you spent engaging in practice and/or studying to the goal times you set for yourself on how much time you want to commit to learning daily.",
            })}
          </Text>
          <Text
            variant="titleMedium"
            style={{
              marginBottom: 8,
              alignSelf: "center",
              textAlign: "center",
            }}
          >
            {`${currentProgressLabels[0]} - ${currentProgressLabels[currentProgressLabels.length - 1]}`}
          </Text>
          <ProgressChart
            data={{
              labels: currentProgressLabels,
              data: currentProgressData,
            }}
            width={340}
            height={220}
            chartConfig={{
              backgroundGradientFrom: "#000000",
              backgroundGradientFromOpacity: 0.8,
              backgroundGradientTo: "#000000",
              backgroundGradientToOpacity: 0.8,
              color: (opacity = 1) => `rgba(250, 214, 33, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(46, 196, 182, ${1})`,
            }}
            style={{
              marginBottom: 12,
              borderRadius: 12,
              alignSelf: "center",
            }}
            strokeWidth={10}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <IconButton
              icon="arrow-left-bold-circle"
              // @ts-ignore
              iconColor={theme.colors.secondaryLight}
              size={48}
              onPress={handleClickPreviousProgress}
              disabled={currentProgressIndex === 0}
            />
            <IconButton
              icon="arrow-right-bold-circle"
              // @ts-ignore
              iconColor={theme.colors.secondaryLight}
              size={48}
              onPress={handleClickNextProgress}
              disabled={currentProgressIndex === allProgressLabels.length - 1}
            />
          </View>
        </ScrollView>
      </Surface>
      <Portal>
        <Dialog
          visible={isChartDetailsDialogVisible}
          onDismiss={() => setIsChartDetailsDialogVisible(false)}
        >
          <Dialog.Title style={{ fontFamily: largeFont }}>
            Class Performance
          </Dialog.Title>
          <Dialog.Content>
            <Divider
              bold
              style={{
                backgroundColor: theme.dark ? "white" : "black",
                marginBottom: 20,
              }}
            />
            <Text variant="titleMedium" style={{ fontFamily: largeFont }}>
              Date:
            </Text>
            <Text
              variant="bodyLarge"
              style={{ fontFamily: mediumFont, marginBottom: 12 }}
            >
              {selectedDate}
            </Text>
            <Text variant="titleMedium" style={{ fontFamily: largeFont }}>
              Performance:
            </Text>
            <Text variant="bodyLarge" style={{ fontFamily: mediumFont }}>
              {selectedCount}%
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              mode="contained"
              style={{
                // @ts-ignore
                backgroundColor: theme.colors.secondaryLight,
                width: "25%",
              }}
              labelStyle={{
                fontFamily: largeFont,
                // @ts-ignore
                color: theme.colors.textPrimary,
              }}
              onPress={() => setIsChartDetailsDialogVisible(false)}
            >
              OK
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
    padding: 6,
  },
  scrollContent: {
    paddingBottom: 16,
  },
});
