import React, { useState } from "react";
import Question from "../components/Question";
import QUIZ_STATE from "../components/StateEnum";
import { getQuestions, saveQuizzResult } from "../service/apiService";
import { useAuth } from "../service/auth";

export default function QuizzPage() {
  const { WELCOME, IN_PROCESS, CHECK_ANSWERS } = QUIZ_STATE;
  const [state, setState] = React.useState(IN_PROCESS); //started to answer the quizz or not yet
  const [startTime, setStartTime] = useState(null);
  const numberOfQuestions = 5;
  const dificulty = "easy";
  const category = "Geography";
  const auth = useAuth();
  const user = auth.user;
  const [startNewQuiz, setStartNewQuiz] = React.useState(0);
  const [quiz, setQuiz] = React.useState([]);
  const [score, setScore] = React.useState(0);
  // console.log(userId);
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
        setQuiz(fillNewQuiz(loadedData.data))
      );
    },
    [startNewQuiz]
  );

  // console.log("quiz: ");
  // console.log(quiz);
  // console.log(state);
  // console.log(startNewQuiz);

  function fillNewQuiz(data) {
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
    //check start time
    setStartTime(Date.now());
    // const time = Date.now;
    // console.log(time);
    // setQuiz(fillNewQuiz);
  }

  function countScore() {
    let i = 0;
    quiz.forEach((question) => {
      if (question.selected === question.correct_answer)
        // setScore((prev) => prev + 1);
        i++;
    });
    setScore(i);
    return i;
  }

  function checkAnswers() {
    const allSelected = quiz.every((question) => question.selected);
    if (allSelected) {
      setState(CHECK_ANSWERS);
      const correctAnswers = countScore();
      const currentTime = Date.now();
      //calculate elapsed time

      // if user is logged in -> save result
      if (user) {
        const result = {
          numberOfQuestions: numberOfQuestions,
          numberOfCorrectAnswers: correctAnswers,
          elapsedTimeSeconds: new Date(currentTime - startTime).getSeconds(),
          difficulty: "any",
          category: "any",
          userId: user.userId,
        };
        // save result toDB (send http request to api)
        const response = saveQuizzResult(result, user);
        // console.log(response);
      }
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
