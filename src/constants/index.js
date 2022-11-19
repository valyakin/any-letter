export * as GAME_EVENTS from './gameEvents'

export const LETTERS = [
  'ЙЦУКЕНГШЩЗХЪ',
  'ФЫВАПРОЛДЖЭ',
  'ЯЧСМИТЬБЮ',
]

export const ALLOWED_LETTERS = 'ЙЦУКЕНГШЩЗХФЫВАПРОЛДЖЭЯЧСМИТЬБЮ'
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
  ']': 'Ъ',
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
  '\'': 'Э',
  'Z': 'Я',
  'X': 'Ч',
  'C': 'С',
  'V': 'М',
  'B': 'И',
  'N': 'Т',
  'M': 'Ь',
  ',': 'Б',
  '.': 'Ю',
}

export const toValidLetter = (letter) => {
  const l = letter.toUpperCase()
  if (ALLOWED_LETTERS.includes(l)) return l

  const mapped = LETTER_MAPPING[l]
  if (ALLOWED_LETTERS.includes(mapped)) return mapped

  return false
}
