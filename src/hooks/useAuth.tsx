import { useDebugValue } from "react";
import { useContextAuth, AuthContextData } from "../auth/AuthWrapper";

const useAuth = (): AuthContextData => {
  const context = useContextAuth();
  useDebugValue(context.user, (user) =>
    user.isAuthenticated ? "Logged In" : "Logged Out"
  );
  return context;
};

export default useAuth;
