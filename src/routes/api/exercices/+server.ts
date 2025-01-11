import { JSDOM } from 'jsdom';
import { ZenRows } from 'zenrows';
import { ZENROWS_KEY } from '$env/static/private';
import { json, type RequestHandler } from '@sveltejs/kit';
import { name } from '$lib/components/ui/form/form-element-field.svelte';

export const POST: RequestHandler = async ({request}) => {
    const { concepts, grade } = await request.json();
    const client = new ZenRows(ZENROWS_KEY);
    let exercise_list = [];
    for(let i = 0; i < concepts.length; i++) {
        const search_string = `${concepts[i].replaceAll(" ", "+")}+grade+${grade}+worksheet+pdf`;
        const url = `https://www.google.com/search?q=${search_string}`;
	    try {
            const request = await client.get(url, {
                premium_proxy: 'true'
            });
            const html = await request.text();
            
            const dom = new JSDOM(html);
            const document = dom.window.document;
        
            // Select all <a> tags that have a link to a quiz
            const content = document.querySelector('body').innerHTML;
            exercise_list.push(...getFirstTwoNonVideoLinks(content));
        }catch (error) {
            console.error(error.message);
            if (error.response) {
                console.error(error.response.data);
            }
        }
    }
    return json(exercise_list)
}

function getFirstTwoNonVideoLinks(htmlString) {
	const dom = new JSDOM(htmlString);
	const { document } = dom.window;

	// Query all anchors that typically represent Google search results
	// Adjust selectors as needed for your structure
	const allResultAnchors = document.querySelectorAll('.tF2Cxc .yuRUbf a');

	// Convert the NodeList to an array and filter out “video”-type links
	const nonVideoAnchors = Array.from(allResultAnchors).filter((a) => {
		const hrefLower = a.href.toLowerCase();
		return !hrefLower.includes('youtube.com') && !hrefLower.includes('video') && hrefLower.slice(-4) === '.pdf';
	});

	// Return the first two URLs from the filtered list
	return nonVideoAnchors.slice(0, 2).map((a) => ({
        url: a.href,
        name: a.querySelector('h3').textContent.trim()
    }));
}
