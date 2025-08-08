import {PropsWithChildren} from "react";

import {useTheme} from "../theme/ThemeContext";
import ThemeSwitcher from "../theme/ThemeSwitcher";

import {ScrollTopButton} from "./ScrollTopButton";

export const Layout = ({children}: PropsWithChildren) => {
  const {theme} = useTheme()
  return (
    <div
      data-theme={theme}
      className="min-h-screen bg-fixed flex items-center flex-col bg-cover bg-center bg-no-repeat bg-[url('/images/background.webp')] py-8 gap-6 px-2 sm:px-4"
    >
      <ThemeSwitcher/>
      <img src="/images/logo.webp" alt="PokeBattle Logo" height={100} />
      {children}
      <ScrollTopButton />
    </div>
  );
}
