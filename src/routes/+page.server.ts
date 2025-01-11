import type { PageServerLoad, Actions } from './$types.js';
import { superValidate } from 'sveltekit-superforms';
import { inFormSchema } from '$lib/formSchema';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(inFormSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(inFormSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const formData = form.data;

		//TODO: Do something with formData

		return {
			form
		};
	}
};
