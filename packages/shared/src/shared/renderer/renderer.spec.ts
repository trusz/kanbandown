import { expect, suite, test } from 'vitest';
import { Board } from '../board';
import * as path from "path"
import * as fs from "fs"
import { render } from "./renderer"
 
suite("renderer", () => {
    suite("render", () => {

        type TestCase = {
            desc:         string,
            expectedFile: string,
            makeBoard:    () => Board,
        }

        const featureTests: TestCase[] = [
            {
                desc: "first test",
                expectedFile: "./testfiles/simple.md",
                makeBoard: () => {
                    const b = new Board()
                    b.title = "Project Title"
                    b.createColumn("Column 1")
                    b.createItem("item 1")
                    b.createItem("item 2")
                    b.createColumn("Column 2")
                    b.createItem("item 3")
                    b.createItem("item 4")
                    return b
                }
            },
        ];

        featureTests.forEach(testFeature);

        function testFeature(tc: TestCase) {
            test(tc.desc, () => {
                const filePath = path.join(__dirname,tc.expectedFile)
                const fileContent = fs.readFileSync(filePath, "utf-8")
                const board = tc.makeBoard()
                const renderedAsMarkdown = render(board)
                expect(renderedAsMarkdown).toEqual(fileContent)

            });
        }

    });
});