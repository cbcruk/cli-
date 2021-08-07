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

module.exports = sprite
