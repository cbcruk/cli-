import fg from 'fast-glob'
import { sizeOf } from './p'
import { Images } from './types'

async function size(): Promise<Images> {
  const entries = await fg('*.(jpg|png)')
  const result = await entries.reduce(async (prev, current) => {
    const previous = await prev
    const matched = current.match(/[^\\/:*?"<>|\r\n]+$/)
    const fileName = matched ? matched[0] : ''
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

export default size
