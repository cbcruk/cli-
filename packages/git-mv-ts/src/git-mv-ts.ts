import fg from 'fast-glob'
import { readFile } from 'fs/promises'
import { promisify } from 'util'
import { Parser } from 'acorn'

const exec = promisify(require('child_process').exec)
const JSXParser = Parser.extend(require('acorn-jsx')())

async function main() {
  const files = await fg('./**/*.(js|jsx)')

  for (const file of files) {
    const data = await readFile(file, 'utf-8')
    const isJsx = Boolean(
      JSON.stringify(
        JSXParser.parse(data, {
          sourceType: 'module',
          ecmaVersion: 'latest',
        })
      ).includes('JSXIdentifier')
    )

    await exec(
      'git mv ' +
        file +
        ' ' +
        file.replace(/.(js|jsx)$/, isJsx ? '.tsx' : '.ts')
    )
  }
}

export default main
