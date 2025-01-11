<script lang="ts">
	import InputForm from '$lib/components/inputForm.svelte';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import YoutubeColumn from '$lib/components/yt/youtubeColumn.svelte';
	import SummaryColumn from '$lib/components/summaries/summaryColumn.svelte';
	import QuizletColumn from '$lib/components/quizlet/quizletColumn.svelte';
	import ScheduleColumn from '$lib/components/schedule/scheduleColumn.svelte';
	import { onMount } from 'svelte';

	let data = $props();

	let atTop = $state(true);

	function handleScroll() {
		atTop = window.scrollY <= 30;
	}

	onMount(() => {
		window.addEventListener("scroll", handleScroll);
	});

	function scrollToSection(sectionId: string) {
		const section = document.getElementById(sectionId);
		if (section) {
			section.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<!-- navbar -->
<div class="flex justify-between items-center bg-slate-700 px-5 py-5">
	<div class="flex justify-start items-center space-x-5">
		<b><h2 class="text-2xl font-bold text-white">Made with ❤️ by Andrey and Émilien</h2></b>
	</div>
	<div class="flex justify-end items-center">
		<a target="_blank" href="https://github.com/ThousandthStar/brebeufhx8">
			<Avatar.Root>
				<Avatar.Image src="/img/GitHub-Mark-ea2971cee799.png" alt="GitHub" />
				<Avatar.Fallback>GitHub</Avatar.Fallback>
			</Avatar.Root>
		</a>
	</div>
</div>


<!-- title -->
<div class="flex flex-col h-[50rem] items-center justify-start space-y-7">
	<h1 class="text-9xl font-bold bg-gradient-to-l from-red-300 to-blue-800 bg-clip-text text-transparent mt-[25rem]">
		STUDBUD
	</h1>
	{#if atTop}
		<Button variant="outline" class="text-md" onclick={() => scrollToSection('content')}>Start studying!</Button>
	{/if}
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
			<div class="flex flex-row">
				<QuizletColumn quizlets={data.form.quizlets} header="Quizlets" />
				<QuizletColumn quizlets={data.form.exercise_list} header="Worksheets" />
				<ScheduleColumn schedule={data.form.schedule} />
			</div>
		{/if}
	</div>
</div>