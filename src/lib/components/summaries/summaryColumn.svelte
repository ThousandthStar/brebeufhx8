<script lang="ts">
	let { concepts, summaries } = $props();
</script>

{#each concepts as concept, i}
	<h3 class="text-lg">{concept}</h3>
	<p>{summaries[i]}</p>
{/each}