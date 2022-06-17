import { Octokit } from '@octokit/rest'

type RequestParameters = {
  repo: string
}

const octokit = new Octokit({
  auth: process.env.GITHUB_OAUTH_TOKEN,
})

const owner = process.env.OWNER ?? ''

export async function getPulls(repo: RequestParameters['repo']) {
  const { data } = await octokit.pulls.list({
    owner,
    repo,
    state: 'closed',
    base: 'develop',
    per_page: 100,
  })

  return data
}

export async function getLatestReleaseTagName(repo: RequestParameters['repo']) {
  const { data } = await octokit.repos.getLatestRelease({
    owner,
    repo,
  })

  return data.tag_name
}

export async function getMilestones(repo: RequestParameters['repo']) {
  const { data } = await octokit.issues.listMilestones({
    owner,
    repo,
  })

  return data
}

export async function createRelease({
  repo,
  tag_name,
  name,
  body,
}: {
  repo: RequestParameters['repo']
  tag_name: string
  name: string | undefined
  body: string | undefined
}) {
  return octokit.repos.createRelease({
    owner,
    repo,
    tag_name,
    name,
    body,
    draft: true,
  })
}

export default octokit
