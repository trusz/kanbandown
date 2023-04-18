import { marked } from "marked";
import { markedExtensionImageRenderer, markedExtensionMention, markedExtensionPrio, markedExtensionProject, markedExtensionTag } from "../../marked-extensions";

export function renderMarkdown(str: string): string{
	const extensions = [
		markedExtensionPrio, 
		markedExtensionProject,
		markedExtensionTag,
		markedExtensionMention,
		markedExtensionImageRenderer,
	]
	// @ts-ignore fix typing
	marked.use({ extensions: extensions});
	marked.setOptions({gfm:true, breaks:true})
	return marked.parse(str)
}