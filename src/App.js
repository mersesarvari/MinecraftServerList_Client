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
import Auth from "./Auth";

function App() {
  function SetDefaultHeader() {
    axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
      "token"
    )}`;
  }
  SetDefaultHeader();
  return <RouterProvider router={router} />;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route
        index
        element={<Home />}
        loader={serverListLoader}
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
        <Route
          path=":id"
          element={
            <LoginRoute>
              <ServerDetails />
            </LoginRoute>
          }
          loader={serverDetailsLoader}
          errorElement={<ServerError />}
        />
      </Route>
      <Route path="*" element={<NoMatch />} />
    </Route>
  )
);

export default App;
