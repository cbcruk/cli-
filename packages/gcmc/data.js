const rawData = `emoji	raw_emoji_code	type	description
⭐	:star:	feature	add new feature
🐛	:bug:	bug	fix bug issue
🚑	:ambulance:	bug	critical hotfix bug issue
🔒	:lock:	security	fix security issue
📈	:chart_with_upwards_trend:	performance	fix performance issue
⚡	:zap:	improvement	update backwards-compatible feature
💥	:boom	breaking	update backwards-incompatible feature
⚠️	:warning:	deprecated	deprecate feature
🌐	:globe_with_meridians:	i18n	update or fix internationalization
♿	:wheelchair:	a11y	update or fix accessibility
🚨	:rotating_light:	refactor	remove linter/strict/deprecation warnings
👕	:shirt:	refactor	refactoring or code layouting
✅	:white_check_mark:	test	add tests, fix tests failur or CI building
📝	:pencil:	docs	update documentation
©️	:copyright:	docs	decide or change license
🍭	:lollipop:	example	for example or demo codes
💄	:lipstick:	update	update UI/Cosmetic
🆙	:up:	update	update other
🚚	:truck:	update	move or rename files, repository, ...
🔀	:twisted_rightwards_arrows:	update	merge conflict resolution
➕	:heavy_plus_sign:	update	add files, dependencies, ...
➖	:heavy_minus_sign:	update	remove files, dependencies, ...
🔛	:on:	update	enable feature and something ...
⬆️	:arrow_up:	deps	upgrade dependencies
⬇️	:arrow_down:	deps	downgrade dependencies
📌	:pushpin:	deps	pin dependencies
🔧	:wrench:	config	update configuration
📦	:package:	build	packaging or bundling or building
🐳	:whale:	build	Dockerfile
🐣	:hatching_chick:	release	initial commit
🎊	:confetti_ball:	release	release major version
🎉	:tada:	release	release minor version
✨	:sparkles:	release	release patch version
🚀	:rocket:	release	deploy to production enviroment
🔖	:bookmark:	release	tagged with version label
🔙	:back:	revert	revert commiting
🚧	:construction:	wip	WIP commiting`

const data = rawData
  .split('\n')
  .map((row) => row.split('\t'))
  .slice(1)
  .map((row) => {
    return {
      emoji: row[0],
      raw_emoji_code: row[1],
      type: row[2],
      description: row[3],
    }
  })

module.exports = data
