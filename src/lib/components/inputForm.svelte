<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { inFormSchema, type InFormSchema } from '$lib/formSchema';
	import {
		type SuperValidated,
		type Infer,
		superForm
	} from 'sveltekit-superforms';
	import {
		Button,
		buttonVariants
	} from '$lib/components/ui/button/index.js';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Select from '$lib/components/ui/select';
	import { cn } from '$lib/utils';
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import {
		CalendarDate,
		DateFormatter,
		type DateValue,
		getLocalTimeZone,
		parseDate,
		today
	} from '@internationalized/date';

	let data: SuperValidated<Infer<InFormSchema>> = $props();

	const form = superForm(data, {
		validators: zodClient(inFormSchema),
		dataType: 'json'
	});

	const { form: formData, enhance } = form;

	let selectedEvalType = $derived.by(() => {
			if ($formData.type_of_eval) {
				return {
					label: $formData.type_of_eval,
					value: $formData.type_of_eval
				};
			} else {
				return undefined;
			}
		}
	);

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	let selectedDate: DateValue | undefined = $derived($formData.date ? parseDate($formData.date) : undefined);
	1;
	let placeholderDate: DateValue = $state(today(getLocalTimeZone()));

	let received = $state(false);

	function toggle_receive() {
		received = true;
	}
</script>

<form method="POST" use:enhance>
	<div class="flex flex-col space-y-3 ">
		<div class="flex flex-col md:flex-row space-x-3 space-y-4 md:space-y-0 items-center">
			<div class="flex-grow">
				<!--	topic -->
				<Form.Field {form} name="topic">
					<Form.Control let:attrs>
						<Form.Label>Topic</Form.Label>
						<Input {...attrs} bind:value={$formData.topic} />
					</Form.Control>
					<Form.Description>The topic or element your evaluation will be on.</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
			</div>
			<div class="flex-grow mt-0">
				<!--	type of eval -->
				<Form.Field {form} name="type_of_eval">
					<Form.Control let:attrs>
						<Form.Label>Type of evaluation</Form.Label>
						<Select.Root
							selected={selectedEvalType}
							onSelectedChange={(v) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          v && ($formData.type_of_eval = v.value);
        }}
						>
							<Select.Trigger {...attrs}>
								<Select.Value placeholder="Select the type of evaluation" />
							</Select.Trigger>
							<Select.Content>
								<Select.Item value="Quiz" label="quiz" />
								<Select.Item value="Test" label="test" />
								<Select.Item value="Exam" label="exam" />
							</Select.Content>
						</Select.Root>
						<input hidden bind:value={$formData.type_of_eval} name={attrs.name} />
					</Form.Control>
					<Form.Description>The type of evaluation you want to generate.</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
			</div>
			<div class="flex-grow">
				<!--	grade -->
				<Form.Field {form} name="grade">
					<Form.Control let:attrs>
						<Form.Label>Grade</Form.Label>
						<Input {...attrs} bind:value={$formData.grade} type="number" />
					</Form.Control>
					<Form.Description>The grade you want to generate the evaluation for.</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
			</div>
			<div class="flex-grow pt-2.5">
				<!--	date -->
				<Form.Field {form} name="date" class="flex flex-col">
					<Form.Control let:attrs>
						<Form.Label>Date of the evaluation</Form.Label>
						<Popover.Root>
							<Popover.Trigger
								{...attrs}
								class={cn(
            buttonVariants({ variant: "outline" }),
            "w-[280px] justify-start pl-4 text-left font-normal",
            !selectedDate && "text-muted-foreground"
          )}
							>
								{selectedDate ? df.format(selectedDate.toDate(getLocalTimeZone())) : "Pick a date"}
								<CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
							</Popover.Trigger>
							<Popover.Content class="w-auto p-0" side="top">
								<Calendar
									value={selectedDate}
									bind:placeholder={placeholderDate}
									minValue={new CalendarDate(1900, 1, 1)}
									calendarLabel="Date of the evaluation"
									initialFocus
									onValueChange={(v) => {
              if (v) {
                $formData.date = v.toString()
              } else {
                $formData.date = "";
              }
            }}
								/>
							</Popover.Content>
						</Popover.Root>
						<Form.Description>
							The date of the evaluation
						</Form.Description>
						<Form.FieldErrors />
						<input hidden value={$formData.date} name={attrs.name} />
					</Form.Control>
				</Form.Field>
			</div>
		</div>
		<div class="flex-grow-0">
			<Form.Button class="bg-gradient-to-l from-red-300 to-blue-800" onclick={toggle_receive}>✨ Generate your study guide!</Form.Button>
			<p class="{received ? '' : 'hidden'}">Request received!</p>
		</div>
	</div>
	<!--{#if browser && dev}
		<SuperDebug data={$formData} />
	{/if}-->
</form>