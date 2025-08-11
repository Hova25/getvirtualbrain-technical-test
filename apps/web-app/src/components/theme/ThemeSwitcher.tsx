import React from "react";
import { IoIosMoon, IoIosSunny } from "react-icons/io";

import { useTheme } from "@/components/theme/ThemeContext";
import { Button } from "@/components/ui/Button";

const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="secondary"
      onClick={toggleTheme}
      className="fixed right-4 top-4 z-50 max-w-fit p-0.5 sm:right-10 sm:top-4 [&_svg]:size-6"
    >
      <div className="flex items-center">{theme === "light" ? <IoIosMoon /> : <IoIosSunny />}</div>
    </Button>
  );
};

export default ThemeSwitcher;
