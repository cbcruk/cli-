const { getValue } = require('./fluent')
const { REPOS } = require('./constants')

const questions = {
  release_type: {
    type: 'select',
    name: 'release_type',
    choices: [
      getValue('release-type-choice1'),
      getValue('release-type-choice2'),
    ].map((choice) => {
      return {
        title: choice,
        value: choice,
      }
    }),
    initial: 0,
    message: getValue('release-type-message'),
  },
  repo: {
    type: 'select',
    name: 'repo',
    message: getValue('repo-message'),
    instructions: false,
    choices: Array.from(REPOS).map(([value, title]) => {
      return {
        title,
        value,
      }
    }),
  },
  tag_name: {
    type: 'select',
    name: 'tag_name',
    message: getValue('tag-name-message'),
    initial: 1,
  },
  date: {
    type: 'date',
    name: 'date',
    message: getValue('date-message'),
    initial: new Date(),
    mask: 'YYYY-MM-DD',
  },
  confirm: {
    type: 'confirm',
    name: 'confirm',
    message: getValue('confirm-message'),
    initial: true,
  },
}

module.exports = questions
