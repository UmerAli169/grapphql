
import { AuthForm } from "../formick/AuthForm";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { AuthModal } from "../common/AuthModal";
import { AuthInput } from "../../shared/Input";
import { AuthButton } from "../common/AuthButton";
import { GoogleButton } from "../common/GoogleButton";
import { OrDivider } from "../common/OrDivider";
import { recoverPassword } from "../../../services/internal";
import { useAuthStore } from "../../../store/authStore";

interface RecoverPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
  heading?: string;
}

export const RecoverPasswordModal = ({ isOpen, onClose, onLoginClick, heading }: RecoverPasswordModalProps) => {
  const [resetError, setResetError] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);
  const handleRecover = async (values: Record<string, any>, { setSubmitting, resetForm }: any) => {
    setSubmitting(true);
  
    try {
      const userData = await recoverPassword(values.email);
      setUser(userData); // Store user data in Zustand
      setSuccessMessage(true);
      resetForm();
    } catch (error: any) {
      setResetError(error.response?.data?.message || "Failed to send recovery email.");
    } finally {
      setSubmitting(false);
    }
  };
  

  useEffect(() => {
    if (resetError) {
      const timer = setTimeout(() => setResetError(""), 1500);
      return () => clearTimeout(timer);
    }
  }, [resetError]);

  return (
    <AuthModal isOpen={isOpen} onClose={onClose} title="Recover Password" heading={heading || "Please enter your email"}>
      {successMessage ? (
        <div className="flex flex-col items-center gap-2">
          <div className="p-2 bg-[#E9F6EE] text-[#1E4620] rounded-[4px] max-w-[398px] flex flex-col">
            <img src="/check.svg" alt="Success" className="w-6 mb-2 mx-auto" />
            <p className="text-[14px] font-medium">
              An email has been sent to your address with instructions to recover your password.
            </p>
          </div>
          <AuthButton type="button" onClick={onClose}>Close</AuthButton>
        </div>
      ) : (
        <AuthForm
          initialValues={{ email: "" }}
          validationSchema={Yup.object({
            email: Yup.string().email("Invalid email address").required("Email is required"),
          })}
          onSubmit={handleRecover}
        >
          {resetError && (
            <div className="flex items-center gap-2 p-2 text-sm rounded-md text-[#E77373] bg-[#F09A9B]/10">
              <img src="/error.svg" alt="error" />
              {resetError}
            </div>
          )}

          <AuthInput name="email" type="email" placeholder="Enter your email" required />

          <AuthButton type="submit">Send Recovery Link</AuthButton>

          <OrDivider />

          <GoogleButton />
          <div className="text-center text-[14px] md:text-[16px] text-[#697586] font-medium">
            Remember your password?
            <button type="button" onClick={onLoginClick} className="underline">
              Back to Log In
            </button>
          </div>
        </AuthForm>
      )}
    </AuthModal>
  );
};

