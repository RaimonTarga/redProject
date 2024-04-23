import questions from "./questions.json" assert {type: "json"}
const progressBar = document.getElementById('progressBar')
const mainDisplay = document.getElementById('mainDisplay')
const typeContainer = document.getElementById('typeContainer')
const nextContainer = document.getElementById('nextContainer')
const resultContainer = document.getElementById('resultContainer')
const nextButton = document.getElementById('nextButton')
const displayImage = document.getElementById('displayImage')
const answersContainer = document.getElementById('answersContainer')
const answerButtons = answersContainer.children

const UNENHANCED_PATTERNS = [
    "Donut",
    "Stay",
    "Side safe",
    "Pacman"
]

const ENHANCED_PATTERNS = [
    "Cardinals",
    "Rotate",
    "Back safe",
    "Pacman"
]

const MAX_TIME = 300
let timeRemaining = 300
setInterval(updateTimer, 10)
let timerPaused = false

function updateTimer(){
    if (!timerPaused){
        timeRemaining -= 1
        progressBar.style = "width:"+ ((timeRemaining/MAX_TIME)*100) + "%"
        if (timeRemaining == 0){
            answerQuestion(4)
            timerPaused = true
        }
    }
}

nextButton.onclick = function(){
    nextQuestion()
}

let questionIndex = 0
let currentQuestion = questions[questionIndex]
prepareQuestion()

for (let index = 0; index < answerButtons.length; index++){
    answerButtons[index].onclick = function(){
        answerQuestion(index)
    }
}

function answerQuestion(answerIndex){
    timerPaused = true
    if (currentQuestion.correct_answer == answerIndex){
        resultContainer.innerHTML = "correct"
        resultContainer.classList.add('Correct-Answer')
        resultContainer.classList.remove('Incorrect-Answer')
    }
    else {
        resultContainer.innerHTML = "incorrect"
        resultContainer.classList.remove('Correct-Answer')
        resultContainer.classList.add('Incorrect-Answer')
    }
    nextContainer.style = "display:grid"
    answersContainer.style = "display:none"
    
}

function prepareQuestion(){
    typeContainer.innerHTML = currentQuestion.pattern_type
    displayImage.src = "img/"+ currentQuestion.url + ".png"
    for (let index = 0; index < answerButtons.length; index++){
        if (currentQuestion.pattern_type == "unenhanced"){
            answerButtons[index].innerHTML = UNENHANCED_PATTERNS[index]
            typeContainer.classList.add('Enhanced')
            typeContainer.classList.remove('Unenhanced')
        }
        else {
            answerButtons[index].innerHTML = ENHANCED_PATTERNS[index]
            typeContainer.classList.remove('Enhanced')
            typeContainer.classList.add('Unenhanced')
        }
    }
    if (currentQuestion.pattern_type == "unenhanced"){
        typeContainer.classList.remove('Enhanced')
        typeContainer.classList.add('Unenhanced')
    }
    else {
        typeContainer.classList.add('Enhanced')
        typeContainer.classList.remove('Unenhanced')
    }
    nextContainer.style = "display:none"
    answersContainer.style = "display:grid"
    timeRemaining = 300
    timerPaused = false
}

function nextQuestion(){
    questionIndex++;
    if (questionIndex >= questions.length) questionIndex = 0
    currentQuestion = questions[questionIndex]
    prepareQuestion()
}