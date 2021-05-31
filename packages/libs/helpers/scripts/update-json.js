const fs = require('fs')
const path  = require('path')

const package = path.resolve(__dirname, '..', 'build', 'package.json')

fs.readFile(package, 'utf8', function readFileCallback(err, data) {
  if (err) return

  let d = {
    ...JSON.parse(data),
  }

  d.main = 'src/index.js'

  fs.writeFileSync(package, JSON.stringify(d, null, 2))
})
