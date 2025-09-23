import { useEffect, useState } from "react";

export const Reveal = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-all duration-1000 ease-out ${
        isVisible
          ? "opacity-100 transform translate-y-0"
          : "opacity-0 transform translate-y-8"
      }`}
    >
      {children}
    </div>
  );
};
