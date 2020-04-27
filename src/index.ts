import {
  ServerOptions,
  LanguageClientOptions,
  ExtensionContext,
  services,
  workspace,
  LanguageClient,
} from 'coc.nvim'
import which from 'which'

export async function commandExists(command: string): Promise<boolean> {
  return new Promise((resolve): void => {
    which(command, (err) => resolve(err == null))
  })
}

export async function activate(context: ExtensionContext): Promise<void> {
  const command = 'jedi-language-server'

  if (!(await commandExists(command))) {
    workspace.showMessage('please install jedi-language-server; exiting')
    return
  }

  const serverOptions: ServerOptions = {
    command,
    args: [],
  }

  const clientOptions: LanguageClientOptions = {
    documentSelector: ['python'],
  }

  const client = new LanguageClient(
    'jedi',
    'jedi-language-server',
    serverOptions,
    clientOptions
  )

  context.subscriptions.push(services.registLanguageClient(client))
}
