import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const id = params.id;
	console.log(id);
	// TODO: grab budget from DB
	if (id === '123') {
		return {
			name: 'Sample Budget',
			limit: 999999,
			expenses: [
				{
					id: 1,
					expenseDate: Date.now() - getRandomNumber(1000000, 100000000),
					expenseDescription: "50 copies of the hit 2000's comedy 'Flubber'",
					expenseAmountCents: getRandomNumber(9000, 110000),
					expenseState: 'paid'
				},
				{
					id: 2,
					expenseDate: Date.now() - getRandomNumber(1000000, 100000000),
					expenseDescription: 'Ducktape, zip ties, hammers, my tools...',
					expenseAmountCents: getRandomNumber(900, 11000),
					expenseState: 'paid'
				},
				{
					id: 3,
					expenseDate: Date.now() - getRandomNumber(1000000, 100000000),
					expenseDescription: "1 paper back copy of 'SvelteKit for Dummies: 1st Edition",
					expenseAmountCents: getRandomNumber(500, 6000),
					expenseState: 'paid'
				},
				{
					id: 4,
					expenseDate: Date.now() - getRandomNumber(1000000, 100000000),
					expenseDescription: '100 cans of Play-Doh',
					expenseAmountCents: getRandomNumber(1000, 20000),
					expenseState: 'planned'
				},
				{
					id: 5,
					expenseDate: Date.now() - getRandomNumber(1000000, 100000000),
					expenseDescription: 'Tons of glitter... for reasons',
					expenseAmountCents: getRandomNumber(3000, 40000),
					expenseState: 'planned'
				},
				{
					id: 6,
					expenseDate: Date.now() - getRandomNumber(1000000, 100000000),
					expenseDescription: 'Cheese',
					expenseAmountCents: getRandomNumber(1900, 210000),
					expenseState: 'paid'
				},
				{
					id: 7,
					expenseDate: Date.now() - getRandomNumber(1000000, 100000000),
					expenseDescription: 'Local congressman',
					expenseAmountCents: getRandomNumber(4000, 500000),
					expenseState: 'paid'
				},
				{
					id: 8,
					expenseDate: Date.now() - getRandomNumber(1000000, 100000000),
					expenseDescription: 'Mob protection money',
					expenseAmountCents: getRandomNumber(1000, 300000),
					expenseState: 'paid'
				},
			]
		};
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;

// temp function for create some dynamic data for better testing on the front end
// should be removed once DB integration is complete
function getRandomNumber(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
