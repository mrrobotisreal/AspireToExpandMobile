const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export default {
  light: {
    common: {
      black: "#000",
      white: "#fff",
    },
    primary: {
      main: "#2ec4b6",
      light: "#cbf3f0",
      dark: "#006D77",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ff9f1c",
      light: "#fad621",
      dark: "#78290f",
      contrastText: "#ffffff",
    },
    text: { primary: "#001524", secondary: "#264653" },
    background: { default: "#fff", paper: "#f7f7f7" },
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    common: {
      black: "#fff", // yes these are inverted on purpose for dark mode
      white: "#000", // yes these are inverted on purpose for dark mode
    },
    primary: {
      main: "#2ec4b6", // these all need to be updated still, they're the same as light mode
      light: "#cbf3f0", // these all need to be updated still, they're the same as light mode
      dark: "#006D77", // these all need to be updated still, they're the same as light mode
      contrastText: "#ffffff", // these all need to be updated still, they're the same as light mode
    },
    secondary: {
      main: "#ff9f1c", // these all need to be updated still, they're the same as light mode
      light: "#fad621", // these all need to be updated still, they're the same as light mode
      dark: "#78290f", // these all need to be updated still, they're the same as light mode
      contrastText: "#ffffff", // these all need to be updated still, they're the same as light mode
    },
    background: { main: "#f7f7f7", border: "#ddd" }, // these all need to be updated still, they're the same as light mode
    border: { main: "#ddd", light: "#f7f7f7", dark: "#333" }, // these all need to be updated still, they're the same as light mode
    text: { primary: "#001524", secondary: "#264653" }, // these all need to be updated still, they're the same as light mode
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};
