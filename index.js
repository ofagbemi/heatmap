import { scaleLinear } from 'd3-scale'
import tinygradient from 'tinygradient'


const heatmap = (
  getValue,
  {
    numColors,
    colors,
    domain,
    range,
    size,
  }
) => canvas => {
  const width = canvas.width
  const height = canvas.height

  const scaleX = scaleLinear()
    .domain(domain || [0, width])
    .range([0, width])
  const scaleY = scaleLinear()
    .domain(range || [0, height])
    .range([0, height])
  const context = canvas.getContext('2d')

  const numWidthBlocks = Math.floor(width / size)
  const numHeightBlocks = Math.floor(height / size)
  const gradientColors = tinygradient(colors).rgb(numColors)
  for (let row = 0; row < numHeightBlocks; row++) {
    for (let col = 0; col < numWidthBlocks; col++) {
      const x = col * size
      const y = row * size

      const val = getValue(
        scaleX.invert(x + size / 2),
        scaleY.invert(y + size / 2)
      )

      context.fillStyle = gradientColors[val]
      context.fillRect(x, y, size, size)
    }
  }
}

heatmap(
  (x, y) => Math.floor(x * 2),
  {
    domain: [0, 100],
    range: [0, 100],
    colors: ['#21ce99', '#f45531'],
    numColors: 200,
    size: 1,
  }
)(document.querySelector('canvas'));
