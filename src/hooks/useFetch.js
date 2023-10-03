import { useState, useCallback } from "react";
import { InteractionType } from "@azure/msal-browser";
import { useMsal, useMsalAuthentication } from "@azure/msal-react";

const useFetchWithMsal = (msalRequest) => {
  const { instance } = useMsal();
  const [data, setData] = useState(null);

  const { result, error: msalError } = useMsalAuthentication(
    InteractionType.Popup,
    {
      ...msalRequest,
      account: instance.getActiveAccount(),
      redirectUri: "/redirect",
    }
  );

  /**
   * Execute a fetch request with the given options
   * @param {string} method: GET, POST, PUT, DELETE
   * @param {String} endpoint: The endpoint to call
   * @param {Object} data: The data to send to the endpoint, if any
   * @returns JSON response
   */
  const execute = async (method, endpoint, data = null) => {
    if (msalError) {
      console.log(msalError);
      return;
    }

    if (result) {
      let response = null;

      const headers = new Headers();
      const bearer = `Bearer ${result.accessToken}`;
      headers.append("Authorization", bearer);

      if (data) headers.append("Content-Type", "application/json");

      let options = {
        method: method,
        headers: headers,
        body: data ? JSON.stringify(data) : null,
      };
      response = await fetch(endpoint, options);
      let responseData = await response.json();
      setData(responseData);
      return responseData;
    }
  };

  return {
    data,
    execute: useCallback(execute, [result, msalError]), // to avoid infinite calls when inside a `useEffect`
  };
};

export default useFetchWithMsal;
