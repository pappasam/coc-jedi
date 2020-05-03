# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
