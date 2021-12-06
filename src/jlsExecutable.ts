/**
 * Helper functions to obtain the Python executable for jedi-language-server
 */

import { Executable, WorkspaceConfiguration, window } from 'coc.nvim'
import { JLS_NAME, JLS_VERSION, JLS_VENV } from './constants'
import { execSync } from 'child_process'
import rimraf from 'rimraf'
import path from 'path'
import fs from 'fs'

interface JlsExecutable extends Executable {
  command: string
  args: string[]
}

// Get the venv-installed jedi-language-server version. execSync may raise an
// error, which tells us the virtual environment is corrupted or that there is
// no executable.
//
// Assuming version 0.14.0: jedi-language-server --version
// 'jedi-language-server, version 0.14.0\n'
function getJlsVersionPosix(jlsPath: string): string | undefined {
  const stdout = execSync(`${jlsPath} --version`)
  return stdout.toString().trim().split(' ').pop()
}

function createJlsVenvPosix(): string {
  const pathVenv = path.join(path.dirname(__dirname), JLS_VENV)
  const pathJls = path.join(pathVenv, 'bin', JLS_NAME)
  const pathPyvenv = path.join(pathVenv, 'pyvenv.cfg')
  let badVenv = false
  let badVersion = true
  try {
    const version = getJlsVersionPosix(pathJls)
    badVersion = version !== JLS_VERSION
  } catch (error) {
    badVenv = true
  }
  if (badVenv || badVersion) {
    rimraf.sync(pathVenv) // rm -rf
    window.showMessage(
      `jedi: installing ${JLS_NAME}==${JLS_VERSION} in "${pathVenv}"`
    )
    const pathPip = path.join(pathVenv, 'bin', 'pip')
    try {
      execSync(
        'python3 -m venv ' +
          `--clear ${pathVenv} && ` +
          `${pathPip} install -U pip ${JLS_NAME}==${JLS_VERSION}`
      )
      // Following lines necessary because we cannot use --system-site-packages
      // flag due to this issue: https://github.com/pypa/pip/issues/1408
      const pyvenvDirty = fs.readFileSync(pathPyvenv).toString()
      const pyvenvClean = pyvenvDirty.replace(
        'include-system-site-packages = false',
        'include-system-site-packages = true'
      )
      fs.writeFileSync(pathPyvenv, pyvenvClean)
      window.showMessage(`jedi: installed ${JLS_NAME}==${JLS_VERSION}`)
    } catch (error) {
      window.showMessage(`jedi: ${error}`, 'error')
      return JLS_NAME
    }
  }
  return pathJls
}

function getJlsExecutableDefault(): JlsExecutable {
  if (process.platform === 'win32') {
    return {
      command: JLS_NAME,
      args: [],
    }
  }
  const path_jls = createJlsVenvPosix()
  return {
    command: path_jls,
    args: [],
  }
}

/*
 * Get the jedi-language-server executable, along with its arguments.
 * This function considers
 * 1. user configuration (a command configured by user trumps everything)
 * 2. binaries currently in the path
 * 3. defaults provided in ./constants.ts
 */
export default function getJlsExecutable(
  config: WorkspaceConfiguration
): JlsExecutable {
  const command = config.get<string>('executable.command')
  if (!command) {
    return getJlsExecutableDefault()
  }
  const args = config.get<string[]>('executable.args', [])
  return { command, args }
}
