import { Navigate, Route } from "react-router-dom";
import Auth from "./Auth";

export const ProtectedRoute = ({ children }) => {
  const l = Auth.CheckLogin(children);
  if (l) {
    return children;
  }
  return <Navigate to="/" />;
};
