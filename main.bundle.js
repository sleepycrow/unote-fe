/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/main.js","vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ajax.js":
/*!*********************!*\
  !*** ./src/ajax.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.get = get;\nexports.post = post;\nexports.del = del;\nfunction get(url) {\n    var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n    var parseResponse = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;\n\n    return new Promise(function (resolve, reject) {\n        var req = new XMLHttpRequest();\n        req.open(\"GET\", url, true);\n        req.withCredentials = true;\n\n        for (var header in headers) {\n            req.setRequestHeader(header, headers[header]);\n        }\n\n        req.onload = function () {\n            if (req.status == 200) {\n                if (parseResponse === true) {\n                    var parsedResponse = JSON.parse(req.response);\n                    resolve(parsedResponse);\n                } else {\n                    resolve(req.response);\n                }\n            } else {\n                reject({\n                    result: \"httpError\",\n                    error: req.status\n                });\n            }\n        };\n\n        req.onerror = function () {\n            reject({ result: \"networkError\" });\n        };\n\n        req.send();\n    });\n}\n\nfunction post(url, data) {\n    var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};\n    var parseResponse = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;\n\n    return new Promise(function (resolve, reject) {\n        var form = new FormData();\n        for (var item in data) {\n            form.append(item, data[item]);\n        }\n\n        var req = new XMLHttpRequest();\n        req.open(\"POST\", url, true);\n        req.withCredentials = true;\n\n        for (var header in headers) {\n            req.setRequestHeader(header, headers[header]);\n        }\n\n        req.onload = function () {\n            if (req.status == 200) {\n                if (parseResponse === true) resolve(JSON.parse(req.response));else resolve(req.response);\n            } else {\n                reject({\n                    result: \"httpError\",\n                    error: req.status\n                });\n            }\n        };\n\n        req.onerror = function () {\n            reject({ result: \"networkError\" });\n        };\n\n        req.send(form);\n    });\n}\n\nfunction del(url) {\n    var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n    var parseResponse = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;\n\n    return new Promise(function (resolve, reject) {\n        var req = new XMLHttpRequest();\n        req.open(\"DELETE\", url, true);\n        req.withCredentials = true;\n\n        for (var header in headers) {\n            req.setRequestHeader(header, headers[header]);\n        }\n\n        req.onload = function () {\n            if (req.status == 200) {\n                if (parseResponse === true) resolve(JSON.parse(req.response));else resolve(req.response);\n            } else {\n                reject({\n                    result: \"httpError\",\n                    error: req.status\n                });\n            }\n        };\n\n        req.onerror = function () {\n            reject({ result: \"networkError\" });\n        };\n\n        req.send();\n    });\n}\n\n//# sourceURL=webpack:///./src/ajax.js?");

/***/ }),

