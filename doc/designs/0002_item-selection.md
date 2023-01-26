# Item Selection

How to select an item?

- when clicked item is highlighted
- if clicked somewhere else the item is deselected
- if clicked on an another item in the same or in another column
  the other item is selected and the previous one is deselected

## Options

### Events

- the `CompItem` on click can dispatch a click event with the item or with the 
  used indexes
  - item: we need to find the indexes on every selection, which is not so terrible
    but still needs an indexOf
  - index: it is good, but smells a bit, the item is more natural
- (-) in order to handle the clicking-elsewhere and selecting in another column
  we probably have to propagate up to the board which is cumbersome
- (+) easier to test on every level


### Selection Store

- the board or the app provides a context for a store where everybody
  make selections
- the selected stuff can be the item because compItem will have the item eventually
- (-) pages have to provide the context and the store
- (+) the column and possible the board does not have to know about the selection
