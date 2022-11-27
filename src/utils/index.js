import { ALLOWED_LETTERS, LETTER_MAPPING, NOUNS } from '@src/constants'

export const clone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

export const getRandomNoun = () => {
  const index = getRandomInt(0, NOUNS.length)
  return NOUNS[index].toUpperCase()
}

export const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

export const toValidLetter = (letter) => {
  const l = letter.toUpperCase()
  if (ALLOWED_LETTERS.includes(l)) return l

  const mapped = LETTER_MAPPING[l]
  if (ALLOWED_LETTERS.includes(mapped)) return mapped

  return false
}
