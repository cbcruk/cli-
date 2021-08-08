function variables(data) {
  const body = Object.keys(data)
    .map((key) => {
      const { width, height } = data[key]

      return `"${key}": (${width}, ${height})`
    }, '')
    .join(', ')

  return `$images: (${body});`
}

function sprite(data) {
  const result = Object.keys(data)
    .map((key) => {
      const item = data[key]

      return `.${key} {
  width: ${item.width}px;
  height: ${item.height}px;
  background-image: url(${key}.${item.type});
}
    `
    })
    .join('\n')

  return result
}

module.exports.sprite = sprite
module.exports.variables = variables
