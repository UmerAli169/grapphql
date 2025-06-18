import React from "react";
import { Formik, Form } from "formik";

interface AuthFormProps {
  initialValues: Record<string, any>;
  validationSchema: any;
  onSubmit: (values: Record<string, any>, actions: any) => void;
  children: React.ReactNode;
}

export const AuthForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  children,
}: AuthFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => <Form className="flex flex-col gap-4">{children}</Form>}
    </Formik>
  );
};
