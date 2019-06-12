var fs = require('fs')
var path = require('path')
var version = process.env.VERSION || require('../../package.json').version
var content = { }
if (!content[version]) content[version] = '0.6.0'
fs.writeFileSync(path.resolve(__dirname, '../../examples/versions.json'), JSON.stringify(content))