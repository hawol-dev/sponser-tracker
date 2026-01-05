import { Variants } from "framer-motion";

// Fade in from bottom
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// Fade in from left
export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// Fade in from right
export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// Scale in
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// Staggered container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Staggered children (for use with staggerContainer)
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// Character animation for text
export const characterAnimation: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

// Word animation for text
export const wordAnimation: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

// Float animation (for badges, icons)
export const floatAnimation: Variants = {
  initial: {
    y: 0,
  },
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

// Pulse glow animation
export const pulseGlow: Variants = {
  initial: {
    boxShadow: "0 0 0 0 rgba(139, 92, 246, 0.4)",
  },
  animate: {
    boxShadow: [
      "0 0 0 0 rgba(139, 92, 246, 0.4)",
      "0 0 20px 10px rgba(139, 92, 246, 0.2)",
      "0 0 0 0 rgba(139, 92, 246, 0)",
    ],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

// Shake animation (for problem cards)
export const shake: Variants = {
  hover: {
    x: [0, -5, 5, -5, 5, 0],
    transition: {
      duration: 0.5,
    },
  },
};

// Card hover effect
export const cardHover: Variants = {
  initial: {
    y: 0,
    boxShadow: "0 0 0 0 rgba(139, 92, 246, 0)",
  },
  hover: {
    y: -5,
    boxShadow: "0 20px 40px -10px rgba(139, 92, 246, 0.2)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

// Icon bounce
export const iconBounce: Variants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 0.4,
    },
  },
};

// Gradient shift animation for backgrounds
export const gradientShift = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 5,
      ease: "linear",
      repeat: Infinity,
    },
  },
};

// 3D tilt perspective
export const tiltPerspective = {
  perspective: 1000,
  transformStyle: "preserve-3d" as const,
};

// Default viewport settings for scroll animations
export const defaultViewport = {
  once: true,
  margin: "-100px",
};

// Transition presets
export const transitions = {
  spring: {
    type: "spring",
    stiffness: 300,
    damping: 30,
  },
  smooth: {
    type: "tween",
    duration: 0.5,
    ease: "easeOut",
  },
  bounce: {
    type: "spring",
    stiffness: 400,
    damping: 10,
  },
};
