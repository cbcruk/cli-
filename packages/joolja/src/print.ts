import path from 'path'
import chalk from 'chalk'
import { write } from './p'
import { variables, sprite } from './sass'
import size from './size'
import { Options } from './types'

async function print(options: Options) {
  const result = await size()
  const file = (name: string) => path.join(options.outDir || '', name)

  if (options.json) {
    await write(file('result.json'), JSON.stringify(result))
  }

  if (options.scss) {
    await write(file('_variables.scss'), variables(result))
    await write(file('_sprite.scss'), sprite(result))
  }

  console.log(chalk`{cyanBright 작업이 완료 되었습니다.}`)
}

export default print
