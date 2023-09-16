const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "Which Ethiopian tourist site is a medieval fortress city known for its well-preserved castles and unique architectural style?",
    choice1: "Lalibela",
    choice2: "Axum",
    choice3: "Gonder",
    choice4: "Harar",
    answer: 3
  },
  {
    question: "Which Ethiopian tourist site is a UNESCO World Heritage Site and is home to the largest concentration of rock art in Africa?",
    choice1: "Lake Tana",
    choice2: "Denakil Depression",
    choice3: "Harar",
    choice4: "Tiya",
    answer: 4
  },
  {
    question: "Which Ethiopian tourist site is a remote valley known for its diverse tribal communities and rich cultural traditions?",
    choice1: "Blue Nile Falls",
    choice2: "Omo Valleys",
    choice3: "Bale Mountains NAtional Park",
    choice4: "Lalibela",
    answer: 2
  },
  {
    question: "Which Ethiopian tourist site is a national park that is home to the endangered Ethiopian wolf, the rare Walia ibex, and breathtaking mountain landscapes?",
    choice1: "Axum",
    choice2: "Bale Mountains NAtional Park",
    choice3: "Semein Mountains NAtional Park",
    choice4: "Lake Shala",
    answer: 3
  },
  {
    question: "Which Ethiopian tourist site is known for its unique geological features, such as the Erta Ale volcano and the colorful Dallol sulfur springs?",
    choice1: "Denakil Depression",
    choice2: "Lake Tana",
    choice3: "Lalibela",
    choice4: "Harar",
    answer: 1
  }  
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();