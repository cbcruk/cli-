const fg = require('fast-glob')
const { sizeOf } = require('./p')

async function size() {
  const entries = await fg('*.(jpg|png)')
  const result = await entries.reduce(async (prev, current) => {
    const previous = await prev
    const [fileName] = current.match(/[^\\/:*?"<>|\r\n]+$/)
    const snakeCaseName = fileName
      .replace(/.jpg|.png/, '')
      .replace(/\s/g, '_')
      .toLowerCase()
    const size = await sizeOf(current)

    return {
      ...previous,
      [snakeCaseName]: size,
    }
  }, Promise.resolve({}))

  return result
}

module.exports = size
