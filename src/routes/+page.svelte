<script lang="ts">
	import InputForm from '$lib/components/inputForm.svelte';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import { Button } from '$lib/components/ui/button/index.js';
	import YoutubeColumn from '$lib/components/yt/youtubeColumn.svelte';
	import SummaryColumn from '$lib/components/summaries/summaryColumn.svelte';
	import QuizletColumn from '$lib/components/quizlet/quizletColumn.svelte';
	import ScheduleColumn from '$lib/components/schedule/scheduleColumn.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let { data } = $props();

	let atTop = $state(true);

	let loading = $state(false);

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

	function scrollToBottom(): string {
		const section = document.getElementById('content');
		if (section) {
			console.log('scrolling to bottom');
			// setTimeout used for better UX (still responsive while not being jarring when the user clicks the button)
			setTimeout(() => {
				section.scrollIntoView({ behavior: 'smooth' });
			}, 250);
		}
		return '';
	}
</script>

<!-- title -->
<div class="flex flex-col h-screen items-center place-content-center space-y-7 title_bg">
	<h1
		class="fixed-title text-9xl font-bold bg-gradient-to-l from-red-300 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_1.2px_1.2px_rgba(1,1,1,0.8)]  brightness-75">
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
		<InputForm data={data.form} bind:loadingData={loading} />
	</div>
	<!--	info -->
	<div>
		{#if loading === true}
			{#if data.form.concepts}
				<div class="flex flex-row space-x-3">
					<YoutubeColumn keywords={data.form.concepts} />
					<SummaryColumn concepts={data.form.concepts} summaries={data.form.summaries} />
				</div>
				<div class="flex flex-row">
					<QuizletColumn quizlets={data.form.quizlets} header="Quizlets" />
					<QuizletColumn quizlets={data.form.exercise_list} header="Worksheets" />
					<ScheduleColumn schedule={data.form.schedule} />
				</div>
			{:else}
				{scrollToBottom()}
				<div class="flex flex-row align-middle space-x-3 m-6 p-2">
					<LoaderCircle class="h-6 w-6 animate-spin" />
					<p>Creating your very own study program!</p>
				</div>
			{/if}
		{/if}
	</div>
</div>

<style>
    .title_bg {
        background-color: #ffd899;
        background-image: radial-gradient(at 52% 91%, hsla(72, 100%, 72%, 1) 0px, transparent 50%),
        radial-gradient(at 68% 4%, hsla(240, 63%, 64%, 1) 0px, transparent 50%),
        radial-gradient(at 70% 11%, hsla(31, 95%, 68%, 1) 0px, transparent 50%),
        radial-gradient(at 0% 69%, hsla(217, 90%, 55%, 1) 0px, transparent 50%),
        radial-gradient(at 76% 47%, hsla(278, 81%, 63%, 1) 0px, transparent 50%),
        radial-gradient(at 98% 20%, hsla(4, 86%, 52%, 1) 0px, transparent 50%);
    }

    .fixed-title {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>