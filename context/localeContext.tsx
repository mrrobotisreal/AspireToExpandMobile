import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

import de_DE from "../locales/de_DE.json";
import en_US from "../locales/en_US.json";
import ru_RU from "../locales/ru_RU.json";
import uk_UA from "../locales/uk_UA.json";

export type SupportedLocale = "en" | "de" | "ru" | "uk";

interface LocaleContextProps {
  locale: SupportedLocale;
  messages: typeof en_US;
  changeLocale: (newLocale: SupportedLocale) => void;
  textDirection: "ltr" | "rtl";
}

const LocaleContext = createContext<LocaleContextProps>({
  locale: "en",
  messages: en_US,
  changeLocale: (newLocale: SupportedLocale) => {},
  textDirection: "ltr",
} as LocaleContextProps);

export const useLocaleContext = () =>
  useContext<LocaleContextProps>(LocaleContext);

const LocaleContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<SupportedLocale>("en");
  const [messages, setMessages] = useState<typeof en_US>(en_US);
  const [textDirection, setTextDirection] = useState<"ltr" | "rtl">("ltr");

  const changeLocale = (newLocale: SupportedLocale) => {
    switch (newLocale) {
      case "de":
        setMessages(de_DE);
        setTextDirection("ltr");
        break;
      case "en":
        setMessages(en_US);
        setTextDirection("ltr");
        break;
      case "ru":
        setMessages(ru_RU);
        setTextDirection("ltr");
        break;
      case "uk":
        setMessages(uk_UA);
        setTextDirection("ltr");
        break;
      default:
        setMessages(en_US);
        setTextDirection("ltr");
        break;
    }
    setLocale(newLocale);
  };

  const values: LocaleContextProps = {
    locale,
    messages,
    changeLocale,
    textDirection,
  } as LocaleContextProps;

  return (
    <LocaleContext.Provider value={values}>{children}</LocaleContext.Provider>
  );
};

export default LocaleContextProvider;
