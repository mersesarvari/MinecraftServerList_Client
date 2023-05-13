import React, { createContext } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// pages
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/LoginForm";
import Register from "./pages/RegisterForm";
import NoMatch from "./pages/NoMatch";
import {
  accountVerificationLoader,
  serverDetailsLoader,
  serverListLoader,
  serverLoader,
} from "./Components/DataLoaders";
import { LoginRoute, LogoutRoute } from "./ProtectedRoute";

// layouts
import RootLayout from "./layouts/RootLayout";
import AccountVerificationRequest from "./pages/tokenpages/AccountVerificationRequest";
import ForgotPasswordRequest from "./pages/tokenpages/ForgotPasswordRequest";
import NewPasswordRequest from "./pages/tokenpages/NewPasswordRequest";
import ServerDetailsLayout from "./pages/server/ServerDetailsLayout";
import ServerDetails from "./pages/server/ServerDetails";
import ServerError from "./pages/server/ServerError";
import CreateServer from "./pages/server/CreateServer";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";
import Server from "./Classes/Server";
import MyServers from "./pages/MyServers";
import ModifyServer from "./pages/server/modify/ModifyServer";
import Navigation from "./layouts/Navigation"

export const serverContext = createContext();

function App() {
  const [servers, setServers] = useState([]);
  function SetDefaultHeader() {
    axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
      "token"
    )}`;
  }
  useEffect(() => {
    async function fetchData() {
      var data = await Server.LoadServerList();
      setServers(data);
      console.log("Data loaded from the server");
    }
    fetchData();
  }, []);

  SetDefaultHeader();
  return (
    servers.length > 0 && (
      <serverContext.Provider
        value={{ data: servers, updateServers: setServers }}
      >
        <RouterProvider router={router} />
      </serverContext.Provider>
    )
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ServerError />}>
      <Route index element={<Home />} errorElement={<ServerError />} />
      <Route
        path="myservers"
        element={
          <LoginRoute>
            <MyServers />
          </LoginRoute>
        }
        errorElement={<ServerError />}
      />
      <Route path="about" element={<About />} />
      <Route
        path="login"
        element={
          <LogoutRoute>
            <Login />
          </LogoutRoute>
        }
      />
      <Route
        path="register"
        element={
          <LogoutRoute>
            <Register />
          </LogoutRoute>
        }
      />

      <Route
        path="create"
        element={
          <LoginRoute>
            <CreateServer />
          </LoginRoute>
        }
      />
      <Route
        path="modify/:id"
        element={
          <LoginRoute>
            <ModifyServer
              loader={serverLoader}
              errorElement={<ServerError />}
            />
          </LoginRoute>
        }
      />
      <Route path="forgotpassword" element={<ForgotPasswordRequest />} />
      <Route path="resetpassword">
        <Route path=":token" element={<NewPasswordRequest />} />
      </Route>
      <Route
        path="verify/:token"
        element={<AccountVerificationRequest />}
        loader={accountVerificationLoader}
        errorElement={<ServerError />}
      ></Route>
      <Route path="server" element={<ServerDetailsLayout />}>
        <Route path=":id" element={<ServerDetails />} />
      </Route>
      <Route path="*" element={<RootLayout />} />
    </Route>
  )
);

export default App;
