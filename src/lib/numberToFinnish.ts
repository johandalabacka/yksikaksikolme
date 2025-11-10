const numbers = [
  'nolla',
  'yksi',
  'kaksi',
  'kolme',
  'nälje',
  'viisi',
  'kuusi',
  'seitsemän',
  'kahdeksan',
  'yhdeksän',
  'kymminen',
]

export default function numberToFinnish(n: number): string {
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
