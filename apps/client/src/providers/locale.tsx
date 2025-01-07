import "@/client/libs/dayjs";

import { i18n } from "@lingui/core";
import { detect, fromStorage, fromUrl } from "@lingui/detect-locale";
import { I18nProvider } from "@lingui/react";
import { languages } from "@reactive-resume/utils";
import { useEffect } from "react";

import { defaultLocale, dynamicActivate } from "../libs/lingui";

type Props = {
  children: React.ReactNode;
};

export const LocaleProvider = ({ children }: Props) => {
  useEffect(() => {
    const detectedLocale =
      detect(fromUrl("locale"), fromStorage("locale"), defaultLocale) ?? defaultLocale;
    // Activate the locale only if it's supported
    if (languages.some((lang) => lang.locale === detectedLocale)) {
      void dynamicActivate(detectedLocale);
    } else {
      void dynamicActivate(defaultLocale);
    }
  }, []);

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
};

export const changeLanguage = (locale: string) => {
  // Update locale in local storage
  window.localStorage.setItem("locale", locale);

  // Update locale in user profile, if authenticated

  // Reload the page for language switch to take effect
  window.location.reload();
};
