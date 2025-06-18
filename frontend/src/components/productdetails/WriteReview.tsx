import React, { useState } from "react";
import * as Yup from "yup";
import { Field, Formik, FormikHelpers } from "formik";
import { Modal } from "../model/Modal";
import { AuthInput } from "../shared/Input";
import { AuthButton } from "@/components/auth/common/AuthButton";
import { GoogleButton } from "@/components/auth/common/GoogleButton";
import { OrDivider } from "@/components/auth/common/OrDivider";
import { createReview } from "@/services/internal";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  productId: string;
}

interface ReviewFormValues {
  title: string;
  text: string;
  name: string;
  email: string;
  photos: FileList | null;
  rating: number;
}

export const ReviewModal = ({
  isOpen,
  onClose,
  userId,
  productId,
}: ReviewModalProps) => {
  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);

  const handleReviewSubmit = async (
    values: ReviewFormValues,
    actions: FormikHelpers<ReviewFormValues>
  ) => {
    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("productId", productId);
      formData.append("rating", values.rating.toString());
      formData.append("title", values.title);
      formData.append("text", values.text);

      // Only send the first 5 selected photos
      selectedPhotos.slice(0, 5).forEach((file) => {
        formData.append("images", file);
      });

      await createReview(formData);

      actions.setSubmitting(false);
      onClose();
    } catch (error) {
      console.error("❌ Error submitting review:", error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (files) {
      const newFiles = Array.from(files);
      // Take only the first 5 files if more than 5 are selected
      const updatedFiles = selectedPhotos.length + newFiles.length <= 5
        ? [...selectedPhotos, ...newFiles]
        : [...selectedPhotos, ...newFiles.slice(0, 5 - selectedPhotos.length)];

      setSelectedPhotos(updatedFiles);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-[26px] font-normal text-[#383838] mb-4 text-center">
        Write a Review
      </h2>

      <Formik
        initialValues={{
          title: "",
          text: "",
          name: "",
          email: "",
          photos: null,
          rating: 0,
        }}
        validationSchema={Yup.object({
          title: Yup.string().required("Title is required"),
          text: Yup.string().required("Review is required"),
          name: Yup.string().required("Name is required"),
          email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
          rating: Yup.number()
            .min(1, "Please select a rating")
            .required("Rating is required"),
        })}
        onSubmit={handleReviewSubmit as any}
      >
        {({ setFieldValue, handleSubmit, values }) => (
          <form
            onSubmit={handleSubmit}
            className="space-y-4 w-full max-w-[500px]"
          >
            <div className="max-w-[80px] w-full rounded-full flex gap-[10px] items-center">
              <img src="/reviews/reviewsection.png" alt="Reviewer" />
              <div className="flex gap-2 ">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src={
                      values.rating > i
                        ? "/svgs/Shared/reviews/starts.svg"
                        : "/svgs/Shared/ProductSection/cardStar.svg"
                    }
                    alt="star"
                    className="w-[40px] cursor-pointer"
                    onClick={() => setFieldValue("rating", i + 1)}
                  />
                ))}
              </div>
            </div>

            <AuthInput
              type="text"
              name="title"
              placeholder="Review Title"
              required
            />
            <Field
              as="textarea"
              name="text"
              placeholder="What did you think about this product?"
              className="border rounded-md w-full p-2 min-h-[100px] outline-none"
              required
            />

            <label className="border p-2 rounded-md w-full flex items-center gap-2 cursor-pointer outline-none">
              <input
                type="file"
                name="photos"
                className="hidden"
                onChange={handleFileChange}
                multiple
              />
              <img
                src="/svgs/Review/file.svg"
                alt="Upload"
                className="w-5 h-5"
              />
              Add Photos (Max 5)
            </label>

            {selectedPhotos.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedPhotos.map((file, index) => (
                  <div key={index} className="w-[80px] h-[80px] relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Selected"
                      className="w-full h-full object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedPhotos((prev) =>
                          prev.filter((_, i) => i !== index)
                        )
                      }
                      className="absolute top-0 right-0 text-white text-[16px] p-1 bg-red-600 rounded-full"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 flex flex-col gap-[20px] items-center">
              <div className="w-full">
                <p className="font-medium text-left">Your Profile</p>
              </div>

              <AuthInput type="text" name="name" placeholder="Name" required />
              <AuthInput
                type="email"
                name="email"
                placeholder="Email Address"
                required
              />
              <div className="max-w-[392px] flex flex-col gap-[20px] items-center">
                <OrDivider />
                <AuthButton
                  type="button"
                  className="bg-white text-black border max-w-[380px] text-[16px] text-[#697586]"
                >
                  Sign In
                </AuthButton>
                <GoogleButton />
              </div>
            </div>

            <p className="text-center text-[#B0A6BD] text-[12px] font-normal mt-4">
              By continuing you agree to our{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>
            </p>

            <AuthButton type="submit" className="w-full">
              Agree & Submit
            </AuthButton>
          </form>
        )}
      </Formik>
    </Modal>
  );
};
