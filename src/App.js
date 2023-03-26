import React from "react";
import Question from "./Question";

function App() {
  const [started, setStarted] = React.useState(false); //started to answer the quizz or not yet
  const [data, setData] = React.useState([]);
  const numberOfQuestions = 4;
  const [startNewQuiz, setStartNewQuiz] = React.useState(0);
  const [quiz, setQuiz] = React.useState([]);
  const questionElements = quiz.map((item) => {
    return <Question key={item.id} data={{ ...item }} />;
  });
  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=" + numberOfQuestions)
      .then((res) => res.json())
      .then((loadedData) => setData(loadedData.results));
  }, [startNewQuiz]);

  // console.log("quiz: ");
  // console.log("quiz: " + quiz);
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
    setStarted((prev) => !prev);

    setQuiz(fillNewQuiz);
  }

  function checkAnswers() {
    setStarted((prev) => !prev);
  }

  return (
    <div className="main-container">
      {started ? (
        <div>
          {questionElements}
          <button className="check-button" onClick={checkAnswers}>
            Check answers
          </button>
        </div>
      ) : (
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
    </div>
  );
}

export default App;
