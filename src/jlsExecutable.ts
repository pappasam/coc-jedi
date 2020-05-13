/**
 * Helper functions to obtain the Python executable for jedi-language-server
 */

import { Executable, WorkspaceConfiguration, workspace } from 'coc.nvim'
import { JLS_NAME, JLS_VERSION, JLS_VENV } from './constants'
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

interface JlsExecutable extends Executable {
  command: string
  args: string[]
}

function createJlsVenvUnix(): string {
  const path_venv = path.join(path.dirname(__dirname), JLS_VENV)
  const path_jls = path.join(path_venv, 'bin', JLS_NAME)
  let badVenv = false
  try {
    // basic check to see if executable raises any errors. This tells us that
    // either the virtual environment is corrupted or that there is no
    // executable.
    execSync(`${path_jls} --version`)
  } catch (error) {
    badVenv = true
  }
  if (badVenv) {
    fs.rmdirSync(path_venv, { recursive: true })
    workspace.showMessage(
      `jedi: installing ${JLS_NAME}==${JLS_VERSION} in "${path_venv}"`
    )
    const path_pip = path.join(path_venv, 'bin', 'pip')
    try {
      execSync(
        `python3 -m venv ${path_venv} && ` +
          `${path_pip} install -U ${JLS_NAME}==${JLS_VERSION}`
      )
      workspace.showMessage(`jedi: installed ${JLS_NAME}==${JLS_VERSION}`)
    } catch (error) {
      workspace.showMessage(`jedi: ${error}`, 'error')
      return JLS_NAME
    }
  }
  return path_jls
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
