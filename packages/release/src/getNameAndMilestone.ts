import format from 'date-fns/format'
import { REPOS } from './constants'

function getNameAndMilestone({
  repo,
  release_type,
  date,
}: {
  repo: string
  release_type: string
  date: number | Date
}) {
  const milestone = format(date, 'yyyyMMdd')
  const name = [REPOS.get(repo), release_type, milestone].join('_')

  return {
    name,
    milestone,
  }
}

export default getNameAndMilestone
