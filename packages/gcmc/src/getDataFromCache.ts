import fs from 'fs/promises'
import { ofetch } from 'ofetch'
import { API_URL } from './constants'

type Item = {
  emoji: string
  raw_emoji_code: string
  type: string
  description: string
}

export async function getDataFromCache(): Promise<Item[]> {
  try {
    await fs.access('./.cache')
    const data = await fs.readFile('./.cache', 'utf-8')

    return JSON.parse(data)
  } catch (error) {
    const { data } = await ofetch(API_URL).then((r) => JSON.parse(r))
    await fs.writeFile('./.cache', JSON.stringify(data))

    return data
  }
}
