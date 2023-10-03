import React, { useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../configs/AuthConfig";
// import UserContext from "../contexts/UserContext";
// import { callMsGraph } from "../configs/GraphConfig";

const Default = () => {
  const { instance, accounts } = useMsal();
  // const { userData, setUserData } = useContext(UserContext);

  // useEffect(() => {
  //   RequestProfileData();
  // }, []);

  // const RequestProfileData = () => {
  //   instance
  //     .acquireTokenSilent({
  //       ...loginRequest,
  //       account: accounts[0],
  //     })
  //     .then((response) => {
  //       callMsGraph(response.accessToken).then((response) =>
  //         setUserData(response)
  //       );
  //     });
  // };

  const logout = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: "/",
    });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">
            QA
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="/home">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/home/create">
                  Create
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/home/my-items">
                  My Items
                </a>
              </li>
              <li className="nav-item" onClick={() => logout()}>
                <a className="nav-link" href="#">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <div className="row">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Default;
