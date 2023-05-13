import React from "react";
import QUIZ_STATE from "./StateEnum";

export default function Question(props) {
  const { IN_PROCESS, CHECK_ANSWERS } = QUIZ_STATE;
  const { id, question, correct_answer, incorrect_answers, selected } =
    props.data;
  const [variants, setVariants] = React.useState([]);

  React.useEffect(() => {
    setVariants(() => {
      let newVariants = [];
      newVariants = [...incorrect_answers];
      const position = Math.floor(Math.random() * incorrect_answers.length);
      newVariants.splice(position, 0, correct_answer);
      return newVariants;
    });
  }, [question]);

  console.log("question:");
  console.log(question);

  console.log("variants:");
  console.log(variants);

  function formatQuestion() {
    return question.replace(/&quot;/g, '"').replace(/&#039;/g, "`");
  }
  function switchAnswerStyle(btnId) {
    //btnId is a number of button 0,1,2 or 3
    let style = "";
    if (props.state === IN_PROCESS)
      style =
        variants[btnId] === selected ? "question-selected" : "question-variant";
    if (props.state === CHECK_ANSWERS) {
      //   console.log("selected: " + selected);
      //   console.log("correct_answer: " + correct_answer);
      //   console.log("incorrect_answers: ");
      //   console.log(incorrect_answers);
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
      <h2 className="question">{formatQuestion()}</h2>
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
