import { marked } from "marked"

// @ts-ignore BASE_URL will be injected into the index.html
const basePath = globalThis.BASE_PATH

// https://marked.js.org/using_pro#renderer

export const markedExtensionImageRenderer: marked.RendererExtension = {
	name: "image",
	renderer: function (this: marked.RendererThis, token: marked.Tokens.Generic): string | false {

		const src = [basePath, token.href].join("/")
		
		console.log({level:"dev", msg:"object, renderer",src, token, baseURL: basePath})
		return `<img src=${src} />`
	}
}
