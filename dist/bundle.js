/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./react */ \"./src/react.js\");\n\nvar vdom = (0,_react__WEBPACK_IMPORTED_MODULE_0__.createElement)('p', {}, (0,_react__WEBPACK_IMPORTED_MODULE_0__.createElement)('h1', {}, 'react 만들기'), (0,_react__WEBPACK_IMPORTED_MODULE_0__.createElement)('ul', {}, (0,_react__WEBPACK_IMPORTED_MODULE_0__.createElement)('li', {\n  style: 'color:red'\n}, '첫번째 아이템'), (0,_react__WEBPACK_IMPORTED_MODULE_0__.createElement)('li', {\n  style: 'color:green'\n}, '두번째 아이템'), (0,_react__WEBPACK_IMPORTED_MODULE_0__.createElement)('li', {\n  style: 'color:blue'\n}, '세번째 아이템')));\nvar vdom2 = /*#__PURE__*/React.createElement(\"p\", null, /*#__PURE__*/React.createElement(\"h1\", null, \"react \\uB9CC\\uB4E4\\uAE30\"), /*#__PURE__*/React.createElement(\"ul\", null, /*#__PURE__*/React.createElement(\"li\", {\n  style: \"color:red\"\n}, \"\\uCCAB\\uBC88\\uC9F8 \\uC544\\uC774\\uD15C\"), /*#__PURE__*/React.createElement(\"li\", {\n  style: \"color:green\"\n}, \"\\uB450\\uBC88\\uC9F8 \\uC544\\uC774\\uD15C\"), /*#__PURE__*/React.createElement(\"li\", {\n  style: \"color:blue\"\n}, \"\\uC138\\uBC88\\uC9F8 \\uC544\\uC774\\uD15C\")));\n(0,_react__WEBPACK_IMPORTED_MODULE_0__.render)(vdom2, document.querySelector('#root'));\n\n//# sourceURL=webpack://make-react/./src/app.js?");

/***/ }),

/***/ "./src/react.js":
/*!**********************!*\
  !*** ./src/react.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createDOM\": () => (/* binding */ createDOM),\n/* harmony export */   \"createElement\": () => (/* binding */ createElement),\n/* harmony export */   \"render\": () => (/* binding */ render)\n/* harmony export */ });\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }\nfunction _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : \"undefined\" != typeof Symbol && arr[Symbol.iterator] || arr[\"@@iterator\"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i[\"return\"] && (_r = _i[\"return\"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\nfunction createDOM(node) {\n  if (typeof node === 'string') {\n    return document.createTextNode(node);\n  }\n  var element = document.createElement(node.tag);\n  Object.entries(node.props).forEach(function (_ref) {\n    var _ref2 = _slicedToArray(_ref, 2),\n      name = _ref2[0],\n      value = _ref2[1];\n    return element.setAttribute(name, value);\n  });\n  node.children.map(createDOM).forEach(element.appendChild.bind(element));\n  return element;\n}\n\n/**실제 node나 element를 만드는게 아니라 객체를 만드는 함수 */\nfunction createElement(tag, props) {\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n  return {\n    // tag:tag,\n    // props:props,\n    // children:children\n    //단축표현 사용\n    tag: tag,\n    props: props,\n    children: children\n  };\n}\nfunction render(vdom, container) {\n  container.appendChild(createDOM(vdom));\n}\n\n//# sourceURL=webpack://make-react/./src/react.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;