/***/ "./src/changeManager.js":
/*!******************************!*\
  !*** ./src/changeManager.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.ChangeManager = undefined;\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _idbKeyval = __webpack_require__(/*! idb-keyval */ \"./node_modules/idb-keyval/dist/idb-keyval.mjs\");\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar ChangeManager = exports.ChangeManager = function () {\n    function ChangeManager(notesApiWrapper, changeStore) {\n        _classCallCheck(this, ChangeManager);\n\n        this.api = notesApiWrapper;\n        this.store = changeStore;\n        this.aliases = {};\n    }\n\n    _createClass(ChangeManager, [{\n        key: \"addChange\",\n        value: function addChange(type, subject) {\n            console.log(\"--adding change--\", type, subject);\n            var self = this;\n\n            return new Promise(function (resolve, reject) {\n                var date = new Date();\n\n                (0, _idbKeyval.set)(date.valueOf(), {\n                    type: type,\n                    id: subject\n                }, self.store).then(function () {\n                    console.log(\"set\");\n                    resolve();\n                }).catch(function (err) {\n                    reject(err);\n                });\n            });\n        }\n    }, {\n        key: \"clear\",\n        value: function clear() {\n            var self = this;\n\n            return (0, _idbKeyval.clear)(self.store);\n        }\n    }, {\n        key: \"pendingChanges\",\n        value: function pendingChanges() {\n            var self = this;\n\n            return new Promise(function (resolve, reject) {\n                (0, _idbKeyval.keys)(self.store).then(function (keys) {\n                    resolve(keys.length);\n                }).catch(reject);\n            });\n        }\n    }, {\n        key: \"sync\",\n        value: function sync() {\n            console.log(\"--attempting sync--\");\n            var self = this;\n            var synced = [];\n\n            //get the names of all keys in the change store\n            (0, _idbKeyval.keys)(self.store).then(function (keys) {\n                console.log(keys);\n\n                //get the contents of each key\n\n                var _loop = function _loop(i) {\n                    (0, _idbKeyval.get)(keys[i], self.store).then(function (val) {\n                        console.log(val);\n\n                        //if there is an alias, use it\n                        if (typeof self.aliases[val.id] != \"undefined\") val.id = self.aliases[val.id];\n\n                        switch (val.type) {\n\n                            case \"add\":\n                                if (synced.includes(val.id)) break;else synced.push(val.id);\n\n                                self.handleNoteAdd(val.id).then(function (newId) {\n                                    self.aliases[val.id] = newId;\n\n                                    synced.push(newId);\n                                    (0, _idbKeyval.del)(keys[i], self.store);\n                                }).catch(self.handleSyncError);\n                                break;\n\n                            case \"edit\":\n                                if (synced.includes(val.id)) break;else synced.push(val.id);\n\n                                self.handleNoteEdit(val.id).then(function () {\n                                    synced.push(val.id);\n                                    (0, _idbKeyval.del)(keys[i], self.store);\n                                }).catch(self.handleSyncError);\n                                break;\n\n                            case \"delete\":\n                                synced.push(val.id);\n\n                                self.handleNoteDelete(val.id).then(function () {\n                                    synced.push(val.id);\n                                    (0, _idbKeyval.del)(keys[i], self.store);\n                                }).catch(self.handleSyncError);\n                                break;\n\n                        }\n                    });\n                };\n\n                for (var i = 0; i < keys.length; i++) {\n                    _loop(i);\n                }\n            });\n        }\n    }, {\n        key: \"handleNoteAdd\",\n        value: function handleNoteAdd(noteId) {\n            var self = this;\n\n            console.log(\"--adding note--\", noteId);\n\n            return new Promise(function (resolve, reject) {\n                (0, _idbKeyval.get)(noteId).then(function (val) {\n                    console.log(\"adding note value\", val);\n\n                    if (typeof val == \"undefined\") resolve();\n\n                    self.api.addNote(val.title, val.content).then(function (id) {\n                        console.log(\"note added, new id\", id);\n\n                        val.id = id;\n                        (0, _idbKeyval.set)(\"note\" + id, val);\n                        (0, _idbKeyval.del)(noteId);\n\n                        resolve(id);\n                    }).catch(reject);\n                }).catch(reject);\n            });\n        }\n    }, {\n        key: \"handleNoteDelete\",\n        value: function handleNoteDelete(noteId) {\n            var self = this;\n\n            console.log(\"--deleting note--\", noteId);\n\n            return new Promise(function (resolve, reject) {\n                self.api.deleteNote(noteId).then(function () {\n                    console.log(\"deleting resolved\", noteId);\n                    resolve();\n                }).catch(reject);\n            });\n        }\n    }, {\n        key: \"handleNoteEdit\",\n        value: function handleNoteEdit(noteId) {\n            var self = this;\n\n            console.log(\"--editing note--\", noteId);\n\n            return new Promise(function (resolve, reject) {\n                (0, _idbKeyval.get)(noteId).then(function (val) {\n                    if (typeof val == \"undefined\" || typeof val.id == \"undefined\") resolve();\n\n                    console.log(\"editing ntoe value\", val);\n\n                    self.api.editNote(val.id, val.title, val.content).then(function (id) {\n                        console.log(\"editing note resolved\", noteId);\n                        resolve();\n                    }).catch(reject);\n                }).catch(reject);\n            });\n        }\n    }, {\n        key: \"handleError\",\n        value: function handleError(err) {\n            console.log(\"An error occured in changeman\", err);\n        }\n    }]);\n\n    return ChangeManager;\n}();\n\n//# sourceURL=webpack:///./src/changeManager.js?");

/***/ }),

