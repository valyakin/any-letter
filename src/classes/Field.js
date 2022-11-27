import { GUESS_STATES } from '@src/constants'

export class Field {
  constructor (rowNumber, cellNumber, words = [], guessesStates = [], currentRow, currentCell, errored) {
    this.words = words
    this.guessesStates = guessesStates
    this.currentRow = currentRow
    this.currentCell = currentCell
    this.errored = errored
    this.rows = Array(rowNumber).fill(undefined).map((e, i) => new FieldRow(i, cellNumber, this.words[i], this.guessesStates[i]))
  }
}

class FieldRow {
  constructor (rowIndex, cellNumber, word, guessStates) {
    this.index = rowIndex
    this.word = word
    this.guessStates = guessStates
    this.cells = Array(cellNumber).fill(undefined).map((e, i) => new FieldCell(i, this.word?.[i], this.guessStates?.[i]))
  }
}

class FieldCell {
  constructor (cellIndex, letter = '', guessState = GUESS_STATES.UNKNOWN) {
    this.index = cellIndex
    this.letter = letter
    this.guessState = guessState
  }
}
