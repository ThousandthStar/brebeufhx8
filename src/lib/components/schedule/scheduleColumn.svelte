<script lang="ts">
	import { onMount } from 'svelte';
	import ScheduleCard from '$lib/components/schedule/scheduleCard.svelte';

	let { schedule } = $props();

	//let quizlets: object[] = $state();

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
	/*
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
	*/
</script>

<div class="m-4 p-5 w-1/3 rounded-md bg-gray-300">
    <h2 class="text-xl font-bold mb-2">Schedule</h2>
    {#each schedule as item, i}
        <div class="mb-1">
            <ScheduleCard date={item.date} text={item.content} />
        </div>
    {/each}
</div>