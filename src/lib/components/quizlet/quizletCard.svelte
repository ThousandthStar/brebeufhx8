<script lang="ts">
	let { quizlet, left, last } = $props();
</script>

<div class="space-y-2">
	<a href={quizlet.url} target="_blank">
		<h3 class="text-xl capitalize font-semibold {left ? 'text-start' : 'text-end'}">
			<u>{quizlet.name}</u>
		</h3>
	</a>
	<br />
	<br />
	{#if !last}
		<div class="flex justify-center items-center">
			<img src="/img/connection1.webp" class="opacity-40 h-[90%] {left ? '' : 'scale-x-[-1]'}" alt="connection element" />
		</div>
	{/if}
</div>