const questionContainer = document.querySelector('#question-container');
const durationElement = document.querySelector('.duration');
const duration = parseInt(durationElement.textContent);
const timerElement = document.querySelector('.timer');
const answerForm = document.getElementById('answer-form');
const answerInput = document.getElementById('answer-input');
let timeLeft = duration;
let questionIndex = 0;
let score = 0;
const operators = ['+', '-', '*', '/'];

function generateQuestions() {
    const questions = [];
    let i = 0;
    while (questions.length !== 500) {
        const num1 = Math.floor(Math.random() * 100);
        const num2 = Math.floor(Math.random() * 100);
        if ((num1 / num2) % 1 !== 0 || (num1 - num2) <= 0) {
            continue;
        }
        const operator = operators[Math.floor(Math.random() * operators.length)];
        const question = `${num1} ${operator} ${num2}`;
        questions.push(question);
        i++;
    }

    return questions;
}


function displayQuestion(question) {
    console.log(question);
    questionContainer.innerHTML = `<h3>${question}</h3>`;
    answerInput.focus();
}

function checkAnswer(answer) {
    const currentQuestion = questions[questionIndex];
    const correctAnswer = eval(currentQuestion);
    console.log(`Comparing ${correctAnswer} & ${answer}`)
    // console.log(correctAnswer);
    if (answer === correctAnswer) {
        score++;    
    } else {
        score = score - 2;
    }
    console.log(`score - ${score}`);
    questionIndex++;
    if (questionIndex >= questions.length) {
        displayScore();
    } else {
        displayQuestion(questions[questionIndex]);
    }
    answerInput.value = '';
    answerInput.focus();
}

function displayScore() {
    questionContainer.innerHTML = `
      <h3>Game Over!</h3>
      <p>Your score is ${score} out of ${questions.length}.</p>
    `;
    answerInput.disabled = true;
}

function updateTimer() {
    const seconds = timeLeft;
    timerElement.textContent = `${seconds}`;
    timeLeft--;

    if (timeLeft < 0) {
        clearInterval(timerInterval);
        // redirect to the result page
        window.location.href = '/result';
    }
}

questions = generateQuestions();
console.log(questions);
displayQuestion(questions[0]);

answerInput.addEventListener('input', (event) => {
    const answer = event.target.value.trim();
    const ans = eval(questions[questionIndex]).toString();
    if (answer.length === ans.length) {
        checkAnswer(parseInt(answer));
    }
});

// answerForm.addEventListener('submit', (event) => {
//     event.preventDefault();
//     const answer = answerInput.value.trim();
//     if (answer !== '') {
//         checkAnswer(answer);
//     }
// });


const timerInterval = setInterval(updateTimer, 1000);