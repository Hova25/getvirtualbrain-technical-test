import {PropsWithChildren} from "react";

import {useTheme} from "../theme/ThemeContext";

import {Header} from "./Header.tsx";

export const Layout = ({children}: PropsWithChildren) => {
  const {theme} = useTheme()
  return (
    <div data-theme={theme} className="bg-amber-50 dark:bg-slate-800 flex flex-col items-center">
      <Header/>
      {children}
    </div>
  );
}