/***/ "./src/config/local.js":
/*!*****************************!*\
  !*** ./src/config/local.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = {\n    serviceWorkerScope: \"/notes-frontend/\",\n    apiLocation: \"http://127.0.0.1/notes-api/v1/\"\n};\n\n//# sourceURL=webpack:///./src/config/local.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _riot = __webpack_require__(/*! riot */ \"./node_modules/riot/riot.js\");\n\nvar _riot2 = _interopRequireDefault(_riot);\n\nvar _idbKeyval = __webpack_require__(/*! idb-keyval */ \"./node_modules/idb-keyval/dist/idb-keyval.mjs\");\n\nvar _jsCookie = __webpack_require__(/*! js-cookie */ \"./node_modules/js-cookie/src/js.cookie.js\");\n\nvar Cookies = _interopRequireWildcard(_jsCookie);\n\nvar _notesApiWrapper = __webpack_require__(/*! ./notesApiWrapper.js */ \"./src/notesApiWrapper.js\");\n\nvar _changeManager = __webpack_require__(/*! ./changeManager.js */ \"./src/changeManager.js\");\n\n__webpack_require__(/*! ./tags/app.tag */ \"./src/tags/app.tag\");\n\n__webpack_require__(/*! ./tags/sidebar.tag */ \"./src/tags/sidebar.tag\");\n\n__webpack_require__(/*! ./tags/homepage.tag */ \"./src/tags/homepage.tag\");\n\n__webpack_require__(/*! ./tags/note-viewer.tag */ \"./src/tags/note-viewer.tag\");\n\n__webpack_require__(/*! ./tags/note-editor.tag */ \"./src/tags/note-editor.tag\");\n\n__webpack_require__(/*! ./tags/login-prompt.tag */ \"./src/tags/login-prompt.tag\");\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar config = __webpack_require__(/*! config */ \"./src/config/local.js\");\n\nwindow.addEventListener('load', function () {\n    var changeStore = new _idbKeyval.Store(\"changes-db\", \"changes-store\");\n    var apiKey = Cookies.get('api_key') || \"\";\n    var sessionId = Cookies.get('session_id') || \"\";\n    var api = new _notesApiWrapper.NotesApiWrapper(config.apiLocation, apiKey, sessionId);\n    var changeManager = new _changeManager.ChangeManager(api, changeStore);\n\n    api.on('sessionIdChange', function (args) {\n        if (args.sessionId) Cookies.set(\"session_id\", args.sessionId, { expires: 365 });\n    });\n\n    api.on('apiKeyChange', function (args) {\n        if (args.apiKey) Cookies.set(\"api_key\", args.apiKey, { expires: 365 });\n    });\n\n    _riot2.default.settings.autoUpdate = false;\n    _riot2.default.mount('*', {\n        api: api,\n        changemanager: changeManager,\n        loggedIn: apiKey != \"\"\n    });\n\n    if ('serviceWorker' in navigator) {\n        navigator.serviceWorker.register(\"./sw.bundle.js\", { scope: config.serviceWorkerScope }).then(function (reg) {\n            console.log(\"Service worker registered.\", reg);\n        }).catch(function (error) {\n            console.log(\"An error occured while registering the service worker...\", error);\n        });\n    }\n});\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/notesApiWrapper.js":
