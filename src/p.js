const { writeFile } = require('fs')
const { promisify } = require('util')
const imageSize = require('image-size')

const write = promisify(writeFile)
const sizeOf = promisify(imageSize)

module.exports.write = write
module.exports.sizeOf = sizeOf
