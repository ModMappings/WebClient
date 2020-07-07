/**
 * Quotes a literal to be used in regex
 */
export function quoteRegex(literal: string): string {
  return literal.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
}
