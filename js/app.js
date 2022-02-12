
import { questions } from './db.js'

document.addEventListener('DOMContentLoaded', (event) => {

	const header = document.getElementById('header')
	const list = document.getElementById('list')
	const button = document.getElementById('button')
	const progress = document.getElementById('progress')
	const quiz = document.getElementById('quiz')

	let questionIndex = 0
	let score = 0
	let answersArr = []

	clearPage()
	button.addEventListener('click', checkAnswer)
	showQuestion()

	function clearPage() {

		header.innerHTML = ``
		list.innerHTML = ``
		button.innerHTML = ``

	}

	function animateQuestion() {

		setTimeout(animation, 100)

		function animation() {

			progress.classList.add('progress-animation')

			const title = header.querySelector('.title')
			title.classList.add('title-animation')

			const labels = list.querySelectorAll('label')
			const labelsArr = Array.from(labels)
			const InLabel = setInterval(labelShow, 100)

			let counter = 0

			const { answers } = questions[questionIndex]
			const answerLenght = answers.length

			function labelShow() {

				if (counter !== answerLenght) {
					labelsArr[counter].classList.add('label-animation')
					counter++
				} else {
					clearInterval(InLabel)
				}

			}

		}

	}

	function progressCalc() {

		const currentIndex = questionIndex + 1
		const percentage = currentIndex / questions.length * 100
		const progressLine = progress.querySelector('.progress-line')
		progressLine.style.width = percentage + '%'

		return progressLine

	}

	function showQuestion() {

		const { question, answers, correct } = questions[questionIndex]

		animateQuestion()

		const correctAnswer = answers[correct - 1]

		const headerTitle = `
		
			<h2 class="title">${question}</h2>

		`;
		header.insertAdjacentHTML('afterbegin', headerTitle)

		answers.forEach((item, index) => {

			const correctIndex = index + 1

			const questionTemplate = `
			
				<li>
					<label>
						<input value="${correctIndex}" type="radio" class="answer" name="${correctAnswer}" />
						<span>${item}</span>
					</label>
		   	</li>
			
			`;

			list.insertAdjacentHTML('afterbegin', questionTemplate)

		})

		const buttonInnerAnswer = `
		
			<button class="quiz-submit submit" id="submit">Ответить</button>

		`;
		button.insertAdjacentHTML('afterbegin', buttonInnerAnswer)

	}

	function checkAnswer(event) {

		const radioButton = list.querySelector('input[type="radio"]:checked')
		const userAnswer = radioButton.nextElementSibling.textContent
		const correctAnswer = radioButton.getAttribute('name')

		const obj = {
			userAnswer: userAnswer,
			correctAnswer: correctAnswer
		}

		answersArr.push(obj)

		const { correct } = questions[questionIndex]

		if (!radioButton) {
			//alert('Выберите вариант ответа!')
			return
		}

		const valueRadioButtonString = radioButton.getAttribute('value')
		const valueRadioButton = Number(valueRadioButtonString)

		if (valueRadioButton !== correct) {
		} else {
			score++
		}

		progressCalc()
		nextQuestion(answersArr)

	}

	function nextQuestion(answersArr) {

		const questionLenght = questions.length - 1

		if (questionIndex !== questionLenght) {
			questionIndex++
			setTimeout(() => {
				clearPage()
				showQuestion()
			}, 500)
		} else {
			setTimeout(() => {
				clearPage()
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
		header.insertAdjacentHTML('afterbegin', resultTemplate)

		answersArr.forEach((item) => {

			const { userAnswer, correctAnswer } = item

		})


		finishButton = document.createElement('div')
		finishButton.classList.add('finishButton')
		const buttonInner = `
		
			<button class="quiz-submit submit" id="submit">Попробывать еще</button>
	
		`;
		header.after(finishButton)
		finishButton.insertAdjacentHTML('afterbegin', buttonInner)

		const buttonFinish = finishButton.querySelector('button')
		console.log(buttonFinish)
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

})