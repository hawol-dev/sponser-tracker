"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

export function FormField({
  label,
  error,
  hint,
  required,
  className,
  id,
  ...props
}: FormFieldProps) {
  const inputId = id || props.name;

  return (
    <div className="space-y-2">
      <Label htmlFor={inputId} className={cn(error && "text-destructive")}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Input
        id={inputId}
        required={required}
        className={cn(
          error && "border-destructive focus-visible:ring-destructive",
          className
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-sm text-destructive flex items-center gap-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" x2="12" y1="8" y2="12" />
            <line x1="12" x2="12.01" y1="16" y2="16" />
          </svg>
          {error}
        </p>
      )}
      {!error && hint && (
        <p id={`${inputId}-hint`} className="text-sm text-muted-foreground">
          {hint}
        </p>
      )}
    </div>
  );
}

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  showCount?: boolean;
  maxLength?: number;
}

export function FormTextarea({
  label,
  error,
  hint,
  required,
  showCount,
  maxLength,
  className,
  id,
  value,
  defaultValue,
  onChange,
  ...props
}: FormTextareaProps) {
  const inputId = id || props.name;
  const [charCount, setCharCount] = React.useState(
    (value?.toString() || defaultValue?.toString() || "").length
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length);
    onChange?.(e);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={inputId} className={cn(error && "text-destructive")}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
        {showCount && maxLength && (
          <span className={cn(
            "text-xs",
            charCount > maxLength ? "text-destructive" : "text-muted-foreground"
          )}>
            {charCount}/{maxLength}
          </span>
        )}
      </div>
      <Textarea
        id={inputId}
        required={required}
        maxLength={maxLength}
        className={cn(
          error && "border-destructive focus-visible:ring-destructive",
          className
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-sm text-destructive flex items-center gap-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" x2="12" y1="8" y2="12" />
            <line x1="12" x2="12.01" y1="16" y2="16" />
          </svg>
          {error}
        </p>
      )}
      {!error && hint && (
        <p id={`${inputId}-hint`} className="text-sm text-muted-foreground">
          {hint}
        </p>
      )}
    </div>
  );
}

interface FormSelectProps {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}

export function FormSelectWrapper({
  label,
  error,
  hint,
  required,
  children,
}: FormSelectProps) {
  return (
    <div className="space-y-2">
      <Label className={cn(error && "text-destructive")}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {children}
      {error && (
        <p className="text-sm text-destructive flex items-center gap-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" x2="12" y1="8" y2="12" />
            <line x1="12" x2="12.01" y1="16" y2="16" />
          </svg>
          {error}
        </p>
      )}
      {!error && hint && (
        <p className="text-sm text-muted-foreground">{hint}</p>
      )}
    </div>
  );
}

// Validation utilities
export function validateEmail(email: string): string | null {
  if (!email) return null;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "올바른 이메일 형식이 아닙니다";
  }
  return null;
}

export function validateUrl(url: string): string | null {
  if (!url) return null;
  try {
    new URL(url);
    return null;
  } catch {
    return "올바른 URL 형식이 아닙니다 (https://로 시작)";
  }
}

export function validatePhone(phone: string): string | null {
  if (!phone) return null;
  const phoneRegex = /^[\d\-+() ]+$/;
  if (!phoneRegex.test(phone)) {
    return "올바른 전화번호 형식이 아닙니다";
  }
  return null;
}

export function validateRequired(value: string, fieldName: string): string | null {
  if (!value || value.trim() === "") {
    return `${fieldName}을(를) 입력해주세요`;
  }
  return null;
}

export function validateMinLength(value: string, minLength: number): string | null {
  if (value && value.length < minLength) {
    return `최소 ${minLength}자 이상 입력해주세요`;
  }
  return null;
}

export function validateAmount(amount: number): string | null {
  if (amount < 0) {
    return "금액은 0 이상이어야 합니다";
  }
  return null;
}
