var twemoji = require('twemoji')

module.exports = md => {
  md.renderer.rules.emoji = function (token, idx) {
    return twemoji.parse(token[idx].content)
  }
}
