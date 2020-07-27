# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 0.14.1

### Changed

- Jls `0.19.1`

## 0.14.0

### Changed

- Jls `0.19.0`

## 0.13.2

### Changed

- Jls `0.18.1`

## 0.13.1

### Fixed

- Array types in `package.json` are now accurately listed. Before, they caused linting errors.

## 0.13.0

### Changed

- Jls `0.18.0`

## 0.12.2

### Changed

- Jls `0.17.1`

## 0.12.1

### Changed

- Removed restarting on configuration change. Based on its behavior, it was more of a bug than a feature.

### Fixed

- `coc-settings.json` configuration types no longer cause linting errors

## 0.12.0

### Added

- Configuration option to automatically import big modules (like Numpy): `jedi.jediSettings.autoImportModules`

### Changed

- Jls `0.17.0`

## 0.11.0

### Added

- Configuration option to disable jedi snippets: `jedi.completion.disableSnippets`

### Changed

- Jls `0.16.0`

## 0.10.1

### Changed

- Updated package metadata / readme

## 0.10.0

### Changed

- Jls `0.15.0`
- Add `jedi.markupKindPreferred` configuration

## 0.9.1

### Changed

- Obtain the current jls version when obtaining the default jls environment. If the current version is not equal to the expected version, re-install. This should make updates seamless for people who are "git pulling" the latest changes and may not be deleting an existing venv.

## 0.9.0

### Changed

- Jls `0.14.0`

## 0.8.1

### Changed

- Replace `fs.rmdirSync` with `rimraf`; already available in coc engine / relied upon and supports older nodes.

## 0.8.0

### Added

- Link to GitHub repository link in `package.json`

### Changed

- Due to Coc limitations involving postinstall hooks (https://github.com/neoclide/coc.nvim/issues/1909), automatic installation of jedi-language-server now takes place on coc-startup without npm scripts

## 0.7.4

### Changed

- `python3` instead of `python` in install script to be more widely compatible

## 0.7.3

### Changed

- Jls `0.13.2`

## 0.7.2

### Changed

- Fixed option parsing for executable command and args

## 0.7.1

### Changed

- TIL: `npmignore` and `gitignore` are mutually exclusive for npm uploads.

## 0.7.0

### Added

- Now automatically installs `jedi-language-server` in managed virtual environment for non-Windows environments.

### Removed

- Reference to pipx for manual installation. That was a bandaid anyway.

## 0.6.0

### Added

- Manage specific jedi-language-server by relying on pipx. Otherwise, consider user configuration and path configuration to determine location of Python executable
- Improve startupMessage to help people debug their setup if they experience issues
- jedi-language-server version is now in package.json
- jedi-language-server name is not in package.json
- Configuration options:
  - `jedi.executable.command`: jedi-language-server executable. Coc-managed defaults if not specified
  - `jedi.executable.args`: args passed to jedi-language-server executable. Ignored if command is null
  - `jedi.startupMessage`: enables (or disables the startup message)

## 0.5.0

### Added

- Documentation for all config options here

### Changed

- Pass jedi-rooted configuration to initializationOptions
- `enabled` changed to `enable`. I see the option spelled this way in way more coc plugins and I'd like to be consistent with the ecosystem.

## 0.4.0

### Added

- `jedi.enabled` to disable extension without needing to uninstall
- `jedi.trace.server` for debugging

## 0.3.1

### Added

- basic "server started" message on server ready

## 0.3.0

### Removed

- Remove deprecated configuration options from `package.json`

## 0.2.1

### Removed

- Unnecessary executable checking. This ended up checking existence even when non-Python files were opened, which would be annoying for people working across multiple languages. This ended up removing a dependency (which) and relying on the better error message provided by coc out of the box.

## 0.2.0

### Added

- Support signatureHelp

### Changed

- Error message when missing jedi-language-server executable now prints as error

## 0.1.0

### Added

- This CHANGELOG
- Configuration helpers for diagnostic configuration
