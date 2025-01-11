<script lang="ts">
	let { quizlet, left, last } = $props();
</script>

<div class="space-y-2">
	<a href={quizlet.url}>
		<h3 class="text-xl capitalize font-semibold {left ? 'text-start' : 'text-end'}">
			<u>{quizlet.name}</u>
		</h3>
	</a>
	{#if !last}
		<img src="/img/connection1.webp" class="opacity-40 h-[90%] scale-x-[{left ? '' : '-'}100%]" alt="connection element" />
	{/if}
</div>