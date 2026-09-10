import { logout } from "@/lib/api/auth";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function useLogout() {
  const { setAccessToken } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data?.error ?? error.message);
      } else if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("unknown error");
      }
    } finally {
      setAccessToken(null);
      navigate("/login", { replace: true });
    }
  };

  return handleLogout;
}
