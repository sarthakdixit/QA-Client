/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { LogLevel } from "@azure/msal-browser";

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */
export const msalConfig = {
  auth: {
    clientId: "b1ae73e8-ae99-4d80-b239-f0d065f774cc", // This is the ONLY mandatory field that you need to supply.
    authority:
      "https://login.microsoftonline.com/a195aa85-cb6e-48db-8c58-9c51fb7c2517", // Replace the placeholder with your tenant subdomain
    redirectUri: "http://localhost:3000", // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
    postLogoutRedirectUri: "/", // Indicates the page to navigate after logout.
  },
  cache: {
    cacheLocation: "localStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      /**
       * Below you can configure MSAL.js logs. For more information, visit:
       * https://docs.microsoft.com/azure/active-directory/develop/msal-logging-js
       */
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

/**
 * Add here the endpoints and scopes when obtaining an access token for protected web APIs. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */

const tenantId = "0a6cefc6-8eda-4567-b5c8-18d6613b6779";
const baseApi = `api://${tenantId}`;
const baseUrl = "https://localhost:44300";

export const protectedResources = {
  QAListAPI: {
    endpoint: `${baseUrl}/WeatherForecast`,
    scopes: {
      read: ["api://0a6cefc6-8eda-4567-b5c8-18d6613b6779/Forecast.Read"],
    },
  },
  QuestionAPI: {
    endpoint: `${baseUrl}/api/Question`,
    scopes: {
      read: [
        `${baseApi}/Question.Read.All`,
        `${baseApi}/Question.Read`,
        `${baseApi}/Question.My.Read.All`,
      ],
      write: [
        `${baseApi}/Question.Post`,
        `${baseApi}/Question.Put`,
        `${baseApi}/Question.Delete`,
      ],
    },
  },
  TagAPI: {
    endpoint: `${baseUrl}/api/Tag`,
    scopes: {
      read: [`${baseApi}/Tag.Read`],
    },
  },
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
  scopes: [
    "User.Read",
    ...protectedResources.QAListAPI.scopes.read,
    ...protectedResources.QuestionAPI.scopes.read,
    ...protectedResources.QuestionAPI.scopes.write,
  ],
};
