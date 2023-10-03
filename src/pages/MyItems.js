import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { protectedResources } from "../configs/AuthConfig";
import ListGroup from "../components/ListGroup";
import Spinner from "../components/Spinner";
import { useLoading } from "../contexts/LoadingContext";
import { useLocation } from "react-router-dom";

const MyItems = () => {
  const location = useLocation();
  console.log(location);
  const { execute } = useFetch({
    scopes: protectedResources.QuestionAPI.scopes.read,
  });
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState();
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    getQuestions();
  }, [execute]);

  const getQuestions = async () => {
    if (questions.length === 0) {
      setLoading(true);
      let response = await execute(
        "GET",
        `${protectedResources.QuestionAPI.endpoint}/MyQuestions`
      );
      if (response !== undefined) {
        if (response.statusCode === 200) setQuestions(response.questions);
        else setError(response.message);
      }
      setLoading(false);
    }
  };

  const deleteQuestion = async (id) => {
    let que = questions[id];
    let response = await execute(
      "DELETE",
      `${protectedResources.QuestionAPI.endpoint}/DeleteQuestion?id=${que.id}`
    );
    if (response !== undefined) {
      if (response.statusCode === 200) {
        alert(response.message);
        removeQuestion(id);
      } else alert(response.message);
    }
  };

  const removeQuestion = (id) => {
    let que = [...questions];
    que.splice(id, 1);
    setQuestions(que);
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {questions.length === 0 ? (
            <h1>{error}</h1>
          ) : (
            <ListGroup
              questions={questions}
              action="my"
              deleteQuestion={deleteQuestion}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MyItems;
