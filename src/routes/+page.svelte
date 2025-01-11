<script lang="ts">
	import InputForm from '$lib/components/inputForm.svelte';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import YoutubeColumn from '$lib/components/yt/youtubeColumn.svelte';
	import SummaryColumn from '$lib/components/summaries/summaryColumn.svelte';

	let data = $props();

	function scrollToSection(sectionId: string) {
		const section = document.getElementById(sectionId);
		if (section) {
			section.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<!-- navbar -->
<div class="flex justify-end items-center bg-slate-800 py-3 px-5">
	<a href="https://github.com/ThousandthStar/brebeufhx8">
		<Avatar.Root>
			<Avatar.Image src="/img/GitHub-Mark-ea2971cee799.png" alt="GitHub" />
			<Avatar.Fallback>GitHub</Avatar.Fallback>
		</Avatar.Root>
	</a>
</div>

<!-- title -->
<div class="flex flex-col h-[50rem] items-center justify-center space-y-7">
	<h1 class="text-9xl font-bold bg-gradient-to-r from-amber-400 to-blue-200 bg-clip-text text-transparent">
		STUDY BUDDY
	</h1>
	<Button variant="outline" class="text-md" onclick={() => scrollToSection('content')}>Start studying!</Button>
</div>

<!-- actual content -->
<div class="flex flex-col space p-4 bg-slate-200" id="content">
	<!--	form -->
	<div class="m-10">
		<InputForm data={data.form} />
	</div>
	<!--	info -->
	<div>
		{#if data.form}
			<div class="flex flex-row space-x-3">
				<YoutubeColumn keywords={data.form.concepts} />
				<SummaryColumn concepts={data.form.concepts} summaries={data.form.summaries} />
			</div>
		{/if}
	</div>
</div>