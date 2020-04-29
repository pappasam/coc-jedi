import {
  ServerOptions,
  LanguageClientOptions,
  ExtensionContext,
  services,
  workspace,
  LanguageClient,
} from 'coc.nvim'

export async function activate(context: ExtensionContext): Promise<void> {
  const serverOptions: ServerOptions = {
    command: 'jedi-language-server',
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
  context.subscriptions.push(
    services.registLanguageClient(client),
    workspace.onDidChangeConfiguration(async (e) => {
      // restart server if 'jedi.*' configuration changes
      if (e.affectsConfiguration('jedi')) {
        await client.stop()
        client.restart()
      }
    })
  )
}
