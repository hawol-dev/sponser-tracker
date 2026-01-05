"use client";

import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 2,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const springValue = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const displayValue = useTransform(springValue, (latest) => {
    if (value >= 1000000) {
      return `${prefix}${(latest / 100000000).toFixed(0)}억${suffix}`;
    }
    if (value >= 1000) {
      return `${prefix}${Math.round(latest).toLocaleString()}${suffix}`;
    }
    return `${prefix}${Math.round(latest)}${suffix}`;
  });

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, springValue, value]);

  return (
    <motion.span ref={ref} className={className}>
      {displayValue}
    </motion.span>
  );
}

// Specialized counter for percentage values
interface PercentageCounterProps {
  value: number;
  duration?: number;
  className?: string;
}

export function PercentageCounter({
  value,
  duration = 2,
  className = "",
}: PercentageCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const springValue = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const displayValue = useTransform(springValue, (latest) =>
    `${Math.round(latest)}%`
  );

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, springValue, value]);

  return (
    <motion.span ref={ref} className={className}>
      {displayValue}
    </motion.span>
  );
}

// Counter with plus sign suffix
interface PlusCounterProps {
  value: number;
  duration?: number;
  className?: string;
}

export function PlusCounter({
  value,
  duration = 2,
  className = "",
}: PlusCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const springValue = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const displayValue = useTransform(springValue, (latest) =>
    `${Math.round(latest).toLocaleString()}+`
  );

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, springValue, value]);

  return (
    <motion.span ref={ref} className={className}>
      {displayValue}
    </motion.span>
  );
}
