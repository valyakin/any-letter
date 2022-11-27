export * as GUESS_ERRORS from './guessErrors'
export * as GAME_ACTIONS from './gameActions'
export * as GUESS_STATES from './guessStates'
export * from './nouns'

export const KEYBOARD = [
  'ЙЦУКЕНГШЩЗХЪ',
  'ФЫВАПРОЛДЖЭ',
  'ЯЧСМИТЬБЮ',
]

export const ALLOWED_LETTERS = 'ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ'
export const LETTER_MAPPING = {
  'Q': 'Й',
  'W': 'Ц',
  'E': 'У',
  'R': 'К',
  'T': 'Е',
  'Y': 'Н',
  'U': 'Г',
  'I': 'Ш',
  'O': 'Щ',
  'P': 'З',
  '[': 'Х',
  '{': 'Х',
  ']': 'Ъ',
  '}': 'Ъ',
  'A': 'Ф',
  'S': 'Ы',
  'D': 'В',
  'F': 'А',
  'G': 'П',
  'H': 'Р',
  'J': 'О',
  'K': 'Л',
  'L': 'Д',
  ';': 'Ж',
  ':': 'Ж',
  '\'': 'Э',
  '"': 'Э',
  'Z': 'Я',
  'X': 'Ч',
  'C': 'С',
  'V': 'М',
  'B': 'И',
  'N': 'Т',
  'M': 'Ь',
  ',': 'Б',
  '<': 'Б',
  '.': 'Ю',
  '>': 'Ю',
}
