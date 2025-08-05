import {PropsWithChildren} from "react";

import {useTheme} from "../theme/ThemeContext";

export const Layout = ({children}: PropsWithChildren) => {
  const {theme} = useTheme()
  return <div data-theme={theme}>
    {children}
  </div>
}
