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

		console.log("Starting search");

		const formData = form.data;
		const correctFormData = {
			subject: formData.topic,
			grade: formData.grade,
			type: formData.type_of_eval,
			date: formData.date
		};

		// TODO: Uncomment this when the API is ready
		// Get concepts
		
		const concepts = await event
			.fetch('/api/base-concepts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(correctFormData)
			})
			.then((res) => res.json());

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
		
		//TODO: all the other things <--- this is here. (suppose concepts is ok)
		correctFormData["concepts"] = concepts;
		const quizlets = await event
			.fetch('/api/quizlet', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(correctFormData)
			})
			.then((res) => res.json());
		
		const exercise_list = await event
			.fetch('/api/exercices', {
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
		
		const schedule = await event
			.fetch('/api/schedule', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					key_concepts: concepts,
					current_date: new Date().toLocaleDateString(),
					evaluation_date: formData.date,
					evaluation_type: formData.type_of_eval,
					grade: formData.grade
				})
			})
			.then((res) => res.json());

		
		
		
		
		console.log(concepts)
		console.log(quizlets);
		console.log(summaries);
		console.log(exercise_list);
		console.log(schedule);
		
		
		return {
			form,
			concepts,
			summaries,
			quizlets,
			exercise_list,
			schedule,
			date: formData.date,
			subject: formData.topic,
			type: formData.type_of_eval,
		};
	}
};
