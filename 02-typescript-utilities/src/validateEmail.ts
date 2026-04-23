const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(input: string): boolean {
  return EMAIL_PATTERN.test(input.trim());
}
