const { createRelease } = require('./octokit')
const getNameAndMilestone = require('./getNameAndMilestone')
const getBody = require('./getBody')

async function submit({ repo, tag_name, release_type, date }) {
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

module.exports = submit
