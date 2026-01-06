import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn (classname utility)", () => {
  it("should merge class names", () => {
    const result = cn("foo", "bar");
    expect(result).toBe("foo bar");
  });

  it("should handle conditional classes", () => {
    const result = cn("base", true && "active", false && "disabled");
    expect(result).toBe("base active");
  });

  it("should merge Tailwind classes correctly", () => {
    // twMerge should handle conflicting Tailwind classes
    const result = cn("px-2 py-1", "px-4");
    expect(result).toBe("py-1 px-4");
  });

  it("should handle arrays of classes", () => {
    const result = cn(["foo", "bar"], "baz");
    expect(result).toBe("foo bar baz");
  });

  it("should handle objects with boolean values", () => {
    const result = cn({
      base: true,
      active: true,
      disabled: false,
    });
    expect(result).toBe("base active");
  });

  it("should handle empty inputs", () => {
    const result = cn();
    expect(result).toBe("");
  });

  it("should handle null and undefined", () => {
    const result = cn("foo", null, undefined, "bar");
    expect(result).toBe("foo bar");
  });

  it("should handle complex Tailwind merging", () => {
    // Background color conflict
    const result = cn("bg-red-500", "bg-blue-500");
    expect(result).toBe("bg-blue-500");
  });

  it("should handle text color merging", () => {
    const result = cn("text-sm text-gray-500", "text-lg");
    expect(result).toBe("text-gray-500 text-lg");
  });
});
