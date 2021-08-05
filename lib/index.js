const { promisify } = require('util')
const { writeFile } = require('fs')
const fg = require('fast-glob')
const { program } = require('commander')
const figlet = require('figlet')
const chalk = require('chalk')
const imageSize = require('image-size')
const package = require('../package.json')

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

async function getResult() {
  const entries = await fg('./*.(jpg|png)')
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

async function cli() {
  console.log(figlet.textSync(package.name))

  program
    .version(package.version)
    .description('이미지 크기를 측정하는 줄자')
    .option('-j, --json', 'json을 출력합니다')
    .option('-s, --scss', 'scss를 출력합니다')

  program.parse(process.argv)

  if (!process.argv.slice(2).length) {
    program.outputHelp()
    return
  }

  const result = await getResult()
  const options = program.opts()

  if (options.json) {
    await write(`result.json`, getJson(result))
  }

  if (options.scss) {
    await write(`result.scss`, getSass(result))
  }

  console.log(chalk`{cyanBright 작업이 완료 되었습니다.}`)
}

module.exports = cli
