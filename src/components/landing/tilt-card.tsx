"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltIntensity?: number;
  glareEnabled?: boolean;
}

export function TiltCard({
  children,
  className = "",
  tiltIntensity = 10,
  glareEnabled = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`${tiltIntensity}deg`, `-${tiltIntensity}deg`]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`-${tiltIntensity}deg`, `${tiltIntensity}deg`]
  );

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative ${className}`}
    >
      {children}
      {glareEnabled && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.1) 0%, transparent 50%)`,
          }}
        />
      )}
    </motion.div>
  );
}

// Simpler hover lift effect
interface HoverLiftProps {
  children: ReactNode;
  className?: string;
  liftAmount?: number;
}

export function HoverLift({
  children,
  className = "",
  liftAmount = 8,
}: HoverLiftProps) {
  return (
    <motion.div
      className={className}
      whileHover={{
        y: -liftAmount,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
    >
      {children}
    </motion.div>
  );
}
