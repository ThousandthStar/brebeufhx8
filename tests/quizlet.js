
import { JSDOM } from "jsdom";

const url = 'https://quizlet.com/search?query=biology-grade-10&type=all';

// Fetch the raw HTML content
fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .then(html => {
  // The raw HTML content

    // Create a temporary DOM element to hold the HTML string
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Select all <a> tags that have a link to a quiz
    const quizLinks = document.querySelectorAll('a[href^="https://quizlet.com"]');
    const topTwoLinks = Array.from(quizLinks).slice(0, 2);

    // Extract the URLs and quiz names
    const quizzes = Array.from(quizLinks).map(link => ({
        name: link.children[0].textContent.trim(),  // Extract the quiz name
        url: link.href                  // Extract the quiz URL
    }));

    // Convert the result to JSON format and log it
    const quizzesJson = JSON.stringify(quizzes, null, 2);
    console.log(quizzesJson);

  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });