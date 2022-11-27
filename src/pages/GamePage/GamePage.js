import clsx from 'clsx'
import { useCallback, useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Game, Keyboard, Splash } from '@src/components'
import { GameController } from '@src/classes'
import './GamePage.scss'

const WORD_LENGTH = 5
const MAX_TRIES = 6

const controller = new GameController(WORD_LENGTH, MAX_TRIES)

const GamePage = () => {
  const [inProp, setInProp] = useState(false)
  const [win, setWin] = useState(false)
  const [lose, setLose] = useState(false)
  const [answer, setAnswer] = useState(null)
  const wrapperRef = useRef(null)
  const gameRef = useRef(null)
  const splashRef = useRef(null)
  const [gameState, setGameState] = useState(null)

  const handleGameStateChange = useCallback((state) => {
    setGameState(state)
  }, [])

  useEffect(() => {
    wrapperRef?.current?.focus()
  }, [wrapperRef])

  useEffect(() => {
    gameRef?.current?.startNewGame()
  }, [gameRef])

  const handleKeyDown = useCallback((e) => {
    if (!e.ctrlKey) {
      gameRef?.current?.receiveKey(e.key)
    }
  }, [])

  const handleKeyClick = useCallback((key) => {
    gameRef?.current?.receiveKey(key)
  }, [])

  const handleGameEnd = useCallback(({ win, lose, answer }) => {
    setInProp(true)
    setWin(win)
    setLose(lose)
    setAnswer(answer)
  }, [])

  const handleStartNewGame = useCallback(() => {
    setInProp(false)
    gameRef?.current?.startNewGame()

    setTimeout(() => {
      setWin(false)
      setLose(false)
      setAnswer(null)
      wrapperRef?.current?.focus()
    }, 300)
  }, [])

  return <div ref={wrapperRef} tabIndex={-1} className='root-game-page' onKeyDown={handleKeyDown}>
    <div className={clsx('game-wrapper', inProp && 'faded')}>
      <Game
        ref={gameRef}
        start={controller.start}
        guess={controller.guess}
        rowNumber={controller.maxTries}
        cellNumber={controller.wordLength}
        onGameEnd={handleGameEnd}
        onStateChange={handleGameStateChange}
      />
      <Keyboard
        onKeyClick={handleKeyClick}
        guesses={gameState?.guesses}
        guessesStates={gameState?.guessesStates}
      />
    </div>
    {
      <CSSTransition unmountOnExit nodeRef={splashRef} in={inProp} timeout={200} classNames='root-splash'>
        <Splash ref={splashRef} win={win} lose={lose} answer={answer} onStartNewGame={handleStartNewGame}/>
      </CSSTransition>
    }
  </div>
}

export default GamePage
