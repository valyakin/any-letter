import clsx from 'clsx'
import { useMemo } from 'react'
import { ALLOWED_LETTERS, GUESS_STATES, KEYBOARD } from '@src/constants'
import './Keyboard.scss'

export const Keyboard = ({ onKeyClick, guesses, guessesStates }) => {
  const lettersState = useMemo(() => {
    if (!guesses || !guessesStates) return {}

    const ls = ALLOWED_LETTERS.split('').reduce((acc, l) => ({ ...acc, [l]: GUESS_STATES.UNKNOWN }), {})

    for (let i = 0; i < guesses.length; i++) {
      const guess = guesses[i]

      for (let j = 0; j < guess.length; j++) {
        const currentState = ls[guess[j]]
        const newState = guessesStates[i][j]

        switch (currentState) {
        case GUESS_STATES.UNKNOWN:
        case GUESS_STATES.WRONG:
          ls[guess[j]] = newState
          break
        case GUESS_STATES.MISPLACED:
          if(newState === GUESS_STATES.CORRECT) ls[guess[j]] = newState
          break
        default:
          break
        }
      }
    }

    return ls
  }, [guesses, guessesStates])

  return <div className='root-keyboard'>
    <div className='letters'>
      {
        KEYBOARD.map(row => <div key={row} className='row'>
          {
            row.split('').map(letter => (
              <div
                key={letter}
                className={clsx(
                  'key',
                  lettersState[letter]?.toLowerCase()
                )}
                onClick={() => onKeyClick(letter)}
              >
                <span>{letter}</span>
              </div>)
            )
          }
        </div>)
      }
    </div>
    <div className='controls'>
      <div className='row'>
        <div className='key del' onClick={() => onKeyClick('Backspace')}>Del</div>
      </div>
      <div className='row'>
        <div className='key enter' onClick={() => onKeyClick('Enter')}>Enter</div>
      </div>
    </div>
  </div>
}
