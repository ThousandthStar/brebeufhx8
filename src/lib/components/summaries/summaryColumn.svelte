<script lang="ts">
	let { concepts, summaries } = $props();
</script>

{#each concepts as concept, i}
	<b><h3 class="text-lg">{concept}</h3></b>
	<p>{summaries[i]}</p>
{/each}