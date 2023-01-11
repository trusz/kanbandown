import { expect, suite, test } from "vitest" 
import { marked } from "marked"
import { markedExtensionProject } from "./marked-extension-project"

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
				input: "+project",
				expectedHTML: "<project>+project</project>"
            },
            {
                desc: "between text",
				input: "before text +project after text",
				expectedHTML: "before text <project>+project</project> after text"
            },
        ]

        featureTests.forEach(testFeature)

        function testFeature(tc: TestCase) {
            test(tc.desc, () => {

                // @ts-ignore TODO: correct typing
				marked.use({ extensions: [markedExtensionProject] });
				const parsed = marked.parseInline(tc.input)
				expect(parsed).toEqual(tc.expectedHTML)
            })
        }

    })
})