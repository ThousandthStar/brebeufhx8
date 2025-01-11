import { JsonOutputParser } from '@langchain/core/output_parsers';
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { OPENAI_API_KEY } from '$env/static/private';
import { json, type RequestHandler } from '@sveltejs/kit';

const prompt_template = ChatPromptTemplate.fromTemplate(`
Given the following subject, grade and evaluation type, please list exactly 3 key concepts a student in this grade needs to learn for this test. 
Only give the names of the concetps. provide a structured JSON response: 

Subject: {subject}
Grade: grade {grade}
Evaluation type: {type}

Please output the response as a valid JSON string like the example below: 
Example: 
{{
  'key_concepts': [
    'First concept',
    'Second concept',
    'Third concept'
  ]
}}
`);

const llm = new ChatOpenAI({
	temperature: 0.0,
	model: 'gpt-4o-mini',
	apiKey: OPENAI_API_KEY
});

const parser = new JsonOutputParser();

const chain = prompt_template.pipe(llm).pipe(parser);


export const POST: RequestHandler = async ({ request }) => {
	const { subject, grade, type, date, concepts } = await request.json();

	const res = await chain.invoke({
		subject,
		grade,
		type
	});

	return json(res.key_concepts);
};
