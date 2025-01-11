import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

import dotenv from 'dotenv';
dotenv.config();

const input = `[
  "Properties of logarithms",
  "Solving logarithmic equations",
  "Change of base formula"
]`

let grade = 11

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY

const list = JSON.parse(input);

const prompt_template = ChatPromptTemplate.fromTemplate(`
Given the following key concept and grade, please summarize this key concept for a student in this grade:

Key concept: {key_concept}
Grade: grade {grade}

Please only output the summary, nothing else. 
Avoid using Latex at all costs. 
Avoid using other formatting at all costs. 
Provide an example of a simple problem and it's solution.`)

const llm = new ChatOpenAI({
    temperature: 0.0,
    model: "gpt-4o-mini",
    apiKey: OPENAI_API_KEY,
})

const parser = new StringOutputParser();

const chain = prompt_template.pipe(llm).pipe(parser)

let summaries = []

for (const key_concept of list){
    const res = await chain.invoke({
        key_concept,
        grade
    })

    summaries.push(res)
}

console.log(JSON.stringify(summaries, null, 2))
    