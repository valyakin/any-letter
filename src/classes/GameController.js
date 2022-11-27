import { NOUNS, GUESS_ERRORS, GUESS_STATES } from '@src/constants'
import { getRandomNoun } from '@src/utils'
import { GuessResult } from '@src/classes/GuessResult'

export class GameController {
  constructor (wordLength, maxTries) {
    this.wordLength = wordLength
    this.maxTries = maxTries

    this.try = null
    this.guessed = false
    this.answer = null
  }

  start = () => {
    this.try = 1
    this.guessed = false
    this.answer = getRandomNoun()
    // this.answer = 'НАУКА'

    // console.log('this.answer', this.answer)
  }

  guess = (word) => {
    const gr = new GuessResult()

    if (this.gameEnded) return gr.toFail(GUESS_ERRORS.GAME_ENDED)

    if (word.length !== this.wordLength) return gr.toFail(GUESS_ERRORS.NOT_ENOUGH_LETTERS)

    if (!NOUNS.includes(word)) return gr.toFail(GUESS_ERRORS.UNKNOWN_WORD)

    const guessStates = Array(word.length).fill(GUESS_STATES.WRONG)

    const tmpAnswer = this.answer.split('')
    for (let i = 0; i < word.length; i++) {
      const letter = word[i]
      if (tmpAnswer[i] === letter) {
        tmpAnswer[i] = ' '
        guessStates[i] = GUESS_STATES.CORRECT
      }
    }

    for (let i = 0; i < word.length; i++) {
      const letter = word[i]
      if (tmpAnswer.includes(letter)) {
        const index = tmpAnswer.findIndex(l => l === letter)
        tmpAnswer[index] = ' '
        guessStates[index] = GUESS_STATES.MISPLACED // answer = НАУКА word = СКУКА
      }
    }

    if (word === this.answer) {
      this.guessed = true
      return gr.toWin(this.answer, guessStates)
    }

    if (this.try + 1 > this.maxTries) return gr.toLose(this.answer, guessStates)

    this.try++
    return gr.toSucceed(guessStates)
  }

  get gameEnded () {
    return this.guessed || this.currentTry > this.maxTries
  }
}
