import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { loginRequest, protectedResources } from "../configs/AuthConfig";
import ListGroup from "../components/ListGroup";
import Spinner from "../components/Spinner";
import { useLoading } from "../contexts/LoadingContext";

const Home = () => {
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
        `${protectedResources.QuestionAPI.endpoint}/GetAllQuestions`
      );
      if (response !== undefined) {
        if (response.statusCode === 200) setQuestions(response.questions);
        else setError(response.message);
      }
      setLoading(false);
    }
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
            <ListGroup questions={questions} />
          )}
        </>
      )}
    </div>
  );
};

export default Home;
