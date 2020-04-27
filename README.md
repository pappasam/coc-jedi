# coc-jedi

[coc.nvim](https://github.com/neoclide/coc.nvim) wrapper for Python's [jedi-language-server](https://github.com/pappasam/jedi-language-server).

## Install

First, install [jedi-language-server](https://github.com/pappasam/jedi-language-server). I recommend using [pipx](https://github.com/pipxproject/pipx).

Next, install using your preferred technique in Neovim / Vim.

### Vim-Plug

**Works right now**

If you're using [vim-plug](https://github.com/junegunn/vim-plug):

```vim
Plug 'pappasam/coc-jedi', { 'do': 'yarn install --frozen-lockfile && yarn build' }
```

I personally use [vim-packager](https://github.com/kristijanhusak/vim-packager), so if you'd like to go down the [package rabbit hole](https://shapeshed.com/vim-packages/), I suggest giving that a try.

### Coc-Install

**Does not work at this time, I haven't yet deployed to npmjs**

`:CocInstall coc-jedi`

## Configuration

See [here](https://github.com/pappasam/jedi-language-server#configuration)

## License

MIT

## Credits

- Built using [create-coc-extension](https://github.com/fannheyward/create-coc-extension).
- Written by [Samuel Roeca](https://softwarejourneyman.com/pages/about.html#about)
