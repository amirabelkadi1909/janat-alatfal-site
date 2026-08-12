import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-radial from-[#fefcfa] to-[#f5f0eb] select-none"
        >
          <div className="relative flex flex-col items-center">
            {/* Playful Floating Circles Background */}
            <div className="absolute -top-12 -left-12 w-24 h-24 bg-pastel-blue rounded-full opacity-60 blur-xl animate-pulse-slow"></div>
            <div className="absolute -bottom-12 -right-12 w-28 h-28 bg-pastel-peach rounded-full opacity-60 blur-xl animate-pulse-slow delay-700"></div>

            {/* Main Interactive Playful Logo SVG */}
            <motion.div
              initial={{ scale: 0.3, rotate: -20 }}
              animate={{ 
                scale: [0.3, 1.1, 1], 
                rotate: [0, 15, -10, 0],
                y: [0, -10, 0]
              }}
              transition={{ 
                duration: 1.5,
                ease: "easeOut",
                times: [0, 0.4, 0.7, 1],
                y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
              }}
              className="w-40 h-40 flex items-center justify-center"
            >
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
                {/* Cute Sun */}
                <circle cx="150" cy="50" r="18" fill="#FDBA74" />
                <path d="M150 24V28M150 72V76M126 50H130M170 50H174M133 33L136 36M164 64L167 67M133 67L136 64M164 33L167 36" stroke="#FDBA74" strokeWidth="3" strokeLinecap="round" />

                {/* Cloud */}
                <path d="M40 70C40 64.5 44.5 60 50 60C51.5 60 52.9 60.3 54.2 60.9C56.3 57.3 60.2 55 64.6 55C70.6 55 75.7 59.4 76.8 65.2C80.3 65.6 83 68.6 83 72.3C83 76.5 79.5 80 75.3 80H47.7C43.5 80 40 76.5 40 72.3C40 71.5 40.1 70.7 40.4 70" fill="#E2E8F0" opacity="0.8"/>

                {/* Cute School / Kindergarten House */}
                <rect x="55" y="85" width="90" height="70" rx="16" fill="#93C5FD" />
                <path d="M45 92C45 92 68.5 65.5 95 65.5C121.5 65.5 155 92 155 92" stroke="#F87171" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* Heart in Roof */}
                <path d="M100 80C100 80 97 75 94 75C90.5 75 88 77.5 88 81C88 85.5 100 93 100 93C100 93 112 85.5 112 81C112 77.5 109.5 75 106 75C103 75 100 80 100 80Z" fill="#F87171" />

                {/* Cute Door */}
                <path d="M85 155V120C85 111.7 91.7 105 100 105C108.3 105 115 111.7 115 120V155H85Z" fill="#FDE047" />
                <circle cx="108" cy="132" r="3.5" fill="#B45309" />

                {/* Cute Windows */}
                <rect x="68" y="105" width="20" height="20" rx="6" fill="#F1F5F9" stroke="#93C5FD" strokeWidth="2" />
                <line x1="78" y1="105" x2="78" y2="125" stroke="#93C5FD" strokeWidth="2" />
                <line x1="68" y1="115" x2="88" y2="115" stroke="#93C5FD" strokeWidth="2" />

                <rect x="112" y="105" width="20" height="20" rx="6" fill="#F1F5F9" stroke="#93C5FD" strokeWidth="2" />
                <line x1="122" y1="105" x2="122" y2="125" stroke="#93C5FD" strokeWidth="2" />
                <line x1="112" y1="115" x2="132" y2="115" stroke="#93C5FD" strokeWidth="2" />
                
                {/* Grass/Flowers */}
                <rect x="35" y="152" width="130" height="10" rx="5" fill="#34D399" />
                
                {/* Flower Left */}
                <circle cx="45" cy="145" r="4" fill="#F472B6" />
                <circle cx="41" cy="145" r="3" fill="#FDE047" />
                <circle cx="49" cy="145" r="3" fill="#FDE047" />
                <circle cx="45" cy="141" r="3" fill="#FDE047" />
                <circle cx="45" cy="149" r="3" fill="#FDE047" />
                <rect x="44.5" y="147" width="1" height="8" fill="#059669" />

                {/* Flower Right */}
                <circle cx="155" cy="145" r="4" fill="#A78BFA" />
                <circle cx="151" cy="145" r="3" fill="#FDE047" />
                <circle cx="159" cy="145" r="3" fill="#FDE047" />
                <circle cx="155" cy="141" r="3" fill="#FDE047" />
                <circle cx="155" cy="149" r="3" fill="#FDE047" />
                <rect x="154.5" y="147" width="1" height="8" fill="#059669" />
              </svg>
            </motion.div>

            {/* Playing Title */}
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-6 text-2xl font-bold tracking-wide text-slate-700 font-cairo text-center px-4"
            >
              روضة جنة الأطفال
            </motion.h2>

            {/* Playful Loading Dots */}
            <div className="flex gap-2 mt-4 justify-center">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    y: [0, -10, 0],
                    backgroundColor: ["#93C5FD", "#FCA5A5", "#FDE047", "#86EFAC"][i % 4]
                  }}
                  transition={{ 
                    duration: 0.6, 
                    repeat: Infinity, 
                    delay: i * 0.15,
                    ease: "easeInOut"
                  }}
                  className="w-3.5 h-3.5 rounded-full"
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
