const semver = require('semver')
const ora = require('ora')
const { SEMVER_RELEASE_TYPE } = require('./constants')
const { getLatestReleaseTagName } = require('./octokit')
const { getValue } = require('./fluent')

async function getTagNames(repo) {
  const spinner = ora(`${getValue('common-pending')}\n`).start()

  try {
    const tagName = await getLatestReleaseTagName(repo)
    const nextTagNames = SEMVER_RELEASE_TYPE.map((type) => {
      const version = semver.inc(tagName, type)

      return {
        title: `${type} ${version}`,
        value: version,
      }
    })

    return nextTagNames
  } catch (error) {
    console.error(error)
  } finally {
    spinner.stop()
  }
}

module.exports = getTagNames
