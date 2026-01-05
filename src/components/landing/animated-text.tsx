"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef, ReactNode } from "react";

interface AnimatedTextProps {
  children: string;
  className?: string;
  delay?: number;
  animationType?: "words" | "characters" | "lines";
}

export function AnimatedText({
  children,
  className = "",
  delay = 0,
  animationType = "words",
}: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const variants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: animationType === "characters" ? 0.02 : 0.08,
        delayChildren: delay,
      },
    },
  };

  const childVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const getElements = () => {
    if (animationType === "characters") {
      return children.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={childVariants}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ));
    }

    if (animationType === "lines") {
      return children.split("\n").map((line, i) => (
        <motion.span
          key={i}
          variants={childVariants}
          className="block"
        >
          {line}
        </motion.span>
      ));
    }

    // Default: words
    return children.split(" ").map((word, i) => (
      <motion.span
        key={i}
        variants={childVariants}
        className="inline-block mr-[0.25em]"
      >
        {word}
      </motion.span>
    ));
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {getElements()}
    </motion.div>
  );
}

// Gradient text with animation
interface GradientTextProps {
  children: string;
  className?: string;
  from?: string;
  via?: string;
  to?: string;
}

export function GradientText({
  children,
  className = "",
  from = "from-violet-400",
  via = "via-purple-400",
  to = "to-indigo-400",
}: GradientTextProps) {
  return (
    <span
      className={`bg-gradient-to-r ${from} ${via} ${to} bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient ${className}`}
    >
      {children}
    </span>
  );
}

// Typewriter effect
interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

export function Typewriter({
  text,
  className = "",
  speed = 50,
  delay = 0,
}: TypewriterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 1 }}
      animate={isInView ? { opacity: 1 } : { opacity: 1 }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: 0.01,
            delay: delay + i * (speed / 1000),
          }}
        >
          {char}
        </motion.span>
      ))}
      <motion.span
        className="inline-block w-[2px] h-[1em] bg-current ml-1"
        animate={{ opacity: [1, 0] }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </motion.span>
  );
}

// Wrapper for any element with fade-in animation
interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export function FadeIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const directions = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...directions[direction],
      }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, ...directions[direction] }
      }
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
