# coc-jedi

[![image-version](https://img.shields.io/npm/v/coc-jedi)](https://www.npmjs.com/package/coc-jedi)
[![image-license](https://img.shields.io/npm/l/coc-jedi)](https://www.npmjs.com/package/coc-jedi)

[coc.nvim](https://github.com/neoclide/coc.nvim) wrapper for Python's [jedi-language-server](https://github.com/pappasam/jedi-language-server).

## System requirements

- [nodejs](https://nodejs.org/en/) 8.10.0+
- [python](https://www.python.org/) 3.6+
- [yarn](https://github.com/yarnpkg/yarn) (recommended)

**Note:** this extension is incompatible with [coc-python](https://github.com/neoclide/coc-python). Uninstall coc-python before using coc-jedi.

## Install

### (recommended) automatic Python package installation

If you are using Mac/Linux, `jedi-language-server` will be automatially installed and managed in an isoated virtualenv for you. There's no need to do anything regarding Python package installation.

This may not work if `python3` is not mapped to at least `python 3.6`.

### (not recommended) manual Python package installation

If using Windows, or if you'd like more control over which `jedi-language-server` binary is used, install [jedi-language-server](https://github.com/pappasam/jedi-language-server) on your system using either pip or [pipx](https://github.com/pipxproject/pipx). If using pipx, make sure it is configured properly with your shell.

```bash
pipx install jedi-language-server

# to upgrade
pipx upgrade jedi-language-server
```

If it's not available in your path as `jedi-language-server`, specify a path to your executable using `jedi.executable.command` and `jedi.executable.args`.

Next, install in Vim / NeoVim with 1 of the following techniques:

### CocInstall

`:CocInstall coc-jedi`

### Vim Package Manager

If using [vim-plug](https://github.com/junegunn/vim-plug):

```vim
Plug 'pappasam/coc-jedi', { 'do': 'yarn install --frozen-lockfile && yarn build' }
```

I personally use [vim-packager](https://github.com/kristijanhusak/vim-packager), so if you'd like to go down the [package rabbit hole](https://shapeshed.com/vim-packages/), I suggest giving that a try.

## Configuration

jedi-language-server supports top-level configuration items in `coc-settings.json` (or your editor-equivalent configuration file). The following is a snippet of `coc-settings.json` with defaults:

```json
{
  "jedi.enable": true,
  "jedi.startupMessage": true,
  "jedi.trace.server": true,
  "jedi.executable.command": null,
  "jedi.executable.args": [],
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

### jedi.trace.server

Trace level of jedi-language-server. See [here](https://github.com/neoclide/coc.nvim/wiki/Debug-language-server#using-output-channel) for a coc-specific explanation.

- type: `enum["off", "messages", "verbose"]`
- default: `"verbose"`

To see trace, run:

```vim
:CocCommand workspace.showOutput
```

### jedi.executable.command

Specify your jedi-language-server executable. This is the command name / path used to run jedi-language-server on your machine.

- type: `string | null`
- default: `null`

If you do not specify this, jedi-language-server will do the following:

1. Find the first `jedi-language-server` found in your path and use that with no additional args
2. If no `jedi-language-server` found in path, use `pipx` to download and run a specific jedi-language-server version (configured in this repository's `package.json` as `jlsVersion`).

### jedi.executable.args

Specify the args passed to your executable. This a list of arguments passed to the jedi executable command.

- type: `string[]`
- default: `[]`

This option is only relevant if you also specify `jedi.executable.command`. Otherwise it is ignored.

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
