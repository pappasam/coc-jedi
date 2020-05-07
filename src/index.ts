import {
  ServerOptions,
  LanguageClientOptions,
  ExtensionContext,
  services,
  workspace,
  LanguageClient,
} from 'coc.nvim'

export async function activate(context: ExtensionContext): Promise<void> {
  const config = workspace.getConfiguration('jedi')
  const isEnable = config.get<boolean>('enable', true)
  if (!isEnable) {
    return
  }
  const serverOptions: ServerOptions = {
    command: 'jedi-language-server',
  }
  const clientOptions: LanguageClientOptions = {
    documentSelector: ['python'],
    initializationOptions: config,
  }
  const client = new LanguageClient(
    'jedi',
    'jedi-language-server',
    serverOptions,
    clientOptions
  )
  context.subscriptions.push(
    services.registLanguageClient(client),
    workspace.onDidChangeConfiguration(async (edit) => {
      if (edit.affectsConfiguration('jedi')) {
        await client.stop()
        client.restart()
      }
    })
  )
  client.onReady().then(() => {
    workspace.showMessage('jedi-language-server: started')
  })
}
