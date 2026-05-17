import { isSafeReflection, sanitizeReflectionText } from "@shared/safety";

export function moderateReflectionOutput(text: string) {
  return {
    safe: isSafeReflection(text),
    text: sanitizeReflectionText(text)
  };
}

