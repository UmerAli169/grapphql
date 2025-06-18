import Accordion from "./Accordion";

interface SectionProps {
  title: string;
  items: { question: string; answer: string }[];
}

const AboutSection: React.FC<SectionProps> = ({ title, items }) => {
  return (
    <div className=" py-[20px] px-[30px]   ">
      <p className="lg:text-[24px] text-[20px] font-bold text-[#383838] border-b border-[#DFE1E3] pb-[20px]">
        {title}
      </p>
      {items.map((item, index) => (
        <Accordion key={index} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
};

export default AboutSection;
