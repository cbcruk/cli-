import fg from 'fast-glob'
import { readFile } from 'fs/promises'
import { promisify } from 'util'

const exec = promisify(require('child_process').exec)

async function main() {
  const files = await fg('./**/*.(js|jsx)')

  for (const file of files) {
    const data = await readFile(file, 'utf-8')
    const isJsx = /<[a-zA-Z][^>]*>|<>/.test(data)

    await exec(
      'git mv ' +
        file +
        ' ' +
        file.replace(/.(js|jsx)$/, isJsx ? '.tsx' : '.ts')
    )
  }
}

export default main
