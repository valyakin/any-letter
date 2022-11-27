import clsx from 'clsx'
import React from 'react'
import './Splash.scss'

export const Splash = React.forwardRef(({ win, lose, answer, onStartNewGame, splashRef }, ref) => {
  return <div ref={ref} className={clsx('root-splash', win && 'win', lose && 'lose')}>
    <div className='wrapper'>
      { win && <span className='result win'>Победа!</span> }
      { lose && <span className='result lose'>Поражение :(</span> }

      <span className='answer'>Загаданное слово: {answer}</span>
      <button className='new-game' onClick={onStartNewGame}>Новая игра</button>
    </div>
    <div style={{ height: 168 }}/>
  </div>
})
