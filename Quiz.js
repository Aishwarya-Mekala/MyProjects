
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const feedbackElement = document.getElementById("feedback");
const scoreElement = document.getElementById("score");
const nextButton = document.getElementById("nextButton");

let currentQuestion = 0;
let score = 0;

const questions = [
    {
        question: "Which language is used to style a web page?",
        answers: ["HTML", "CSS", "JavaScript", "Java"],
        correct: "CSS"
    },
    {
        question: "Which language adds interactivity to a web page?",
        answers: ["CSS", "HTML", "JavaScript", "SQL"],
        correct: "JavaScript"
    },
    {
        question: "Which HTML tag is used for a paragraph?",
        answers: ["<h1>", "<img>", "<p>", "<div>"],
        correct: "<p>"
    }
];

function showQuestion() {
    // Check whether all questions are completed
    if (currentQuestion >= questions.length) {
        questionElement.textContent = "Quiz Completed! 🎉";
        answersElement.innerHTML = "";
        feedbackElement.textContent =
            "Your final score is " + score + " out of " + questions.length + ".";
        scoreElement.textContent = "";
        nextButton.disabled = true;
        nextButton.textContent = "Quiz Finished";
        return;
    }

    const question = questions[currentQuestion];

    questionElement.textContent =
        (currentQuestion + 1) + ". " + question.question;

    feedbackElement.textContent = "";
    nextButton.disabled = true;

    showAnswers();
}

function showAnswers() {
    const question = questions[currentQuestion];

    answersElement.innerHTML = "";

    question.answers.forEach(function (answer) {
        const button = document.createElement("button");

        button.textContent = answer;

        button.addEventListener("click", function () {
            checkAnswer(answer);
        });

        answersElement.appendChild(button);
    });
}

function checkAnswer(selectedAnswer) {
    const question = questions[currentQuestion];

    // Prevent the user from answering more than once
    const answerButtons = answersElement.querySelectorAll("button");

    answerButtons.forEach(function (button) {
        button.disabled = true;
    });

    if (selectedAnswer === question.correct) {
        feedbackElement.textContent = "Correct! 🎉";
        score++;
    } else {
        feedbackElement.textContent =
            "Wrong answer! Correct answer: " + question.correct;
    }

    scoreElement.textContent = "Score: " + score;
    nextButton.disabled = false;
}

nextButton.addEventListener("click", function () {
    currentQuestion++;
    showQuestion();
});

// Start the quiz
showQuestion();
