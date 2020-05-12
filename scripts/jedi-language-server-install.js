const path = require('path')
const execSync = require('child_process').execSync
const package = require('../package.json')

if (process.platform === 'win32') {
  process.exit(0)
}

const PATH_VENV = path.join(path.dirname(__dirname), package.jlsVenv)
const PATH_PIP = path.join(PATH_VENV, 'bin', 'pip')
const code = execSync(
  `python -m venv ${PATH_VENV} && ` +
    `${PATH_PIP} install -U ${package.jlsName}==${package.jlsVersion}`
)
process.exit(code)
