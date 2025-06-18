import AboutSection from "../../components/about/AboutSection";
import aboutData from "../../Data/about/aboutData.json";
import Sidebar from "../../components/shared/Sidebar";
import Wrapper from "@/app/wrapper";

export default function AboutPage() {
  return (
    <Wrapper>
      <div className="flex py-[40px] gap-[20px] lg:flex-row flex-col">
        <div className="min-w-[250px] max-h-[80vh] overflow-y-auto">
          <Sidebar
            links={[
              { label: "About Us", href: "/AboutUs" },
              { label: "Shipping & Returns", href: "/shipping-returns" },
              { label: "Contact Us", href: "/contact-us" },
              { label: "FAQs", href: "/faqs" },
            ]}
          />
        </div>

        <div className="flex-1 bg-white rounded-lg px-[20px] ">
          {aboutData.sections.map((section, index) => (
            <AboutSection key={index} title={section.title} items={section.items} />
          ))}
        </div>
      </div>
    </Wrapper>
  );
}  
