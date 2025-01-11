<script lang="ts">
	import YoutubeCard from '$lib/components/yt/youtubeCard.svelte';
	import { onMount } from 'svelte';

	let { keywords } = $props();
	// let keywords: [] = ['javascript'];

	let videos: object[] = $state();

	onMount(async () => {
		// Get YT videos
		const response = await fetch('/api/yt/search', {
			method: 'POST',
			body: JSON.stringify(keywords),
			headers: {
				'content-type': 'application/json'
			}
		});
		videos = (await response.json()).items;
	});
</script>

<div class="m-4 w-96 rounded-md bg-gray-300">
	{#if !videos}
		<p>Loading YouTube videos...</p>
	{:else}
		{#each videos as video}
			<div class="">
				<YoutubeCard video={video} />
			</div>
		{/each}
	{/if}
</div>