/*!********************************!*\
  !*** ./src/notesApiWrapper.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.NotesApiWrapper = undefined;\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _ajax = __webpack_require__(/*! ./ajax.js */ \"./src/ajax.js\");\n\nvar Ajax = _interopRequireWildcard(_ajax);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar NotesApiWrapper = exports.NotesApiWrapper = function () {\n    function NotesApiWrapper() {\n        var apiLocation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : \"\";\n        var apiKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : \"\";\n        var sessionId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : \"\";\n\n        _classCallCheck(this, NotesApiWrapper);\n\n        this.apiLocation = apiLocation;\n        this.apiKey = apiKey;\n        this.sessionId = sessionId;\n        this.headers = { \"Session-ID\": this.sessionId };\n        this.eventHandlers = {};\n    }\n\n    _createClass(NotesApiWrapper, [{\n        key: \"updateAuthDetails\",\n        value: function updateAuthDetails() {\n            var sessionId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.sessionId;\n            var apiKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.apiKey;\n\n            if (apiKey != this.apiKey) this.dispatchEvent('apiKeyChange', { apiKey: apiKey });\n            if (sessionId != this.sessionId) this.dispatchEvent('sessionIdChange', { sessionId: sessionId });\n\n            this.sessionId = sessionId;\n            this.apiKey = apiKey;\n            this.headers = { \"Session-ID\": this.sessionId };\n        }\n\n        //NOTES\n\n    }, {\n        key: \"addNote\",\n        value: function addNote(title, content) {\n            var self = this;\n\n            return new Promise(function (resolve, reject) {\n                var data = {};\n                if (title != null) data.title = title;\n                if (content != null) data.content = content;\n\n                Ajax.post(self.apiLocation + \"notes\", data, self.headers, true).then(function (resp) {\n                    if (resp.result != null && resp.result == \"error\") {\n                        reject(resp);\n                    } else {\n                        resolve(resp.note_id);\n                    }\n                }).catch(reject);\n            });\n        }\n    }, {\n        key: \"editNote\",\n        value: function editNote() {\n            var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;\n            var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : \"\";\n            var content = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : \"\";\n\n            var self = this;\n\n            return new Promise(function (resolve, reject) {\n                Ajax.post(self.apiLocation + \"notes/\" + id, { title: title, content: content }, self.headers, true).then(function (resp) {\n                    if (resp.result != null && resp.result == \"error\") {\n                        reject(resp);\n                    } else {\n                        resolve();\n                    }\n                }).catch(reject);\n            });\n        }\n    }, {\n        key: \"getNotes\",\n        value: function getNotes() {\n            var self = this;\n\n            return new Promise(function (resolve, reject) {\n                Ajax.get(self.apiLocation + \"notes\", self.headers, true).then(function (resp) {\n                    if (resp.result != null && resp.result == \"error\") {\n                        reject(resp);\n                    } else {\n                        resolve(resp);\n                    }\n                }).catch(reject);\n            });\n        }\n    }, {\n        key: \"getNote\",\n        value: function getNote() {\n            var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;\n\n            var self = this;\n\n            return new Promise(function (resolve, reject) {\n                Ajax.get(self.apiLocation + \"notes/\" + id, self.headers, true).then(function (resp) {\n                    if (resp.result != null && resp.result == \"error\") {\n                        reject(resp);\n                    } else {\n                        resolve(resp);\n                    }\n                }).catch(reject);\n            });\n        }\n    }, {\n        key: \"deleteNote\",\n        value: function deleteNote() {\n            var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;\n\n            var self = this;\n\n            return new Promise(function (resolve, reject) {\n                Ajax.del(self.apiLocation + \"notes/\" + id, self.headers, true).then(function (resp) {\n                    if (resp.result != null && resp.result == \"error\") {\n                        reject(resp);\n                    } else {\n                        resolve();\n                    }\n                }).catch(reject);\n            });\n        }\n\n        //AUTH\n\n    }, {\n        key: \"login\",\n        value: function login() {\n            var username = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : \"\";\n            var password = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : \"\";\n\n            var self = this;\n\n            return new Promise(function (resolve, reject) {\n                Ajax.post(self.apiLocation + \"login\", { username: username, password: password }, {}, true).then(function (resp) {\n                    if (resp.result == \"error\") {\n                        reject(resp);\n                    } else {\n                        self.updateAuthDetails(resp.session_id, resp.api_key);\n                        resolve(resp);\n                    }\n                }).catch(reject);\n            });\n        }\n    }, {\n        key: \"loginWithApiKey\",\n        value: function loginWithApiKey() {\n            var apiKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.apiKey;\n\n            var self = this;\n\n            return new Promise(function (resolve, reject) {\n                Ajax.post(self.apiLocation + \"login\", { api_key: apiKey }, {}, true).then(function (resp) {\n                    if (resp.result == \"error\") {\n                        reject(resp);\n                    } else {\n                        self.updateAuthDetails(resp.session_id, resp.api_key);\n                        resolve(resp);\n                    }\n                }).catch(reject);\n            });\n        }\n    }, {\n        key: \"register\",\n        value: function register() {\n            var username = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : \"\";\n            var password = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : \"\";\n\n            var self = this;\n\n            return new Promise(function (resolve, reject) {\n                Ajax.post(self.apiLocation + \"register\", { username: username, password: password }, {}, true).then(function (resp) {\n                    if (resp.result == \"error\") {\n                        reject(resp);\n                    } else {\n                        resolve();\n                    }\n                }).catch(reject);\n            });\n        }\n    }, {\n        key: \"logout\",\n        value: function logout() {\n            var self = this;\n\n            return new Promise(function (resolve, reject) {\n                Ajax.get(self.apiLocation + \"logout\", {}, self.headers, true).then(function (resp) {\n                    if (resp.result == \"error\") {\n                        reject(resp);\n                    } else {\n                        resolve();\n                    }\n                }).catch(reject);\n            });\n        }\n    }, {\n        key: \"on\",\n        value: function on(eventName, callback) {\n            var self = this;\n\n            if (self.eventHandlers[eventName] == undefined) self.eventHandlers[eventName] = [];\n\n            self.eventHandlers[eventName].push(callback);\n        }\n    }, {\n        key: \"dispatchEvent\",\n        value: function dispatchEvent(eventName, args) {\n            var self = this;\n\n            var eventHandlers = self.eventHandlers[eventName] || [];\n            var eventHandlerAmount = eventHandlers.length;\n\n            for (var i = 0; i < eventHandlerAmount; i++) {\n                eventHandlers[i](args);\n            }\n        }\n    }]);\n\n    return NotesApiWrapper;\n}();\n\n//# sourceURL=webpack:///./src/notesApiWrapper.js?");

/***/ }),

