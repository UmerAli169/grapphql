import { useAuthStore } from "@/store/authStore";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface GoogleButtonProps {
  mode: "login" | "register";
}

export const GoogleButton = ({ mode }: GoogleButtonProps) => {
  const router = useRouter();
 const setUser = useAuthStore((state) => state.setUser);

  const handleSuccess = async (credentialResponse: any) => {
    try {
      const { credential } = credentialResponse;

      const res = await axios.post(
        "http://localhost:5000/api/auth/google", 
        { token: credential, mode },
        { withCredentials: true } // 👈 for cookies
      );
      const { message, user }: any = res.data;
      setUser(user);

      toast.success(message || `${mode} successful`);

      
    } catch (error: any) {
      toast.error(error?.response?.data?.error || `${mode} failed`);
    }
  };

  return (
    <div className="w-full">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => toast.error("Google login failed")}
        useOneTap
        auto_select // 👈 Auto-login if email is recognized
      />
    </div>
  );
};
