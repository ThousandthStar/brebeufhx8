<script lang="ts">
	import { onMount } from 'svelte';
	import QuizletCard from '$lib/components/quizlet/quizletCard.svelte';

	let { topic, grade } = $props();

	let quizlets: object[] = $state();

	// onMount(async () => {
	// 	// Get Quizlet sets
	// 	const response = await fetch('/api/quizlet', {
	// 		method: 'POST',
	// 		body: JSON.stringify({ topic, grade }),
	// 		headers: {
	// 			'content-type': 'application/json'
	// 		}
	// 	});
	// 	const data = await response.json();
	// 	console.log(data);
	// });

	quizlets = [
		{
			'name': 'biology grade 10',
			'url': 'https://quizlet.com/ca/961536398/biology-grade-10-flash-cards/'
		},
		{
			'name': 'Grade 10 Biology',
			'url': 'https://quizlet.com/ca/203519350/grade-10-biology-flash-cards/'
		}
	];
</script>

<div class="m-4 p-5 w-72 rounded-md bg-gray-300">
	{#if !quizlets}
		<p>Loading Quizlets...</p>
	{:else}
		{#each quizlets as quizlet, i}
			<div class="mb-1">
				<QuizletCard quizlet={quizlet} left={i % 2 === 0} last={i + 1 >= quizlets.length} />
			</div>
		{/each}
	{/if}
</div>