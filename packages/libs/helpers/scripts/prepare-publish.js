const path = require('path')
const fs = require('fs')

const pathResolved = path.resolve( __dirname, '..', 'lib')

fs.unlinkSync(path.join(pathResolved, 'index.js'))
fs.unlinkSync(path.join(pathResolved, 'index.es.js'))
