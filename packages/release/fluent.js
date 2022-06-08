const { FluentBundle, FluentResource } = require('@fluent/bundle')

const bundle = new FluentBundle()
const resource = new FluentResource(`
common-pending = 요청중...
release-type-choice1 = release-type-choice1
release-type-choice2 = release-type-choice2
release-type-message = release-type-message
repo-message = repo-message
tag-name-message = tag-name-message
date-message = date-message
confirm-message = confirm-message
`)

bundle.addResource(resource)

function getValue(key) {
  return bundle.getMessage(key).value
}

exports.getValue = getValue
