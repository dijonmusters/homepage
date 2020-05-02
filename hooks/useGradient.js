import useTime from './useTime'

const getColorValueAtPercentage = (startColor, endColor, percentage) => {
  const diff = endColor - startColor
  const delta = Math.floor((diff * percentage) / 100)
  return startColor + delta
}

const getColorAtPercentage = (startColor, endColor, percentage) => [
  getColorValueAtPercentage(startColor[0], endColor[0], percentage),
  getColorValueAtPercentage(startColor[1], endColor[1], percentage),
  getColorValueAtPercentage(startColor[2], endColor[2], percentage),
]

const useGradient = () => {
  const { percentageOfEntireDay } = useTime()

  const startOfDay = {
    from: [143, 148, 251],
    to: [78, 84, 200],
  }

  const endOfDay = {
    from: [215, 109, 119],
    to: [255, 175, 123],
  }

  const fromColor = getColorAtPercentage(
    startOfDay.from,
    endOfDay.from,
    percentageOfEntireDay
  )
  const toColor = getColorAtPercentage(
    startOfDay.to,
    endOfDay.to,
    percentageOfEntireDay
  )

  const middleColor = getColorAtPercentage(fromColor, toColor, 50)

  const from = fromColor.join(', ')
  const middle = middleColor.join(', ')
  const to = toColor.join(', ')

  return {
    from,
    middle,
    to,
  }
}

export default useGradient
