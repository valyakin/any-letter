import clsx from 'clsx'
import './GameField.scss'

export const GameField = ({ field, onFocus }) => {
  return <div className='root-game-field'>
    {
      field.rows.map((row) => {
        const isCurrentRow = field.currentRow === row.index

        return <div key={row.index} className={clsx('row', isCurrentRow && 'row-current')}>
          {
            row.cells.map((cell) => {
              const isCurrentCell = isCurrentRow && field.currentCell === cell.index
              return <div
                key={cell.index}
                className={clsx(
                  'cell',
                  isCurrentCell  && 'cell-current',
                  isCurrentRow && field.errored && 'cell-errored',
                  cell.guessState.toLowerCase()
                )}
                onClick={isCurrentRow ? () => onFocus && onFocus(cell.index) : undefined}
              >
                <span>{cell.letter}</span>
              </div>
            })
          }
        </div>
      })
    }
  </div>
}
