# StudBud 

StudBud is your AI tutor for when you have a quiz, a test or an exam coming up. Simply tell it what the evaluation is about, what grade you are in and what date it is. StudBud will summarize the key concepts of the subject and fetch you YouTube summaries, Quizlets and worksheets. StudBud will also create a day-by-day study schedule so are as prepared as you can be when the evaluation comes :)

## Features

- Natural language input for the subject matter
- Web scraping using [Zenrows](https://www.zenrows.com/) to get Youtube videos, Quizlet flashcard quizzes and worksheets.
- OpenAI GPT-4o-mini integration to summarize the keyconcepts and create the study schedule.

## Running locally

To run StudBud locally, create a `.env` file in the root directory. Add your OpenAI API key using `OPENAI_API_KEY="[your key here]"` and add your Zenrows API key using `ZENROWS_KEY="[your key here]"`.

Then, run `npm run dev`.
