# coc-jedi

[coc.nvim](https://github.com/neoclide/coc.nvim) wrapper for Python's [jedi-language-server](https://github.com/pappasam/jedi-language-server).

**Note:** this extension is incompatible with [coc-python](https://github.com/neoclide/coc-python). Uninstall coc-python before using coc-jedi.

## Install

First, install [jedi-language-server](https://github.com/pappasam/jedi-language-server) on your system. I recommend using [pipx](https://github.com/pipxproject/pipx).

Next, install using 1 of the following techniques in Neovim / Vim:

### CocInstall

`:CocInstall coc-jedi`

### Package/Plugin Manager

If using [vim-plug](https://github.com/junegunn/vim-plug):

```vim
Plug 'pappasam/coc-jedi', { 'do': 'yarn install --frozen-lockfile && yarn build' }
```

I personally use [vim-packager](https://github.com/kristijanhusak/vim-packager), so if you'd like to go down the [package rabbit hole](https://shapeshed.com/vim-packages/), I suggest giving that a try.

## Configuration

See [here](https://github.com/pappasam/jedi-language-server#configuration)

## License

MIT

## Credits

- Built using [create-coc-extension](https://github.com/fannheyward/create-coc-extension).
- Written by [Samuel Roeca](https://softwarejourneyman.com/pages/about.html#about)
