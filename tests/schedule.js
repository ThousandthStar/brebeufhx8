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

const today = new Date();
const nextWeek = new Date(today);
nextWeek.setDate(today.getDate() + 7);

