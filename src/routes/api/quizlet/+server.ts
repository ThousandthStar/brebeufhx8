import { JSDOM } from 'jsdom';
import { ZenRows } from 'zenrows';
import { ZENROWS_KEY } from '$env/static/private';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({request}) => {
    const { subject, grade, type, date, concepts } = await request.json();

    const client = new ZenRows(ZENROWS_KEY);
    
    let quiz_list = [];
    for(let i = 0; i < concepts.length; i++) {
        try {
            const search_string = `${concepts[i].replaceAll(" ", "-")}-grade-${grade}`;
            const url = `https://quizlet.com/search?query=${search_string}&type=all`;
            const request = await client.get(url, {
                premium_proxy: 'true'
            });
            const html = await request.text();
            const dom = new JSDOM(html);
            const document = dom.window.document;

            // Select all <a> tags that have a link to a quiz
            const quizLinks = document.querySelectorAll('a[href^="https://quizlet.com"]');
            const topTwoLinks = Array.from(quizLinks).slice(1, 3);


            // Extract the URLs and quiz names

            quiz_list.push(...topTwoLinks.map(link => ({
                url: link.href,
                name: link.children[0].textContent.trim()
            })));


            // Convert the result to JSON format and log itp
        } catch (error) {
            console.error(error.message);
            if (error.response) {
                console.error(error.response.data);
            }
        }
    }
    return json(quiz_list)
}