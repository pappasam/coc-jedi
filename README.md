# coc-jedi

[![image-npm-version](https://img.shields.io/npm/v/coc-jedi)](https://www.npmjs.com/package/coc-jedi)
[![image-npm-downloads](https://img.shields.io/npm/dt/coc-jedi)](https://www.npmjs.com/package/coc-jedi)
[![image-pypi-version](https://img.shields.io/pypi/v/jedi-language-server.svg)](https://python.org/pypi/jedi-language-server)
[![image-npm-license](https://img.shields.io/npm/l/coc-jedi)](https://www.npmjs.com/package/coc-jedi)
[![image-node-versions](https://img.shields.io/node/v/coc-jedi)](https://www.npmjs.com/package/coc-jedi)
[![image-python-versions](https://img.shields.io/badge/python->=3.6.1-blue)](https://python.org/pypi/jedi-language-server)

[coc.nvim](https://github.com/neoclide/coc.nvim) wrapper for Python's [jedi-language-server](https://github.com/pappasam/jedi-language-server).

If you would like to know more about why coc-jedi is useful, please read this [blog post](https://samroeca.com/coc-plugin.html#coc-plugin).

Requires Python version>=3.6.1.

## Installation

Install in NeoVim / Vim with one of the following techniques:

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

jedi-language-server supports top-level configuration items in `coc-settings.json` (or your editor-specific configuration file). After jedi-language-server has started, changes to configurations mentioned below require restarting Vim / Neovim before they take effect.

The following is a snippet of `coc-settings.json` with defaults or with acceptable values:

**Note: you probably do NOT need most of these configuration options. Use what you actually need, but the defaults should be enough for most users on POSIX-compliant systems. Blind copy/pasting may yield surprising results.**

```json
{
  "jedi.enable": true,
  "jedi.startupMessage": false,
  "jedi.markupKindPreferred": "plaintext",
  "jedi.trace.server": "off",
  "jedi.jediSettings.autoImportModules": [],
  "jedi.executable.command": "jedi-language-server",
  "jedi.executable.args": [],
  "jedi.codeAction.nameExtractFunction": "jls_extract_def",
  "jedi.codeAction.nameExtractVariable": "jls_extract_var",
  "jedi.completion.disableSnippets": false,
  "jedi.completion.resolveEagerly": false,
  "jedi.diagnostics.enable": true,
  "jedi.diagnostics.didOpen": true,
  "jedi.diagnostics.didChange": true,
  "jedi.diagnostics.didSave": true,
  "jedi.workspace.extraPaths": [],
  "jedi.workspace.symbols.maxSymbols": 20,
  "jedi.workspace.symbols.ignoreFolders": [
    ".nox",
    ".tox",
    ".venv",
    "__pycache__",
    "venv"
  ]
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
- default: `"off"`

To see trace, run:

```vim
:CocCommand workspace.showOutput
```

### jedi.jediSettings.autoImportModules

Modules that jedi will directly import without analyzing. Improves autocompletion but loses goto definition.

- type: `string[]`
- default: `[]`

If you're noticing that modules like `numpy` and `pandas` are taking a super long time to load and you value completions / signatures over goto definition, I recommend using this option like this:

```json
{
  "jedi.jediSettings.autoImportModules": ["numpy", "pandas"]
}
```

### jedi.jediSettings.caseInsensitiveCompletion

Completions are by default case insensitive. Set to `false` to make completions case sensitive.

- type: `boolean`
- default: `false`

```json
{
  "jedi.jediSettings.caseInsensitiveCompletion": false
}
```

### jedi.executable.command

Specify your jedi-language-server executable. This is the command name / path used to run jedi-language-server on your machine.

- type: `string`

If this argument is not provided, `coc-jedi` will do the following:

- For most platforms, `coc-jedi` will use a `coc-jedi`-managed `jedi-language-server` executable. If no such executable is found, `coc-jedi` will try to automatically install the executable for you in a virtual environment within the `coc-jedi` path.
- For Windows, `coc-jedi` will try execute the command `jedi-language-server`. TODO: support Windows in the same way we support other platforms.

### jedi.executable.args

Specify the args passed to your executable. This a list of arguments passed to the jedi executable command.

- type: `string[]`
- default: `[]`

This option is only relevant if you also specify `jedi.executable.command`. Otherwise it is ignored.

### jedi.codeAction.nameExtractFunction

Function name generated by the 'extract_function' codeAction.

- type: `string`
- default: `"jls_extract_def"`

### jedi.codeAction.nameExtractVariable

Variable name generated by the 'extract_variable' codeAction.

- type: `string`
- default: `"jls_extract_var"`

### jedi.completion.disableSnippets

If your language client supports `CompletionItem` snippets but you don't like them, disable them by setting this option to `true`.

- type: `boolean`
- default: `false`

### jedi.completion.resolveEagerly

Return all completion results in initial completion request. Set to `true` if your language client does not support `completionItem/resolve`.

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

### jedi.workspace.extraPaths

Add additional paths for Jedi's analysis. Useful with vendor directories, packages in a non-standard location, etc. You probably won't need to use this, but you'll be happy it's here when you need it!

- type: `string[]`
- default: `[]`

Non-absolute paths are relative to your project root. For example, let's say your Python project is structured like this:

```
├── funky
│   └── haha.py
├── poetry.lock
├── pyproject.toml
├── test.py
```

Assume that `funky/haha.py` contains 1 line, `x = 12`, and your build system does some wizardry that makes `haha` importable just like `os` or `pathlib`. In this example, if you want to have this same non-standard behavior with `jedi-language-server`, put the following in your `coc-settings.json`:

```json
{
  "jedi.workspace.extraPaths": ["funky"]
}
```

When editing `test.py`, you'll get completions, goto definition, and all other lsp features for the line `from haha import ...`.

Again, you probably don't need this.

### jedi.workspace.symbols.maxSymbols

Performance optimization that sets names of folders that are ignored for `workspace/symbols`.

- type: `number`
- default: 20

```json
{
  "jedi.workspace.symbols.maxSymbols": 20
}
```

A value less than or equal to zero removes the maximum and allows jedi-language-server to return all workplace symbols found by jedi.

### jedi.workspace.symbols.ignoreFolders

Maximum number of symbols returned by a call to `workspace/symbols`.

- type: `string[]`
- default: `[".nox", ".tox", ".venv", "__pycache__", "venv"]`

```json
{
  "jedi.workspace.symbols.ignoreFolders": ["hello", "world"]
}
```

If you manually set this option, it overrides the default. Setting it to an empty array will result in no ignored folders.

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

## Code Formatting

You can also use diagnostic [diagnostic-language-server](https://github.com/iamcco/diagnostic-languageserver) for code formatting:

```json
"diagnostic-languageserver.formatFiletypes": {
  "python": ["black", "isort", "docformatter"]
},
"diagnostic-languageserver.formatters": {
  "black": {
    "command": "black",
    "args": ["-q", "-"]
  },
  "isort": {
    "command": "isort",
    "args": ["-q", "-"]
  },
  "docformatter": {
    "command": "docformatter",
    "args": ["-"]
  }
}
```

## FAQ / Debugging

### No completion / goto definition while using Conda, homebrew, asdf, etc

If you haven't installed a dependency in a virtualenv and/or don't have a virtualenv active, Jedi may have trouble locating your dependencies. If you encounter issues with completion / anything else, install [jedi-language-server](https://github.com/pappasam/jedi-language-server) in your Python environment (system Python, conda, homebrew, etc) and update your `coc-settings.json` with the path to your `jedi-language-server` executable. Example:

```json
{
  "jedi.executable.command": "/PATH/TO/JEDI/LANGUAGE/SERVER"
}
```

_Note: replace `/PATH/TO/JEDI/LANGUAGE/SERVER` with your path. If `jedi-language-server` is in your home folder and your username is `potato` its path would probably be `/home/potato/jedi-language-server`._

If this does not resolve your issue, please create a GitHub issue describing your Python environment and problem.

### Relative imports don't complete correctly

Relative imports should normally work correctly, but if they do not, your [LSP workspace root path](https://microsoft.github.io/language-server-protocol/specification#initialize) is most likely incorrect. For example, when you use a file explorer like [ranger](https://github.com/ranger/ranger), your root path will likely be the same directory as the file you're opening. When you open a file directly with Vim, your root path is your current working directory. See this GIF:

![relative-imports](./img/relative-imports.gif)

When Vim's current working directory is deep within a project's tree, things like relative imports won't work correctly. They ONLY work when Vim's current working directory (and, therefore, your LSP workspace) can be outside of the package where relative imports take place.

In short: if you want relative imports to work correctly, you should generally open Vim in the root of your project. Some file explorers seem to prevent this from happening.

## License

MIT

## Credits

- Built using [create-coc-extension](https://github.com/fannheyward/create-coc-extension).
- Written by [Samuel Roeca](https://softwarejourneyman.com/pages/about.html#about)
