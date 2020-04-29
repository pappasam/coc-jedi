# coc-jedi

[![image-version](https://img.shields.io/npm/v/coc-jedi)](https://www.npmjs.com/package/coc-jedi)
[![image-license](https://img.shields.io/npm/l/coc-jedi)](https://www.npmjs.com/package/coc-jedi)

[coc.nvim](https://github.com/neoclide/coc.nvim) wrapper for Python's [jedi-language-server](https://github.com/pappasam/jedi-language-server).

**Note:** this extension is incompatible with [coc-python](https://github.com/neoclide/coc-python). Uninstall coc-python before using coc-jedi.

## Install

First, install [jedi-language-server](https://github.com/pappasam/jedi-language-server) on your system using [pipx](https://github.com/pipxproject/pipx).

```bash
pipx install jedi-language-server

# to upgrade
pipx upgrade jedi-language-server
```

Next, install in Vim / NeoVim with 1 of the following techniques:

### CocInstall

`:CocInstall coc-jedi`

### Package Manager

If using [vim-plug](https://github.com/junegunn/vim-plug):

```vim
Plug 'pappasam/coc-jedi', { 'do': 'yarn install --frozen-lockfile && yarn build' }
```

I personally use [vim-packager](https://github.com/kristijanhusak/vim-packager), so if you'd like to go down the [package rabbit hole](https://shapeshed.com/vim-packages/), I suggest giving that a try.

## Configuration

See [here](https://github.com/pappasam/jedi-language-server#configuration)

## Debugging

If something isn't working for some reason, try upgrading `jedi-language-server` to the latest version.

```bash
pipx upgrade jedi-language-server
```

## License

MIT

## Credits

- Built using [create-coc-extension](https://github.com/fannheyward/create-coc-extension).
- Written by [Samuel Roeca](https://softwarejourneyman.com/pages/about.html#about)
