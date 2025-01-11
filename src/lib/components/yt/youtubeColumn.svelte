<script lang="ts">
	import YoutubeCard from '$lib/components/yt/youtubeCard.svelte';
	import { onMount } from 'svelte';
	import { videos } from '$lib/stores/videos';

	let { keywords } = $props();

	onMount(async () => {
		// Get YT videos
		const response = await fetch('/api/yt/search', {
			method: 'POST',
			body: JSON.stringify(keywords),
			headers: {
				'content-type': 'application/json'
			}
		});
		const data = await response.json();
		videos.set(data.items);
	});
</script>

<div class="m-4 w-96 rounded-md bg-gray-300">
	{#if !videos}
		<p>Loading YouTube videos...</p>
	{:else}
		<h2 class="text-xl font-bold m-2">Video summaries</h2>
		{#each $videos as video}
			<div class="">
				<YoutubeCard video={video} />
			</div>
		{/each}
	{/if}
</div>