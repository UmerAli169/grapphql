import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "../shared/Button";
import { AuthInput } from "../shared/Input";
import { useAuthStore } from "../../store/authStore"; // Import Zustand store

const ContactInformationForm = () => {
  const { user, updateContactInfo } = useAuthStore();

  return (
    <Formik
      initialValues={{
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
      }}
      validationSchema={Yup.object({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
      })}
      onSubmit={async (values, { resetForm }) => {
        try {
          await updateContactInfo(values);
          resetForm({ values }); // Keep form updated with new values
        } catch (error) {
          console.error("Error updating contact info:", error);
        }
      }}
    >
      {() => (
        <Form className="space-y-4">
          <h2 className="text-xl font-semibold">Contact Information</h2>

          <AuthInput name="email" type="email" label="Mail" placeholder="Enter your email" required />

          <div className="flex gap-4">
            <div className="w-1/2">
              <AuthInput name="firstName" type="text" label="First Name" placeholder="Enter your first name" required />
            </div>
            <div className="w-1/2">
              <AuthInput name="lastName" type="text" label="Last Name" placeholder="Enter your last name" required />
            </div>
          </div>

          <Button type="submit" className="px-4 py-2 max-w-[362px] hover:bg-custom-gradienthover:text-white">Save</Button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactInformationForm;
