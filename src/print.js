const path = require('path')
const chalk = require('chalk')
const { write } = require('./p')
const { variables, sprite } = require('./sass')
const size = require('./size')

async function print(options) {
  const result = await size()
  const file = (name) => path.join(options.outDir || '', name)

  if (options.json) {
    await write(file('result.json'), JSON.stringify(result))
  }

  if (options.scss) {
    await write(file('_variables.scss'), variables(result))
    await write(file('_sprite.scss'), sprite(result))
  }

  console.log(chalk`{cyanBright 작업이 완료 되었습니다.}`)
}

module.exports = print
