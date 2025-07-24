import React from "react";
import * as Yup from "yup";
import { Field, Formik, FormikHelpers, ErrorMessage } from "formik";
import { Modal } from "../model/Modal";
import { AuthButton } from "@/components/auth/common/AuthButton";
import { createReview } from "@/services/internal";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string; // Optional if backend sets it
  productId: string;
}

interface ReviewFormValues {
  text: string;
  rating: number;
}

export const ReviewModal = ({
  isOpen,
  onClose,
  productId,
}: ReviewModalProps) => {
  const handleReviewSubmit = async (
    values: ReviewFormValues,
    actions: FormikHelpers<ReviewFormValues>
  ) => {
    try {
      const input = {
        comment: values.text,
        rating: parseFloat(values.rating as any),
        productId,
      };

      await createReview(input);
      actions.setSubmitting(false);
      onClose();
    } catch (error) {
      console.error("❌ Error submitting review:", error);
      actions.setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-[26px] font-normal text-[#383838] mb-4 text-center">
        Write a Review
      </h2>

      <Formik<ReviewFormValues>
        initialValues={{
          text: "",
          rating: 0,
        }}
        validationSchema={Yup.object({
          text: Yup.string().required("Review is required"),
          rating: Yup.number().min(1, "Select a rating").required("Rating is required"),
        })}
        onSubmit={handleReviewSubmit}
      >
        {({ handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-[500px]">
            <Field
              as="textarea"
              name="text"
              placeholder="What did you think about this product?"
              className="border rounded-md w-full p-2 min-h-[100px] outline-none"
            />
            <ErrorMessage
              name="text"
              component="div"
              className="text-red-500 text-sm"
            />

            <div>
              <label className="block font-medium mb-1">Rating</label>
              <Field
                as="select"
                name="rating"
                className="border rounded-md p-2 w-full"
              >
                <option value={0}>Select Rating</option>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r} Star{r > 1 ? "s" : ""}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="rating"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <AuthButton type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Agree & Submit"}
            </AuthButton>
          </form>
        )}
      </Formik>
    </Modal>
  );
};
