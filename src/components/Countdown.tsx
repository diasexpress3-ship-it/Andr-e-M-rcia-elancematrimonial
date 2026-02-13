
import React, { useState, useEffect, useCallback } from 'react';
import { WEDDING_DATE } from '../constants';
import { TimeLeft } from '../types';

const Countdown: React.FC = () => {
  const calculateTimeLeft = useCallback((): TimeLeft => {
    const difference = +WEDDING_DATE - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }, []);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center px-3 md:px-6">
      <span className="text-3xl md:text-5xl font-bold text-[#d4af37]">{value.toString().padStart(2, '0')}</span>
      <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#2c1810]/60 font-semibold mt-1">{label}</span>
    </div>
  );

  return (
    <div className="flex items-center justify-center bg-white/80 backdrop-blur-md rounded-xl p-6 md:p-8 shadow-xl border border-white/50 reveal-up">
      <TimeUnit value={timeLeft.days} label="Dias" />
      <div className="text-[#d4af37]/40 font-light text-2xl md:text-4xl px-1 md:px-2">:</div>
      <TimeUnit value={timeLeft.hours} label="Horas" />
      <div className="text-[#d4af37]/40 font-light text-2xl md:text-4xl px-1 md:px-2">:</div>
      <TimeUnit value={timeLeft.minutes} label="Minutos" />
      <div className="text-[#d4af37]/40 font-light text-2xl md:text-4xl px-1 md:px-2">:</div>
      <TimeUnit value={timeLeft.seconds} label="Segundos" />
    </div>
  );
};

export default Countdown;
