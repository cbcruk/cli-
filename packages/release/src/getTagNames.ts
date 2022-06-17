import semver from 'semver'
import ora from 'ora'
import { SEMVER_RELEASE_TYPE } from './constants'
import { getLatestReleaseTagName } from './octokit'
import { getValue } from './fluent'

async function getTagNames(repo: string) {
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

export default getTagNames
