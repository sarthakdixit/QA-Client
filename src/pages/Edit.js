import React, { useState, useEffect } from "react";
import Form from "../components/Form";
import Spinner from "../components/Spinner";
import { useLoading } from "../contexts/LoadingContext";
import useFetch from "../hooks/useFetch";
import { loginRequest, protectedResources } from "../configs/AuthConfig";
import { useLocation } from "react-router-dom";

const Edit = () => {
  const { state } = useLocation();
  const { execute } = useFetch({
    scopes: protectedResources.TagAPI.scopes.read,
  });
  const [tags, setTags] = useState([]);
  const [error, setError] = useState();
  const [question, setQuestion] = useState(state.state);
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    getTags();
  }, [execute]);

  const getTags = async () => {
    if (tags.length === 0) {
      setLoading(true);
      let response = await execute(
        "GET",
        `${protectedResources.TagAPI.endpoint}/GetAllTags`
      );
      if (response !== undefined) {
        if (response.statusCode === 200) setTags(response.tags);
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
          {tags.length === 0 ? (
            <h1>{error}</h1>
          ) : (
            <Form
              tags={tags}
              question={question}
              setQuestion={setQuestion}
              action="edit"
            />
          )}
        </>
      )}
    </div>
  );
};

export default Edit;
