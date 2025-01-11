import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { searchByKeywords } from '$lib/yt/yt';

export const POST: RequestHandler = async ({ request }) => {
	const keywords = await request.json();
	const res = await searchByKeywords(keywords);
	return json(res);
};
