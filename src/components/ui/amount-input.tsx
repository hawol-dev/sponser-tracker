"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AmountInputProps {
  name: string;
  defaultValue?: number;
  placeholder?: string;
  error?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export function AmountInput({
  name,
  defaultValue = 0,
  placeholder = "ex: 200,000",
  error,
  onBlur,
}: AmountInputProps) {
  const [displayValue, setDisplayValue] = React.useState(() => {
    return defaultValue > 0 ? formatNumber(defaultValue) : "";
  });
  const [rawValue, setRawValue] = React.useState(defaultValue);

  function formatNumber(num: number): string {
    return num.toLocaleString("ko-KR");
  }

  function parseNumber(str: string): number {
    const cleaned = str.replace(/[^\d]/g, "");
    return cleaned ? parseInt(cleaned, 10) : 0;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const num = parseNumber(input);
    setRawValue(num);
    setDisplayValue(num > 0 ? formatNumber(num) : "");
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Create a synthetic event with the raw number value for validation
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        name,
        value: rawValue.toString(),
      },
    } as React.FocusEvent<HTMLInputElement>;
    onBlur?.(syntheticEvent);
  };

  return (
    <div className="space-y-1.5">
      <input type="hidden" name={name} value={rawValue} />
      <input
        type="text"
        inputMode="numeric"
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors",
          "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          error && "border-destructive focus-visible:ring-destructive"
        )}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
