"use client";
import React, { useState, useEffect } from "react";
import { getReviewsByProduct } from "../../services/internal";
import Button from "../shared/Button";
import Wrapper from "@/app/wrapper";
import { ReviewModal } from "./WriteReview";
import { useAuthStore } from "@/store/authStore";
import dayjs from "dayjs";

import Link from "next/link";
const ReviewSection = ({ productId }: { productId: string }) => {
  const UserId = useAuthStore((state: any) => state.user?.id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviewsByProduct(productId);
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [productId]);
  const averageRating =
    reviews?.length > 0
      ? (
          reviews?.reduce((sum, review: any) => sum + review?.rating, 0) /
          reviews.length
        ).toFixed(0)
      : "0";
  return (
    <Wrapper>
      <div className="rounded-lg py-[40px] w-full mx-auto">
        <div className="text-center">
          <div className="flex gap-[10px] justify-center items-center">
            <img
              src="/svgs/Shared/ProductSection/leftflower.svg"
              alt="left decoration"
            />
            <p className="lg:text-[24px] text-[20px] text-[#383838] font-bold">
              Read the reviews{" "}
            </p>
            <img
              src="/svgs/Shared/ProductSection/rightflower.svg"
              alt="right decoration"
            />
          </div>

          <Link href="/Catalog">
            <p className="text-[18px] text-[#697586] font-normal hover:text-[#F5A3B7] cursor-pointer">
              See All
            </p>
          </Link>

          <div className="flex flex-col gap-[20px] text-center mt-2">
            <div className="flex items-center justify-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src={
                      i < Math.round(Number(averageRating))
                        ? "/svgs/Shared/reviews/starts.svg"
                        : "/svgs/Shared/ProductSection/cardStar.svg"
                    }
                    alt="star"
                    className="w-4"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500">{averageRating} reviews</p>
            </div>

            <div>
              <Button
                className="lg:p-[10px] max-w-[246px] w-full px-[10px] py-[8px] bg-white text-black border border-black hover:bg-custom-gradienthover:text-white"
                onClick={() => setIsModalOpen(true)}
              >
                Write a Review
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-[40px] space-y-[30px] ">
          {reviews?.slice(0, 3).map((review: any, index, array) => (
            <div key={review._id || index} className="rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  <img
                    src={review.userProfile || "/reviews/reviewpic.png"}
                    alt=""
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 ">
                    <p className="font-medium  leading-[20px]">
                      {review.user?.firstName || "Anonymous"}
                    </p>
                    {review.verified && (
                      <p className=" text-[#B0A6BD] font-[14px] leading-[20px]">
                        Verified Reviewer
                      </p>
                    )}
                  </div>

                  <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <img
                        key={i}
                        src={
                          i < review.rating
                            ? "/svgs/Shared/reviews/starts.svg"
                            : "/svgs/Shared/ProductSection/cardStar.svg"
                        }
                        alt="star"
                        className="w-4"
                      />
                    ))}
                  </div>
                </div>
                <span className="ml-auto  text-[#B0A6BD] font-[14px] leading-[20px]">
                  {dayjs(Number(review.createdAt)).format("DD/MM/YYYY")}
                </span>
              </div>

              <div className="mt-[20px] lg:ml-[50px] ">
                <p className="font-[16px] leading-[20px] ">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <ReviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          userId={UserId}
          productId={productId}
        />
      )}
    </Wrapper>
  );
};

export default ReviewSection;
