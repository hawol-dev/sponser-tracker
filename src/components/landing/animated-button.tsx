"use client";

import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

interface ShineButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function ShineButton({ children, className = "", onClick }: ShineButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      className={cn(
        "relative overflow-hidden rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-3 text-white font-medium",
        className
      )}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {children}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: "-100%" }}
        animate={isHovered ? { x: "100%" } : { x: "-100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
    </motion.button>
  );
}

// Magnetic button that follows cursor slightly
interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function MagneticButton({ children, className = "", onClick }: MagneticButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) * 0.1;
    const y = (e.clientY - centerY) * 0.1;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      className={className}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

// Ripple effect button
interface RippleButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function RippleButton({ children, className = "", onClick }: RippleButtonProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples([...ripples, { x, y, id }]);

    setTimeout(() => {
      setRipples((prevRipples) => prevRipples.filter((ripple) => ripple.id !== id));
    }, 600);

    onClick?.();
  };

  return (
    <button
      className={cn("relative overflow-hidden", className)}
      onClick={handleClick}
    >
      {children}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
          initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 1 }}
          animate={{ width: 300, height: 300, x: -150, y: -150, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </button>
  );
}

// Animated gradient border button
interface GradientBorderButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function GradientBorderButton({ children, className = "", onClick }: GradientBorderButtonProps) {
  return (
    <motion.button
      className={cn(
        "relative p-[2px] rounded-lg overflow-hidden group",
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 3,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{ backgroundSize: "200% 200%" }}
      />
      <div className="relative bg-[#09090b] rounded-[6px] px-6 py-2.5 text-white font-medium transition-colors group-hover:bg-[#09090b]/80">
        {children}
      </div>
    </motion.button>
  );
}
