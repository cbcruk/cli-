import prompts from 'prompts'
import clipboardy from 'clipboardy'
import dotenv from 'dotenv'
import { getDataFromCache } from './getDataFromCache'

dotenv.config()

async function main() {
  const data = await getDataFromCache()
  const { emoji, message } = await prompts([
    {
      type: 'autocomplete',
      name: 'emoji',
      message: '이모지를 선택해 주세요',
      choices: data.map((row) => {
        return {
          title: `${row.emoji} ${row.type}`,
          description: row.description,
          value: `${row.raw_emoji_code} ${row.type}:`,
        }
      }),
      suggest(input, choices) {
        return Promise.resolve(
          choices.filter((choice) => choice.title.includes(input))
        )
      },
    },
    {
      type: 'text',
      name: 'message',
      message: '메시지를 입력해 주세요',
    },
  ])
  await clipboardy.write(`${emoji} ${message}`)
}

export default main
