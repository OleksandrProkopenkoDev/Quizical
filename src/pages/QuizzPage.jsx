import React from "react";
import Question from "../components/Question";
import QUIZ_STATE from "../components/StateEnum";
import { getQuestions } from "../service/apiService";

export default function QuizzPage() {
  const { WELCOME, IN_PROCESS, CHECK_ANSWERS } = QUIZ_STATE;
  const [state, setState] = React.useState(IN_PROCESS); //started to answer the quizz or not yet
  const [data, setData] = React.useState([]);
  const numberOfQuestions = 5;
  const dificulty = "easy";
  const category = "Geography";
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

  React.useEffect(
    function fetchData() {
      getQuestions(numberOfQuestions).then((loadedData) =>
        setData(loadedData.data)
      );
    },
    [startNewQuiz]
  );

  React.useEffect(() => {
    setQuiz(fillNewQuiz);
  }, [data]);

  // console.log("quiz: ");
  // console.log(quiz);
  // console.log(state);
  // console.log("data: ");
  // console.log(data);
  // console.log(startNewQuiz);

  function fillNewQuiz() {
    const newQuiz = [];
    for (let i = 0; i < data.length; i++) {
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
    setStartNewQuiz((prev) => prev + 1); //trigers to load new data
    setState(IN_PROCESS);
    setScore(0);
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
