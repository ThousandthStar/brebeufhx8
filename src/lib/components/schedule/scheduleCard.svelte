<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion/index.js';

	let { date, text } = $props();
</script>
<Accordion.Root class="w-96 p-2">
	<Accordion.Item value="item-1">
		<Accordion.Trigger>
			<div class="flex flex-row space-x-3">
				<b><h3 class="self-center text-start">{date}</h3></b>
			</div>
		</Accordion.Trigger>
		<Accordion.Content>
			<p>
                {text}
            </p>
		</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>
