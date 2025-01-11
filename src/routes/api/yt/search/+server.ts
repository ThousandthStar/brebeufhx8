import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { searchByKeywords } from '$lib/yt/yt';
import { YoutubeTranscript } from 'youtube-transcript';

export const POST: RequestHandler = async ({ request }) => {
	const keywords = await request.json();
	const res = await searchByKeywords(keywords);
	const items = res.items.map((item: any) => ({
		id: item.id.videoId,
		title: item.snippet.title,
		description: item.snippet.description,
		thumbnail: item.snippet.thumbnails.default.url,
		channel: item.snippet.channelTitle
	}));
	// for (const item of items) {
	// 	item.transcript = await YoutubeTranscript.fetchTranscript(item.id);
	// }
	return json(items);
};