/***/ "./src/tags/app.tag":
/*!**************************!*\
  !*** ./src/tags/app.tag ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var riot_route__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! riot-route */ \"./node_modules/riot-route/lib/index.js\");\n/* harmony import */ var riot_route__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(riot_route__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var idb_keyval__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! idb-keyval */ \"./node_modules/idb-keyval/dist/idb-keyval.mjs\");\n\n    var riot = __webpack_require__(/*! riot */ \"./node_modules/riot/riot.js\")\n    \n\nriot.tag2('app', '<div class=\"loading-overlay\" ref=\"loadingOverlay\"></div> <login-prompt if=\"{!loggedIn}\" api=\"{api}\"></login-prompt> <sidebar if=\"{loggedIn}\" updatenotes=\"{updateNotes}\" changemanager=\"{changeManager}\"></sidebar> <main if=\"{loggedIn}\"> <homepage if=\"{state == states.homepage}\" loggedin=\"{loggedIn}\"></homepage> <note-viewer if=\"{state == states.view}\" noteid=\"{noteId}\" changemanager=\"{changeManager}\" loggedin=\"{loggedIn}\"></note-viewer> <note-editor if=\"{state == states.edit}\" noteid=\"{noteId}\" changemanager=\"{changeManager}\" loggedin=\"{loggedIn}\"></note-editor> </main>', '@media only screen and (min-width: 768px) { app main,[data-is=\"app\"] main{ margin-left: 300px; } } app .context-buttons,[data-is=\"app\"] .context-buttons{ position: fixed; top: 0; right: 0; z-index: 99; } app .context-buttons .button,[data-is=\"app\"] .context-buttons .button{ display: inline-block; padding: 8px 16px; text-align: center; font-size: 32px; cursor: pointer; background-color: rgba(238, 238, 238, 0.5); margin-left: 4px; } app .context-buttons .button:hover,[data-is=\"app\"] .context-buttons .button:hover{ background-color: rgba(238, 238, 238, 0.8); } app .note,[data-is=\"app\"] .note{ width: 100%; max-width: 100%; x-overflow: hidden; } app .note header,[data-is=\"app\"] .note header{ font-size: 32px; margin: 8px 0; } app .loading-overlay,[data-is=\"app\"] .loading-overlay{ position: fixed; top: 0; left: 0; z-index: 1000; width: 100vw; height: 100vh; background-color: rgba(0, 0, 0, 0.25); cursor: wait; display: none; }', '', function(opts) {\n\n        var self = this;\n\n        self.states = { homepage: \"homepage\", view: \"view\", edit: \"edit\" };\n        self.state = self.states.homepage;\n        self.noteId = \"\";\n        self.api = self.opts.api;\n        self.changeManager = self.opts.changemanager;\n        self.loggedIn = self.opts.loggedIn;\n\n        self.updateDb = function(){\n            return new Promise(function(resolve, reject){\n                self.api.getNotes()\n                .then(notes => {\n                    Object(idb_keyval__WEBPACK_IMPORTED_MODULE_1__[\"clear\"])()\n                    .then(() => {\n                        for(let i = 0; i < notes.length; i++){\n                            if(typeof notes[i].id == \"undefined\") continue;\n\n                            Object(idb_keyval__WEBPACK_IMPORTED_MODULE_1__[\"set\"])(\"note\" + notes[i].id, notes[i]);\n                        }\n                        resolve();\n                    })\n                    .catch(reject);\n                })\n                .catch(reject);\n            });\n        }\n\n        self.updateNotes = function(showOverlay = true){\n            if(!self.loggedIn) return;\n\n            if(showOverlay) self.refs.loadingOverlay.style.display = \"block\";\n\n            self.api.loginWithApiKey()\n            .then(() => {\n                return self.changeManager.sync();\n            })\n            .then(self.updateDb)\n            .then(() => {\n                self.refs.loadingOverlay.style.display = \"none\";\n\n                self.tags.sidebar.update();\n                if(typeof self.tags[\"note-viewer\"] != \"undefined\") self.tags[\"note-viewer\"].update();\n            })\n            .catch(err => {\n                if(typeof err.result != \"undefined\"){\n                    if(err.result != \"networkError\")\n                        window.alert(\"An error occured: \" + err.result + \": \" + err.error);\n                }else{\n                    window.alert(\"An error occured: \" + err);\n                }\n                console.log(err);\n            });\n        }\n\n        riot_route__WEBPACK_IMPORTED_MODULE_0___default()(function(state, noteId = \"\"){\n            if(state == \"\") state = self.states.homepage;\n\n            self.state = state;\n            self.noteId = noteId;\n\n            self.update();\n        });\n        riot_route__WEBPACK_IMPORTED_MODULE_0___default.a.start(true);\n\n        self.on('mount', function(){\n            self.updateNotes(false);\n\n            self.api.on('sessionIdChange', function(){\n                self.loggedIn = true;\n            });\n        });\n});\n    \n  \n\n//# sourceURL=webpack:///./src/tags/app.tag?");

/***/ }),

/***/ "./src/tags/homepage.tag":
/*!*******************************!*\
  !*** ./src/tags/homepage.tag ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\n    var riot = __webpack_require__(/*! riot */ \"./node_modules/riot/riot.js\")\n    riot.tag2('homepage', '<article> <h1>Welcome to uNote<sup>&alpha;</sup></h1> <p>uNote is a note-taking progressive web app (which means it works even when you\\'re offline! ^_^) with markdown markup and cloud-syncing.</p> <p>uNote is currently in early alpha, saving all your super-sensitive business data here might not be such a hot idea just yet. If you find any bugs, please send all info about it (how it happened, what happened, console logs if you can) to daniel[at]0.pl</p> <p>Have fun!</p> <h3>Props</h3> <p>Tons of props to <a href=\"http://riot.js.org\">the RIOT.js contributors</a> and <a href=\"https://modernpictograms.com/\">the makers of Modern Pictograms</a>! &lt;3</p> </article>', '', '', function(opts) {\n});\n    \n  \n\n//# sourceURL=webpack:///./src/tags/homepage.tag?");

/***/ }),

