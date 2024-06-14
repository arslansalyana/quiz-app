const questions = [
    {
        question : "Which is largest animal in the world?",
        answers: [
            {text: 'Shark', correct: false},
            {text: 'Blue Whale', correct: true},
            {text: 'Elephant', correct: false},
            {text: 'Giraffee', correct: false}
        ]
    },
    {
        question : "Which is smallest country in the world?",
        answers: [
            {text: 'vetican city', correct: true},
            {text: 'Bhottan', correct: false},
            {text: 'Nepal', correct: false},
            {text: 'Siri Lanka', correct: false}
        ]
    },
    {
        question : "Which is largest desert in the world?",
        answers: [
            {text: 'Kalahari', correct: false},
            {text: 'Gobi', correct: false},
            {text: 'Sahara', correct: false},
            {text: 'Antarctica', correct: true}
        ]
    },
    {
        question : "Which is the smallest continent in the world?",
        answers: [
            {text: 'Asia', correct: false},
            {text: 'Australia', correct: true},
            {text: 'North America', correct: false},
            {text: 'Africa', correct: false}
        ]
    },
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

//default initial state
let currentQuestionIndex = 0;
let score = 0;

//select Answer Function
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect === true){
        selectedBtn.classList.add('correct');
        score++;
    }
    else{
        selectedBtn.classList.add('incorrect');
    }

    //make a new array from answer buttons
    Array.from(answerButtons.children).forEach((button)=>{
        if(button.dataset.correct=== 'true'){
            button.classList.add('correct');
        }
        button.disabled = true;
    })
    nextButton.style.display = 'block';
}

//display the quiz questions
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber =  currentQuestionIndex + 1;

    //show the question in questionElement
    questionElement.innerHTML = `${questionNumber} . ${currentQuestion.question}`;

    //show the possible answers in answerButtons
    currentQuestion.answers.forEach((answer)=>{
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);

        //whether answer is correct
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });

}

function resetState(){
    nextButton.style.display = 'none';
    while (answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

//Main function to start the quiz
function startQuiz(){
    nextButton.innerHTML = 'Next'
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = 'block';
}

function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length){
        showQuestion();
    }
    else {
        showScore();
    }
}

nextButton.addEventListener('click', ()=>{
    if (currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();