
const questions = [
    {
        question: "The full form of CSS is:",
        options: [
            " CSS is the language used to style the HTML documents",
            " CSS is a style sheet language",
            " CSS is designed to separate including layout, colors, and fonts",
            " All of the mentioned"
        ],
        answer: 1
    },
    {
        question: "Which of the following colors contain equal amounts of RBG?",
        options: [
            " White",
            " Gray",
            " Black",
            " All of the above"
        ],
        answer: 4
    },
    {
        question: "CSS stands for -",
        options: [
            " Cascade style sheets",
            " Color and style sheets",
            " Cascading style sheets",
            " None of the above"
        ],
        answer: 3
    },
    {
        question: "The CSS property used to control the element's font-size is -",
        options: [
            " text-style",
            " font-size",
            " text-size",
            " None of the above"
        ],
        answer: 2
    },
    {
        question: "Which one of the following also known as Conditional Expression:",
        options: [
            " Alternative to if-else",
            " Switch statement",
            " If-then-else statement",
            " immediate if",
        ],
        answer: 4
    },
    {
        question: "When interpreter encounters an empty statements, what it will do:",
        options: [
            " Ignores the statements",
            " Shows a warning",
            " Prompts to complete the statement",
            " Throws an error",
        ],
        answer: 1
    },
];

let currentQuestionIndex = 0;
let score = 0;
const answers = Array(questions.length).fill(null);

const questionElement = document.getElementById('question');
const optionsElements = document.querySelectorAll('input[name="answer"]');
const optionsLabels = [
    document.getElementById('opt1'), 
    document.getElementById('opt2'), 
    document.getElementById('opt3'), 
    document.getElementById('opt4')
];
const previousButton = document.getElementById('previous-btn');
const submitButton = document.getElementById('submit-btn');
const resultContainer = document.getElementById('result-container');
const quizContainer = document.getElementById('quiz');
const scoreElement = document.getElementById('score');

function startGame() {
    resetGame();
    displayQuestion();
    QuizVisibility(true);
}



function QuizVisibility(showQuiz) {
    if (showQuiz) {
        quizContainer.style.display = 'block';
        resultContainer.style.display = 'none';
    } else {
        quizContainer.style.display = 'none';
        resultContainer.style.display = 'block';
    }
}

function updateQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
}

function updateOptions() {
    const currentQuestion = questions[currentQuestionIndex];
    
    optionsLabels.forEach((label, index) => {
        label.innerText = currentQuestion.options[index];
    });
}


function displayQuestion() {
    updateQuestion();
    updateOptions();
    restorePreviousAnswer();
    updatePreviousButtonState();
}

function restorePreviousAnswer() {
    const selectedAnswer = answers[currentQuestionIndex];
    for (let index = 0; index < optionsElements.length; index++) {
        optionsElements[index].checked = index === selectedAnswer;
    }
}

function updatePreviousButtonState() {
    previousButton.disabled = currentQuestionIndex === 0;
}

function recordAnswer() {
    const selectedOption = getSelectedOption();
    
    if (selectedOption === -1) {
        console.log('alert');
        alert("Please select an answer before proceeding.");
        return false;
        
    }
    
    console.log(`Selected option for question ${currentQuestionIndex }: ${selectedOption}`);
    answers[currentQuestionIndex] = selectedOption;
    return true;
}

function getSelectedOption() {
    return Array.from(optionsElements).findIndex(input => input.checked);
}

function nextQuestion() {
    if (!recordAnswer()) return;
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        displayResult();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

function calculateScore() {
    let score = 0;
    
    for (let index = 0; index < answers.length; index++) {
        const answer = answers[index];
        const correctAnswer = questions[index].answer - 1;
        
        console.log(`Question ${index + 1}: Selected Answer = ${answer}, Correct Answer = ${correctAnswer}`);
        
        if (answer === correctAnswer) {
            score++;
        }
    }
    return score;
}


function displayResult() {
    score = calculateScore();
    scoreElement.innerText = `Your score is: ${score}/${questions.length}`;
    QuizVisibility(false);
}

function resetGame() {
    currentQuestionIndex = 0;
    score = 0;
    answers.fill(null);
}

submitButton.addEventListener('click', nextQuestion);
previousButton.addEventListener('click', previousQuestion);
document.getElementById('play-again-btn').addEventListener('click', startGame);

startGame();


