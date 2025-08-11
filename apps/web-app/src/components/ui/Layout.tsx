import { PropsWithChildren } from "react";

import { useTheme } from "@/components/theme/ThemeContext";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";
import { ScrollTopButton } from "@/components/ui/ScrollTopButton";

export const Layout = ({ children }: PropsWithChildren) => {
  const { theme } = useTheme();
  return (
    <div
      data-theme={theme}
      className="flex min-h-screen flex-col items-center gap-6 bg-[url('/images/background.webp')] bg-cover bg-fixed bg-center bg-no-repeat px-2 py-8 sm:px-4"
    >
      <ThemeSwitcher />
      <img src="/images/logo.webp" alt="PokeBattle Logo" height={100} />
      {children}
      <ScrollTopButton />
    </div>
  );
};
