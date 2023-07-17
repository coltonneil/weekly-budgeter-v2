import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	create: async ({ cookies, request }) => {
		const data = await request.formData();
		for (const [key, value] of data) {
			console.log(`${key}:${value}`);
		}
		// TODO: take form data and "send" it somewhere, presumably an API endpoint
		throw redirect(303, `./123`);
	}
};
