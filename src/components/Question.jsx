import React, { useState } from "react";
import QUIZ_STATE from "./StateEnum";

export default function Question(props) {
  const { IN_PROCESS, CHECK_ANSWERS } = QUIZ_STATE;
  const { id, question, correct_answer, incorrect_answers, selected } =
    props.data;
  const [variants, setVariants] = React.useState([]);
  let position;

  const randomPosition = () => {
    return Math.floor(Math.random() * incorrect_answers.length);
  };

  React.useEffect(() => {
    if (props.state === IN_PROCESS) {
      setVariants(() => {
        let newVariants = [];
        newVariants = [...incorrect_answers];
        position = randomPosition();
        newVariants.splice(position, 0, correct_answer);
        localStorage.setItem("variant " + id, position);
        return newVariants;
      });
    } else if (props.state === CHECK_ANSWERS) {
      setVariants(() => {
        let newVariants = [];
        position = localStorage.getItem("variant " + id);
        newVariants = [...incorrect_answers];
        newVariants.splice(position, 0, correct_answer);
        return newVariants;
      });
    }
  }, [question]);

  // console.log("question:");
  // console.log(question);

  // console.log("variants:");
  // console.log(variants);

  function switchAnswerStyle(btnId) {
    //btnId is a number of button 0,1,2 or 3
    let style = "";
    if (props.state === IN_PROCESS)
      style =
        variants[btnId] === selected ? "question-selected" : "question-variant";
    if (props.state === CHECK_ANSWERS) {
      style = "other_answer";
      let incorrect = false;
      incorrect_answers.forEach((answer) => {
        if (variants[btnId] === selected) incorrect = true;
      });
      if (incorrect) style = "incorrect_answer";
      if (variants[btnId] === correct_answer) style = "correct_answer";
    }
    return style;
  }

  return (
    <div className={props.state === CHECK_ANSWERS ? "chek" : ""}>
      <h2 className="question">{question}</h2>
      <div className="question--buttons">
        <button
          onClick={() => props.chooseAnswer(variants[0], id)}
          className={switchAnswerStyle(0)}
        >
          {variants[0]}
        </button>
        <button
          onClick={() => props.chooseAnswer(variants[1], id)}
          className={switchAnswerStyle(1)}
        >
          {variants[1]}
        </button>
        {variants[2] && (
          <button
            onClick={() => props.chooseAnswer(variants[2], id)}
            className={switchAnswerStyle(2)}
          >
            {variants[2]}
          </button>
        )}
        {variants[3] && (
          <button
            onClick={() => props.chooseAnswer(variants[3], id)}
            className={switchAnswerStyle(3)}
          >
            {variants[3]}
          </button>
        )}
      </div>
      <hr className="line" />
    </div>
  );
}
