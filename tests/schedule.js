import { JsonOutputParser } from "@langchain/core/output_parsers";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

import dotenv from 'dotenv';
dotenv.config();

const concepts = `[
  'Properties of logarithms',
  'Solving logarithmic equations',
  'Graphing logarithmic functions'
]`
let subject = "logarithms"
let grade = 11
let type = "exam"
const today = new Date();
const nextWeek = new Date(today);
nextWeek.setDate(today.getDate() + 7);

const prompt_template = ChatPromptTemplate.fromTemplate(`
Given the following key concepts, current date, date of evaluation, type of evaluation and grade of a student, please prepare an adequate study calendar for the student.
The student also has access to two flashcard quizzes, two youtube video explanations and two PDF worksheets per key concept. Spread them out accordingly:

Key concepts: {key_concepts}
Current date: {current_date}
Evaluation date: {evaluation_date}
Evaluation type: {evaluation_type}
Grade: grade {grade}

Please only output a valid JSON object containing a list called schedule with each element including a date field and a content field.
The date field describes what day to do this study and the content field describes what to study that day. 
Make sure the schedule only goes up to the date prior to the evaluation.
A day can have many tasks. Describe what the student must study and complete in a paragraph.
Use this format for dates: [day number] [month name] [year number]. For example: 16 March 2025. `)

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY

const llm = new ChatOpenAI({
    temperature: 0.7,
    model: "gpt-4o-mini",
    apiKey: OPENAI_API_KEY,
})

const parser = new JsonOutputParser();

const chain = prompt_template.pipe(llm).pipe(parser)

const res = await chain.invoke({
    key_concepts: concepts,
    current_date: today.toDateString(),
    evaluation_date: nextWeek.toDateString(),
    evaluation_type: type,
    grade
})

console.log(res)
console.log(today.toDateString())
console.log(nextWeek.toDateString())