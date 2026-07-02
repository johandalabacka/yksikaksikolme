const numbers = [
  'nolla',
  'yksi',
  'kaksi',
  'kolme',
  'neljä',
  'viisi',
  'kuusi',
  'seitsemän',
  'kahdeksan',
  'yhdeksän',
  'kymminen',
]

export function numberToFinnish(n: number): string {
  if (n < 0 || n > 99) {
    throw new Error(`${n} is out of range 0-99`)
  }
  if (n <= 10) {
    return numbers[n]!
  }
  if (n >= 11 && n <= 19) {
    return numbers[n % 10] + 'toista'
  }
  const decade = Math.floor(n / 10)
  const rest = n % 10
  let s = numbers[decade] + 'kymmentä'
  if (rest !== 0) {
    s += numbers[rest]
  }
  return s
}

const ordinals = [
  'nollas',
  'ensimmäinen',
  'toinen',
  'kolmas',
  'neljäs',
  'viides',
  'kuudes',
  'seitsemäs',
  'kahdeksas',
  'yhdeksäs',
  'kymmenes',
]

export function numberToFinnishOrdinal(n: number): string {
  if (n < 0 || n > 99) {
    throw new Error(`${n} is out of range 0-99`)
  }
  if (n <= 10) {
    return ordinals[n]!
  }
  if (n == 11) {
    return 'yhdestoista'
  }
  if (n == 12) {
    return 'kahdestoista'
  }
  if (n >= 13 && n <= 19) {
    return ordinals[n % 10] + 'toista'
  }
  const decade = Math.floor(n / 10)
  const rest = n % 10
  let s = ordinals[decade] + 'kymmenes'
  if (rest !== 0) {
    s += ordinals[rest]
  }
  return s
}

const months = [
  'tammikuu',
  'helmikuu',
  'maaliskuu',
  'huhtikuu',
  'toukokuu',
  'kesäkuu',
  'heinäkuu',
  'elokuu',
  'syyskuu',
  'lokakuu',
  'marraskuu',
  'joulukuu',
];

export function monthDayToFinnish({day, month}: {day: number, month: number}): string {
  if (month < 1 || month > 12) {
    throw new Error(`${month} is out of range 1-12`)
  }
  const s = numberToFinnishOrdinal(day) + ' ' + months[month - 1] + 'ta'
  return s
}