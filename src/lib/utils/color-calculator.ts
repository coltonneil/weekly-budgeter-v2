/**
 * Gets the interpolated color for a specified percentage using a start and end color.
 *
 * @param {number[]} colorStart - The start color, represented as an array of RGB values (0-255).
 * @param {number[]} colorEnd - The end color, represented as an array of RGB values (0-255).
 * @param {number} percent - The percentage at which to calculate the color, from 0 to 1.
 * @returns {string} The color corresponding to the specified percentage, formatted as a hex string.
 *
 * @example
 * getColorForPercentage([132, 204, 22], [212, 25, 118], 0.5); // "#9a814a"
 */
export function getColorForPercentage(
	colorStart: number[],
	colorEnd: number[],
	percent: number
): string {
	// percent cannot be lower than 0
	const amount = 1 - (percent < 0 ? 0 : percent);
	const [ar, ag, ab] = colorStart;
	const [br, bg, bb] = colorEnd;
	const r = ar + amount * (br - ar);
	const g = ag + amount * (bg - ag);
	const b = ab + amount * (bb - ab);
	return `#${[r, g, b].map((x) => Math.round(x).toString(16).padStart(2, '0')).join('')}`;
}
