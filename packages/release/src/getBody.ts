import { groupBy, keys } from 'lodash'
import { getPulls } from './octokit'

async function getBody({
  repo,
  milestone,
}: {
  repo: string
  milestone: string
}) {
  const data = await getPulls(repo)
  const pullsByUser = groupBy(
    data.filter((d) => d.milestone?.title === milestone),
    (d) => d.user?.login
  )
  const users = keys(pullsByUser)
  const content = users.map(
    (user) =>
      `@${user}\n${pullsByUser[user].map(
        (pull) => `${pull.title} by @${user}`
      )}`
  )

  return `${milestone}\n---\n${content}`
}

export default getBody
