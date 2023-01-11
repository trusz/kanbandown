import { expect, suite, test } from "vitest" 
import { marked } from "marked"
import { markedExtensionPrio } from "./marked-extension-prio"

suite("Component", () => {
    suite("Feature", () => {

        type TestCase = {
            desc: string
			input: string
			expectedHTML: string
        }

        const featureTests: TestCase[] = [
            {
                desc: "just one tag",
				input: ":low",
				expectedHTML: "<prio>:low</prio>"
            },
            {
                desc: "between text",
				input: "before text :low after text",
				expectedHTML: "before text <prio>:low</prio> after text"
            },
        ]

        featureTests.forEach(testFeature)

        function testFeature(tc: TestCase) {
            test(tc.desc, () => {

                // @ts-ignore TODO: correct typing
				marked.use({ extensions: [markedExtensionPrio] });
				const parsed = marked.parseInline(tc.input)
				expect(parsed).toEqual(tc.expectedHTML)
            })
        }

    })
})