const QUESTIONELEMENT = document.getElementById('question');
const OPTIONA = document.getElementById('optionA');
const OPTIONB = document.getElementById('optionB');
const OPTIONC = document.getElementById('optionC');
const OPTIOND = document.getElementById('optionD');

const PREVIOUSBTN = document.getElementById('prevBtn');
const NEXTBTN = document.getElementById('nextBtn');

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
}


shuffleArray(Questionarr);
showQuestion();


const showNext = () => {
  if (currentIndex < Questionarr.length - 1) {
    currentIndex++;
    showQuestion();
  }else {
    const finalScore = calculateScore();
    alert(`You scored ${finalScore} out of ${Questionarr.length}`);
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

const userAnswers = []

function selectAnswer(optionIndex) {
  userAnswers[currentIndex] = optionIndex;
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
