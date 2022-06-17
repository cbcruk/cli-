import prompts from 'prompts'
import dotenv from 'dotenv'
import questions from './questions'
import getTagNames from './getTagNames'
import submit from './submit'

dotenv.config()

async function main() {
  const { release_type, repo } = await prompts([
    questions.release_type,
    questions.repo,
  ])

  const nextTagNames = await getTagNames(repo)
  const { tag_name, date, confirm } = await prompts([
    {
      ...questions.tag_name,
      choices: nextTagNames,
    },
    questions.date,
    questions.confirm,
  ])

  if (!confirm) {
    return
  }

  await submit({
    repo,
    tag_name,
    release_type,
    date,
  })
}

export default main
