import { marked } from "marked"

// https://marked.js.org/using_pro#extensions
// TODO: correct typing
export const markedExtensionProject = {
	name: 'project',
	level: 'inline',                                 
	start(src: string) { return src.match(/\+\S+/)?.index; },    
	tokenizer(src: string, tokens: unknown): any {
		const rule = /^\+(\S+)/;  // Regex for the complete token, anchor to string start
		const match = rule.exec(src);
		if (match) {
			return {                                         // Token to generate
				type: 'project',                           // Should match "name" above
				raw: match[0],                                 // Text to consume from the source
				project: match[1],
			};
		}
	},
	renderer(
		token: {raw: string, prio: string}
	): any {
		return `<project>${token.raw}</project>`
	},
};
	
	