/***/ "./src/tags/login-prompt.tag":
/*!***********************************!*\
  !*** ./src/tags/login-prompt.tag ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\n    var riot = __webpack_require__(/*! riot */ \"./node_modules/riot/riot.js\")\n    riot.tag2('login-prompt', '<div class=\"prompt\"> <main> <h2>You are not logged in!</h2> <input type=\"text\" placeholder=\"Username\" ref=\"username\"><br> <input type=\"password\" placeholder=\"Password\" ref=\"password\"><br> <button onclick=\"{login}\">Log In</button> <button onclick=\"{signup}\">Sign Up</button> </main> </div>', 'login-prompt .prompt,[data-is=\"login-prompt\"] .prompt{ position: fixed; top: 0; left: 0; z-index: 1000; width: 100vw; height: 100vh; background-color: #FFF; } login-prompt .prompt main,[data-is=\"login-prompt\"] .prompt main{ text-align: center; padding: 16px; width: 100%; max-width: 300px; margin: 0 auto; }', '', function(opts) {\n\n        var self = this;\n        var api = self.opts.api;\n\n        var handleError = function(err){\n            if(typeof err.result != \"undefined\"){\n                if(err.result == \"networkError\")\n                    window.alert(\"A network error occured. Are you connected to the internet?\");\n                else\n                    window.alert(\"An error occured: \" + err.result + \": \" + err.error);\n            }else{\n                window.alert(\"An error occured: \" + err);\n            }\n            console.log(err);\n        }\n\n        self.login = function(){\n            let username = self.refs.username.value;\n            let password = self.refs.password.value;\n\n            api.login(username, password)\n            .then(() => {\n                location.reload();\n            })\n            .catch(handleError);\n        }\n\n        self.signup = function(){\n            let username = self.refs.username.value;\n            let password = self.refs.password.value;\n\n            api.register(username, password)\n            .then(() => {\n                self.login();\n            })\n            .catch(handleError);\n        }\n\n});\n    \n  \n\n//# sourceURL=webpack:///./src/tags/login-prompt.tag?");

/***/ }),

/***/ "./src/tags/note-editor.tag":
/*!**********************************!*\
  !*** ./src/tags/note-editor.tag ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var idb_keyval__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! idb-keyval */ \"./node_modules/idb-keyval/dist/idb-keyval.mjs\");\n/* harmony import */ var riot_route__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! riot-route */ \"./node_modules/riot-route/lib/index.js\");\n/* harmony import */ var riot_route__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(riot_route__WEBPACK_IMPORTED_MODULE_1__);\n\n    var riot = __webpack_require__(/*! riot */ \"./node_modules/riot/riot.js\")\n    \n\nriot.tag2('note-editor', '<article class=\"note\"> <header> <input type=\"text\" ref=\"noteTitle\" placeholder=\"Note Title\" riot-value=\"{note.title}\"> </header> <textarea ref=\"noteContent\" placeholder=\"Note Content\"></textarea> </article> <div class=\"context-buttons\"> <div class=\"button\" onclick=\"{saveNote}\"> <i class=\"icon-font\">%</i> </div> <div class=\"button\" onclick=\"{cancel}\"> <i class=\"icon-font\">X</i> </div> </div>', 'note-editor .note header input,[data-is=\"note-editor\"] .note header input{ font-size: 32px; } note-editor .note textarea,[data-is=\"note-editor\"] .note textarea{ height: calc(100vh - 32px - 64px); }', '', function(opts) {\n\n        var self = this;\n\n        var changeManager = self.opts.changemanager;\n        var loggedIn = self.opts.loggedin;\n\n        self.noteId = self.opts.noteid;\n        self.note = {\n            title: \"\",\n            content: \"\",\n            unsynced: true\n        };\n\n        self.loadNote = function(){\n            self.noteId = self.opts.noteid;\n\n            if(self.noteId != \"\"){\n                Object(idb_keyval__WEBPACK_IMPORTED_MODULE_0__[\"get\"])(self.noteId)\n                .then(val => {\n                    if(val == undefined || val.title == null || val.content == null){\n                        window.alert(\"This note could not be found.\");\n                        riot_route__WEBPACK_IMPORTED_MODULE_1___default()(\"homepage\");\n                    }else{\n                        self.note = val;\n\n                        self.refs.noteTitle.value = val.title;\n                        self.refs.noteContent.value = val.content;\n                    }\n                });\n            }\n        }\n\n        self.cancel = function(){\n            if(self.noteId != \"\"){\n                riot_route__WEBPACK_IMPORTED_MODULE_1___default()(\"view/\" + self.noteId);\n            }else{\n                riot_route__WEBPACK_IMPORTED_MODULE_1___default()(\"homepage\");\n            }\n        }\n\n        self.saveNote = function(){\n            self.note.title = self.refs.noteTitle.value;\n            self.note.content = self.refs.noteContent.value;\n\n            if(self.noteId != \"\"){\n                self.saveExistingNote();\n            }else{\n                self.saveNewNote();\n            }\n        }\n\n        self.saveExistingNote = function(){\n            Object(idb_keyval__WEBPACK_IMPORTED_MODULE_0__[\"set\"])(self.noteId, self.note)\n            .then(() => {\n                riot_route__WEBPACK_IMPORTED_MODULE_1___default()(\"view/\" + self.noteId);\n            })\n            .then(() => {\n                if(typeof self.note.id != \"undefined\"){\n                    changeManager.addChange(\"edit\", self.noteId)\n                    .then(() => {\n                        if(loggedIn) changeManager.sync();\n                    });\n                }\n            });\n        }\n\n        self.saveNewNote = function(){\n            let date = new Date();\n            self.noteId = \"temp\" + date.valueOf();\n\n            Object(idb_keyval__WEBPACK_IMPORTED_MODULE_0__[\"set\"])(self.noteId, self.note)\n            .then(() => {\n                riot_route__WEBPACK_IMPORTED_MODULE_1___default()(\"view/\" + self.noteId);\n            })\n            .then(() => {\n                changeManager.addChange(\"add\", self.noteId)\n                .then(() => {\n                    if(loggedIn) changeManager.sync();\n                });\n            });\n        }\n\n        self.on('mount', self.loadNote);\n        self.on('update', self.loadNote);\n\n});\n    \n  \n\n//# sourceURL=webpack:///./src/tags/note-editor.tag?");

