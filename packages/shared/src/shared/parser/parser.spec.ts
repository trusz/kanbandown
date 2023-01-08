import { expect, suite, test } from "vitest"
import * as fs from "fs"
import * as path from "path"
import {parse} from "./parser"
import { Board } from "../board"

suite("Parser", () => {
    suite("Feature", () => {

        interface TestCase {
            desc: 		   string
			file: 		   string
			expectedBoard: () => Board
        }

        const featureTests: TestCase[] = [
            {
                desc: "first test",
				file: "./testfiles/simple.md",
				expectedBoard: () => {
					const b = new Board()
					b.title = "Project Title",
					
					b.createColumn("Column 1")
					b.createItem("item 1")
					b.createItem("item 2")
					b.columns[0].items[1].done = true

					b.createColumn("Column 2")
					return b
				}
            },
        ]

        featureTests.forEach(testFeature)

        function testFeature(tc: TestCase) {
            test(tc.desc, () => {
				const filePath = path.join(__dirname,tc.file)

				const fileContent = fs.readFileSync(filePath, "utf-8")
				const board = parse(fileContent)
				console.log({level:"test", board})
				const expectedBoard = tc.expectedBoard()

				expect(board).toEqual(expectedBoard)
            })
        }

    })
})