import { writeFile } from 'fs'
import { promisify } from 'util'
import imageSize from 'image-size'

export const write = promisify(writeFile)
export const sizeOf = promisify(imageSize)