/***/ }),

/***/ "./src/tags/note-viewer.tag":
/*!**********************************!*\
  !*** ./src/tags/note-viewer.tag ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var idb_keyval__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! idb-keyval */ \"./node_modules/idb-keyval/dist/idb-keyval.mjs\");\n/* harmony import */ var riot_route__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! riot-route */ \"./node_modules/riot-route/lib/index.js\");\n/* harmony import */ var riot_route__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(riot_route__WEBPACK_IMPORTED_MODULE_1__);\n\n    var riot = __webpack_require__(/*! riot */ \"./node_modules/riot/riot.js\")\n    \n\nriot.tag2('note-viewer', '<article class=\"note\"> <header ref=\"noteTitle\"></header> <div class=\"content\" ref=\"noteContent\"></div> </article> <div class=\"context-buttons\"> <div class=\"button\" onclick=\"{editNote}\"> <i class=\"icon-font\">e</i> </div> <div class=\"button\" onclick=\"{deleteNote}\"> <i class=\"icon-font\">I</i> </div> </div>', '', '', function(opts) {\n        const marked = __webpack_require__(/*! marked */ \"./node_modules/marked/lib/marked.js\");\n\n        var self = this;\n\n        var changeManager = self.opts.changemanager;\n        var loggedIn = self.opts.loggedin;\n\n        self.noteId = self.opts.noteid;\n        self.note = {\n            title: \"\",\n            content: \"\",\n            unsynced: true\n        };\n\n        self.loadNote = function(){\n            self.noteId = self.opts.noteid;\n\n            Object(idb_keyval__WEBPACK_IMPORTED_MODULE_0__[\"get\"])(self.noteId)\n            .then(val => {\n                if(val == undefined || val.title == null || val.content == null){\n                    window.alert(\"This note could not be found.\");\n                    riot_route__WEBPACK_IMPORTED_MODULE_1___default()(\"homepage\");\n                }else{\n                    self.note = val;\n\n                    self.refs.noteTitle.innerHTML = val.title;\n                    self.refs.noteContent.innerHTML = marked(val.content);\n                }\n            });\n        }\n\n        self.editNote = function(){\n            riot_route__WEBPACK_IMPORTED_MODULE_1___default()(\"edit/\" + self.noteId);\n        }\n\n        self.deleteNote = function(){\n            if(window.confirm(\"Are you sure you would like to delete this note?\")){\n                Object(idb_keyval__WEBPACK_IMPORTED_MODULE_0__[\"del\"])(self.noteId);\n                riot_route__WEBPACK_IMPORTED_MODULE_1___default()(\"homepage\");\n\n                if(typeof self.note.id != \"undefined\"){\n                    changeManager.addChange(\"delete\", self.note.id)\n                    .then(() => {\n                        if(loggedIn) changeManager.sync();\n                    });\n                }\n            }\n        }\n\n        self.on('mount', self.loadNote);\n        self.on('update', self.loadNote);\n\n});\n    \n  \n\n//# sourceURL=webpack:///./src/tags/note-viewer.tag?");

/***/ }),

