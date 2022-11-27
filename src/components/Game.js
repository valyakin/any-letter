import React, { useCallback, useEffect, useImperativeHandle, useMemo, useReducer } from 'react'
import { Field } from '@src/classes'
import { GameField } from '@src/components'
import { GAME_ACTIONS } from '@src/constants'
import { toValidLetter } from '@src/utils'

export const Game = React.forwardRef(({ start, guess, rowNumber, cellNumber, onGameEnd, onStateChange }, ref) => {
  const [state, dispatch] = useReducer(reducerFactory(cellNumber), initialState(cellNumber))

  useEffect(() => {
    onStateChange(state)
  }, [onStateChange, state])

  const field = useMemo(() => {
    return new Field(
      rowNumber,
      cellNumber,
      [...state.guesses, state.currentWord],
      state.guessesStates,
      state.currentRow,
      state.currentCell,
      !!state.guessFailReason
    )
  }, [cellNumber, rowNumber, state])

  const startNewGame = () => {
    start()
    dispatch({ type: GAME_ACTIONS.NEW })
  }

  const handleFocusChange = useCallback((cellIndex) => {
    dispatch({ type: GAME_ACTIONS.FOCUS_SET, payload: cellIndex })
  }, [])

  const handleTryGuess = useCallback(() => {
    const guessResult = guess(state.currentWord.join(''))
    if (guessResult.success) {
      dispatch({ type: GAME_ACTIONS.GUESS_SUCCEED, payload: { guessStates: guessResult.guessStates } })
      if(guessResult.won) {
        dispatch({ type: GAME_ACTIONS.WIN })
        onGameEnd({ win: true, answer: guessResult.answer })
      } else if (guessResult.lost) {
        dispatch({ type: GAME_ACTIONS.LOSE })
        onGameEnd({ lose: true, answer: guessResult.answer })
      } else {
      }
    } else {
      dispatch({ type: GAME_ACTIONS.GUESS_FAILED, payload: guessResult.error })
    }
  }, [guess, onGameEnd, state.currentWord])

  const receiveKey = useCallback((key) => {
    if (state.won || state.lost) return
    if (key?.length === 1) {
      const letter = toValidLetter(key)
      if (letter) {
        dispatch({ type: GAME_ACTIONS.LETTER_CHANGED, payload: letter })
        dispatch({ type: GAME_ACTIONS.FOCUS_RIGHT })
      }
    } else {
      switch (key) {
      case 'ArrowLeft':
        dispatch({ type: GAME_ACTIONS.FOCUS_LEFT })
        break
      case 'ArrowRight':
        dispatch({ type: GAME_ACTIONS.FOCUS_RIGHT })
        break
      case 'Backspace':
        dispatch({ type: GAME_ACTIONS.LETTER_CHANGED, payload: '' })
        dispatch({ type: GAME_ACTIONS.FOCUS_LEFT })
        break
      case 'Delete':
        dispatch({ type: GAME_ACTIONS.LETTER_CHANGED, payload: '' })
        break
      case 'Enter':
        handleTryGuess()
        break
      default:
        break
      }
    }
  }, [handleTryGuess, state.lost, state.won])

  useImperativeHandle(ref, () => ({
    startNewGame,
    receiveKey,
  }))

  return <GameField
    field={field}
    onFocus={handleFocusChange}
  />
})

const initialState = wordLength => ({
  won: false,
  lost: false,
  currentTry: 1,
  guesses: [],
  currentCell: 0,
  currentRow: 0,
  currentWord: Array(wordLength).fill(''),
  guessFailReason: null,
  guessesStates: [],
})

const reducerFactory = wordLength => (state, action) => {
  switch (action.type) {
  case GAME_ACTIONS.NEW: return initialState(wordLength)
  case GAME_ACTIONS.WIN: return {
    ...state,
    currentRow: -1,
    currentCell: -1,
    won: true,
  }
  case GAME_ACTIONS.LOSE: return {
    ...state,
    currentRow: -1,
    currentCell: -1,
    lost: true,
  }
  case GAME_ACTIONS.GUESS_FAILED: return {
    ...state,
    guessFailReason: action.payload,
  }
  case GAME_ACTIONS.GUESS_SUCCEED: return {
    ...state,
    currentWord: Array(wordLength).fill(''),
    currentTry: state.currentTry + 1,
    currentRow: state.currentRow + 1,
    currentCell: 0,
    guesses: [...state.guesses, state.currentWord],
    guessesStates: [...state.guessesStates, action.payload.guessStates],
  }
  case GAME_ACTIONS.LETTER_CHANGED: return {
    ...state,
    guessFailReason: null,
    currentWord: [
      ...state.currentWord.slice(0, state.currentCell),
      action.payload,
      ...state.currentWord.slice(state.currentCell + 1),
    ],
  }
  case GAME_ACTIONS.FOCUS_LEFT: return {
    ...state,
    currentCell: Math.max(0, state.currentCell -1),
  }
  case GAME_ACTIONS.FOCUS_RIGHT: return {
    ...state,
    currentCell: Math.min(state.currentWord.length - 1, state.currentCell + 1),
  }
  case GAME_ACTIONS.FOCUS_SET: return {
    ...state,
    currentCell: action.payload,
  }
  default: return state
  }
}
