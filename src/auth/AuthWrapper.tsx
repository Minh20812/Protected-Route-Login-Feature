import { createContext, useContext, useState } from "react";
import axios from "axios";
import {
  RenderMenu,
  RenderPrivate,
} from "../components/structure/RenderNavigation";

interface User {
  email: string;
  token: string;
  isAuthenticated: boolean;
}

export interface AuthContextData {
  user: User;
  signIn(email: string, password: string): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({
  user: { email: "", token: "", isAuthenticated: false },
  signIn: () => Promise.resolve(),
  signOut: () => {},
});

export const useContextAuth = () => useContext(AuthContext);

const AuthWrapper = () => {
  const [user, setUser] = useState<User>({
    email: "",
    token: "",
    isAuthenticated: false,
  });

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });

      setUser({ email, token: response.data.token, isAuthenticated: true });
    } catch (err) {
      throw err;
    }
  };

  const signOut = () => {
    setUser({ email: "", token: "", isAuthenticated: false });
  };

  const authContextValue: AuthContextData = { user, signIn, signOut };

  return (
    <>
      <AuthContext.Provider value={authContextValue}>
        <RenderMenu />
        <RenderPrivate />
      </AuthContext.Provider>
    </>
  );
};

export default AuthWrapper;

// import { createContext, useContext, useState } from "react";
// import {
//   RenderMenu,
//   RenderPrivate,
// } from "../components/structure/RenderNavigation";

// interface User {
//   email: string;
//   token: string;
//   isAuthenticated: boolean;
// }

// interface AuthContextData {
//   user: User;
//   signIn(email: string, password: string): Promise<void>;
//   signOut(): void;
// }

// const AuthContext = createContext<AuthContextData>({
//   user: { email: "", token: "", isAuthenticated: false },
//   signIn: () => Promise.resolve(),
//   signOut: () => {},
// });

// export const useContextAuth = () => useContext(AuthContext);

// const AuthWrapper = () => {
//   const [user, setUser] = useState<User>({
//     email: "",
//     token: "",
//     isAuthenticated: false,
//   });

//   const signIn = async (email: string, password: string): Promise<void> => {
//     try {
//       const response = await fetch("https://reqres.in/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         throw new Error("SignIn Failed");
//       }

//       const data = await response.json();
//       setUser({ email, token: data.token, isAuthenticated: true });
//     } catch (err) {
//       throw err;
//     }
//   };

//   const signOut = () => {
//     setUser({ email: "", token: "", isAuthenticated: false });
//   };

//   const authContextValue: AuthContextData = { user, signIn, signOut };

//   return (
//     <>
//       <AuthContext.Provider value={authContextValue}>
//         <RenderMenu />
//         <RenderPrivate />
//       </AuthContext.Provider>
//     </>
//   );
// };

// export default AuthWrapper;
