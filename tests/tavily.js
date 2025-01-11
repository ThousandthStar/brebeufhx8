import { tavily } from "@tavily/core";

import dotenv from 'dotenv';
dotenv.config();

//testing another ai tool called tavily

// Step 1. Instantiating your Tavily client
const tvly = tavily({ apiKey: process.env.TAVILY_KEY });

// Step 2. Executing a simple search query
const response = await tvly.search("Get me some quizlets on 11th grade chemistry");

// Step 3. That's it! You've done a Tavily Search!
console.log(response);