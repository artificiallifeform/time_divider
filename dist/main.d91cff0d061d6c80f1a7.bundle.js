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
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
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
/******/
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
/******/ 	deferredModules.push(["./src/app/index.js","vendor.bundle"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app/LoginComponent/LoginModel.js":
/*!**********************************************!*\
  !*** ./src/app/LoginComponent/LoginModel.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar LoginModel = /*#__PURE__*/function () {\n  function LoginModel() {\n    _classCallCheck(this, LoginModel);\n\n    this.config = {\n      headers: {\n        'Content-Type': 'application/json'\n      }\n    };\n    this.url = 'http://localhost:5000/auth';\n  }\n\n  _createClass(LoginModel, [{\n    key: \"submitLogin\",\n    value: function () {\n      var _submitLogin = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(username) {\n        var response;\n        return regeneratorRuntime.wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                if (!(username.length === 0)) {\n                  _context.next = 3;\n                  break;\n                }\n\n                console.warn('Input cant be empty');\n                return _context.abrupt(\"return\");\n\n              case 3:\n                _context.prev = 3;\n                _context.next = 6;\n                return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(this.url, {\n                  username: username\n                }, this.config);\n\n              case 6:\n                response = _context.sent;\n                localStorage.setItem('username', response.data.user.username);\n                return _context.abrupt(\"return\", response.data.user);\n\n              case 11:\n                _context.prev = 11;\n                _context.t0 = _context[\"catch\"](3);\n                throw Error('Something wrong with an API');\n\n              case 14:\n              case \"end\":\n                return _context.stop();\n            }\n          }\n        }, _callee, this, [[3, 11]]);\n      }));\n\n      function submitLogin(_x) {\n        return _submitLogin.apply(this, arguments);\n      }\n\n      return submitLogin;\n    }()\n  }, {\n    key: \"checkForToken\",\n    value: function checkForToken() {\n      var token = localStorage.getItem('username');\n\n      if (token) {\n        return this.submitLogin(token);\n      } else {\n        return null;\n      }\n    }\n  }, {\n    key: \"clearUser\",\n    value: function clearUser() {\n      localStorage.removeItem('username');\n    } // TODO: Also need to disable form submission if user didn't enter anythin in the field\n\n  }]);\n\n  return LoginModel;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (LoginModel);\n\n//# sourceURL=webpack:///./src/app/LoginComponent/LoginModel.js?");

/***/ }),

/***/ "./src/app/LoginComponent/LoginView.js":
/*!*********************************************!*\
  !*** ./src/app/LoginComponent/LoginView.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _fonts_person_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../fonts/person.svg */ \"./src/fonts/person.svg\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar LoginView = /*#__PURE__*/function () {\n  function LoginView(actions) {\n    _classCallCheck(this, LoginView);\n\n    this.loginWrapper = document.querySelector('.login-wrapper');\n    this.formSubmit = actions.formSubmit;\n    this.inputChange = actions.inputChange;\n    this.userLogout = actions.userLogout;\n  }\n\n  _createClass(LoginView, [{\n    key: \"authSucceed\",\n    value: function authSucceed(username) {\n      var _this = this;\n\n      var lw = this.loginWrapper;\n      lw.removeChild(lw.lastChild);\n      var span = document.createElement('span');\n      span.innerText = username;\n      var btn = document.createElement('button');\n      btn.innerText = 'Logout';\n      btn.classList.add('btn', 'small', 'logout');\n      btn.addEventListener('click', function () {\n        _this.userLogout();\n      });\n      var image = document.createElement('img');\n      image.src = _fonts_person_svg__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n      image.classList.add('login-icon');\n      lw.appendChild(image);\n      lw.appendChild(span);\n      lw.appendChild(btn);\n    }\n  }, {\n    key: \"authFailed\",\n    value: function authFailed() {\n      var _this2 = this;\n\n      var lw = this.loginWrapper;\n      lw.innerHTML = '';\n      var form = document.createElement('form');\n      form.addEventListener('submit', function (e) {\n        e.preventDefault();\n\n        _this2.formSubmit();\n      });\n      form.classList.add('form');\n      var input = document.createElement('input');\n      input.addEventListener('input', function (e) {\n        _this2.inputChange(e.target.value);\n      });\n      input.classList.add('input', 'small');\n      var btn = document.createElement('input');\n      btn.setAttribute('type', 'submit');\n      btn.setAttribute('value', 'Login');\n      btn.classList.add('btn', 'small');\n      btn.innerText = 'login';\n      form.appendChild(input);\n      form.appendChild(btn);\n      this.loginWrapper.appendChild(form);\n    }\n  }]);\n\n  return LoginView;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (LoginView);\n\n//# sourceURL=webpack:///./src/app/LoginComponent/LoginView.js?");

/***/ }),

