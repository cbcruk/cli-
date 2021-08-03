const { promisify } = require('util')
const { writeFile } = require('fs')
const fg = require('fast-glob')
const imageSize = require('image-size')

const sizeOf = promisify(imageSize)
const write = promisify(writeFile)

function getSass(data) {
  const body = Object.keys(data)
    .map((key) => {
      const { width, height } = data[key]

      return `("${key}": (${width}, ${height}))`
    }, '')
    .join(', ')

  return `$images: (${body});`
}

function getJson(value) {
  return JSON.stringify(value)
}

async function main() {
  const entries = await fg('./*.(jpg|png)')
  const result = await entries.reduce(async (prev, current) => {
    const previous = await prev
    const [fileName] = current.match(/[^\\/:*?"<>|\r\n]+$/)
    const size = await sizeOf(current)

    return {
      ...previous,
      [fileName]: size,
    }
  }, Promise.resolve({}))

  await write('result.json', getJson(result))
  await write('result.scss', getSass(result))
}

module.exports = main
