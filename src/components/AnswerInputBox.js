import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import { protectedResources } from "../configs/AuthConfig";

const AnswerInputBox = ({ questionId, setAnswers }) => {
  const [disable, setDisable] = useState(false);
  const [answer, setAnswer] = useState({
    id: "",
    owner: "",
    questionId: questionId,
    description: "",
    createdOn: new Date(),
    updatedOn: new Date(),
  });
  const { execute } = useFetch({
    scopes: protectedResources.AnswerAPI.scopes.write,
  });

  const handleChange = (evt) => {
    const value =
      evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setAnswer((prev) => {
      return {
        ...prev,
        description: value,
      };
    });
  };

  const handleClick = async () => {
    setDisable(true);
    await saveAnswer();
    setDisable(false);
  };

  const saveAnswer = async () => {
    let response = await execute(
      "POST",
      `${protectedResources.AnswerAPI.endpoint}/PostAnswer`,
      answer
    );
    if (response !== undefined) {
      if (response.statusCode === 200) {
        setAnswers((prev) => [answer, ...prev]);
        cleanInputBox();
        alert(response.message);
      } else alert(response.message);
    }
  };

  const cleanInputBox = () => {
    setAnswer((prev) => {
      return {
        ...prev,
        description: "",
      };
    });
  };

  return (
    <>
      <h5>Enter Your Answer</h5>
      <textarea
        className="form-control"
        name="answer"
        rows="3"
        disabled={disable}
        value={answer.description}
        onChange={handleChange}
      ></textarea>
      <button
        className="btn btn-primary my-3"
        disabled={disable}
        onClick={() => handleClick()}
      >
        Save
      </button>
    </>
  );
};

export default AnswerInputBox;
