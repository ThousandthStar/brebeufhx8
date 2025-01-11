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
		const correctFormData = {
			subject: formData.topic,
			grade: formData.grade,
			type: formData.type_of_eval
		};

		// TODO: Uncomment this when the API is ready
		// Get concepts
		// const concepts = await event
		// 	.fetch('/api/base-concepts', {
		// 		method: 'POST',
		// 		headers: {
		// 			'Content-Type': 'application/json'
		// 		},
		// 		body: JSON.stringify(correctFormData)
		// 	})
		// 	.then((res) => res.json());
		let concepts = ['n1', 'n2', 'n3'];

		// TODO: all the other things <--- this is here. (suppose concepts is ok)


		// Get summaries
		const summaries = await event
			.fetch('/api/summaries', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					concepts,
					grade: formData.grade
				})
			})
			.then((res) => res.json());

		return {
			form,
			concepts,
			summaries
		};
	}
};
