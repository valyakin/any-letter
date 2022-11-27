const INITIAL = {
  success: null,
  error: null,
  won: null,
  lost: null,
  answer: null,
  guessStates: null,
}

export class GuessResult {
  constructor () {
    this.success = undefined
    this.error = undefined
    this.won = undefined
    this.lost = undefined
    this.answer = undefined
    this.guessStates = undefined
    Object.assign(this, INITIAL)
  }

  toFail (reason) {
    Object.assign(this, INITIAL, {
      success: false,
      error: reason,
    })

    return this
  }

  toSucceed (guessStates) {
    Object.assign(this, INITIAL, {
      success: true,
      guessStates,
    })

    return this
  }

  toWin (answer, guessStates) {
    Object.assign(this, INITIAL, {
      success: true,
      won: true,
      answer,
      guessStates,
    })

    return this
  }

  toLose (answer, guessStates) {
    Object.assign(this, INITIAL, {
      lost: true,
      success: true,
      answer,
      guessStates,
    })

    return this
  }
}
