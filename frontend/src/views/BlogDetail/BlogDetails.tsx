"use client";
// import BlogSection from "../../components/main/BlogSection";
import data from "../../Data/blog/blogdetails.json";
import Wrapper from "@/app/wrapper";
import Button from "@/components/shared/Button";
import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";

const BlogDetails = () => {
  const socialLinks = [
    { icon: <Facebook size={20} />, href: "https://facebook.com" },
    { icon: <Twitter size={20} />, href: "https://twitter.com" },
    { icon: <Instagram size={20} />, href: "https://instagram.com" },
  ];
  const blogPost = data.blogs.find((post) => true);

  if (!blogPost) {
    return <p className="text-center text-red-500">Blog not found</p>;
  }

  return (
    <div className="py-[40px]">
      <Wrapper>
        <img
          src={blogPost.image}
          alt={blogPost.title}
          className="w-full h-auto max-h-[400px] object-cover rounded-lg"
        />
        <div className="mt-5 flex h-full justify-between">
          <p className="lg:text-[16px] text-[12px] font-normal text-[#697586]">
            {blogPost.date}
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row space-x-6 items-center">
              <p className="flex items-center justify-center">Share</p>
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-gray-200 transition-colors"
                >
                  <span className="text-[#1E1E1E]">{social.icon}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-[10px]">
          <h1 className="lg:text-[36px] text-[18px] font-medium text-[#383838]">
            {blogPost.title}
          </h1>
          <p className="lg:text-[16px] text-[12px] font-normal text-[#697586]">
            {blogPost.description}
          </p>
          <ul className="list-disc pl-5 lg:text-[16px] text-[12px] font-normal text-[#697586]">
            {blogPost.points?.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>

          <div>Tags:</div>
          {blogPost.tags?.map((label, index) => (
            <Button
              key={index}
              className="max-w-[90px] rounded-[70px] text-[12px] bg-[#B4B0BE]/30 lg:p-[10px] py-[8px] px-[10px] text-black mx-[2px] "
            >
              {label} 
            </Button>
          ))}

          <div className="text-lg text-gray-800 space-y-[40px]">
            {blogPost.sections.map((section, index) => (
              <div key={index}>
                {section.image && (
                  <img
                    src={section.image}
                    alt={section.heading}
                    className="w-full h-auto max-h-[400px] object-cover rounded-lg my-4"
                  />
                )}
                <p className="lg:text-[24px] text-[16px] font-bold text-[#383838]">
                  {section.heading}
                </p>
                <p className="lg:text-[16px] text-[12px] font-normal text-[#697586]">
                  {section.content}
                </p>
                <ul className="list-disc pl-5 lg:text-[16px] text-[12px] font-normal text-[#697586]">
                  {section.points?.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default BlogDetails;
