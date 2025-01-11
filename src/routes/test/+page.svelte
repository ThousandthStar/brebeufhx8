<script lang="ts">
	import { onMount } from 'svelte';

	const keywords = [
		"newton's first law of motion",
		"newton's second law of motion",
		"newton's third law of motion",
	];

	let data: object | undefined = undefined;

	onMount(async () => {
		const response = await fetch('/api/yt/search', {
			method: 'POST',
			body: JSON.stringify(keywords),
			headers: {
				'content-type': 'application/json'
			}
		});

		data = await response.json();

	});
</script>

<main>
	{#if data}
		<pre>{JSON.stringify(data, null, 2)}</pre>
	{:else}
		<p>Loading...</p>
	{/if}
</main>