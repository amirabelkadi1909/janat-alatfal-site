import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

// Count-up helper component
const Counter = ({ targetValue, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const currentElement = elementRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const end = parseInt(targetValue, 10);
    if (start === end) return;

    const totalMiliseconds = duration;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 15);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / incrementTime));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [hasStarted, targetValue, duration]);

  return <span ref={elementRef}>{count}</span>;
};

export default function Stats() {
  const { t } = useLanguage();

  const pastelColors = [
    'from-rose-100/50 to-rose-200/20 text-rose-500',
    'from-emerald-100/50 to-emerald-200/20 text-emerald-500',
    'from-amber-100/50 to-amber-200/20 text-amber-500'
  ];

  return (
    <section className="py-16 bg-white border-y border-slate-100 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {t.stats.items.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="flex flex-col items-center justify-center relative group"
            >
              {/* Playful Circle Backdrop */}
              <div className={`absolute w-24 h-24 rounded-full bg-gradient-to-tr -z-10 group-hover:scale-110 transition-transform duration-300 blur-sm ${pastelColors[idx] || 'from-slate-100 to-slate-200'}`}></div>

              {/* Stat Value */}
              <span className="text-5xl sm:text-6xl font-black text-slate-800 tracking-tight flex items-center">
                <Counter targetValue={stat.value} />
                <span className="text-3xl sm:text-4xl ml-0.5 text-slate-400 font-extrabold">{stat.suffix}</span>
              </span>

              {/* Stat Label */}
              <span className="mt-3 text-lg font-bold text-slate-500 leading-tight">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
