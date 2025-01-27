import { JSDOM } from 'jsdom';
import { ZenRows } from 'zenrows';
import dotenv from 'dotenv';
import scrapingbee from "scrapingbee";

dotenv.config();

(async () => {
	var client = new scrapingbee.ScrapingBeeClient(process.env.SCRAPING_BEE_KEY);
	const url = 'https://quizlet.com/search?query=chemistry-11th-grade&type=all';

	try {
		const request = await client.get({url: encodeURIComponent(url), params:{}});
		const html = await request.text();
		const dom = new JSDOM(html);
		const document = dom.window.document;

		// Select all <a> tags that have a link to a quiz
		const quizLinks = document.querySelectorAll('a[href^="https://quizlet.com"]');
		const topTwoLinks = Array.from(quizLinks).slice(1, 3);

		// Extract the URLs and quiz names
		const quizzes = Array.from(topTwoLinks).map((link) => ({
			name: link.children[0].textContent.trim(), // Extract the quiz name
			url: link.href // Extract the quiz URL
		}));

		// Convert the result to JSON format and log it
		const quizzesJson = JSON.stringify(quizzes, null, 2);
		console.log(quizzesJson);
	} catch (error) {
		console.error(error.message);
		if (error.response) {
			console.error(error.response.data);
		}
	}
})();
