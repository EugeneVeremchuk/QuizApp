/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./dev/pages/Quiz/Quiz.js":
/*!********************************!*\
  !*** ./dev/pages/Quiz/Quiz.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Quiz_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Quiz.scss */ "./dev/pages/Quiz/Quiz.scss");
 // Quiz Page
// Страница Викторины

const Quiz = () => {
  // function Render of Quiz page
  // функция Визуализация страницы викторины
  function renderPage() {
    const html = `
      
         <main class="quiz__page" id="quizPage">
            <div class="quiz__page-container">
               <header class="quiz__header header-quiz" id="quizHeader">
                  <div class="header-quiz__arrowback unselectable">
                     <img class="arrowback-back" src="./components/Quiz/images/arrow-back.svg" alt="arrowback">
                  </div>
                  <div class="header-quiz__progress unselectable" id="quizProgress">
                     <div class="progress-number"><span class="left">0</span> <span class="right">/4</span></div>
                     <div class="progress-line"></div>
                  </div>
               </header>
               <div class="quiz__container animate__animated animate__faster animate__fadeIn" id="quizContainer">
                  <div class="quiz__list list-quiz animate__animated animate__faster" id="quizList">
                     <div class="list-quiz__title" id="quizTitle">question?</div>
                     <div class="list-quiz__option list-option" id="quizListOption"></div>
                     <div class="list-quiz__answer answer-quiz" id="quizAnswer">
                     <button class="answer-quiz__button" id="quizAnswerButton"><span class="answer-button__title">answer</span> <span class="answer-button__icon"><img src="./components/Quiz/images/next.svg" alt="next"></span></button>
                     </div>
                  </div>
               </div>
            </div>
         </main>
   
      `;
    ROOT.innerHTML = html;
  }

  renderPage(); // Render of Quiz page // Визуализация страницы викторины
  // Getting DOM Elements
  // Получение DOM-элементов

  const $page = document.getElementById('quizPage');
  const $header = document.getElementById('quizHeader');
  const $title = document.getElementById('quizTitle');
  const $list = document.getElementById('quizList');
  const $optionList = document.getElementById('quizListOption');
  const $answerButton = document.getElementById('quizAnswer');
  const $progress = document.getElementById('quizProgress'); // Setting Default Values
  // Настройка значений по умолчанию

  let questionIndex = 0;
  let score = 0;
  let answersArr = [];
  clearContent(); // clearText and HTML // Чистим текст и HTML
  // Adding Listener to button that will check the Answers
  // Добавление прослушивателя на кнопку, которая проверит ответы

  $answerButton.addEventListener('click', checkAnswer);
  $list.addEventListener('click', activeAnswer);
  renderQuestion(); // Rendering first question // Рендеринг первого вопроса

  dynamicAdapt(); // function that clearText and HTML
  // Функция, что чистит ТЕКСТ и HTML

  function clearContent() {
    $title.innerHTML = '';
    $optionList.innerHTML = '';
    $answerButton.innerHTML = '';
  } // Moving Elements according screen size  
  // Движущиеся элементы в соответствии с размером экрана  


  function dynamicAdapt() {
    const innerWidth = document.documentElement.clientWidth;

    if (innerWidth <= 1280) {
      $header.append($answerButton);
      $answerButton.classList.add('_adaptive');
    }
  } // Consistent rendering of each question
  // Последовательный рендеринг каждого вопроса


  function renderQuestion() {
    const {
      question,
      answers,
      correct
    } = db[questionIndex];
    $list.classList.add('animate__fadeIn');
    $title.insertAdjacentText('afterbegin', question);
    answers.forEach((option, index) => {
      const correctAnswer = answers[correct - 1];
      const correctIndex = index + 1;
      const optionTemplate = `
         
            <label class="list-option__item">
               <input class="list-option__radio" data-value="${correctIndex}" data-correct="${correctAnswer}" type="radio" name="quiz-options">
               <div class="list-option__button unselectable">${option}</div>
               <div class="list-option__shadow"></div>
            </label>

         `;
      $optionList.insertAdjacentHTML('afterbegin', optionTemplate);
    });
    let answerButtonTemplate;

    if (questionIndex === 0) {
      answerButtonTemplate = `

            <button class="answer-quiz__button" id="quizAnswerButton" style="opacity: 0"><span class="answer-button__title">next</span> <span class="answer-button__icon"><img src="./components/Quiz/images/next.svg" alt="next"></span></button>
        
         `;
    } else {
      answerButtonTemplate = `

            <button class="answer-quiz__button" id="quizAnswerButton"><span class="answer-button__title">next</span> <span class="answer-button__icon"><img src="./components/Quiz/images/next.svg" alt="next"></span></button>
        
         `;
    }

    $answerButton.insertAdjacentHTML('afterbegin', answerButtonTemplate);
  } // Dynamic behaviour of elements
  // Динамическое поведение элементов


  function activeAnswer(event) {
    if (event.target.matches('.list-option__button')) {
      $answerButton.querySelector('.answer-quiz__button').classList.add('_ready');

      if (questionIndex === 0) {
        $answerButton.querySelector('.answer-quiz__button').classList.add('animate__animated', 'animate__backInLeft', 'animate__fast');
      }
    }
  } //Checking answer
  //Проверка ответа


  function checkAnswer(event) {
    const radioButton = $optionList.querySelector('input[type="radio"]:checked');
    let userAnswer;
    let correctAnswer;

    if (!radioButton) {
      return;
    } else {
      userAnswer = radioButton.nextElementSibling.textContent;
      correctAnswer = radioButton.getAttribute('name');
    }

    const obj = {
      userAnswer: userAnswer,
      correctAnswer: correctAnswer
    };
    const {
      correct
    } = db[questionIndex];
    const valueRadioButtonString = radioButton.getAttribute('value');
    const valueRadioButton = Number(valueRadioButtonString);

    if (valueRadioButton !== correct) {} else {
      score++;
    }

    $answerButton.querySelector('.answer-quiz__button').classList.add('_next');

    function progressCalc() {
      const currentIndex = questionIndex + 1;
      const percentage = currentIndex / db.length * 100;
      const $progressLine = $progress.querySelector('.progress-line');
      $progressLine.style.width = percentage + '%';
      const $progressNumber = $progress.querySelector('.progress-number');
      $progressNumber.remove();
      const progressNumberTemplate = `
         
            <div class="progress-number"><span class="left">${currentIndex}</span> <span class="right">/${db.length}</span></span></div>

         `;
      $progress.insertAdjacentHTML('afterbegin', progressNumberTemplate);
      return $progressLine;
    }

    progressCalc();
    nextQuestion(obj);
    $list.classList.add('animate__fadeOut');
    $list.addEventListener('animationend', () => {
      $list.classList.remove('animate__fadeOut');
    });
  } //Rendering next question
  //Рендеринг следующего вопроса


  function nextQuestion(answersArr) {
    const questionLenght = db.length - 1;

    if (questionIndex !== questionLenght) {
      questionIndex++;
      setTimeout(() => {
        clearContent();
        renderQuestion();
      }, 500);
    } else {
      setTimeout(() => {
        clearContent();
        showResult(obj);
      }, 1000);
    }
  }

  function showResult(answersArr) {}
};

/* harmony default export */ __webpack_exports__["default"] = (Quiz);

/***/ }),

/***/ "./dev/pages/Quiz/Quiz.scss":
/*!**********************************!*\
  !*** ./dev/pages/Quiz/Quiz.scss ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./dev/style.scss":
/*!************************!*\
  !*** ./dev/style.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!********************!*\
  !*** ./dev/app.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pages_Quiz_Quiz_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pages/Quiz/Quiz.js */ "./dev/pages/Quiz/Quiz.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./dev/style.scss");

 // Loading Page
// Загрузка страницы

document.addEventListener('DOMContentLoaded', event => {
  (0,_pages_Quiz_Quiz_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
});
}();
/******/ })()
;
//# sourceMappingURL=index.js.map