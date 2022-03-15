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

/***/ "./source/css/style.css":
/*!******************************!*\
  !*** ./source/css/style.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://quizapp/./source/css/style.css?");

/***/ }),

/***/ "./source/app.js":
/*!***********************!*\
  !*** ./source/app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/style.css */ \"./source/css/style.css\");\n/* harmony import */ var _pages_Quiz_Quiz_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/Quiz/Quiz.js */ \"./source/pages/Quiz/Quiz.js\");\n\n\n\n\n// Loading Page\n// Загрузка страницы\ndocument.addEventListener('DOMContentLoaded', (event) => {\n\n   // Quiz()\n   console.log(_css_style_css__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\n   console.log(img)\n\n})\n\n//# sourceURL=webpack://quizapp/./source/app.js?");

/***/ }),

/***/ "./source/pages/Quiz/Quiz.js":
/*!***********************************!*\
  !*** ./source/pages/Quiz/Quiz.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\n// Quiz Page\n// Страница Викторины\nconst Quiz = () => {\n\n   // function Render of Quiz page\n   // функция Визуализация страницы викторины\n   function renderPage() {\n\n      const html = `\n      \n         <main class=\"quiz__page\" id=\"quizPage\">\n            <div class=\"quiz__page-container\">\n               <header class=\"quiz__header header-quiz\" id=\"quizHeader\">\n                  <div class=\"header-quiz__arrowback unselectable\">\n                     <img class=\"arrowback-back\" src=\"./components/Quiz/images/arrow-back.svg\" alt=\"arrowback\">\n                  </div>\n                  <div class=\"header-quiz__progress unselectable\" id=\"quizProgress\">\n                     <div class=\"progress-number\"><span class=\"left\">0</span> <span class=\"right\">/4</span></div>\n                     <div class=\"progress-line\"></div>\n                  </div>\n               </header>\n               <div class=\"quiz__container animate__animated animate__faster animate__fadeIn\" id=\"quizContainer\">\n                  <div class=\"quiz__list list-quiz animate__animated animate__faster\" id=\"quizList\">\n                     <div class=\"list-quiz__title\" id=\"quizTitle\">question?</div>\n                     <div class=\"list-quiz__option list-option\" id=\"quizListOption\"></div>\n                     <div class=\"list-quiz__answer answer-quiz\" id=\"quizAnswer\">\n                     <button class=\"answer-quiz__button\" id=\"quizAnswerButton\"><span class=\"answer-button__title\">answer</span> <span class=\"answer-button__icon\"><img src=\"./components/Quiz/images/next.svg\" alt=\"next\"></span></button>\n                     </div>\n                  </div>\n               </div>\n            </div>\n         </main>\n   \n      `;\n\n      ROOT.innerHTML = html\n\n   }\n\n   renderPage() // Render of Quiz page // Визуализация страницы викторины\n\n   // Getting DOM Elements\n   // Получение DOM-элементов\n   const $page = document.getElementById('quizPage')\n   const $header = document.getElementById('quizHeader')\n   const $title = document.getElementById('quizTitle')\n   const $list = document.getElementById('quizList')\n   const $optionList = document.getElementById('quizListOption')\n   const $answerButton = document.getElementById('quizAnswer')\n   const $progress = document.getElementById('quizProgress')\n\n   // Setting Default Values\n   // Настройка значений по умолчанию\n   let questionIndex = 0\n   let score = 0\n   let answersArr = []\n\n   clearContent() // clearText and HTML // Чистим текст и HTML\n   // Adding Listener to button that will check the Answers\n   // Добавление прослушивателя на кнопку, которая проверит ответы\n   $answerButton.addEventListener('click', checkAnswer)\n   $list.addEventListener('click', activeAnswer)\n   renderQuestion() // Rendering first question // Рендеринг первого вопроса\n   dynamicAdapt()\n\n   // function that clearText and HTML\n   // Функция, что чистит ТЕКСТ и HTML\n   function clearContent() {\n\n      $title.innerHTML = ''\n      $optionList.innerHTML = ''\n      $answerButton.innerHTML = ''\n\n   }\n\n   // Moving Elements according screen size  \n   // Движущиеся элементы в соответствии с размером экрана  \n   function dynamicAdapt() {\n\n      const innerWidth = document.documentElement.clientWidth\n      if (innerWidth <= 1280) {\n         $header.append($answerButton)\n         $answerButton.classList.add('_adaptive')\n      }\n\n   }\n\n   // Consistent rendering of each question\n   // Последовательный рендеринг каждого вопроса\n   function renderQuestion() {\n\n      const { question, answers, correct } = db[questionIndex]\n\n      $list.classList.add('animate__fadeIn')\n\n      $title.insertAdjacentText('afterbegin', question)\n\n      answers.forEach((option, index) => {\n         const correctAnswer = answers[correct - 1]\n         const correctIndex = index + 1\n\n         const optionTemplate = `\n         \n            <label class=\"list-option__item\">\n               <input class=\"list-option__radio\" data-value=\"${correctIndex}\" data-correct=\"${correctAnswer}\" type=\"radio\" name=\"quiz-options\">\n               <div class=\"list-option__button unselectable\">${option}</div>\n               <div class=\"list-option__shadow\"></div>\n            </label>\n\n         `;\n         $optionList.insertAdjacentHTML('afterbegin', optionTemplate)\n      })\n\n      let answerButtonTemplate\n      if (questionIndex === 0) {\n         answerButtonTemplate = `\n\n            <button class=\"answer-quiz__button\" id=\"quizAnswerButton\" style=\"opacity: 0\"><span class=\"answer-button__title\">next</span> <span class=\"answer-button__icon\"><img src=\"./components/Quiz/images/next.svg\" alt=\"next\"></span></button>\n        \n         `;\n      } else {\n         answerButtonTemplate = `\n\n            <button class=\"answer-quiz__button\" id=\"quizAnswerButton\"><span class=\"answer-button__title\">next</span> <span class=\"answer-button__icon\"><img src=\"./components/Quiz/images/next.svg\" alt=\"next\"></span></button>\n        \n         `;\n      }\n      $answerButton.insertAdjacentHTML('afterbegin', answerButtonTemplate)\n\n   }\n\n   // Dynamic behaviour of elements\n   // Динамическое поведение элементов\n   function activeAnswer(event) {\n\n      if (event.target.matches('.list-option__button')) {\n         $answerButton.querySelector('.answer-quiz__button').classList.add('_ready')\n         if (questionIndex === 0) {\n            $answerButton.querySelector('.answer-quiz__button').classList.add('animate__animated', 'animate__backInLeft', 'animate__fast')\n         } \n      }\n\n   }\n\n   //Checking answer\n   //Проверка ответа\n   function checkAnswer(event) {\n\n      const radioButton = $optionList.querySelector('input[type=\"radio\"]:checked')\n      let userAnswer\n      let correctAnswer\n\n      if (!radioButton) {\n         return\n      } else {\n         userAnswer = radioButton.nextElementSibling.textContent\n         correctAnswer = radioButton.getAttribute('name')\n      }\n\n      const obj = {\n         userAnswer: userAnswer,\n         correctAnswer: correctAnswer\n      }\n\n      const { correct } = db[questionIndex]\n\n      const valueRadioButtonString = radioButton.getAttribute('value')\n      const valueRadioButton = Number(valueRadioButtonString)\n\n      if (valueRadioButton !== correct) {\n      } else {\n         score++\n      }\n\n      $answerButton.querySelector('.answer-quiz__button').classList.add('_next')\n\n      function progressCalc() {\n\n         const currentIndex = questionIndex + 1\n         const percentage = currentIndex / db.length * 100\n\n         const $progressLine = $progress.querySelector('.progress-line')\n         $progressLine.style.width = percentage + '%'\n\n         const $progressNumber = $progress.querySelector('.progress-number')\n         $progressNumber.remove()\n         const progressNumberTemplate = `\n         \n            <div class=\"progress-number\"><span class=\"left\">${currentIndex}</span> <span class=\"right\">/${db.length}</span></span></div>\n\n         `;\n         $progress.insertAdjacentHTML('afterbegin', progressNumberTemplate)\n\n         return $progressLine\n\n      }\n\n      progressCalc()\n      nextQuestion(obj)\n\n      $list.classList.add('animate__fadeOut')\n      $list.addEventListener('animationend', () => {\n         $list.classList.remove('animate__fadeOut')\n      })\n\n   }\n\n   //Rendering next question\n   //Рендеринг следующего вопроса\n   function nextQuestion(answersArr) {\n\n      const questionLenght = db.length - 1\n\n      if (questionIndex !== questionLenght) {\n         questionIndex++\n         setTimeout(() => {\n            clearContent()\n            renderQuestion()\n         }, 500)\n      } else {\n         setTimeout(() => {\n            clearContent()\n            showResult(obj)\n         }, 1000)\n      }\n\n   }\n\n   function showResult(answersArr) {\n      \n\n\n   }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Quiz);\n\n\n//# sourceURL=webpack://quizapp/./source/pages/Quiz/Quiz.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./source/app.js");
/******/ 	
/******/ })()
;