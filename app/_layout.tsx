import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { IntlProvider } from "react-intl";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import NetInfo from "@react-native-community/netinfo";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import ThemeContextProvider from "../context/themeContext";
import LocaleContextProvider, {
  useLocaleContext,
} from "../context/localeContext";
import StudentContextProvider from "../context/studentContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

NetInfo.fetch().then((state) => {
  queryClient.setDefaultOptions({
    queries: {
      enabled:
        state.isConnected === null || state.isConnected === false
          ? false
          : true,
      retry: 2,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  });
});

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    "Bauhaus-Light": require("../assets/fonts/bauhausstd-light.ttf"),
    "Bauhaus-Medium": require("../assets/fonts/bauhausstd-medium.ttf"),
    "Bauhaus-Heavy": require("../assets/fonts/bauhausstd-heavy.ttf"),
    Hummingbird: require("../assets/fonts/hummingbird.ttf"),
    "LobsterTwo-Regular": require("../assets/fonts/LobsterTwo-Regular.ttf"),
    "LobsterTwo-Bold": require("../assets/fonts/LobsterTwo-Bold.ttf"),
    "NexaScript-Light": require("../assets/fonts/NexaScriptLight.otf"),
    "NexaScript-Heavy": require("../assets/fonts/NexaScriptHeavy.otf"),
    NotoSerif: require("../assets/fonts/NotoSerif.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Ubuntu-Regular": require("../assets/fonts/Ubuntu-Regular.ttf"),
    "Ubuntu-Bold": require("../assets/fonts/Ubuntu-Bold.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeContextProvider>
          <LocaleContextProvider>{null}</LocaleContextProvider>
        </ThemeContextProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <LocaleContextProvider>
          <RootLayoutNav />
        </LocaleContextProvider>
      </ThemeContextProvider>
    </QueryClientProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { locale, messages } = useLocaleContext();

  return (
    <IntlProvider locale={locale} messages={messages}>
      <StudentContextProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="(main)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: "modal" }} />
          </Stack>
        </ThemeProvider>
      </StudentContextProvider>
    </IntlProvider>
  );
}
