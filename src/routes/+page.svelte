<script lang="ts">
	import InputForm from '$lib/components/inputForm.svelte';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import { Button } from '$lib/components/ui/button/index.js';
	import YoutubeColumn from '$lib/components/yt/youtubeColumn.svelte';
	import SummaryColumn from '$lib/components/summaries/summaryColumn.svelte';
	import QuizletColumn from '$lib/components/quizlet/quizletColumn.svelte';
	import ScheduleColumn from '$lib/components/schedule/scheduleColumn.svelte';
	import { onMount } from 'svelte';
	import pdfMake from 'pdfmake/build/pdfmake';
	import 'pdfmake/build/vfs_fonts';
	import { videos } from '$lib/stores/videos';

	let { data } = $props();

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

	export function downloadPDF() {
		const concepts = data.form.concepts;
		const summaries = data.form.summaries;
		const quizlets = data.form.quizlets;
		const date = data.form.date;
		const subject = data.form.subject;
		const type = data.form.type;


		let concept_objects = [];
		concepts.forEach((concept, i) => {
			concept_objects.push({ text: concept, style: 'thirdheader' });
			concept_objects.push({ text: summaries[i] });
		});

		var fonts = {
			Roboto: {
				normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.3.0-beta.1/fonts/Roboto/Roboto-Regular.ttf',
				bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.3.0-beta.1/fonts/Roboto/Roboto-Medium.ttf'
			}
		};
		pdfMake.addFonts(fonts);

		let quizlet_objects = [];
		quizlets.forEach((quizlet, i) => {
			quizlet_objects.push({ text: quizlet.name, link: quizlet.url, style: 'link' });
		});

		let youtube_objects = [];
		$videos.forEach((video, i) => {
			youtube_objects.push({ text: video.title, link: `https://www.youtube.com/watch?v=${video.id}`, style: 'link' });
		});

		let exercise_objects = [];
		data.form.exercise_list.forEach((exercise, i) => {
			exercise_objects.push({ text: exercise.name, link: exercise.url, style: 'link' });
		});

		const docDefinition = {
			content: [
				{ text: 'STUDBUD AI guide', style: 'header' },
				{ text: `${subject} ${type} on ${date}`, style: 'subheader' },
				{ text: 'Key Concepts', style: 'subheader' },
				concept_objects,
				{ text: 'Quizlets', style: 'subheader' },
				quizlet_objects,
				{ text: 'YouTube Videos', style: 'subheader' },
				youtube_objects,
				{ text: 'Worksheets', style: 'subheader' },
				exercise_objects
			],
			defaultStyle: {
				fontSize: 12,
				font: 'Roboto'
			},
			styles: {
				header: {
					fontSize: 22,
					bold: true,
					margin: [0, 0, 0, 10]
				},
				subheader: {
					fontSize: 18,
					bold: true,
					margin: [0, 10, 0, 5]
				},
				thirdheader: {
					fontSize: 16,
					bold: true,
					margin: [0, 10, 0, 5]
				},
				link: {
					color: 'blue',
					decoration: 'underline'
				}
			}
		};
		pdfMake.createPdf(docDefinition).download('STUDBUD_AI_guide.pdf');
	}
</script>

<!-- title -->
<div class="flex h-screen flex-col title_bg items-center justify-start space-y-7">
	<h1 class="text-9xl font-bold bg-gradient-to-l from-red-300 to-blue-800 bg-clip-text text-transparent">
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
			<Button variant="outline" class="text-md" onclick={() => downloadPDF()}>Download PDF</Button>
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