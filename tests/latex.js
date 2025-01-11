import { parse, HtmlGenerator } from 'latex.js'
import { createHTMLWindow } from 'svgdom'

global.window = createHTMLWindow()
global.document = window.document

let latex = "Hi, this is a line of text.$a/2$"

let generator = new HtmlGenerator({ hyphenate: false })

let doc = parse(latex, { generator: generator }).htmlDocument()

console.log(doc.documentElement.outerHTML)