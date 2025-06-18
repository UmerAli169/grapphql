"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Wrapper from "@/app/wrapper";
import footerData from "../../Data/footer/footer.json";

const Footer = () => {
  const socialLinks = [
    { href: "#", icon: "/svgs/Shared/footer/fb.svg" },
    { href: "#", icon: "/svgs/Shared/footer/p.svg" },
    { href: "#", icon: "/svgs/Shared/footer/twitter.svg" },
    { href: "#", icon: "/svgs/Shared/footer/instra.svg" },
    { href: "#", icon: "/svgs/Shared/footer/yo.svg" },
  ];

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setData(footerData);
  }, []);

  if (!data) return null;

  return (
    <footer className=" bg-custom-gradient ">
      <Wrapper>
        <div className="mx-auto ">
          <div className="flex justify-center md:gap-[60px] gap-[41.25px]  py-[40px]">
            {socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                className="w-8 h-8 rounded-full  flex items-center justify-center  hover:text-[#F5A3B7] transition-colors"
              >
                <img
                  src={social.icon}
                  alt="social icon"
                  className="w-[30px] "
                />
              </Link>
            ))}
          </div>
          <div></div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="flex flex-col gap-[10px]">
              <p className="text-[#FFFFFF] text-[28px] leading-[42px] font-semibold">
                <span className="text-[#F5A3B7] ">
                  {data.brand.name.split(" ")[0]}{" "}
                </span>
                {data.brand.name.split(" ")[1]}
              </p>
              <p className="text-[#FFFFFF] text-[14px]  leading-[17px] font-normal font-[Montserrat]">
                {data.brand.description}
              </p>
                <div className="text-[#FFFFFF] text-[14px] flex flex-col gap-[10px] leading-[17px] font-normal font-[Montserrat]">
                  <div className="flex gap-[10px]">
                    <img src="/svgs/footer/phone.svg" alt="" />
                    <p>
                      <a
                        href={`tel:${data.brand.contact.phone}`}
                        className="hover:underline"
                      >
                        {data.brand.contact.phone}
                      </a>
                    </p>
                  </div>
                  <div className="flex gap-[10px]">
                  <img src="svgs/footer/email.svg" alt="" />
                    <p>
                      <a
                        href={`mailto:${data.brand.contact.email}`}
                        className="hover:underline"
                      >
                        {data.brand.contact.email}
                      </a>
                    </p>
                  </div>
                  <div className="flex gap-[10px]">
                    <img src="/svgs/footer/location.svg" alt="" />
                    <p>{data.brand.contact.location}</p>
                  </div>
                </div>
        
            </div>

            {data.sections.map((section: any) => (
              <div key={section.title} className="space-y-[10px] ">
                <p className="text-[#B0A6BD] text-[16px]  leading-[24px] font-medium">
                  {section.title}
                </p>
                <ul className="space-y-2 text-[#FFFFFF] text-[16px]  leading-[19px] font-medium font-[Montserrat]">
                  {section.links.map((link: any) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[#FFFFFF] text-[14px]  hover:text-[#F5A3B7]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="space-y-[10px]">
              <h3 className="text-[#FFFFFF] text-[16px]  leading-[24px] font-medium">
                {data.newsletter.title}
              </h3>
              <p className="text-[#FFFFFF] text-[14px]  leading-[17px] font-regular">
                {data.newsletter.description}
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email"
                  className="px-4 py-2  rounded-[4px] w-full max-w-[289px] focus:outline-none focus:ring-2 focus:ring-gray-200 text-[#000000]  text-[14px] "
                />
              </div>
              <button className=" text-[#FFFFFF] rounded-r font-medium text-[16px] ">
                Subscribe →
              </button>
            </div>
          </div>
          </div>
          </Wrapper>

          <div className="w-full h-[0.5px] bg-[#B0A6BD] mt-[39px]"></div>
          <Wrapper>
          <div className="py-[20px]  ">
            <div className="flex justify-between items-center ">
              <p className="text-[#FFFFFF] text-[14px] ">
                {data.bottom.copyright}
              </p>

              <div className="flex space-x-4">
                {data.bottom.policies.map((policy: any) => (
                  <Link
                    key={policy.label}
                    href={policy.href}
                    className="text-[#FFFFFF] text-[14px]  hover:text-gray-800"
                  >
                    {policy.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          </Wrapper>
  
    </footer>
  );
};

export default Footer;
