
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

import dotenv from 'dotenv';
dotenv.config();

let today = new Date().toDateString()
let subject = "logarithms"
let grade = 11
let type = "exam"

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY

const prompt_template = ChatPromptTemplate.fromTemplate(`
Given the following subject, grade and evaluation type, please list exactly 3 key concepts a student in this grade needs to learn for this test. 
Only give the names of the concetps. provide a structured JSON response: 

Subject: {subject}
Grade: grade {grade}
Evaluation type: {type}

Please output the response as a valid JSON string containing a single list named \` "key_concepts" \` with all the key concepts.`)

const llm = new ChatOpenAI({
    temperature: 0.0,
    model: "gpt-4o-mini",
    apiKey: OPENAI_API_KEY,
})

const parser = new JsonOutputParser();

const chain = prompt_template.pipe(llm).pipe(parser)

const res = await chain.invoke({
    subject,
    grade,
    type
})

console.log(res)

