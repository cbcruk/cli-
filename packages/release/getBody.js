const { groupBy, keys } = require('lodash')
const { getPulls } = require('./octokit')

async function getBody({ repo, milestone }) {
  const data = await getPulls(repo)
  const pullsByUser = groupBy(
    data.filter((d) => d.milestone.title === milestone),
    (d) => d.user.login
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

module.exports = getBody
