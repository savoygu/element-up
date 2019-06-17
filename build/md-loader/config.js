const Config = require('markdown-it-chain')
const anchorPlugin = require('markdown-it-anchor')
const emojiPlugin = require('markdown-it-emoji')
const slugify = require('transliteration').slugify
const containers = require('./containers')
const overWriteFenceRule = require('./fence')
const overWriteTwemojiRule = require('./twemoji')

const config = new Config()

config
  .options.html(true).end()

  .plugin('anchor').use(anchorPlugin, [
    {
      level: 2,
      slugify: slugify,
      permalink: true,
      permalinkBefore: true
    }
  ]).end()

  .plugin('containers').use(containers).end()

  .plugin('emoji').use(emojiPlugin, []).end()

const md = config.toMd()
overWriteFenceRule(md)
overWriteTwemojiRule(md)

module.exports = md
