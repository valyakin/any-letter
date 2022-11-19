import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import { clone } from '@src/utils'
import './GamePage.scss'
import { GAME_EVENTS, LETTERS, toValidLetter } from '@src/constants'
import { GameController } from '@src/GameController'

const controller = new GameController()

const GamePage = () => {
  const [, setWin] = useState(false)
  const [currentRow, setCurrentRow] = useState(null)
  const ref = useRef(null)
  const [focusedCell, setFocusedCell] = useState(0)
  const [word, setWord] = useState(Array(controller.wordLength).fill(''))

  const field = useMemo(() => {
    const f = controller.guesses.map(g => g.split(''))
    if (!controller.gameEnded) {
      f[f.length] = word
    }

    for (let i = f.length; i<controller.maxTries; i++) {
      f[i] = Array(controller.wordLength).fill('')
    }

    return f
  }, [word])

  useEffect(() => {
    controller.on(GAME_EVENTS.NEXT_TRY, (newtry) => {
      setCurrentRow(newtry)
      setWord(Array(controller.wordLength).fill(''))
    })
    controller.on(GAME_EVENTS.GAME_WIN, () => {
      setWin(true)
      setCurrentRow(-1)
    })

    controller.start()
    return () => controller.removeAllListeners()
  }, [])

  useEffect(() => {
    ref?.current?.focus()
  }, [ref])

  const changeCurrentLetter = useCallback((letter) => {
    setWord((prev) => {
      const newWord = clone(prev)
      newWord[focusedCell] = letter
      return newWord
    })
  }, [focusedCell])

  const handleFocusChange = useCallback((row, cell) => {
    if (row === currentRow) {
      setFocusedCell(cell)
    }
  }, [currentRow])

  const handleTryGuess = useCallback(() => {
    const ok = controller.guess(word)
    if (ok) {
      if(controller.gameEnded) {
        setFocusedCell(-1)
      } else {
        setFocusedCell(0)
      }
    }
  }, [word])

  const handleKeyDown = useCallback((e) => {
    const nextFocus = Math.min(word.length - 1, focusedCell + 1)
    const prevFocus = Math.max(0, focusedCell -1)

    if (!e.ctrlKey) {
      if (e.key?.length === 1) {
        const letter = toValidLetter(e.key)
        if (letter) {
          changeCurrentLetter(letter)
          setFocusedCell(nextFocus)
        }
      } else {
        switch (e.key) {
        case 'ArrowLeft':
          setFocusedCell(prevFocus)
          break
        case 'ArrowRight':
          setFocusedCell(nextFocus)
          break
        case 'Backspace':
          changeCurrentLetter('')
          setFocusedCell(prevFocus)
          break
        case 'Delete':
          changeCurrentLetter('')
          break
        case 'Enter':
          handleTryGuess()
          break
        default:
          break
        }
      }
    }
  }, [word, focusedCell, changeCurrentLetter, handleTryGuess])

  const handleLetterClick = useCallback((letter) => {
    changeCurrentLetter(letter)
    const nextFocus = Math.min(word.length - 1, focusedCell + 1)
    setFocusedCell(nextFocus)
  }, [changeCurrentLetter, word, focusedCell])

  return <div ref={ref} tabIndex={-1} className='root-game-page' onKeyDown={handleKeyDown} >
    <GameField
      field={field}
      focusedCell={focusedCell}
      currentRow={currentRow}
      onFocus={handleFocusChange}
    />
    <Keyboard onLetterClick={handleLetterClick}/>
  </div>
}

const GameField = ({ edit, field, onFocus, focusedCell, currentRow }) => {
  return <div className='game-field'>
    {
      field.map((row, i) => <Row
        className={clsx(currentRow === i && 'current')}
        key={i}
        row={row}
        rowNumber={i}
        focusedCell={currentRow === i && focusedCell}
        onFocus={cell => onFocus(i, cell)}
      />)
    }
  </div>
}

const Row = ({ row, onFocus, focusedCell, className, rowNumber }) => {
  return <div className={clsx('row', className)}>
    {
      row.map((letter, i) => <Cell
        key={i}
        letter={letter}
        cellNumber={i}
        rowNumber={rowNumber}
        focused={focusedCell === i}
        onFocus={letter => onFocus(i)}
      />)
    }
  </div>
}

const Cell = ({ letter, onFocus, focused, rowNumber, cellNumber }) => {
  return <div className={clsx('cell', focused && 'focused', controller.guessesState[rowNumber]?.[cellNumber])} onClick={onFocus}>
    <span>{letter}</span>
  </div>
}

const Keyboard = ({ onLetterClick }) => {
  return <div className='root-keyboard'>
    {
      LETTERS.map(row => <div key={row} className='row'>
        {
          row.split('').map(letter => (
            <div
              key={letter}
              className={clsx(
                'letter',
                controller.keyboardState[letter]
              )}
              onClick={() => onLetterClick(letter)}
            >
              <span>{letter}</span>
            </div>)
          )
        }
      </div>)
    }
  </div>
}

export default GamePage
