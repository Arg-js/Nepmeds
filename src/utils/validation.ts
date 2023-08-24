export function checkNumberMatch(number: string): boolean {
  const pattern = /^(?:\+977[-\s]?)?9[78]\d{8}$/;
  return pattern.test(number);
}
