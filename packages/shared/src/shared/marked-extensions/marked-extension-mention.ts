import { marked } from "marked"


const regexMention = /(^@| @)(\S+)/
// const regexMention = /@(\S+)/

// https://marked.js.org/using_pro#extensions
// TODO: correct typing
export const markedExtensionMention = {
	name: 'mention',
	level: 'inline',                                 
	// start(src: string) { return src.match(/([^\S])@(\S+)/)?.index; },    
	start(src: string) { return src.match(/\B@\S+/)?.index; },    
	tokenizer(src: string, tokens: unknown): any {
		// const rule = /([^\S])^@(\S+)/;  // Regex for the complete token, anchor to string start
		const rule = /^\B@(\S+)/;  // Regex for the complete token, anchor to string start
		const match = rule.exec(src);
		if (match) {
			return {              // Token to generate
				type: 'mention',  // Should match "name" above
				raw: match[0],    // Text to consume from the source
				tag: match[1],
			};
		}
	},
	renderer(
		token: {raw: string, prio: string}
	): any {
		return `<mention>${token.raw.trim()}</mention>`
	},
};
	
	