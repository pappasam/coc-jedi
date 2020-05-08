/**
 * Helper functions to obtain the Python executable for jedi-language-server
 */

import which from 'which'
import { Executable, WorkspaceConfiguration } from 'coc.nvim'
import { DEFAULT_JLS_NAME, DEFAULT_JLS_VERSION } from './constants'

interface JlsExecutable extends Executable {
  command: string
  args: string[]
}

/*
 * Helper function to obtain a full executable path from a user's system based
 * on a string value that may be in the user's path
 */
async function executablePath(pathName: string): Promise<string | null> {
  try {
    return await which(pathName)
  } catch (error) {
    return null
  }
}

async function getJlsExecutableDefault(): Promise<JlsExecutable> {
  const jls = await executablePath(DEFAULT_JLS_NAME)
  if (jls) {
    return {
      command: jls,
      args: [],
    }
  }
  const pipx = await executablePath('pipx')
  if (pipx) {
    return {
      command: pipx,
      args: [
        'run',
        '--spec',
        `${DEFAULT_JLS_NAME}==${DEFAULT_JLS_VERSION}`,
        DEFAULT_JLS_NAME,
      ],
    }
  }
  return {
    command: DEFAULT_JLS_NAME,
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
export default async function getJlsExecutable(
  config: WorkspaceConfiguration
): Promise<JlsExecutable> {
  const command = config.get<string>('jedi.executable.command')
  if (!command) {
    return await getJlsExecutableDefault()
  }
  const args = config.get<string[]>('jedi.executable.args', [])
  return { command, args }
}
