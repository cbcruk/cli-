const { program } = require('commander')
const chokidar = require('chokidar')
const package = require('../package.json')
const print = require('./print')

async function cli() {
  program
    .version(package.version)
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

  const options = program.opts()

  print(options)

  if (options.watch) {
    chokidar.watch('./*.(jpg|png)').on('all', (event, path) => {
      console.log(event, path)
      print(options)
    })
  }
}

module.exports = cli
