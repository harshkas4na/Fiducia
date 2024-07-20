// components/Timer.tsx
import React, { useEffect, useState } from 'react';

interface TimerProps {
  closureTime: number;
}

const Timer: React.FC<TimerProps> = ({ closureTime }) => {
  const calculateTimeLeft = () => {
    const difference = closureTime * 1000 - new Date().getTime();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="backdrop-blur-md bg-gray-800 top-5 bg-opacity-20 p-6 rounded-3xl shadow-lg w-full lg:w-1/2 relative overflow-hidden mt-6">
      <div className="absolute inset-0 shadow-inner shadow-blue-500/50"></div>
      <div className="relative z-10">
        <h2 className="text-2xl font-bold text-white text-center mb-4">Time Left</h2>
        <div className="flex justify-center items-center text-white">
          <div className="p-2 text-center">
            <span className="text-2xl font-semibold">{timeLeft.days}</span>
            <span className="block text-sm">days</span>
          </div>
          <div className="p-2 text-center">
            <span className="text-2xl font-semibold">{timeLeft.hours}</span>
            <span className="block text-sm">hours</span>
          </div>
          <div className="p-2 text-center">
            <span className="text-2xl font-semibold">{timeLeft.minutes}</span>
            <span className="block text-sm">minutes</span>
          </div>
          <div className="p-2 text-center">
            <span className="text-2xl font-semibold">{timeLeft.seconds}</span>
            <span className="block text-sm">seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
