import youtubesearchapi from 'youtube-search-api';

export async function searchByKeywords(keywords: string[]) {
	return youtubesearchapi.GetListByKeyword(keywords.join(' OR '), false, 5);
}
