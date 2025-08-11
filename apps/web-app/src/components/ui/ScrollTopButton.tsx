import { useEffect, useState } from "react";
import { IoMdArrowUp } from "react-icons/io";

import { Button } from "@/components/ui/Button";

export function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
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
      variant="secondary"
      className="fixed bottom-4 right-4 z-50 sm:bottom-4 sm:right-10 [&_svg]:size-6"
      aria-label="Remonter en haut"
    >
      <IoMdArrowUp />
    </Button>
  );
}
