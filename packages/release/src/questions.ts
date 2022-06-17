import { getValue } from './fluent'
import { REPOS } from './constants'
import { PromptObject } from 'prompts'

export enum QuestionsKeys {
  ReleaseType = 'release_type',
  Repo = 'repo',
  TagName = 'tag_name',
  Date = 'date',
  Confirm = 'confirm',
}

const questions = {
  [QuestionsKeys.ReleaseType]: {
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
  [QuestionsKeys.Repo]: {
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
  [QuestionsKeys.TagName]: {
    type: 'select',
    name: 'tag_name',
    message: getValue('tag-name-message'),
    initial: 1,
  },
  [QuestionsKeys.Date]: {
    type: 'date',
    name: 'date',
    message: getValue('date-message'),
    initial: new Date(),
    mask: 'YYYY-MM-DD',
  },
  [QuestionsKeys.Confirm]: {
    type: 'confirm',
    name: 'confirm',
    message: getValue('confirm-message'),
    initial: true,
  },
} as Record<QuestionsKeys, PromptObject>

export default questions
