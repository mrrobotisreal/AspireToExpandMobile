import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import {
  DefaultTheme,
  MD3Theme,
  Provider as PaperProvider,
} from "react-native-paper";

export type ThemeMode = "light" | "dark";
export type AppFontFamily =
  | "Bauhaus"
  | "Hummingbird"
  | "LobsterTwo"
  | "NexaScript"
  | "NotoSerif"
  | "Roboto"
  | "Ubuntu";

interface ThemeContextProps {
  themeMode: "light" | "dark";
  toggleThemeMode: (mode: ThemeMode) => void;
  theme: MD3Theme;
  fontFamily: AppFontFamily;
  smallFont: string;
  mediumFont: string;
  largeFont: string;
  changeFontStyle: (newFontFamily: AppFontFamily) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  themeMode: "light",
  toggleThemeMode: (mode: ThemeMode) => {},
  theme: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#2ec4b6",
      primaryLight: "#cbf3f0",
      primaryDark: "#006D77",
      secondary: "#ff9f1c",
      secondaryLight: "#fad621",
      secondaryDark: "#78290f",
      textPrimary: "#001524",
      textSecondary: "#264653",
    },
    dark: false,
    fonts: {
      ...DefaultTheme.fonts,
      bodySmall: {
        ...DefaultTheme.fonts.bodySmall,
        fontFamily: "Bauhaus-Light",
      },
      bodyMedium: {
        ...DefaultTheme.fonts.bodyMedium,
        fontFamily: "Bauhaus-Medium",
      },
      bodyLarge: {
        ...DefaultTheme.fonts.bodyLarge,
        fontFamily: "Bauhaus-Medium",
      },
      displaySmall: {
        ...DefaultTheme.fonts.displaySmall,
        fontFamily: "Bauhaus-Heavy",
      },
      displayMedium: {
        ...DefaultTheme.fonts.displayMedium,
        fontFamily: "Bauhaus-Heavy",
      },
      displayLarge: {
        ...DefaultTheme.fonts.displayLarge,
        fontFamily: "Bauhaus-Heavy",
      },
      headlineSmall: {
        ...DefaultTheme.fonts.headlineSmall,
        fontFamily: "Bauhaus-Heavy",
      },
      headlineMedium: {
        ...DefaultTheme.fonts.headlineMedium,
        fontFamily: "Bauhaus-Heavy",
      },
      headlineLarge: {
        ...DefaultTheme.fonts.headlineLarge,
        fontFamily: "Bauhaus-Heavy",
      },
      labelSmall: {
        ...DefaultTheme.fonts.labelSmall,
        fontFamily: "Bauhaus-Light",
      },
      labelMedium: {
        ...DefaultTheme.fonts.labelMedium,
        fontFamily: "Bauhaus-Medium",
      },
      labelLarge: {
        ...DefaultTheme.fonts.labelLarge,
        fontFamily: "Bauhaus-Medium",
      },
      titleSmall: {
        ...DefaultTheme.fonts.titleSmall,
        fontFamily: "Bauhaus-Heavy",
      },
      titleMedium: {
        ...DefaultTheme.fonts.titleMedium,
        fontFamily: "Bauhaus-Heavy",
      },
      titleLarge: {
        ...DefaultTheme.fonts.titleLarge,
        fontFamily: "Bauhaus-Heavy",
      },
    },
  },
  fontFamily: "Bauhaus",
  smallFont: "Bauhaus-Light",
  mediumFont: "Bauhaus-Medium",
  largeFont: "Bauhaus-Heavy",
  changeFontStyle: (newFontFamily: AppFontFamily) => {},
} as ThemeContextProps);

export const useThemeContext = () =>
  useContext<ThemeContextProps>(ThemeContext);

const ThemeContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");
  const [theme, setTheme] = useState({
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#2ec4b6",
      primaryLight: "#cbf3f0",
      primaryDark: "#006D77",
      secondary: "#ff9f1c",
      secondaryLight: "#fad621",
      secondaryDark: "#78290f",
      textPrimary: "#001524",
      textSecondary: "#264653",
    },
    dark: false,
    fonts: {
      ...DefaultTheme.fonts,
      bodySmall: {
        ...DefaultTheme.fonts.bodySmall,
        fontFamily: "Bauhaus-Light",
      },
      bodyMedium: {
        ...DefaultTheme.fonts.bodyMedium,
        fontFamily: "Bauhaus-Medium",
      },
      bodyLarge: {
        ...DefaultTheme.fonts.bodyLarge,
        fontFamily: "Bauhaus-Medium",
      },
      displaySmall: {
        ...DefaultTheme.fonts.displaySmall,
        fontFamily: "Bauhaus-Heavy",
      },
      displayMedium: {
        ...DefaultTheme.fonts.displayMedium,
        fontFamily: "Bauhaus-Heavy",
      },
      displayLarge: {
        ...DefaultTheme.fonts.displayLarge,
        fontFamily: "Bauhaus-Heavy",
      },
      headlineSmall: {
        ...DefaultTheme.fonts.headlineSmall,
        fontFamily: "Bauhaus-Heavy",
      },
      headlineMedium: {
        ...DefaultTheme.fonts.headlineMedium,
        fontFamily: "Bauhaus-Heavy",
      },
      headlineLarge: {
        ...DefaultTheme.fonts.headlineLarge,
        fontFamily: "Bauhaus-Heavy",
      },
      labelSmall: {
        ...DefaultTheme.fonts.labelSmall,
        fontFamily: "Bauhaus-Light",
      },
      labelMedium: {
        ...DefaultTheme.fonts.labelMedium,
        fontFamily: "Bauhaus-Medium",
      },
      labelLarge: {
        ...DefaultTheme.fonts.labelLarge,
        fontFamily: "Bauhaus-Medium",
      },
      titleSmall: {
        ...DefaultTheme.fonts.titleSmall,
        fontFamily: "Bauhaus-Heavy",
      },
      titleMedium: {
        ...DefaultTheme.fonts.titleMedium,
        fontFamily: "Bauhaus-Heavy",
      },
      titleLarge: {
        ...DefaultTheme.fonts.titleLarge,
        fontFamily: "Bauhaus-Heavy",
      },
    },
  });
  const [fontFamily, setFontFamily] = useState<AppFontFamily>("Bauhaus");
  const [smallFont, setSmallFont] = useState<string>("Bauhaus-Light");
  const [mediumFont, setMediumFont] = useState<string>("Bauhaus-Medium");
  const [largeFont, setLargeFont] = useState<string>("Bauhaus-Heavy");

  const toggleThemeMode = (mode: ThemeMode) => {
    setThemeMode(mode);
    setTheme(
      mode === "light"
        ? {
            ...DefaultTheme,
            colors: {
              ...DefaultTheme.colors,
              primary: "#2ec4b6",
              primaryLight: "#cbf3f0",
              primaryDark: "#006D77",
              secondary: "#ff9f1c",
              secondaryLight: "#fad621",
              secondaryDark: "#78290f",
              textPrimary: "#001524",
              textSecondary: "#264653",
            },
            dark: false,
            fonts: {
              ...DefaultTheme.fonts,
              bodySmall: {
                ...DefaultTheme.fonts.bodySmall,
                fontFamily: smallFont,
              },
              bodyMedium: {
                ...DefaultTheme.fonts.bodyMedium,
                fontFamily: mediumFont,
              },
              bodyLarge: {
                ...DefaultTheme.fonts.bodyLarge,
                fontFamily: mediumFont,
              },
              displaySmall: {
                ...DefaultTheme.fonts.displaySmall,
                fontFamily: largeFont,
              },
              displayMedium: {
                ...DefaultTheme.fonts.displayMedium,
                fontFamily: largeFont,
              },
              displayLarge: {
                ...DefaultTheme.fonts.displayLarge,
                fontFamily: largeFont,
              },
              headlineSmall: {
                ...DefaultTheme.fonts.headlineSmall,
                fontFamily: largeFont,
              },
              headlineMedium: {
                ...DefaultTheme.fonts.headlineMedium,
                fontFamily: largeFont,
              },
              headlineLarge: {
                ...DefaultTheme.fonts.headlineLarge,
                fontFamily: largeFont,
              },
              labelSmall: {
                ...DefaultTheme.fonts.labelSmall,
                fontFamily: smallFont,
              },
              labelMedium: {
                ...DefaultTheme.fonts.labelMedium,
                fontFamily: mediumFont,
              },
              labelLarge: {
                ...DefaultTheme.fonts.labelLarge,
                fontFamily: mediumFont,
              },
              titleSmall: {
                ...DefaultTheme.fonts.titleSmall,
                fontFamily: largeFont,
              },
              titleMedium: {
                ...DefaultTheme.fonts.titleMedium,
                fontFamily: largeFont,
              },
              titleLarge: {
                ...DefaultTheme.fonts.titleLarge,
                fontFamily: largeFont,
              },
            },
          }
        : {
            ...DefaultTheme,
            colors: {
              ...DefaultTheme.colors,
              primary: "#2ec4b6",
              primaryLight: "#cbf3f0",
              primaryDark: "#006D77",
              secondary: "#ff9f1c",
              secondaryLight: "#fad621",
              secondaryDark: "#78290f",
              textPrimary: "#001524",
              textSecondary: "#264653",
            },
            dark: false,
            fonts: {
              ...DefaultTheme.fonts,
              bodySmall: {
                ...DefaultTheme.fonts.bodySmall,
                fontFamily: smallFont,
              },
              bodyMedium: {
                ...DefaultTheme.fonts.bodyMedium,
                fontFamily: mediumFont,
              },
              bodyLarge: {
                ...DefaultTheme.fonts.bodyLarge,
                fontFamily: mediumFont,
              },
              displaySmall: {
                ...DefaultTheme.fonts.displaySmall,
                fontFamily: largeFont,
              },
              displayMedium: {
                ...DefaultTheme.fonts.displayMedium,
                fontFamily: largeFont,
              },
              displayLarge: {
                ...DefaultTheme.fonts.displayLarge,
                fontFamily: largeFont,
              },
              headlineSmall: {
                ...DefaultTheme.fonts.headlineSmall,
                fontFamily: largeFont,
              },
              headlineMedium: {
                ...DefaultTheme.fonts.headlineMedium,
                fontFamily: largeFont,
              },
              headlineLarge: {
                ...DefaultTheme.fonts.headlineLarge,
                fontFamily: largeFont,
              },
              labelSmall: {
                ...DefaultTheme.fonts.labelSmall,
                fontFamily: smallFont,
              },
              labelMedium: {
                ...DefaultTheme.fonts.labelMedium,
                fontFamily: mediumFont,
              },
              labelLarge: {
                ...DefaultTheme.fonts.labelLarge,
                fontFamily: mediumFont,
              },
              titleSmall: {
                ...DefaultTheme.fonts.titleSmall,
                fontFamily: largeFont,
              },
              titleMedium: {
                ...DefaultTheme.fonts.titleMedium,
                fontFamily: largeFont,
              },
              titleLarge: {
                ...DefaultTheme.fonts.titleLarge,
                fontFamily: largeFont,
              },
            },
          }
    ); // TODO: update with dark theme/light theme
  };

  const changeFontStyle = (newFontFamily: AppFontFamily) => {
    setFontFamily(newFontFamily);

    switch (newFontFamily) {
      case "Bauhaus":
        setSmallFont("Bauhaus-Light");
        setMediumFont("Bauhaus-Medium");
        setLargeFont("Bauhaus-Heavy");
        break;
      case "Hummingbird":
        setSmallFont("Hummingbird");
        setMediumFont("Hummingbird");
        setLargeFont("Hummingbird");
        break;
      case "LobsterTwo":
        setSmallFont("LobsterTwo-Regular");
        setMediumFont("LobsterTwo-Regular");
        setLargeFont("LobsterTwo-Bold");
        break;
      case "NexaScript":
        setSmallFont("NexaScript-Light");
        setMediumFont("NexaScript-Light");
        setLargeFont("NexaScript-Heavy");
        break;
      case "NotoSerif":
        setSmallFont("NotoSerif");
        setMediumFont("NotoSerif");
        setLargeFont("NotoSerif");
        break;
      case "Roboto":
        setSmallFont("Roboto-Regular");
        setMediumFont("Roboto-Regular");
        setLargeFont("Roboto-Bold");
        break;
      case "Ubuntu":
        setSmallFont("Ubuntu-Regular");
        setMediumFont("Ubuntu-Regular");
        setLargeFont("Ubuntu-Bold");
        break;
      default:
        setSmallFont("Bauhaus-Light");
        setMediumFont("Bauhaus-Medium");
        setLargeFont("Bauhaus-Heavy");
    }

    setTheme({
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: "#2ec4b6",
        primaryLight: "#cbf3f0",
        primaryDark: "#006D77",
        secondary: "#ff9f1c",
        secondaryLight: "#fad621",
        secondaryDark: "#78290f",
        textPrimary: "#001524",
        textSecondary: "#264653",
      },
      dark: false,
      fonts: {
        ...DefaultTheme.fonts,
        bodySmall: {
          ...DefaultTheme.fonts.bodySmall,
          fontFamily: smallFont,
        },
        bodyMedium: {
          ...DefaultTheme.fonts.bodyMedium,
          fontFamily: mediumFont,
        },
        bodyLarge: {
          ...DefaultTheme.fonts.bodyLarge,
          fontFamily: mediumFont,
        },
        displaySmall: {
          ...DefaultTheme.fonts.displaySmall,
          fontFamily: largeFont,
        },
        displayMedium: {
          ...DefaultTheme.fonts.displayMedium,
          fontFamily: largeFont,
        },
        displayLarge: {
          ...DefaultTheme.fonts.displayLarge,
          fontFamily: largeFont,
        },
        headlineSmall: {
          ...DefaultTheme.fonts.headlineSmall,
          fontFamily: largeFont,
        },
        headlineMedium: {
          ...DefaultTheme.fonts.headlineMedium,
          fontFamily: largeFont,
        },
        headlineLarge: {
          ...DefaultTheme.fonts.headlineLarge,
          fontFamily: largeFont,
        },
        labelSmall: {
          ...DefaultTheme.fonts.labelSmall,
          fontFamily: smallFont,
        },
        labelMedium: {
          ...DefaultTheme.fonts.labelMedium,
          fontFamily: mediumFont,
        },
        labelLarge: {
          ...DefaultTheme.fonts.labelLarge,
          fontFamily: mediumFont,
        },
        titleSmall: {
          ...DefaultTheme.fonts.titleSmall,
          fontFamily: largeFont,
        },
        titleMedium: {
          ...DefaultTheme.fonts.titleMedium,
          fontFamily: largeFont,
        },
        titleLarge: {
          ...DefaultTheme.fonts.titleLarge,
          fontFamily: largeFont,
        },
      },
    });
  };

  const values: ThemeContextProps = {
    themeMode,
    toggleThemeMode,
    theme,
    fontFamily,
    smallFont,
    mediumFont,
    largeFont,
    changeFontStyle,
  } as ThemeContextProps;

  return (
    <ThemeContext.Provider value={values}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
