console.log()

process.on('exit', () => {
  console.log()
})

if (!process.argv[2]) {
  console.error('[组件名]必填 - Please enter new component name')
  process.exit(1)
}

const path = require('path')
const fileSave = require('file-save')
const uppercamelcase = require('uppercamelcase')
const componentname = process.argv[2]
// const chineseName = process.argv[3] || componentname
const ComponentName = uppercamelcase(componentname)
const PackagePath = path.resolve(__dirname, '../../packages', componentname)

const Files = [
  {
    filename: 'index.js',
    content: `import ${ComponentName} from './src/main'

${ComponentName}.install = function (Vue) {
  Vue.component(${ComponentName}.name, ${ComponentName})
}

export default ${ComponentName}`
  },
  {
    filename: 'src/main.vue',
    content: `<template>
  <div class="up-${componentname}"></div>
</template>

<script>
import ${ComponentName} from 'element-ui/packages/${componentname}'

export default {
  name: 'Up${ComponentName}',

  components: {
    [${ComponentName}.name]: ${ComponentName}
  }
}
</script>`
  },
  {
    filename: path.join('../../packages/theme-chalk/src', `${componentname}.scss`),
    content: `@import "element-ui/packages/theme-chalk/src/${componentname}.scss";
`
  }
]

// 添加到 components.json
const componentsFile = require('../../components.json')
if (componentsFile[componentname]) {
  console.error(`${componentname} 已存在.`)
  process.exit(1)
}

componentsFile[componentname] = `./packages/${componentname}/index.js`
fileSave(path.join(__dirname, '../../components.json'))
  .write(JSON.stringify(componentsFile, null, '  '), 'utf8')
  .end('\n')

// 创建 package
Files.forEach(file => {
  fileSave(path.join(PackagePath, file.filename))
    .write(file.content, 'utf8')
    .end('\n')
})

console.log('DONE!')