/***/ "./src/tags/sidebar.tag":
/*!******************************!*\
  !*** ./src/tags/sidebar.tag ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var idb_keyval__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! idb-keyval */ \"./node_modules/idb-keyval/dist/idb-keyval.mjs\");\n/* harmony import */ var riot_route__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! riot-route */ \"./node_modules/riot-route/lib/index.js\");\n/* harmony import */ var riot_route__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(riot_route__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! js-cookie */ \"./node_modules/js-cookie/src/js.cookie.js\");\n/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_2__);\n\n    var riot = __webpack_require__(/*! riot */ \"./node_modules/riot/riot.js\")\n    \n\n\nriot.tag2('sidebar', '<nav class=\"sidebar\" ref=\"sidebar\"> <header> uNote </header> <div class=\"item meta\" onclick=\"{goToHomepage}\"> Homepage </div> <div class=\"separator\"></div> <div class=\"item meta\" onclick=\"{newNote}\"> New Note </div> <div ref=\"noteList\"></div> <div class=\"separator\"></div> <div class=\"item meta\" onclick=\"{updateNotes}\"> Update </div> <div class=\"item meta\" onclick=\"{logout}\"> Log Out </div> </nav> <div class=\"hamburger-button\" onclick=\"{toggleSidebar}\"> <i class=\"icon-font\">\\\\</i> </div>', 'sidebar .sidebar,[data-is=\"sidebar\"] .sidebar{ position: fixed; top: 0; left: 0; z-index: 100; height: 100vh; width: 90%; max-width: 300px; display: none; overflow-x: hidden; overflow-y: auto; background-color: #EEE; } sidebar .sidebar .item,[data-is=\"sidebar\"] .sidebar .item{ width: 100%; padding: 16px 8px; cursor: pointer; box-sizing: border-box; } sidebar .sidebar .item:hover,[data-is=\"sidebar\"] .sidebar .item:hover{ background-color: #DDD; } sidebar .sidebar .meta,[data-is=\"sidebar\"] .sidebar .meta{ text-align: center; font-weight: bold; } sidebar .sidebar .separator,[data-is=\"sidebar\"] .sidebar .separator{ margin: 16px; border-bottom: 1px solid #CCC; } sidebar .sidebar header,[data-is=\"sidebar\"] .sidebar header{ text-align: center; padding: 16px 0; font-size: 32px; background-color: #CCC; } sidebar .hamburger-button,[data-is=\"sidebar\"] .hamburger-button{ position: fixed; top: 0; left: 0; z-index: 101; padding: 8px 16px; text-align: center; font-size: 32px; cursor: pointer; background-color: rgba(238, 238, 238, 0.5); } sidebar .hamburger-button:hover,[data-is=\"sidebar\"] .hamburger-button:hover{ background-color: rgba(238, 238, 238, 0.8); } @media only screen and (min-width: 768px) { sidebar .sidebar,[data-is=\"sidebar\"] .sidebar{ display: block; } sidebar .hamburger-button,[data-is=\"sidebar\"] .hamburger-button{ display: none; } }', '', function(opts) {\n\n        var self = this;\n        var changeManager = self.opts.changemanager;\n\n        self.updateNotes = self.opts.updatenotes;\n        self.loggedIn = self.opts.loggedin;\n\n        self.updateList = function(){\n            console.log(\"updating list\");\n\n            Object(idb_keyval__WEBPACK_IMPORTED_MODULE_0__[\"keys\"])()\n            .then(keys => {\n                self.refs.noteList.innerHTML = \"\";\n\n                var notes = keys || [];\n\n                for(let i = 0; i < notes.length; i++){\n                    if(keys[i] == \"notesChanged\") continue;\n\n                    Object(idb_keyval__WEBPACK_IMPORTED_MODULE_0__[\"get\"])(keys[i])\n                    .then(val => {\n                        if(val == undefined || val.title == undefined) return;\n\n                        let elem = document.createElement('div');\n                        elem.setAttribute('class', 'item');\n                        elem.onclick = function(){\n                            riot_route__WEBPACK_IMPORTED_MODULE_1___default()(\"view/\" + keys[i]);\n                        }\n                        elem.innerHTML = val.title;\n                        self.refs.noteList.appendChild(elem);\n                    });\n                }\n            });\n        }\n\n        self.toggleSidebar = function(){\n            if(self.refs.sidebar.style.display != \"block\"){\n                self.refs.sidebar.style.display = \"block\";\n            }else{\n                self.refs.sidebar.style.display = \"none\";\n            }\n        }\n\n        self.logout = function(){\n            changeManager.pendingChanges()\n            .then(amount => {\n                if(amount > 0){\n                    if(!window.confirm(\"You have \" + amount + \" unsynced changes. If you sign out now, these will be lost. Are you sure you want to sign out?\"))\n                        return false;\n                }else{\n                    if(!window.confirm(\"Are you sure you want to sign out?\"))\n                        return false;\n                }\n\n                js_cookie__WEBPACK_IMPORTED_MODULE_2__[\"remove\"](\"api_key\");\n                js_cookie__WEBPACK_IMPORTED_MODULE_2__[\"remove\"](\"session_id\");\n\n                Object(idb_keyval__WEBPACK_IMPORTED_MODULE_0__[\"clear\"])()\n                .then(() => {\n                    return changeManager.clear();\n                })\n                .then(() => {\n                    location.reload();\n                });\n            });\n        }\n\n        self.goToHomepage = function(){\n            riot_route__WEBPACK_IMPORTED_MODULE_1___default()(\"homepage\");\n        }\n\n        self.newNote = function(){\n            riot_route__WEBPACK_IMPORTED_MODULE_1___default()(\"edit\");\n        }\n\n        self.on('mount', self.updateList);\n        self.on('update', self.updateList);\n\n});\n    \n  \n\n//# sourceURL=webpack:///./src/tags/sidebar.tag?");

/***/ })

/******/ });