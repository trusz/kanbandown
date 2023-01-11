import { expect, suite, test } from "vitest" 
import { marked } from "marked"
import { markedExtensionTag } from "./marked-extension-tag"

suite("Marked Extension: Tag", () => {
    suite("rendering", () => {

        type TestCase = {
            desc: string
			input: string
			expectedHTML: string
        }

        const featureTests: TestCase[] = [
            {
                desc: "just one tag",
				input: "#tag",
				expectedHTML: "<tag>#tag</tag>"
            },
            {
                desc: "between text",
				input: "before text #tag after text",
				expectedHTML: "before text <tag>#tag</tag> after text"
            },
        ]

        featureTests.forEach(testFeature)

        function testFeature(tc: TestCase) {
            test(tc.desc, () => {

                // @ts-ignore TODO: correct typing
				marked.use({ extensions: [markedExtensionTag] });
				const parsed = marked.parseInline(tc.input)
				expect(parsed).toEqual(tc.expectedHTML)
            })
        }

    })
})