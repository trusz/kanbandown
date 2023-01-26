# Changelog	

## [Unreleased]

## [0.0.7] 2023-01-26

### Added

- icon
- select items for copy and paste
- copy and paste one ore multiple items

### Known Issues

- the order of pasting items depends on the order of selecting them

### Changed

- decreased padding of items

## [0.0.6] 2023-01-24p

### Added

- render description of projects

### Changed

- dangerous actions like delete look more dangerous

### Fixed

- registering the "Open as Markdown" command more than once broke the extension
  now we deregister before register it again


## [0.0.4] 2023-01-19

### Added

- mention `@mention` syntax
- "edit" context menu for project- and column title and for task
- new command: "KanbanDown: Open as Markdown" to open the source markdown file
- placeholder for editable but empty text
- clear all items in a column

### Changed

- refactored data and event flow with stores
- make destructive action's text red

## [0.0.3] 2023-01-15

### Fixed

- extension not loading because of a typo in a function name

## [0.0.2] 2023-01-15

### Fixed

- could not delete item from column
- new items on editing had the previous item's text
- dropdown now has enough place and is position aware

### Changed

- move the big add item button with the context menu into a toolbar
  next to the column title

## [0.0.1] 2023-01-13

### Added

- initial release
- `*.knb.md` files open as kanban board
- add/delete items
- add/delete columns
- rename columns
- rename board
- render every change back to markdown