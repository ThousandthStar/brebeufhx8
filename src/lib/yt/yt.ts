import { YT_API_KEY } from '$env/static/private';

export async function searchByKeywords(keywords: string[]) {
	const url = `https://www.googleapis.com/youtube/v3/search?part=id,snippet&maxResults=5&q=${keywords.join('|')}&key=${YT_API_KEY}&videoCategoryId=27&type=video`;
	const res = await fetch(url);
	return await res.json();
}
