const { Octokit } = require('@octokit/rest')

const octokit = new Octokit({
  auth: process.env.GITHUB_OAUTH_TOKEN,
})

const owner = process.env.OWNER

async function getPulls(repo) {
  const { data } = await octokit.pulls.list({
    owner,
    repo,
    state: 'closed',
    base: 'develop',
    per_page: 100,
  })

  return data
}

async function getLatestReleaseTagName(repo) {
  const { data } = await octokit.repos.getLatestRelease({
    owner,
    repo,
  })

  return data.tag_name
}

async function getMilestones(repo) {
  const { data } = await octokit.issues.listMilestones({
    owner,
    repo,
  })

  return data
}

async function createRelease({ repo, tag_name, name, body }) {
  return octokit.repos.createRelease({
    owner,
    repo,
    tag_name,
    name,
    body,
    draft: true,
  })
}

module.exports = octokit
module.exports.getPulls = getPulls
module.exports.getLatestReleaseTagName = getLatestReleaseTagName
module.exports.getMilestones = getMilestones
module.exports.createRelease = createRelease
