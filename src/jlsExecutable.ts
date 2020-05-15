/**
 * Helper functions to obtain the Python executable for jedi-language-server
 */

import { Executable, WorkspaceConfiguration, workspace } from 'coc.nvim'
import { JLS_NAME, JLS_VERSION, JLS_VENV } from './constants'
import { execSync } from 'child_process'
import rimraf from 'rimraf'
import path from 'path'

interface JlsExecutable extends Executable {
  command: string
  args: string[]
}

function createJlsVenvUnix(): string {
  const pathVenv = path.join(path.dirname(__dirname), JLS_VENV)
  const pathJls = path.join(pathVenv, 'bin', JLS_NAME)
  let badVenv = false
  try {
    // basic check to see if executable raises any errors. This tells us that
    // either the virtual environment is corrupted or that there is no
    // executable.
    execSync(`${pathJls} --version`)
  } catch (error) {
    badVenv = true
  }
  if (badVenv) {
    rimraf.sync(pathVenv) // rm -rf
    workspace.showMessage(
      `jedi: installing ${JLS_NAME}==${JLS_VERSION} in "${pathVenv}"`
    )
    const pathPip = path.join(pathVenv, 'bin', 'pip')
    try {
      execSync(
        `python3 -m venv ${pathVenv} && ` +
          `${pathPip} install -U ${JLS_NAME}==${JLS_VERSION}`
      )
      workspace.showMessage(`jedi: installed ${JLS_NAME}==${JLS_VERSION}`)
    } catch (error) {
      workspace.showMessage(`jedi: ${error}`, 'error')
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
  const path_jls = createJlsVenvUnix()
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
