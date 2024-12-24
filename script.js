// Dados do quiz com 10 perguntas por tema
const themes = {
  sports: [
    { question: "Quantos jogadores tem um time de futebol?", answers: ["10", "11", "12", "9"], correct: 1 },
    { question: "Quem é conhecido como o Rei do Futebol?", answers: ["Maradona", "Pelé", "Messi", "Cristiano Ronaldo"], correct: 1 },
    { question: "Qual país sediou a Copa do Mundo de 2014?", answers: ["Brasil", "Alemanha", "Rússia", "França"], correct: 0 },
    { question: "Quantos anéis tem o símbolo das Olimpíadas?", answers: ["4", "5", "6", "7"], correct: 1 },
    { question: "Qual esporte é jogado na NBA?", answers: ["Futebol", "Vôlei", "Basquete", "Hóquei"], correct: 2 },
    { question: "Quem venceu a Copa do Mundo de 2018?", answers: ["Brasil", "França", "Alemanha", "Argentina"], correct: 1 },
    { question: "Qual é o esporte do Wimbledon?", answers: ["Tênis", "Basquete", "Vôlei", "Críquete"], correct: 0 },
    { question: "Qual país é famoso pelo sumô?", answers: ["China", "Japão", "Coreia do Sul", "Tailândia"], correct: 1 },
    { question: "Qual é o esporte mais praticado no mundo?", answers: ["Basquete", "Críquete", "Futebol", "Tênis"], correct: 2 },
    { question: "Em que ano foi realizada a primeira Copa do Mundo?", answers: ["1920", "1930", "1940", "1950"], correct: 1 }
  ],
  general: [
    { question: "Qual é a capital do Brasil?", answers: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"], correct: 2 },
    { question: "Qual é o maior oceano do mundo?", answers: ["Atlântico", "Pacífico", "Índico", "Ártico"], correct: 1 },
    { question: "Quem pintou a Mona Lisa?", answers: ["Michelangelo", "Da Vinci", "Van Gogh", "Picasso"], correct: 1 },
    { question: "Quantos continentes existem?", answers: ["5", "6", "7", "8"], correct: 2 },
    { question: "Qual é a fórmula química da água?", answers: ["H2O", "CO2", "O2", "CH4"], correct: 0 },
    { question: "Quem escreveu 'Dom Quixote'?", answers: ["Shakespeare", "Cervantes", "Goethe", "Dante"], correct: 1 },
    { question: "Qual é o planeta mais próximo do Sol?", answers: ["Marte", "Terra", "Mercúrio", "Vênus"], correct: 2 },
    { question: "Qual é o animal terrestre mais rápido?", answers: ["Leão", "Cavalo", "Guepardo", "Tigre"], correct: 2 },
    { question: "Qual é o idioma mais falado no mundo?", answers: ["Inglês", "Mandarim", "Espanhol", "Hindi"], correct: 1 },
    { question: "Quem foi o primeiro presidente do Brasil?", answers: ["Getúlio Vargas", "Deodoro da Fonseca", "Pedro II", "Marechal Floriano"], correct: 1 }
  ]
};

let currentTheme = null;
let currentQuestionIndex = 0;
let score = 0;
let correctCount = 0;
let wrongCount = 0;

const startScreen = document.getElementById("start-screen");
const quizContainer = document.getElementById("quiz");
const feedbackContainer = document.getElementById("feedback");
const resultContainer = document.getElementById("result");

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const feedbackMessage = document.getElementById("feedback-message");
const scoreElement = document.getElementById("score");
const correctCountElement = document.getElementById("correct-count");
const wrongCountElement = document.getElementById("wrong-count");
const restartButton = document.getElementById("restart-btn");

document.querySelectorAll(".btn[data-theme]").forEach(button => {
  button.addEventListener("click", () => {
    currentTheme = themes[button.dataset.theme];
    startScreen.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    startQuiz();
  });
});

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  correctCount = 0;
  wrongCount = 0;
  showQuestion();
}

function showQuestion() {
  const currentQuestion = currentTheme[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  answersElement.innerHTML = '';
  currentQuestion.answers.forEach((answer, index) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(index, button));
    li.appendChild(button);
    answersElement.appendChild(li);
  });
}

function selectAnswer(selectedIndex, button) {
  const currentQuestion = currentTheme[currentQuestionIndex];
  if (selectedIndex === currentQuestion.correct) {
    score++;
    correctCount++;
    button.classList.add("correct");
    feedbackMessage.textContent = "Correto!";
  } else {
    wrongCount++;
    button.classList.add("incorrect");
    feedbackMessage.textContent = `Errado! A resposta certa era: ${currentQuestion.answers[currentQuestion.correct]}`;
  }
  feedbackContainer.classList.remove("hidden");
  setTimeout(() => {
    feedbackContainer.classList.add("hidden");
    currentQuestionIndex++;
    if (currentQuestionIndex < currentTheme.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 2000);
}

function showResult() {
  quizContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");
  scoreElement.textContent = `Você acertou ${score} de ${currentTheme.length} perguntas.`;
  correctCountElement.textContent = correctCount;
  wrongCountElement.textContent = wrongCount;
}

restartButton.addEventListener("click", () => {
  resultContainer.classList.add("hidden");
  startScreen.classList.remove("hidden");
});
