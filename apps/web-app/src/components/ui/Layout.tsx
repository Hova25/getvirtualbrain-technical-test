import {PropsWithChildren} from "react";

import {useTheme} from "../theme/ThemeContext";

import {ScrollTopButton} from "./ScrollTopButton.tsx";

export const Layout = ({children}: PropsWithChildren) => {
  const {theme} = useTheme()
  return (
    <div
      data-theme={theme}
      className="min-h-screen bg-fixed flex items-center flex-col bg-cover bg-center bg-no-repeat bg-[url('/images/background.webp')] py-8 gap-12 px-4"
    >
      <img src="/images/logo.webp" alt="PokeBattle Logo" height={100} />
      {children}
      <ScrollTopButton />
    </div>
  );
}