/***/ "./src/app/LoginComponent/LoginViewModel.js":
/*!**************************************************!*\
  !*** ./src/app/LoginComponent/LoginViewModel.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _LoginModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LoginModel */ \"./src/app/LoginComponent/LoginModel.js\");\n/* harmony import */ var _LoginView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LoginView */ \"./src/app/LoginComponent/LoginView.js\");\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\n\nvar LoginViewModel = /*#__PURE__*/function () {\n  function LoginViewModel() {\n    _classCallCheck(this, LoginViewModel);\n\n    this.loginModel = new _LoginModel__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    this.loginView = new _LoginView__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n      inputChange: this.inputChange.bind(this),\n      // This methods are being called in LoginView. When\n      formSubmit: this.formSubmit.bind(this),\n      userLogout: this.userLogout.bind(this) // using this in View it points oon LoginView component\n\n    }); // However should be pointed an LoginViewModel\n\n    this.loginInput = \"\"; // First of all check if the User is Authenticated To Load appropriate component\n\n    this.checkAuthStatus();\n  }\n\n  _createClass(LoginViewModel, [{\n    key: \"checkAuthStatus\",\n    value: function () {\n      var _checkAuthStatus = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n        var loginModel, loginView, user;\n        return regeneratorRuntime.wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                loginModel = this.loginModel, loginView = this.loginView;\n                _context.next = 3;\n                return loginModel.checkForToken();\n\n              case 3:\n                user = _context.sent;\n\n                if (user) {\n                  loginView.authSucceed(user.username);\n                } else {\n                  loginView.authFailed();\n                }\n\n              case 5:\n              case \"end\":\n                return _context.stop();\n            }\n          }\n        }, _callee, this);\n      }));\n\n      function checkAuthStatus() {\n        return _checkAuthStatus.apply(this, arguments);\n      }\n\n      return checkAuthStatus;\n    }()\n  }, {\n    key: \"inputChange\",\n    value: function inputChange(value) {\n      this.loginInput = value;\n    }\n  }, {\n    key: \"userLogout\",\n    value: function userLogout() {\n      this.loginModel.clearUser();\n      this.loginView.authFailed();\n    }\n  }, {\n    key: \"formSubmit\",\n    value: function () {\n      var _formSubmit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {\n        var user;\n        return regeneratorRuntime.wrap(function _callee2$(_context2) {\n          while (1) {\n            switch (_context2.prev = _context2.next) {\n              case 0:\n                _context2.next = 2;\n                return this.loginModel.submitLogin(this.loginInput);\n\n              case 2:\n                user = _context2.sent;\n\n                if (user) {\n                  this.loginView.authSucceed(user.username);\n                }\n\n              case 4:\n              case \"end\":\n                return _context2.stop();\n            }\n          }\n        }, _callee2, this);\n      }));\n\n      function formSubmit() {\n        return _formSubmit.apply(this, arguments);\n      }\n\n      return formSubmit;\n    }()\n  }]);\n\n  return LoginViewModel;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (LoginViewModel);\n\n//# sourceURL=webpack:///./src/app/LoginComponent/LoginViewModel.js?");

/***/ }),

/***/ "./src/app/index.js":
/*!**************************!*\
  !*** ./src/app/index.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! regenerator-runtime/runtime.js */ \"./node_modules/regenerator-runtime/runtime.js\");\n/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/index.css */ \"./src/styles/index.css\");\n/* harmony import */ var _styles_index_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_index_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _LoginComponent_LoginViewModel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LoginComponent/LoginViewModel */ \"./src/app/LoginComponent/LoginViewModel.js\");\n\n\n\n\nfunction init() {\n  // Init Login Controller\n  new _LoginComponent_LoginViewModel__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n}\n\ninit();\n\n//# sourceURL=webpack:///./src/app/index.js?");

/***/ }),

/***/ "./src/fonts/person.svg":
/*!******************************!*\
  !*** ./src/fonts/person.svg ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"./fonts/person.svg\");\n\n//# sourceURL=webpack:///./src/fonts/person.svg?");

/***/ }),

/***/ "./src/styles/index.css":
/*!******************************!*\
  !*** ./src/styles/index.css ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/styles/index.css?");

/***/ })

/******/ });