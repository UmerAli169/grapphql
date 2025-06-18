import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { AuthButton } from "../common/AuthButton";
import { AuthInput } from "../../shared/Input";
import { AuthModal } from "../common/AuthModal";
import { resetPassword } from "../../../services/internal";
import { useAuthStore } from "../../../store/authStore";

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: string;
  setToken: (value: string | null) => void;
}

export const ResetPasswordModal = ({
  isOpen,
  onClose,
  token,
  setToken,
}: ResetPasswordModalProps) => {
  const [successMessage, setSuccessMessage] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);

  const handleResetPassword = async (
    values: { password: string; confirmPassword: string },
    { setSubmitting, resetForm }: any
  ) => {
    setSubmitting(true);
  
    try {
      console.log(
        "Sending reset request with token:",
        token,
        "and password:",
        values.password
      );
      const userData = await resetPassword(token, values.password);
      setUser(userData);
      setSuccessMessage(true);
      resetForm();
      setToken(null); 
  
    } catch (error: any) {
      console.error("Password reset failed:", error);
    } finally {
      setSubmitting(false);
    }
  };
  

  return (
    <AuthModal
      isOpen={isOpen}
      onClose={onClose}
      title="Reset Password"
      heading="Enter a new password for your account:"
    >
      {successMessage ? (
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="p-4 bg-[#E9F6EE] text-[#1E4620] rounded-[4px]">
            <img src="/check.svg" alt="Success" className="w-6 mb-2 mx-auto" />
            <p className="text-[16px] font-medium">
              Your password has been successfully changed.
            </p>
          </div>
          <AuthButton
            type="button"
            onClick={() => {
              setToken(null);
              onClose();
            }}
          >
            Close
          </AuthButton>
        </div>
      ) : (
        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={Yup.object({
            password: Yup.string()
              .min(8, "Password must be at least 8 characters")
              .required("New password is required"),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref("password")], "Passwords must match")
              .required("Confirm password is required"),
          })}
          onSubmit={handleResetPassword}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <AuthInput
                name="password"
                type="password"
                placeholder="Enter new password"
                required
              />
              <AuthInput
                name="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                required
              />

              <AuthButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </AuthButton>
            </Form>
          )}
        </Formik>
      )}
    </AuthModal>
  );
};
