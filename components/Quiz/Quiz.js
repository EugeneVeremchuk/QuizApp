
// Quiz Page
// Страница Викторины
const Quiz = () => {

   // function Render of Quiz page
   // функция Визуализация страницы викторины
   function renderPage() {

      const html = `
      
         <main class="quiz__page" id="quizPage">
            <div class="quiz__container" id="quizContainer">
               <header class="quiz__header header-quiz" id="quizHeader">
                  <div class="header-quiz__arrowback">
                     <img class="arrowback-back" src="./components/Quiz/images/arrow-back.svg" alt="arrowback">
                  </div>
                  <div class="header-quiz__progress" id="quizProgress">
                     <div class="progress-number"><span>0</span> / <span>4</span></div>
                     <div class="progress-line"></div>
                  </div>
               </header>
               <div class="quiz__list list-quiz" id="quizList">
                  <div class="list-quiz__title" id="quizTitle">question?</div>
                  <div class="list-quiz__option list-option" id="quizListOption"></div>
                  <div class="list-quiz__answer answer-quiz" id="quizAnswer">
                     <button class="answer-quiz__button" id="quizAnswerButton"><span class="answer-button__title">answer</span> <span class="answer-button__icon"><img src="./components/Quiz/images/next.svg" alt="next"></span></button>
                  </div>
               </div>
            </div>
         </main>
   
      `;

      ROOT.innerHTML = html

   }

   renderPage() // Render of Quiz page // Визуализация страницы викторины

   // Getting DOM Elements
   // Получение DOM-элементов
   const $page = document.getElementById('quizContainer')
   const $header = document.getElementById('quizHeader')
   const $title = document.getElementById('quizTitle')
   const $list = document.getElementById('quizList')
   const $optionList = document.getElementById('quizListOption')
   const $answerButton = document.getElementById('quizAnswer')
   const $progress = document.getElementById('quizProgress')

   // Setting Default Values
   // Настройка значений по умолчанию
   let questionIndex = 0
   let score = 0
   let answersArr = []
   let instanceAnswer

   clearContent() // clearText and HTML // Чистим текст и HTML
   // Adding Listener to button that will check the Answers
   // Добавление прослушивателя на кнопку, которая проверит ответы
   $answerButton.addEventListener('click', checkAnswer)
   $list.addEventListener('click', activeAnswer)
   renderQuestion() // Rendering first question // Рендеринг первого вопроса
   dynamicAdapt()

   // function that clearText and HTML
   // Функция, что чистит ТЕКСТ и HTML
   function clearContent() {

      $title.innerHTML = ''
      $optionList.innerHTML = ''
      $answerButton.innerHTML = ''

   }

   function dynamicAdapt() {

      const innerWidth = document.documentElement.clientWidth
      if (innerWidth <= 1280) {
         $header.append($answerButton)
         $answerButton.classList.add('_adaptive')
      }

   }

   // Consistent rendering of each question
   // Последовательный рендеринг каждого вопроса
   function renderQuestion() {

      const { question, answers, correct } = db[questionIndex]

      $title.insertAdjacentText('afterbegin', question)

      answers.forEach((option, index) => {

         const correctAnswer = answers[correct - 1]
         const correctIndex = index + 1

         const optionTemplate = `
         
            <label class="list-option__item">
               <input class="list-option__radio" data-value="${correctIndex}" data-correct="${correctAnswer}" type="radio" name="quiz-options">
               <div class="list-option__button">${option}</div>
               <div class="list-option__shadow"></div>
            </label>

         `;

         $optionList.insertAdjacentHTML('afterbegin', optionTemplate)

      })

      if (questionIndex === 0) {
         const answerButtonTemplate = `

            <button class="answer-quiz__button" id="quizAnswerButton" style="opacity: 0"><span class="answer-button__title">answer</span> <span class="answer-button__icon"><img src="./components/Quiz/images/next.svg" alt="next"></span></button>
        
         `;
         $answerButton.insertAdjacentHTML('afterbegin', answerButtonTemplate)
      } else {
         const answerButtonTemplate = `

            <button class="answer-quiz__button" id="quizAnswerButton"><span class="answer-button__title">answer</span> <span class="answer-button__icon"><img src="./components/Quiz/images/next.svg" alt="next"></span></button>
        
         `;
         $answerButton.insertAdjacentHTML('afterbegin', answerButtonTemplate)
      }

      instanceAnswer = tippy(document.getElementById('quizAnswerButton'))
      instanceAnswer.setProps({
         content: 'Выберите один из вариантов ответа',
         theme: 'quiz',
         arrow: false,
         trigger: 'click',
         animation: 'scale-extreme',
         onShow(instance) {
            $page.classList.add('animate__animated', 'animate__shakeX', 'animate__fast')
         },
         onHide(instance) {
            $page.classList.remove('animate__animated', 'animate__shakeX', 'animate__fast')
         }
      })
      instanceAnswer.enable()

   }

   function activeAnswer(event) {

      if (event.target.matches('.list-option__button')) {
         $answerButton.querySelector('.answer-quiz__button').classList.add('_ready')
         if (questionIndex === 0) {
            $answerButton.querySelector('.answer-quiz__button').classList.add('animate__animated', 'animate__backInLeft', 'animate__fast')
         } 
         instanceAnswer.disable()
      }

   }

   function checkAnswer(event) {

      const radioButton = $optionList.querySelector('input[type="radio"]:checked')
      let userAnswer
      let correctAnswer

      if (!radioButton) {
         return
      } else {
         userAnswer = radioButton.nextElementSibling.textContent
         correctAnswer = radioButton.getAttribute('name')
      }

      const obj = {
         userAnswer: userAnswer,
         correctAnswer: correctAnswer
      }

      answersArr.push(obj)

      const { correct } = db[questionIndex]

      const valueRadioButtonString = radioButton.getAttribute('value')
      const valueRadioButton = Number(valueRadioButtonString)

      if (valueRadioButton !== correct) {
      } else {
         score++
      }

      $answerButton.querySelector('.answer-quiz__button').classList.add('_next')

      function progressCalc() {

         const currentIndex = questionIndex + 1
         const percentage = currentIndex / db.length * 100

         const $progressLine = $progress.querySelector('.progress-line')

         $progressLine.style.width = percentage + '%'

         const $progressNumber = $progress.querySelector('.progress-number')

         $progressNumber.remove()
         const progressNumberTemplate = `
         
            <div class="progress-number"><span>${currentIndex}</span> / <span>${db.length}</span></div>

         `;
         $progress.insertAdjacentHTML('afterbegin', progressNumberTemplate)

         return $progressLine

      }

      progressCalc()
      nextQuestion(answersArr)

   }

   function nextQuestion(answersArr) {

      const questionLenght = db.length - 1

      if (questionIndex !== questionLenght) {
         questionIndex++
         setTimeout(() => {
            clearContent()
            renderQuestion()
         }, 500)
      } else {
         setTimeout(() => {
            clearContent()
            showResult(answersArr)
         }, 1000)
      }

   }

   function showResult(answersArr) {

      let finishButton

      const resultTemplate = `
      
         <h2 class="title-result">Результаты:</h2>
         <h3 class="summary">Спасибо что прошли наш тест</h3>
         <p class="result">Ваш результат ${score}</p>
   
      `;
      $header.insertAdjacentHTML('afterbegin', resultTemplate)

      answersArr.forEach((item) => {

         const { userAnswer, correctAnswer } = item

      })


      finishButton = document.createElement('div')
      finishButton.classList.add('finishButton')
      const buttonInner = `
      
         <button class="quiz-submit submit" id="submit">Попробывать еще</button>
   
      `;
      $header.after(finishButton)
      finishButton.insertAdjacentHTML('afterbegin', buttonInner)

      const buttonFinish = finishButton.querySelector('button')
      buttonFinish.addEventListener('click', renderNewQuiz, { once: true })

      function renderNewQuiz(event) {

         const progressLine = progressCalc()
         progressLine.style.width = '0%'

         questionIndex = 0
         finishButton.remove()
         clearPage()
         showQuestion()
         return

      }

   }

}
