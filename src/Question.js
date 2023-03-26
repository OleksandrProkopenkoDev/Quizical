import React from "react";

export default function Question(props) {
  const { question, correct_answer, incorrect_answers } = props.data;
  const [variants, setVariants] = React.useState([]);
  React.useEffect(() => {
    setVariants(() => {
      let newVariants = [];
      newVariants = [...incorrect_answers];
      const position = Math.floor(Math.random() * incorrect_answers.length);
      //   console.log("position for insert: " + position);
      newVariants.splice(position, 0, correct_answer);

      return newVariants;
    });
  }, []);

  //   console.log(variants);
  console.log(question);

  return (
    <div className="question-container">
      <h2 className="question">
        {question.replace(/&quot;/g, '"').replace(/&#039;/g, "`")}
      </h2>
      <div className="question--buttons">
        <button className="question-variant">{variants[0]}</button>
        <button className="question-variant">{variants[1]}</button>
        {variants[2] && (
          <button className="question-variant">{variants[2]}</button>
        )}
        {variants[3] && (
          <button className="question-variant">{variants[3]}</button>
        )}
      </div>
      <hr className="line" />
    </div>
  );
}
