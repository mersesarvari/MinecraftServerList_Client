import { Navigate, Route } from "react-router-dom";
import Auth from "./Classes/Auth";

export const LoginRoute = ({ children }) => {
  const l = Auth.checklogin(children);
  if (l === true) {
    return children;
  }
  return <Navigate to="/login" />;
};

export const LogoutRoute = ({ children }) => {
  const l = Auth.checklogin(children);
  if (!l === true) {
    return children;
  }
  return <Navigate to="/" />;
};
