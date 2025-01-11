import { YoutubeTranscript } from 'youtube-transcript';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const videoId = await request.json();
	return json(new Promise((resolve, reject) => {
			YoutubeTranscript.fetchTranscript(videoId)
				.then((transcript) => {
					resolve(transcript);
				})
				.catch((err) => {
					reject(err);
				});
		}
	));
};
