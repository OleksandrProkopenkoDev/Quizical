import React from "react";
import Question from "./Question";
import QUIZ_STATE from "./StateEnum";

function App() {
  const { WELCOME, IN_PROCESS, CHECK_ANSWERS } = QUIZ_STATE;
  const [state, setState] = React.useState(WELCOME); //started to answer the quizz or not yet
  const [data, setData] = React.useState([]);
  const numberOfQuestions = 5;
  const [startNewQuiz, setStartNewQuiz] = React.useState(0);
  const [quiz, setQuiz] = React.useState([]);
  const [score, setScore] = React.useState(0);

  const questionElements = quiz.map((item) => {
    return (
      <Question
        key={item.id}
        data={{ ...item }}
        chooseAnswer={chooseAnswer}
        state={state}
      />
    );
  });
  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=" + numberOfQuestions)
      .then((res) => res.json())
      .then((loadedData) => setData(loadedData.results));
  }, [startNewQuiz]);

  // console.log("quiz: ");
  // console.log(quiz);
  // console.log(state);
  // console.log("data: ");
  // console.log(data);
  // console.log(startNewQuiz);

  function fillNewQuiz() {
    const newQuiz = [];
    for (let i = 0; i < numberOfQuestions; i++) {
      const question = {
        id: i,
        correct_answer: data[i].correct_answer,
        incorrect_answers: data[i].incorrect_answers,
        question: data[i].question,
        selected: "",
      };
      newQuiz.push(question);
    }
    return newQuiz;
  }

  function startQuiz() {
    setStartNewQuiz((prev) => prev + 1);
    setState(IN_PROCESS);

    setQuiz(fillNewQuiz);
  }

  function countScore() {
    quiz.forEach((question) => {
      if (question.selected === question.correct_answer)
        setScore((prev) => prev + 1);
    });
  }

  function checkAnswers() {
    const allSelected = quiz.every((question) => question.selected);
    if (allSelected) {
      setState(CHECK_ANSWERS);
      countScore();
    } else {
      console.log("answer all questions");
    }
  }

  function chooseAnswer(selected, id) {
    setQuiz((oldQuiz) =>
      oldQuiz.map((item) =>
        item.id === id ? { ...item, selected: selected } : item
      )
    );
  }

  return (
    <div className="main-container">
      {state === WELCOME && (
        <div className="start-page">
          <h1 className="start-page--title">Quizzical</h1>
          <h3 className="start-page--description">
            Some description if needed
          </h3>
          <button className="start-page--button" onClick={startQuiz}>
            Start quiz
          </button>
        </div>
      )}

      {state === IN_PROCESS && (
        <div className="question-container">
          {questionElements}
          <button className="check-button" onClick={checkAnswers}>
            Check answers
          </button>
        </div>
      )}

      {state === CHECK_ANSWERS && (
        <div className="question-container">
          {questionElements}
          <div className="score-container">
            <h2>
              You scored {score}/{numberOfQuestions} correct answers
            </h2>
            <button className="check-button" onClick={startQuiz}>
              Start new
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
