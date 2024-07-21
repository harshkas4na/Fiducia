"use client";

import { useEffect } from "react";

const AnimateBackground: React.FC = () => {
  useEffect(() => {
    const animateBackground = () => {
      const bg = document.querySelector(".contribute-bg") as HTMLElement;
      if (!bg) return;

      let x = 0;
      let y = 0;

      setInterval(() => {
        x = (x + 1) % 100;
        y = (y + 1) % 100;
        bg.style.backgroundPosition = `${x}% ${y}%`;
      }, 50);
    };

    animateBackground();
  }, []);

  return (
    <div className="contribute-bg absolute -inset-5 bg-gradient-to-br from-blue-900 to-black opacity-15 rounded-full"></div>
  );
};

export default AnimateBackground;
