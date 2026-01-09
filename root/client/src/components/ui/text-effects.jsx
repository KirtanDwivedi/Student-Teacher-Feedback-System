import React from "react";
import { motion } from "framer-motion";

export const TextReveal = ({ children, className = "" }) => {
  const text = typeof children === "string" ? children : "";
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ marginRight: "8px", display: "inline-block" }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export const GradientText = ({ children, className = "" }) => {
  return (
    <span
      className={`bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto] ${className}`}
    >
      {children}
    </span>
  );
};

export const TypewriterEffect = ({ words, className = "", cursorClassName = "" }) => {
  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text.split(""),
  }));

  const renderWords = () => {
    return (
      <div className="flex flex-wrap">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <motion.span
                  key={`char-${index}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.25,
                    delay: idx * 0.5 + index * 0.05,
                  }}
                  className={word.className}
                >
                  {char}
                </motion.span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={`flex items-center ${className}`}>
      {renderWords()}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={`inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-blue-500 ${cursorClassName}`}
      ></motion.span>
    </div>
  );
};

// Animated background gradient text
export const AnimatedGradientText = ({ children, className = "" }) => {
  return (
    <motion.div
      className={`relative inline-block ${className}`}
      initial={{ backgroundPosition: "0% 50%" }}
      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        backgroundImage: "linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)",
        backgroundSize: "200% 200%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </motion.div>
  );
};
