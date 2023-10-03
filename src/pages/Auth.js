import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../configs/AuthConfig";
import MicrosoftIcon from "@mui/icons-material/Microsoft";
import QAImage from "../assets/questions-answers.jpg";

const Auth = () => {
  const { instance } = useMsal();

  const login = () => {
    instance.loginRedirect(loginRequest).catch((e) => {
      console.log(e);
    });
  };

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div className="col-md-6">
          <div className="d-flex justify-content-center align-items-center vh-100">
            <img src={QAImage} className="img-fluid" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="p-4">
              <button
                className="btn btn-primary btn-block"
                onClick={() => login()}
              >
                <MicrosoftIcon
                  color="white"
                  fontSize="large"
                  className="px-1"
                />
                Log in with Microsoft
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
