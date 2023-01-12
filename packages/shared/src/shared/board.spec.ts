import { suite, test, vi, expect, beforeEach, it } from "vitest"
import { Column, Board } from "./board"

suite("Board", () => {

	let board: Board
	beforeEach(() => {
		board = new Board()
	})

	test("create columns", async () => {
		board.createColumn("c1")
		board.createColumn("c2")

		const expectedColumns: Column[] = [
			new Column("c1",0),
			new Column("c2",1),
		]

		expectedColumns.forEach( 
			(c) => expect(board.columns).toContainEqual(c)
		)
	})

	
	suite("managing items", () => {
		
		type LocatedItem = {
			label: 		  string,
			columnIndex?: number
			position?: 	  number
		}
		type Action = LocatedItem & {
			type: "add" | "delete",
		}
		
		interface TestCase {
			desc: 	           string
			columns:           string[]
			actions:           Action[]
			expectedItems:     LocatedItem[]
			shouldThrowError?: boolean
		}

		const featureTests: TestCase[] = [
			{
				desc: "adding item to a column",
				columns: ["c1"],
				actions: [
					{
						label:		 "item1", 
						type: 	     "add",
						columnIndex: 0,
					}
				],
				expectedItems: [ {label:"item1", columnIndex:0} ]
			},
			{
				desc: "adding items to last columnt",
				columns: ["c1"],
				actions: [
					{
						label:		 "item1", 
						type: 	     "add",
					}
				],
				expectedItems: [ {label:"item1", columnIndex:0} ]
			},
			{
				desc: "throws error if try to add to a non-existing column",
				shouldThrowError: true,
				columns: ["c1"],
				actions: [
					{
						label:		 "item1", 
						type: 		 "add",
						columnIndex: 1,
					}
				],
				expectedItems: [],
				
			},
			{
				desc: 	 "remove item from a column",
				columns: ["c1"],
				actions: [
					{
						label:		 "item1", 
						type: 		 "add",
						columnIndex: 0,
					},
					{
						label:		 "item2", 
						type: 		 "add",
						columnIndex: 0,
					},
					{
						label:		 "not important", 
						type: 		 "delete",
						columnIndex: 0,
						position:    0,
					}
				],
				expectedItems: [ {label:"item2", columnIndex:0} ],
				
			},
		]

		featureTests.forEach(testFeature)

		function testFeature(tc: TestCase) {
			test(tc.desc, () => {

				// Arrange
				tc.columns.forEach(c => board.createColumn(c))
				let error: unknown

				// Act
				try{
					tc.actions.forEach( action => {
						if(action.type === "add"){
							board.createItem(action.label, false, action.columnIndex, action.position)
						}else if (action.type === "delete"){
							board.deleteItem(action.columnIndex!, action.position!)
						}
					})
				} catch(err){
					error = err
				}

				// Assert
				if(tc.shouldThrowError && !error){
					throw new Error("error expected")
				}
				if(!tc.shouldThrowError && error){
					throw error
				}

				expect(board.items).toHaveLength(tc.expectedItems.length)

				tc.expectedItems.forEach( expectedItem => {
					const allItems = board.items.map(i => ({ label: i.label }) )
					expect(allItems).toContainEqual({label:expectedItem.label})

					const column = board.columns[expectedItem.columnIndex!]
					const itemsInColumn = column.items.map( cItem => ({label: cItem.label}) )
					expect(itemsInColumn).toContainEqual({label: expectedItem.label})
				})

			})
		}

	})	

})
