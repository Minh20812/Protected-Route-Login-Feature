import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

interface FormData {
  email: string;
  password: string;
}

export const SignIn = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [formData, setFormData] = useReducer(
    (formData: FormData, newItem: Partial<FormData>) => {
      return { ...formData, ...newItem };
    },
    { email: "", password: "" }
  );

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setErrorMessage("Please fill in all fields");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorMessage("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const doSignIn = async () => {
    if (!validateForm()) return;

    try {
      await signIn(formData.email, formData.password);
      navigate("/account");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <h1>Sign In</h1>
      <div className="flex flex-col text-center">
        <label htmlFor="email">Email: eve.holt@reqres.in</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ email: e.target.value })}
        />
        <label htmlFor="psw">Psw: cityslicka</label>
        <input
          id="psw"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ password: e.target.value })}
        />
        <button onClick={doSignIn}>Sign In</button>
      </div>
      {errorMessage && <div className="error">{errorMessage}</div>}
    </div>
  );
};
