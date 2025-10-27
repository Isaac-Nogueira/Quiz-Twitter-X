const question = document.querySelector('#question');
const answerBox = document.querySelector('#answers-box');
const quizzContainer = document.querySelector('#quizz-container');
const scoreContainer = document.querySelector('#score-container');
const letters = ['a', 'b', 'c', 'd', 'e'];
let points = 0;
let actualQuestion = 0;

const questions = [
  {
    question: 'A Rede Social Twitter tem foco em quê?',
    answers: [
      {
        answer: 'Posts interações e comentários;',
        correct: true,
      },
      {
        answer: 'Apenas posts',
        correct: false,
      },
      {
        answer: 'Networking',
        correct: false,
      },
      {
        answer: 'Apenas entretenimento',
        correct: false,
      },
    ],
  },
  {
    question: 'Qual ferramenta foi implementada após a compra de Elon Musk?',
    answers: [
      {
        answer: 'Chat',
        correct: false,
      },
      {
        answer: 'Ligação de vídeo',
        correct: true,
      },
      {
        answer: 'Inteligência artificial',
        correct: false,
      },
      {
        answer: 'Nada, continuou com os mesmos mecanismos.',
        correct: false,
      },
    ],
  },
  {
    question: 'Em qual ano a rede social Twitter foi fundada?',
    answers: [
      {
        answer: '2000',
        correct: false,
      },
      {
        answer: '2005',
        correct: false,
      },
      {
        answer: '2006',
        correct: true,
      },
      {
        answer: '2010',
        correct: false,
      },
    ],
  },
  {
    question: 'No segundo post citado no vídeo, qual forma de violência foi utilizada?',
    answers: [
      {
        answer: 'Violência moral',
        correct: true,
      },
      {
        answer: 'Violência física',
        correct: false,
      },
      {
        answer: 'Injúria racial',
        correct: false,
      },
      {
        answer: 'Violência patrimonial',
        correct: false,
      },
    ],
  },
  {
    question: 'Qual das seguintes práticas são fundamentais para a promoção de paz nas redes sociais?',
    answers: [
      {
        answer: 'Se atentar a comentários que possam ofender e se ocultar',
        correct: false,
      },
      {
        answer: 'Se atentar a comentários que possam ofender, não praticá-los e denunciar com recursos disponíveis na plataforma de forma não agressiva',
        correct: true,
      },
      {
        answer: 'Utilizar meios como memes para fins de bullying e difamação',
        correct: false,
      },
      {
        answer: 'Apenas observar',
        correct: false,
      },
    ],
  },
];

function init() {
  createQuestion(0);
}

function createQuestion(i) {
  const oldButtons = answerBox.querySelectorAll('button');
  oldButtons.forEach((btn) => {
    btn.remove();
  });

  const questionText = question.querySelector('#question-text');
  const questionNumber = question.querySelector('#question-number');

  questionText.textContent = questions[i].question;
  questionNumber.textContent = i + 1;

  questions[i].answers.forEach((answer, i) => {
    const answerTemplate = document.querySelector('.answer-template').cloneNode(true);

    const letterBtn = answerTemplate.querySelector('.btn-letter');
    const answerText = answerTemplate.querySelector('.question-answer');

    letterBtn.textContent = letters[i];
    answerText.textContent = answer['answer'];

    answerTemplate.setAttribute('correct-answer', answer['correct']);

    answerTemplate.classList.remove('hide');
    answerTemplate.classList.remove('answer-template');

    answerBox.appendChild(answerTemplate);

    answerTemplate.addEventListener('click', function () {
      checkAnswer(this);
    });
  });

  actualQuestion++;
}

function checkAnswer(btn) {
  const buttons = answerBox.querySelectorAll('button');

  buttons.forEach((button) => {
    if (button.getAttribute('correct-answer') == 'true') {
      button.classList.add('correct-answer');

      if (btn === button) {

        points++;
      }
    } else {
      button.classList.add('wrong-answer');
    }
  });

  nextQuestion();
}

function nextQuestion() {

  setTimeout(function () {

    if (actualQuestion >= questions.length) {

      showSuccessMessage();
      return;
    }

    createQuestion(actualQuestion);
  }, 1200);
}

function showSuccessMessage() {
  hideOrShowQuizz();

  const score = ((points / questions.length) * 100).toFixed(2);

  const displayScore = document.querySelector('#display-score span');
  displayScore.textContent = score.toString();

  const correctAnswers = document.querySelector('#correct-answers');
  correctAnswers.textContent = points;

  const totalQuestions = document.querySelector('#questions-qty');
  totalQuestions.textContent = questions.length;
}

function hideOrShowQuizz() {
  quizzContainer.classList.toggle('hide');
  scoreContainer.classList.toggle('hide');
}

const restartBtn = document.querySelector('#restart');
restartBtn.addEventListener('click', function () {
  actualQuestion = 0;
  points = 0;
  hideOrShowQuizz();
  init();
});

init();