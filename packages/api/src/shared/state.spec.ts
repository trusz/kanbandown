import { suite, test, vi, expect, beforeEach, it } from "vitest"
import { Column, State } from "./state"

suite("state", () => {

	let state: State
	beforeEach(() => {
		state = new State()
	})

	test("create columns", async () => {
		state.createColumn("c1")
		state.createColumn("c2")

		const expectedColumns: Column[] = [
			new Column("c1"),
			new Column("c2"),
		]

		expectedColumns.forEach( 
			(c) => expect(state.Columns()).toContainEqual(c)
		)
	})

	
	suite("managing items", () => {
		
		type LocatedItem = {
			label: 		 string,
			columnIndex: number
			position?: 	 number
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
				tc.columns.forEach(c => state.createColumn(c))
				let error: unknown

				// Act
				try{
					tc.actions.forEach( action => {
						if(action.type === "add"){
							state.createItem(action.label, action.columnIndex, action.position)
						}else if (action.type === "delete"){
							state.deleteItem(action.columnIndex, action.position!)
							// state.createItem(action.label, action.columnIndex, action.position)
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

				expect(state.Items()).toHaveLength(tc.expectedItems.length)

				tc.expectedItems.forEach( expectedItem => {
					const allItems = state.Items().map(i => ({ label: i.label }) )
					expect(allItems).toContainEqual({label:expectedItem.label})

					const column = state.Columns()[expectedItem.columnIndex]
					const itemsInColumn = column.Items().map( cItem => ({label: cItem.label}) )
					expect(itemsInColumn).toContainEqual({label: expectedItem.label})
				})

			})
		}

	})	

})