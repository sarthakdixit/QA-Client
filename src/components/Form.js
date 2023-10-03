import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { protectedResources } from "../configs/AuthConfig";

const Form = ({ action, tags, question, setQuestion }) => {
  const { execute } = useFetch({
    scopes: protectedResources.QuestionAPI.scopes.write,
  });
  const [disable, setDisable] = useState(false);

  const handleChange = (evt) => {
    const name = evt.target.name;
    const value =
      evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setQuestion({
      ...question,
      [name]: value,
    });
  };

  const handleClick = async () => {
    setDisable(true);
    if (action === "create") await saveQuestion();
    else await editQuestion();
    setDisable(false);
  };

  const saveQuestion = async () => {
    let response = await execute(
      "POST",
      `${protectedResources.QuestionAPI.endpoint}/InsertQuestion`,
      question
    );
    if (response !== undefined) {
      if (response.statusCode === 200) alert(response.message);
      else alert(response.message);
    }
  };

  const editQuestion = async () => {
    let response = await execute(
      "PUT",
      `${protectedResources.QuestionAPI.endpoint}/UpdateQuestion`,
      question
    );
    if (response !== undefined) {
      if (response.statusCode === 200) alert(response.message);
      else alert(response.message);
    }
  };

  return (
    <form>
      <div className="form-group my-3">
        <label>Heading</label>
        <input
          onChange={handleChange}
          type="text"
          name="heading"
          className="form-control"
          placeholder="Heading"
          disabled={disable}
          defaultValue={question.heading}
        />
      </div>
      <div className="form-group my-3">
        <label>Description</label>
        <textarea
          onChange={handleChange}
          className="form-control"
          name="description"
          rows="5"
          disabled={disable}
          value={question.description}
        ></textarea>
      </div>
      <div className="form-group my-3">
        <label>Tags</label>
        <select
          className="form-control form-control-sm"
          name="tag"
          value={question.tag}
          onChange={handleChange}
          disabled={disable}
        >
          <option>Select...</option>
          {tags.map((item, key) => {
            return (
              <option value={item.name} key={key}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
      <button
        className="btn btn-primary my-3"
        disabled={disable}
        onClick={() => handleClick()}
      >
        Save
      </button>
    </form>
  );
};

export default Form;
