/**
 * Helper functions to obtain the Python executable for jedi-language-server
 */

import { Executable, WorkspaceConfiguration } from 'coc.nvim'
import { JLS_NAME, JLS_VENV } from './constants'
import path from 'path'

interface JlsExecutable extends Executable {
  command: string
  args: string[]
}

function getJlsExecutableDefault(): JlsExecutable {
  if (process.platform === 'win32') {
    return {
      command: JLS_NAME,
      args: [],
    }
  }
  const path_venv = path.join(path.dirname(__dirname), JLS_VENV)
  const path_jls = path.join(path_venv, 'bin', JLS_NAME)
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
  const command = config.get<string>('jedi.executable.command')
  if (!command) {
    return getJlsExecutableDefault()
  }
  const args = config.get<string[]>('jedi.executable.args', [])
  return { command, args }
}
