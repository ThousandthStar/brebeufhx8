import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { OPENAI_API_KEY } from '$env/static/private';
import { json, type RequestHandler } from '@sveltejs/kit';

const prompt_template = ChatPromptTemplate.fromTemplate(`
Given the following key concept and grade, please summarize this key concept for a student in this grade:

Key concept: {key_concept}
Grade: grade {grade}

Please only output the summary, nothing else. 
Avoid using Latex at all costs. 
Avoid using other formatting at all costs. 
Provide an example of a simple problem and it's solution.`);

const llm = new ChatOpenAI({
	temperature: 0.0,
	model: 'gpt-4o-mini',
	apiKey: OPENAI_API_KEY
});

const parser = new StringOutputParser();

const chain = prompt_template.pipe(llm).pipe(parser);


export const POST: RequestHandler = async ({ request }) => {
	const { concepts, grade } = await request.json();

	for (const key_concept of concepts) {
		const res = await chain.invoke({
			key_concept,
			grade
		});

		summaries.push(res);
	}

	return json(summaries);
};
