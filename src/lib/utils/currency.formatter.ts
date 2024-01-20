const defaultOptions = {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 2
};

/**
 * A pre-configured formatter for currency values.
 *
 * This formatter will convert a numerical value into a currency string,
 * using the 'en-US' locale, the 'USD' currency, and no fractional digits.
 * For example, it will convert the number 1234.56 into the string "$1,235".
 *
 * @example
 * import { currencyFormatter } from '$utils/numberFormatter';
 * let formattedValue = currencyFormatter.format(1234.56);  // "$1,235"
 */
export const currencyFormatter = new Intl.NumberFormat('en-US', defaultOptions);

/**
 * Converts an amount in cents to a dollar representation and formats it as a currency string.
 *
 * This function is used to convert server-side values (in cents) into a format suitable for client-side rendering.
 *
 * Example:
 * Input: 12345
 * Output: "$123.45"
 *
 * @param {number} cents - The amount in cents to convert.
 * @returns {string} The dollar representation of the amount, formatted as a currency string.
 */
export const centsToDollarsFormatter = (cents: number) => currencyFormatter.format(cents / 100);
