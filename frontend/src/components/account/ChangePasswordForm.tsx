"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "../shared/Button";
import { AuthInput } from "../shared/Input";
import { useAuthStore } from "@/store/authStore"; // Import Zustand store
import toast from "react-hot-toast";

const ChangePasswordForm = () => {
  const { updatePassword } = useAuthStore(); // Ensure Zustand store is properly used

  return (
    <Formik
      initialValues={{
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      }}
      validationSchema={Yup.object({
        oldPassword: Yup.string().required("Old password is required"),
        newPassword: Yup.string()
          .min(6, "At least 6 characters")
          .required("New password is required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("newPassword")], "Passwords must match")
          .required("Confirm password is required"),
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await updatePassword({
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
          });
          toast.success("Password updated successfully!");
          resetForm();
        } catch (error) {
          toast.error("Failed to update password!");
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <h2 className="text-xl font-semibold">Change Password</h2>

          <AuthInput
            name="oldPassword"
            type="password"
            placeholder="Old Password"
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <AuthInput
              name="newPassword"
              type="password"
              placeholder="New Password"
            />
            <AuthInput
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
            />
          </div>

          <Button
            type="submit"
            className="px-4 py-2 max-w-[362px] hover:bg-custom-gradienthover:text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Password"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ChangePasswordForm;
