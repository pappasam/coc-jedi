/**
 * System-wide constants. Useful to have everything on one place
 *
 * May be read from package.json
 */

import { jlsVersion, jlsName } from '../package.json'

// jls name used if no jls name specified
export const DEFAULT_JLS_NAME = jlsName

// version used with pipx (which can download / install any specified version)
export const DEFAULT_JLS_VERSION = jlsVersion
