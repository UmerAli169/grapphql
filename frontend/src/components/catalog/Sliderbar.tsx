"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface SidebarProps {
  tittle?: string;
  links?: { label: string; href: string }[];
  collapsibleSections?: {
    key: string;
    title: string;
    href?: string;
    onClick?: (e: React.MouseEvent) => void;
    items: {
      key: string;
      label: string;
      href?: string;
      onClick?: (e: React.MouseEvent) => void;
    }[];
  }[];
}

const Sidebar = ({
  tittle,
  links = [],
  collapsibleSections = [],
}: SidebarProps) => {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleSection = (event: React.MouseEvent, sectionKey: string) => {
    event.preventDefault();
    setOpenSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  return (
    <div className="md:max-w-[250px] w-full bg-[#FFFFFF] rounded-[6px] py-[20px] px-[30px] mb-[20px]">
      {tittle && (
        <h2 className="text-[24px] font-bold text-[#383838] mb-4">{tittle}</h2>
      )}

      <ul className="space-y-[20px]">
        {links.map((link, index) => {
          const isActive = pathname === link.href;
          return (
            <li key={index}>
              <Link
                href={link.href}
                className={`block text-[16px] font-medium ${
                  isActive
                    ? "text-[#F5A3B7]"
                    : "text-[#383838] hover:text-black"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {collapsibleSections.map((section) => {
        const isSectionOpen = openSections[section.key] || false;
        return (
          <div key={section.key} className="mt-6">
            <div
              className={`text-[16px] font-medium flex items-center justify-between cursor-pointer ${
                pathname === section.href
                  ? "text-[#F5A3B7]"
                  : "text-[#697586] hover:text-[#E49BAE]"
              }`}
            >
              {section.href ? (
                <Link
                  href={section.href}
                  onClick={(e) => {
                    e.preventDefault();
                    section.onClick && section.onClick(e);
                  }}
                >
                  {section.title}
                </Link>
              ) : (
                <button
                  onClick={(e) => {
                    toggleSection(e, section.key);
                  }}
                  className="w-full text-left"
                >
                  {section.title}
                </button>
              )}

              {section.items.length > 0 && (
                <button
                  onClick={(e) => toggleSection(e, section.key)}
                  className="ml-2"
                >
                  {isSectionOpen ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
              )}
            </div>
            {isSectionOpen && (
              <ul className="space-y-[10px] mt-2">
                {section.items.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.key || index}>
                      {item.href ? (
                        <Link
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            item.onClick && item.onClick(e);
                          }}
                          className={`text-[14px] leading-[21px] font-normal ${
                            isActive
                              ? "text-[#F5A3B7]"
                              : "text-[#697586] hover:text-[#E49BAE]"
                          }`}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <button
                          onClick={(e) => {
                            item.onClick && item.onClick(e);
                          }}
                          className={`text-[14px] leading-[21px] font-normal w-full text-left ${
                            isActive
                              ? "text-[#F5A3B7]"
                              : "text-[#697586] hover:text-[#E49BAE]"
                          }`}
                        >
                          {item.label}
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
