import axios from "../api/axios";
import { useContextAuth } from "../auth/AuthWrapper";

const useRefreshToken = () => {
  const { setUser } = useContextAuth();

  const refresh = async () => {
    const response = await axios.post(
      "/refresh",
      {},
      {
        withCredentials: true,
      }
    );
    setUser((prev) => ({
      ...prev,
      token: response.data.token,
      isAuthenticated: true,
    }));
    return response.data.token;
  };
  return refresh;
};

export default useRefreshToken;
