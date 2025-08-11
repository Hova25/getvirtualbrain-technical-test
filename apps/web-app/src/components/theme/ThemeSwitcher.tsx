import React from 'react';
import {IoIosMoon, IoIosSunny} from "react-icons/io";

import {useTheme} from "@/components/theme/ThemeContext";
import {Button} from "@/components/ui/Button";

const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button variant="secondary" onClick={toggleTheme} className="max-w-fit fixed top-4 right-4 sm:top-4 sm:right-10 p-0.5 [&_svg]:size-6 z-50">
      <div className='flex items-center'>{theme === 'light' ? <IoIosMoon/> : <IoIosSunny/>}</div>
    </Button>
  );
};

export default ThemeSwitcher;
