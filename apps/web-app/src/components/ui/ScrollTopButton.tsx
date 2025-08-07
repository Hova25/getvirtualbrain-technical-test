import {useEffect, useState} from "react";
import {IoMdArrowUp} from "react-icons/io";

import {Button} from "./Button.tsx";

export function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50"
      aria-label="Remonter en haut"
    >
      <IoMdArrowUp />
    </Button>
  );
}
