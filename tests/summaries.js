import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const input = `{
  key_concepts: [
    'Properties of Logarithms',
    'Change of Base Formula',
    'Solving Exponential and Logarithmic Equations'
  ]
}`

let grade = 11

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY

const obj = JSON.parse(input);
const list = obj.key_concepts;

const prompt_template = ChatPromptTemplate.fromTemplate(`
Given the following key concept and grade, please summarize this key concept for a student in this grade:

Key concept: {key_concept}
Grade: grade {grade}

Please only output the summary, nothing else.`)

const llm = new ChatOpenAI({
    temperature: 0.0,
    model: "gpt-4o-mini",
    apiKey: OPENAI_API_KEY,
})

const parser = new StringOutputParser();

const chain = prompt_template.pipe(llm).pipe(parser)

for (const key_concept of list){
    const res = await chain.invoke({
        key_concept,
        grade
    })
    console.log(res)
}
    