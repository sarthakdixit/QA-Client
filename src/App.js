import React from "react";
import PrivateRoute from "./routes/PrivateRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Logout from "./pages/Logout";
import Default from "./layouts/Default";
import { MsalProvider } from "@azure/msal-react";
import { LoadingProvider } from "./contexts/LoadingContext";
import Create from "./pages/Create";
import MyItems from "./pages/MyItems";
import Edit from "./pages/Edit";
import Details from "./pages/Details";

function App({ instance }) {
  return (
    <LoadingProvider>
      <MsalProvider instance={instance}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Auth />
                </ProtectedRoute>
              }
            />
            <Route
              path="/logout"
              element={
                <PrivateRoute>
                  <Logout />
                </PrivateRoute>
              }
            />
            <Route path="/home" element={<Default />}>
              <Route index element={<Home />} />
              <Route path="details" element={<Details />} />
              <Route path="create" element={<Create />} />
              <Route path="edit" element={<Edit />} />
              <Route path="my-items" element={<MyItems />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MsalProvider>
    </LoadingProvider>
  );
}

export default App;
