import { EventEmitter } from 'events'
import { ALLOWED_LETTERS, GAME_EVENTS } from '@src/constants'

export class GameController extends EventEmitter {
  constructor () {
    super()
    this.answer = null
    this.guesses = []
    this.wordLength = 5
    this.maxTries = 6
    this.guessed = false
    this.keyboardState = ALLOWED_LETTERS.split('').reduce((acc, l) => ({ ...acc, [l]: '' }), {})
    this.guessesState = []
  }

  start () {
    this.answer = 'СОЛОД'
    this.try = 0
    this.emit(GAME_EVENTS.NEXT_TRY, this.currentTry)
  }

  guess (word) {
    const w = word.join('')
    if (!this.gameEnded && w.length === this.wordLength) {
      this.guesses.push(w)

      const guessState = []

      for (let i = 0; i < word.length; i++) {
        const letter = word[i]
        if (this.answer[i] === letter) {
          guessState.push('correct')
          this.keyboardState[letter] = 'correct'
        } else if (this.answer.includes(letter)) {
          guessState.push('misplaced')
          if (this.keyboardState[letter] !== 'correct') {
            this.keyboardState[letter] = 'misplaced'
          }
        } else {
          guessState.push('wrong')
          if (this.keyboardState[letter] !== 'correct' || this.keyboardState[letter] !== 'misplaced') {
            this.keyboardState[letter] = 'wrong'
          }
        }
      }

      this.guessesState.push(guessState)
      if (w === this.answer) {
        this.guessed = true
        this.emit(GAME_EVENTS.GAME_WIN)
        return true
      }

      this.try++
      this.emit(GAME_EVENTS.NEXT_TRY, this.currentTry)
      return true
    }
  }

  get gameEnded () {
    return this.guessed || this.currentTry >= this.maxTries
  }

  get currentTry () {
    return this.guesses.length
  }
}
