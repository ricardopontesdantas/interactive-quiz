const quizForm = document.querySelector("form");
const button = document.querySelector("button");
const paragraphWithScore = document.querySelector(".user-score");
const questions = document.querySelectorAll("div.question");
const quizAnswers = ["B", "A", "D", "C"];
let score = 0;

const styleFromZeroTo25Percent = "alert alert-danger";
const style50Percent = "alert alert-secondary";
const styleFrom75To100Percent = "alert alert-success";
const styleDefault = "alert alert-light";

const getScoreStyle = (score) =>
  ({
    0: styleFromZeroTo25Percent,
    25: styleFromZeroTo25Percent,
    50: style50Percent,
    75: styleFrom75To100Percent,
    100: styleFrom75To100Percent,
  }[score] || styleDefault);

const showScore = (score) => {
  paragraphWithScore.textContent = `Você acertou ${score}% das respostas.`;
  paragraphWithScore.setAttribute("class", getScoreStyle(score));
};

const incrementCounter = () => {
  let counter = 0;

  const timer = setInterval(() => {
    showScore(counter);

    if (counter === score) {
      clearInterval(timer);
      score = 0;
    }

    counter++;
  }, 15);
};

const handleQuizSubmit = (event) => {
  event.preventDefault();

  const userAnswers = [
    quizForm.question_1.value,
    quizForm.question_2.value,
    quizForm.question_3.value,
    quizForm.question_4.value,
  ];

  const checkUserAnswers = (answer, index) => {
    const question = questions[index];
    const userAnswerIsCorrect = answer === userAnswers[index];

    if (userAnswerIsCorrect) {
      question.classList.remove("text-danger", "fst-italic");
      score += 25;
      return;
    }

    question.classList.add("text-danger", "fst-italic");
  };

  quizAnswers.forEach(checkUserAnswers);

  scrollTo(0, 0);

  incrementCounter();
};

quizForm.addEventListener("submit", handleQuizSubmit);
