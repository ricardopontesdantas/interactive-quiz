const form = document.querySelector("form");
const button = document.querySelector("button");
const paragraphWithScore = document.createElement("p");
const questions = document.querySelectorAll("div.question");
const quizAnswers = ["B", "A", "B", "A"];
let score = 0;

const styleFromZeroTo25Percent = "alert alert-danger display-6 mb-2";
const style50Percent = "alert alert-secondary display-6 mb-2";
const styleFrom75To100Percent = "alert alert-success display-6 mb-2";

stylizeScore = (score) => {
  switch (score) {
    case 0:
    case 25:
      paragraphWithScore.setAttribute("class", styleFromZeroTo25Percent);
      break;
    case 50:
      paragraphWithScore.setAttribute("class", style50Percent);
      break;
    default:
      paragraphWithScore.setAttribute("class", styleFrom75To100Percent);
  }
};

const showScore = (score) => {
  paragraphWithScore.textContent = `Você acertou ${score}% das respostas.`;
  button.insertAdjacentElement("beforebegin", paragraphWithScore);
};

const sendAnswers = (event) => {
  event.preventDefault();

  const userAnswers = [
    form.question_1.value,
    form.question_2.value,
    form.question_3.value,
    form.question_4.value,
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

  stylizeScore(score);
  showScore(score);

  score = 0;
};

form.addEventListener("submit", sendAnswers);
