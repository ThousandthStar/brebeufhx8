<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';

	let { video } = $props();
</script>

<Accordion.Root class="w-96 p-2">
	<Accordion.Item value="item-1">
		<Accordion.Trigger>
			<div class="flex flex-row space-x-3">
				<Avatar.Root>
					<Avatar.Image src={video.thumbnail.thumbnails[0].url} alt={`${video.title} thumbnail`} />
					<Avatar.Fallback></Avatar.Fallback>
				</Avatar.Root>
				<h3 class="self-center text-start">{video.title}</h3>
			</div>
		</Accordion.Trigger>
		<Accordion.Content>
			<a href={`https://www.youtube.com/watch?v=${video.id}`}>
				<Card.Root class="w-[22rem]">
					<Card.Header>
						<Card.Title>
							{video.title}
						</Card.Title>
						<Card.Description>
							<p>By {video.channelTitle}</p>
						</Card.Description>
					</Card.Header>
					<Card.Content>
						<img src={video.thumbnail.thumbnails[0].url} alt={`${video.title} thumbnail`} class="w-72 rounded-md" />
					</Card.Content>
				</Card.Root>
			</a>
		</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>

