const QUESTIONELEMENT = document.getElementById('question');
const OPTIONA = document.getElementById('optionA');
const OPTIONB = document.getElementById('optionB');
const OPTIONC = document.getElementById('optionC');
const OPTIOND = document.getElementById('optionD');
const PROGRESSBAR = document.getElementById('progressBar');
const PROGRESSTEXT = document.getElementById('progressText');

const OPTIONS = [OPTIONA, OPTIONB, OPTIONC, OPTIOND];
const userAnswers = []

let timeLeft = 60;
let timerInterval;

const TIMER = document.getElementById('timer');


const PREVIOUSBTN = document.getElementById('prevBtn');
const NEXTBTN = document.getElementById('nextBtn');


function updateProgress() {
  const answeredCount = userAnswers.filter(
    answer => answer !== undefined
  ).length;

  const total = Questionarr.length;
  const percentage = (answeredCount / total) * 100;

  PROGRESSBAR.style.width = `${percentage}%`;
  PROGRESSTEXT.textContent = `${answeredCount} / ${total} answered`;
}

const  Questionarr = [
{question: 'Which HTML tag is used to define the structure of a web page?', 
    options: ['<head>','<html>','<body>','<section>'], answer: 1 },
{question: 'Which HTML tag is used to display an image ?', options: ['<image>','<img>','<src>','<picture>'], answer: 1 },

{question: 'What attribute is used to provide alternative text for an image?', 
    options: ['title','name','alt','src'], answer: 2 },

{question: 'Which CSS property is used to change text color?',
     options: ['font-color','text-color','color','background-color'], 
     answer: 2 },

{question: 'Which CSS property controls the space inside an element?', 
    options: ['margin','padding','border','gap'],
     answer: 1 },

{question: 'Which CSS display value places elements in a row by default?',
     options: ['block','inline','flex','none'], answer: 2 },

{question: 'How do you select an element with the class name box in CSS?',
     options: ['#box','.box','box','*box'], answer: 1 },

{question: 'Which HTML element is used for the largest heading?', 
    options: ['<h6>','<heading>','<h1>','<head>'], answer: 2 },

{question: 'Which JavaScript keyword is used to declare a constant variable?',
     options: ['var','let','const','static'], answer: 2 },

{question: 'What will console.log(2 + "2"); output?',
     options: ['4','"22"','NaN','undefined'],
      answer: 1 },

{question: 'Which method is used to select an element by ID in JavaScript?',
    options: ['getElementByClass()','querySelectorAll()','getElementById()','selectById()'],
     answer: 2 },

{question: 'Which symbol is used for comments in CSS?',
     options: ['//','#','<!-- -->','/* */'],
      answer: 3 },

{question: 'Which HTML tag is used to create a button?', 
    options: ['<input>','<btn>','<click>','<button>'],
     answer: 3 },

{question: 'What does the addEventListener() method do in JavaScript?', 
    options: ['Adds styles to an element','Executes code when an event occurs','Creates a new HTML element','Removes an event'],
     answer: 1 },

{question: 'Which CSS unit is relative to the screen size?', 
    options: ['px','em','%','vw'],
     answer: 3 },
]

function shuffleArray(array) {
  array.sort(() => Math.random() - 0.5);
}



let currentIndex = 0;

function showQuestion() {

  const currentQuestion = Questionarr[currentIndex];

  QUESTIONELEMENT.textContent = currentQuestion.question;

  optionA.textContent = currentQuestion.options[0];
  optionB.textContent = currentQuestion.options[1];
  optionC.textContent = currentQuestion.options[2];
  optionD.textContent = currentQuestion.options[3];

  OPTIONS.forEach(option => {
    option.classList.remove(
      'bg-blue-500',
      'text-white'
    );
  });

  if (userAnswers[currentIndex] !== undefined) {
    highlightOption(userAnswers[currentIndex]);
  }

}


shuffleArray(Questionarr);
showQuestion();
startTimer();
updateProgress();



const showNext = () => {
  if (currentIndex < Questionarr.length - 1) {
    currentIndex++;
    showQuestion();
  }else {
    showResult();
  }

}

NEXTBTN.addEventListener('click',showNext);


const showPrev = () => {
     if (currentIndex > 0) {
    currentIndex--;
    showQuestion();
  }
}

PREVIOUSBTN.addEventListener('click', showPrev);


function selectAnswer(optionIndex) {
  userAnswers[currentIndex] = optionIndex;
  highlightOption(optionIndex);
   updateProgress();
}


optionA.addEventListener('click', () => selectAnswer(0));
optionB.addEventListener('click', () => selectAnswer(1));
optionC.addEventListener('click', () => selectAnswer(2));
optionD.addEventListener('click', () => selectAnswer(3));


function calculateScore() {
  let score = 0;

  for (let i = 0; i < Questionarr.length; i++) {
    if (userAnswers[i] === Questionarr[i].answer) {
      score++;
    }
  }

  return score;
}



function highlightOption(selectedIndex) {
  OPTIONS.forEach((option, index) => {
    option.classList.remove(
      'bg-blue-500',
      'text-white'
    );

    if (index === selectedIndex) {
      option.classList.add(
        'bg-blue-500',
        'text-white'
      );
    }
  });
}



function showResult() {

  clearInterval(timerInterval);
  const finalScore = calculateScore();

  const resultModal = document.getElementById('resultModal');
  const resultCard = document.getElementById('resultCard');
  const scoreText = document.getElementById('scoreText');

  scoreText.textContent = `You scored ${finalScore} out of ${Questionarr.length}`;

  resultModal.classList.remove('hidden');

  setTimeout(() => {
    resultCard.classList.remove('scale-75', 'opacity-0');
    resultCard.classList.add('scale-100', 'opacity-100');
  }, 50);

  if (finalScore >= 8) {
  scoreText.classList.add('text-green-600');
} else {
  scoreText.classList.add('text-red-600');
}


scoreText.textContent =
  finalScore >= 8
    ? `🎉 Great job! You scored ${finalScore}/15`
    : `😢 Try again. You scored ${finalScore}/15`;


    const wrongQuestions = getWrongQuestions();
const wrongContainer = document.getElementById('wrongAnswers');
wrongContainer.innerHTML = ''; 

if (wrongQuestions.length > 0) {
  wrongQuestions.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('mb-4', 'p-2', 'border', 'rounded-lg', 'bg-gray-50');
    div.innerHTML = `
      <p class="font-semibold">Q: ${item.question}</p>
      <p class="text-red-500">Your Answer: ${item.userAnswer || 'No answer'}</p>
      <p class="text-green-600">Correct Answer: ${item.correctAnswer}</p>
    `;
    wrongContainer.appendChild(div);
  });
} else {
  wrongContainer.innerHTML = '<p class="text-green-600">You got all answers correct! 🎉</p>';
}

}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    TIMER.textContent = `Time: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      autoSubmitQuiz();
    }
  }, 1000);
}


function autoSubmitQuiz() {
  
  NEXTBTN.disabled = true;
  PREVIOUSBTN.disabled = true;

  showResult(); 
}


function getWrongQuestions() {
  const wrong = [];

  for (let i = 0; i < Questionarr.length; i++) {
    if (userAnswers[i] !== Questionarr[i].answer) {
      wrong.push({
        question: Questionarr[i].question,
        userAnswer: Questionarr[i].options[userAnswers[i]],
        correctAnswer: Questionarr[i].options[Questionarr[i].answer]
      });
    }
  }

  return wrong;
}


