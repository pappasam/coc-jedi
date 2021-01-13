/**
 * Main entrypoint for the Language Client
 */
import {
  LanguageClientOptions,
  ExtensionContext,
  services,
  workspace,
  LanguageClient,
} from 'coc.nvim'
import getJlsExecutable from './jlsExecutable'
import { JLS_NAME } from './constants'

export async function activate(context: ExtensionContext): Promise<void> {
  const config = workspace.getConfiguration('jedi')
  const isEnable = config.get<boolean>('enable', true)
  if (!isEnable) {
    return
  }
  const serverOptions = getJlsExecutable(config)
  const clientOptions: LanguageClientOptions = {
    documentSelector: ['python'],
    initializationOptions: config,
  }
  const client = new LanguageClient(
    'jedi',
    JLS_NAME,
    serverOptions,
    clientOptions
  )
  context.subscriptions.push(services.registLanguageClient(client))
  client.onReady().then(() => {
    if (!config.get<boolean>('startupMessage', false)) {
      return
    }
    const executable = serverOptions.command
    const args = serverOptions.args
    const cmd =
      args.length === 0 ? executable : `${executable} ${args.join(' ')}`
    workspace.showMessage(`jedi: running "${cmd}"`)
  })
}
