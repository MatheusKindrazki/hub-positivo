const fs = require('fs')
const path = require('path')

const { version } = require('../package.json')

const commonPath = path.resolve(
  __dirname,
  '..',
  'packages',
  'common',
  'package.json'
)

const webPath = path.resolve(
  __dirname,
  '..',
  'packages',
  'apps',
  'hub-web',
  'package.json'
)

console.log('Atualizando versão do @psdhub:common')
fs.readFile(commonPath, 'utf8', function readFileCallback(err, data) {
  if (err) return

  let d = {
    ...JSON.parse(data),
    version
  }

  d.version = version

  fs.writeFileSync(commonPath, JSON.stringify(d, null, 2))
})

console.log('Atualizando versão do @psdhub:web')
fs.readFile(webPath, 'utf8', function readFileCallback(err, data) {
  if (err) return

  let d = {
    ...JSON.parse(data),
    version
  }

  d.version = version

  fs.writeFileSync(webPath, JSON.stringify(d, null, 2))
})
