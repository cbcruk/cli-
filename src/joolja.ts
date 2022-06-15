import { program } from 'commander'
import chokidar from 'chokidar'
import print from './print'
import pkg from '../package.json'
import { Options } from './types'

async function joolja() {
  program
    .version(pkg.version)
    .description('이미지 크기를 측정하는 줄자')
    .option('-j, --json', 'json을 출력합니다')
    .option('-s, --scss', 'scss를 출력합니다')
    .option('-w, --watch', 'watch 모드를 활성화합니다')
    .option('-o, --out-dir <path>', 'sass, json 저장경로')

  program.parse(process.argv)

  if (!process.argv.slice(2).length) {
    program.outputHelp()
    return
  }

  const options = program.opts<Options>()

  print(options)

  if (options.watch) {
    chokidar.watch('./*.(jpg|png)').on('all', (event, path) => {
      console.log(event, path)
      print(options)
    })
  }
}

export default joolja
