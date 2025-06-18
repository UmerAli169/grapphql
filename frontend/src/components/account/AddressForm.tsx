"use client";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "../shared/Button";
import { AuthInput } from "../shared/Input";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";
import { useState } from "react";
import { updateAddress } from "../../services/internal";

const AddressForm = () => {
  const [showForm, setShowForm] = useState(false);
  const { user, setUser } = useAuthStore();

  const address = user?.address
    ? `${user.address}, ${user.city}, ${user.country}, ${user.postalCode}`
    : "No address saved";

  const validationSchema = Yup.object({
    country: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    postalCode: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
  });

  return (
    <div className="space-y-[20px] rounded-lg w-full">
      <p className="text-xl font-semibold">Your Addresses</p>
      <div className="flex justify-between items-center pb-2">
        <div className="w-full flex justify-between p-[10px] border">
          <div>
            <span className="pr-[30px] text-[#697586]">Default</span>
            <span>{address}</span>
          </div>
          <button className="text-[#697586]" onClick={() => setShowForm(true)}>
            Change
          </button>
        </div>
      </div>

      {!showForm && (
        <Button
          className="lg:p-[10px] px-[10px] py-[8px] bg-white text-black border border-black hover:bg-custom-gradienthover:text-white"
          onClick={() => setShowForm(true)}
        >
          Add A New Address
        </Button>
      )}

      {showForm && (
        <Formik
          initialValues={{
            country: user?.country || "",
            address: user?.address || "",
            city: user?.city || "",
            postalCode: user?.postalCode || "",
            phone: user?.phone || "",
            setAsDefault: false,
            recipientNotMe: false,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await updateAddress(values);
              setUser({ ...user, ...values });
              setShowForm(false);
            } catch (error) {
              toast.error("Failed to save address!");
            }
            setSubmitting(false);
          }}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <AuthInput name="country" type="text" placeholder="Country" label="Country" />
              <AuthInput name="address" type="text" placeholder="Address" label="Address" />
              <div className="grid grid-cols-2 gap-2">
                <AuthInput name="city" type="text" placeholder="City" label="City" />
                <AuthInput name="postalCode" type="text" placeholder="Postal Code" label="Postal Code" />
              </div>
              <AuthInput name="phone" type="text" placeholder="Phone Number" label="Number" />
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2">
                  <Field type="checkbox" name="setAsDefault" />
                  Set as default
                </label>
                <label className="flex items-center gap-2">
                  <Field type="checkbox" name="recipientNotMe" />
                  The recipient is not me
                </label>
              </div>
              <Button
                type="submit"
                className="w-[240px] text-white py-2 hover:bg-custom-gradienthover:text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default AddressForm;
