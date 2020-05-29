# coc-jedi

[![image-npm-version](https://img.shields.io/npm/v/coc-jedi)](https://www.npmjs.com/package/coc-jedi)
[![image-pypi-version](https://img.shields.io/pypi/v/jedi-language-server.svg)](https://python.org/pypi/jedi-language-server)
[![image-npm-license](https://img.shields.io/npm/l/coc-jedi)](https://www.npmjs.com/package/coc-jedi)
[![image-node-versions](https://img.shields.io/node/v/coc-jedi)](https://www.npmjs.com/package/coc-jedi)
[![image-python-versions](https://img.shields.io/pypi/pyversions/jedi-language-server.svg)](https://python.org/pypi/jedi-language-server)

[coc.nvim](https://github.com/neoclide/coc.nvim) wrapper for Python's [jedi-language-server](https://github.com/pappasam/jedi-language-server).

## Install

Next, install in NeoVim / Vim with one of the following techniques:

### 1. CocInstall

`:CocInstall coc-jedi`

### 2. Vim Package Manager

If using [vim-plug](https://github.com/junegunn/vim-plug):

```vim
Plug 'pappasam/coc-jedi', { 'do': 'yarn install --frozen-lockfile && yarn build' }
```

I personally use [vim-packager](https://github.com/kristijanhusak/vim-packager), so if you'd like to go down the [package rabbit hole](https://shapeshed.com/vim-packages/), I suggest giving that a try.

**Note:** this extension is incompatible with [coc-python](https://github.com/neoclide/coc-python). Uninstall coc-python before using coc-jedi.

## Configuration

jedi-language-server supports top-level configuration items in `coc-settings.json` (or your editor-equivalent configuration file).

**Note:** after jedi-language-server has started, changes to configurations mentioned below require restarting Vim / Neovim before they take effect.

The following is a snippet of `coc-settings.json` with defaults or with acceptable values:

```json
{
  "jedi.enable": true,
  "jedi.startupMessage": true,
  "jedi.markupKindPreferred": "plaintext",
  "jedi.trace.server": true,
  "jedi.jediSettings.autoImportModules": [],
  "jedi.executable.command": "jedi-language-server",
  "jedi.executable.args": [],
  "jedi.completion.disableSnippets": false,
  "jedi.diagnostics.enable": true,
  "jedi.diagnostics.didOpen": true,
  "jedi.diagnostics.didChange": true,
  "jedi.diagnostics.didSave": true
}
```

### jedi.enable

Enable (or disable) jedi-language-server.

- type: `boolean`
- default: `true`

### jedi.startupMessage

Enable/disable jedi-language-server's message on startup.

- type: `boolean`
- default: `true`

### jedi.markupKindPreferred

The preferred MarkupKind for all jedi-language-server messages that take [MarkupContent](https://microsoft.github.io/language-server-protocol/specification#markupContent).

- type: `string`
- accepted values: `"markdown"`, `"plaintext"`

If omitted, jedi-language-server defaults to the client-preferred configuration. If there is no client-preferred configuration, jedi language server users `"plaintext"`.

### jedi.trace.server

Trace level of jedi-language-server. See [here](https://github.com/neoclide/coc.nvim/wiki/Debug-language-server#using-output-channel) for a coc-specific explanation.

- type: `string`
- accepted values: `"off"`, `"messages"`, `"verbose"`
- default: `"verbose"`

To see trace, run:

```vim
:CocCommand workspace.showOutput
```

### jedi.jediSettings.autoImportModules

Modules that will not be analyzed but imported. Improves autocompletion but loses goto definition.

- type: `string[]`
- default: `[]`

If you're noticing that modules like `numpy` and `pandas` are taking a super long time to load and you prioritize completions / signatures over goto definition, I recommend using this option like this:

```json
{
  "jedi.jediSettings.autoImportModules": ["numpy", "pandas"]
}
```

### jedi.executable.command

Specify your jedi-language-server executable. This is the command name / path used to run jedi-language-server on your machine.

- type: `string`

If omitted, jedi-language-server will do the following:

1. Find the first `jedi-language-server` found in your path and use that with no additional args
2. If no `jedi-language-server` found in path, use `pipx` to download and run a specific jedi-language-server version (configured in this repository's `package.json` as `jlsVersion`).

### jedi.executable.args

Specify the args passed to your executable. This a list of arguments passed to the jedi executable command.

- type: `string[]`
- default: `[]`

This option is only relevant if you also specify `jedi.executable.command`. Otherwise it is ignored.

### jedi.completion.disableSnippets

If your language client supports `CompletionItem` snippets but you don't like them, disable them by setting this option to `true`.

- type: `boolean`
- default: `false`

### jedi.diagnostics.enable

Enables (or disables) diagnostics provided by Jedi

- type: `boolean`
- default: `true`

### jedi.diagnostics.didOpen

When diagnostics are enabled, run on document open

- type: `boolean`
- default: `true`

### jedi.diagnostics.didChange

When diagnostics are enabled, run on in-memory document change (eg, while you're editing, without needing to save to disk)

- type: `boolean`
- default: `true`

### jedi.diagnostics.didSave

When diagnostics are enabled, run on document save (to disk)

- type: `boolean`
- default: `true`

## Additional Diagnostics

jedi-langugage-server provides diagnostics about syntax errors, powered by Jedi. If you would like additional diagnostics, we suggest using the powerful [diagnostic-language-server](https://github.com/iamcco/diagnostic-languageserver).

If using Neovim/coc, this can easily be done with [coc-diagnostic](https://github.com/iamcco/coc-diagnostic). Configure with [pylint](https://github.com/PyCQA/pylint) in your `coc-settings.json`:

```json
"diagnostic-languageserver.filetypes": {
  "python": "pylint"
},
"diagnostic-languageserver.linters": {
  "pylint": {
    "sourceName": "pylint",
    "command": "pylint",
    "args": [
      "--output-format",
      "text",
      "--score",
      "no",
      "--msg-template",
      "'{line}:{column}:{category}:{msg} ({msg_id}:{symbol})'",
      "%file"
    ],
    "formatPattern": [
      "^(\\d+?):(\\d+?):([a-z]+?):(.*)$",
      {
        "line": 1,
        "column": 2,
        "security": 3,
        "message": 4
      }
    ],
    "rootPatterns": [".git", "pyproject.toml", "setup.py"],
    "securities": {
      "informational": "hint",
      "refactor": "info",
      "convention": "info",
      "warning": "warning",
      "error": "error",
      "fatal": "error"
    },
    "offsetColumn": 1,
    "formatLines": 1
  }
}
```

## License

MIT

## Credits

- Built using [create-coc-extension](https://github.com/fannheyward/create-coc-extension).
- Written by [Samuel Roeca](https://softwarejourneyman.com/pages/about.html#about)
