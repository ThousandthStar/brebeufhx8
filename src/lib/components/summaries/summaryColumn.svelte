<script lang="ts">
	let { concepts, summaries } = $props();
</script>

{#each concepts as concept, i}
	<div class="flex flex-col m-4 p-5 w-1/3 rounded-md bg-gray-300">
		<b><h3 class="text-lg">{concept}</h3></b>
		<p>{summaries[i]}</p>
	</div>
{/each}