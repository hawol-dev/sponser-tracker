"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

export function FAQAccordion({ items, className = "" }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="rounded-xl bg-white/[0.02] border border-white/[0.08] overflow-hidden"
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full p-6 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
          >
            <h3 className="font-semibold text-white pr-4">{item.question}</h3>
            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex-shrink-0"
            >
              <ChevronDown className="w-5 h-5 text-white/50" />
            </motion.div>
          </button>
          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="px-6 pb-6">
                  <p className="text-sm text-white/50 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
