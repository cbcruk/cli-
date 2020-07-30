const format = require('date-fns/format')
const { REPOS } = require('./constants')

function getNameAndMilestone({ repo, release_type, date }) {
  const milestone = format(date, 'yyyyMMdd')
  const name = [REPOS.get(repo), release_type, milestone].join('_')

  return {
    name,
    milestone,
  }
}

module.exports = getNameAndMilestone
