<script lang="ts">
	import InputForm from '$lib/components/inputForm.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import YoutubeColumn from '$lib/components/yt/youtubeColumn.svelte';
	import SummaryColumn from '$lib/components/summaries/summaryColumn.svelte';
	import QuizletColumn from '$lib/components/quizlet/quizletColumn.svelte';
	import ScheduleColumn from '$lib/components/schedule/scheduleColumn.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let data = $props();

	let atTop = $state(true);

	function handleScroll() {
		atTop = window.scrollY <= 30;
	}

	onMount(() => {
		window.addEventListener('scroll', handleScroll);
	});

	function scrollToSection(sectionId: string) {
		const section = document.getElementById(sectionId);
		if (section) {
			section.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<!-- title -->
<div class="flex flex-col h-[50rem] items-center justify-start space-y-7 title_bg">
	<h1
		class="text-9xl font-bold bg-gradient-to-l from-red-300 to-blue-400 bg-clip-text text-transparent mt-[25rem] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]  brightness-75">
		STUDBUD
	</h1>
	{#if atTop}
		<div transition:fade>
			<Button variant="outline" class="text-md" onclick={() => scrollToSection('content')}>Start studying!</Button>
		</div>
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

<style>
    .title_bg {
        background-color: #ffd899;
        background-image: radial-gradient(at 52% 91%, hsla(240, 63%, 64%, 1) 0px, transparent 50%),
        radial-gradient(at 68% 4%, hsla(72, 100%, 72%, 1) 0px, transparent 50%),
        radial-gradient(at 70% 11%, hsla(31, 95%, 68%, 1) 0px, transparent 50%),
        radial-gradient(at 0% 69%, hsla(217, 90%, 55%, 1) 0px, transparent 50%),
        radial-gradient(at 76% 47%, hsla(278, 81%, 63%, 1) 0px, transparent 50%),
        radial-gradient(at 98% 20%, hsla(4, 86%, 52%, 1) 0px, transparent 50%);
    }
</style>