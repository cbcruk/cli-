import { createRelease } from './octokit'
import getNameAndMilestone from './getNameAndMilestone'
import getBody from './getBody'

async function submit({
  repo,
  tag_name,
  release_type,
  date,
}: {
  repo: string
  tag_name: string
  release_type: string
  date: Date
}) {
  const { name, milestone } = getNameAndMilestone({ repo, release_type, date })
  const body = await getBody({ repo, milestone })

  try {
    await createRelease({
      repo,
      tag_name,
      name,
      body,
    })

    return true
  } catch (error) {
    console.error(error)
  }
}

export default submit
