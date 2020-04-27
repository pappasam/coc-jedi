(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const coc_nvim_1 = __webpack_require__(1);
const lists_1 = __importDefault(__webpack_require__(2));
async function activate(context) {
    coc_nvim_1.workspace.showMessage(`coc-jedi works!`);
    context.subscriptions.push(coc_nvim_1.commands.registerCommand('coc-jedi.Command', async () => {
        coc_nvim_1.workspace.showMessage(`coc-jedi Commands works!`);
    }), coc_nvim_1.listManager.registerList(new lists_1.default(coc_nvim_1.workspace.nvim)), coc_nvim_1.sources.createSource({
        name: 'coc-jedi completion source',
        shortcut: '[CS]',
        priority: 1,
        triggerPatterns: [],
        doComplete: async () => {
            const items = await getCompletionItems();
            return items;
        }
    }), coc_nvim_1.workspace.registerKeymap(['n'], 'coc-jedi-keymap', async () => {
        coc_nvim_1.workspace.showMessage(`registerKeymap`);
    }, { sync: false }), coc_nvim_1.workspace.registerAutocmd({
        event: 'InsertLeave',
        request: true,
        callback: () => {
            coc_nvim_1.workspace.showMessage(`registerAutocmd on InsertLeave`);
        }
    }));
}
exports.activate = activate;
async function getCompletionItems() {
    return {
        items: [
            {
                word: 'TestCompletionItem 1'
            },
            {
                word: 'TestCompletionItem 2'
            }
        ]
    };
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("coc.nvim");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const coc_nvim_1 = __webpack_require__(1);
class DemoList extends coc_nvim_1.BasicList {
    constructor(nvim) {
        super(nvim);
        this.name = 'demo_list';
        this.description = 'CocList for coc-jedi';
        this.defaultAction = 'open';
        this.actions = [];
        this.addAction('open', (item) => {
            coc_nvim_1.workspace.showMessage(`${item.label}, ${item.data.name}`);
        });
    }
    async loadItems(context) {
        return [
            {
                label: 'coc-jedi list item 1',
                data: { name: 'list item 1' }
            },
            {
                label: 'coc-jedi list item 2',
                data: { name: 'list item 2' }
            }
        ];
    }
}
exports.default = DemoList;


/***/ })
/******/ ])));