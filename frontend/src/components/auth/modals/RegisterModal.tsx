import React, { useState } from "react";
import * as Yup from "yup";
import { AuthModal } from "../common/AuthModal";
import { AuthForm } from "../formick/AuthForm";
import { AuthInput } from "../../shared/Input";
import { AuthButton } from "../common/AuthButton";
import { GoogleButton } from "../common/GoogleButton";
import { OrDivider } from "../common/OrDivider";
import { register } from "../../../services/internal";
import Checkbox from "@/components/shared/Checkbox";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

export const RegisterModal = ({ isOpen, onClose, onLoginClick }: RegisterModalProps) => {
  const [registerError, setRegisterError] = useState("");

  const handleRegister = async (values: Record<string, string>, { setSubmitting, resetForm }: any) => {
    console.log("first")
    setSubmitting(true);
    try {
      await register(values); 
      resetForm();
      onClose(); 
    } catch (error: any) {
      setRegisterError(error.response?.data?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };
  

  return (
    <AuthModal isOpen={isOpen} onClose={onClose} title="Register" heading="Please fill in the fields below:">
      <AuthForm
        initialValues={{ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" }}
        validationSchema={Yup.object({
          firstName: Yup.string().required("First name is required"),
          lastName: Yup.string().required("Last name is required"),
          email: Yup.string().email("Invalid email").required("Email is required"),
          password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
          confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match").required("Confirm Password is required"),
        })}
        onSubmit={handleRegister}
      >
        {registerError && <div className="text-red-500 text-sm">{registerError}</div>}
        <AuthInput label="First Name" name="firstName" type="text" placeholder="First Name" required />
        <AuthInput label="Last Name" name="lastName" type="text" placeholder="Last Name" required />
        <AuthInput name="email" type="email" placeholder="Email" required />
        <AuthInput name="password" type="password" placeholder="Password" required />
        <AuthInput name="confirmPassword" type="password" placeholder="Confirm Password" required />
        <AuthButton type="submit">Register</AuthButton>
        <Checkbox label="Yes, I want to subscribe to the newsletter now" />
        <OrDivider />
        <GoogleButton />
        <div className="text-center text-gray-600">
          Already have an account? <button onClick={onLoginClick} className="underline">Login</button>
        </div>
      </AuthForm>
    </AuthModal>
  );
};
