import { expect, suite, test } from "vitest" 
import { marked } from "marked"
import { markedExtensionMention } from "./marked-extension-mention"

// TODO: write tests
suite.skip("Marked Extension: Image Renderer", () => {
	suite("rendering", () => {

		type TestCase = {
			desc: string
			input: string
			expectedHTML: string
		}

		const featureTests: TestCase[] = [
			// {
			// 	desc: "just one tag",
			// 	input: "@tag",
			// 	expectedHTML: "<mention>@tag</mention>"
			// },
			// {
			// 	desc: "between text",
			// 	input: "before text @tag after text",
			// 	expectedHTML: "before text <mention>@tag</mention> after text"
			// },
			// {
			// 	desc: "emails are ignored",
			// 	input: "before text test@exmaple.com after text",
			// 	expectedHTML: `before text <a href="mailto:test@exmaple.com">test@exmaple.com</a> after text`
			// },
			// TODO: fails
			// {
			// 	desc: "not part of a word",
			// 	input: "before text lib@v1 after text",
			// 	expectedHTML: `before text lib@v1 after text`
			// },
		]

		featureTests.forEach(testFeature)

		function testFeature(tc: TestCase) {
			test(tc.desc, () => {

				// @ts-ignore TODO: correct typing
				marked.use({ extensions: [markedExtensionMention], mangle:false });
				const parsed = marked.parseInline(tc.input)
				expect(parsed).toEqual(tc.expectedHTML)
			})
		}

	})
})