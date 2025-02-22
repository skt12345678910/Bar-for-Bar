let currentQuestionIndex = 0;
let answerCount = 0;
let questionCount = 1;
let nextQuestionCount = 1;
let questions = [];
let summaryList = [];
let lyric = " ";

// Load trivia questions from questions.json
async function loadQuestions() {
    const response = await fetch('questions.json');
    questions = await response.json();
    displayQuestion();
}

// Display a question
function displayQuestion() {
    const lyricElement = document.getElementById("lyric");
    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");
    const resultElement = document.getElementById("result");

    resultElement.innerText = "";
    answersElement.innerHTML = "";

    let questionData = questions[currentQuestionIndex];
    questionElement.innerText = questionData.question;
    lyricElement.innerText = questionData.lyric;

    questionData.answers.forEach(answer => {
        let button = document.createElement("button");
        button.innerText = answer;
        button.onclick = () => checkAnswer(answer);
        answersElement.appendChild(button);
    });
}

// Check if answer is correct
function checkAnswer(answer) {
    const resultElement = document.getElementById("result");
    answerCount++;
    questionCount++;
    if (answer === questions[currentQuestionIndex].correct) {
        resultElement.innerText = "✅ Correct!";
        summaryList.push("✅ Correct! It was: " + questions[currentQuestionIndex].correct);
    } 
    else {
        resultElement.innerText = "❌ Wrong! Correct answer: " + questions[currentQuestionIndex].correct;
        summaryList.push("❌ Wrong! Correct answer: " + questions[currentQuestionIndex].correct);
    }
    if(questionCount > questions.length) {
        document.getElementById("myButton").innerText = "That's it! New lyric at 12 am EST";
        document.getElementById("summaryTitle").innerText = "Summary:";
        document.getElementById("supportTitle").innerText = "Support:";
        document.getElementById("support1").innerText = "If you enjoy playing Bar for Bar and would like to support you can click the button below.";
        document.getElementById("support2").innerText = "Supporters get to request songs, albums, or artists for future days.";
        document.getElementById("support3").innerText = "Just put your request in the description of your donation.";
        document.getElementById("supportButton").innerText = "Buy me a Coffee";
        document.getElementById("supportButton").style.backgroundColor = "#b63000";
        document.getElementById("support4").innerText = "Your help is appreciated! 😊";
        const firstAnswer = document.getElementById("summary1");
        const secondAnswer = document.getElementById("summary2");
        const thirdAnswer = document.getElementById("summary3");
        const fourthAnswer = document.getElementById("summary4");
        firstAnswer.innerText = summaryList[0];
        secondAnswer.innerText = summaryList[1];
        thirdAnswer.innerText = summaryList[2];
        fourthAnswer.innerText = summaryList[3];
    }
}

// Load next question
function nextQuestion() {
    if(questionCount <= questions.length && nextQuestionCount == answerCount) {
        currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
        nextQuestionCount++;
        displayQuestion();
    }
}

// Load questions when the page opens
window.onload = loadQuestions;
