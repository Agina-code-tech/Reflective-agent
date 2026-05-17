const blockedPatterns = [
  /\byou (have|are) (trauma|ptsd|depression|anxiety)\b/i,
  /\byou definitely\b/i,
  /\bthis proves\b/i,
  /\byou need me\b/i,
  /\bstay with me\b/i,
  /\bI am here for you\b/i,
  /\bas your therapist\b/i
];

export function sanitizeReflectionText(text: string) {
  return blockedPatterns.reduce((accumulator, pattern) => accumulator.replace(pattern, "There may be a recurring pattern worth noticing."), text);
}

export function isSafeReflection(text: string) {
  return !blockedPatterns.some((pattern) => pattern.test(text));
}

