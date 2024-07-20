// components/ShareholdingsBackground.tsx

"use client";

import { useEffect } from "react";

const ShareholdingsBackground = () => {
  useEffect(() => {
    const animateBackground = () => {
      const bg = document.querySelector(".shareholdings-bg") as HTMLElement;
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
    <div className="shareholdings-bg absolute -inset-15 bg-gradient-to-br from-blue-900 to-black opacity-50 rounded-full"></div>
  );
};

export default ShareholdingsBackground;
