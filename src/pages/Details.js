import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AnswerBox from "../components/AnswerBox";
import AnswerInputBox from "../components/AnswerInputBox";

const Details = () => {
  const { state } = useLocation();
  const [question, setQuestion] = useState(state.state);
  const [answers, setAnswers] = useState([]);

  return (
    <>
      <div className="my-3 p-3 list-group-item list-group-item-dark">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{question.heading}</h5>
          <small>{new Date(question.createdOn).toLocaleDateString()}</small>
        </div>
        <p className="mb-1">{question.description}</p>
        <small>{question.tag}</small>
      </div>
      <AnswerInputBox questionId={question.id} setAnswers={setAnswers} />
      <AnswerBox
        answers={answers}
        setAnswers={setAnswers}
        questionId={question.id}
      />
    </>
  );
};

export default Details;
