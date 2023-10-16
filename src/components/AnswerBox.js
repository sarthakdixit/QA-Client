import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { protectedResources } from "../configs/AuthConfig";
import { useLoading } from "../contexts/LoadingContext";
import AnswerCard from "./AnswerCard";
import Spinner from "./Spinner";

const AnswerBox = ({ answers, setAnswers, questionId }) => {
  const { execute } = useFetch({
    scopes: protectedResources.AnswerAPI.scopes.read,
  });
  const [error, setError] = useState();
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    getAnswers();
  }, [execute]);

  const getAnswers = async () => {
    if (answers.length === 0) {
      setLoading(true);
      let response = await execute(
        "GET",
        `${protectedResources.AnswerAPI.endpoint}/GetAnswers?questionId=${questionId}`
      );
      if (response !== undefined) {
        if (response.statusCode === 200) setAnswers(response.answers);
        else setError(response.message);
      }
      setLoading(false);
    }
  };

  return (
    <>
      <h5>All Answers</h5>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {answers.length === 0 ? (
            <h4>No answers</h4>
          ) : (
            <>
              {answers.map((item, key) => {
                return <AnswerCard item={item} key={key} />;
              })}
            </>
          )}
        </>
      )}
    </>
  );
};

export default AnswerBox;
