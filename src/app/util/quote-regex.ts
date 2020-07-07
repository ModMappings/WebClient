/**
 * Quotes a literal to be used in regex
 */
export function quoteRegex(literal: string): string {
  return literal.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
}

export function caseInsensitiveRegex(literal: string): string {
  return [...literal].map(c => {
    const lc = c.toLowerCase();
    const uc = c.toUpperCase();
    if (lc === uc) {
      return quoteRegex(lc);
    } else {
      return '[' + quoteRegex(lc) + quoteRegex(uc) + ']';
    }
  }).join('');
}
