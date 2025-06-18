import Link from "next/link";
import { useRouter } from "next/navigation";

interface ContactInfoProps {
  email: string;
  address?: string;
  isLoggedIn: boolean;
  method: string | null | undefined;
  onLogout?: () => void;
  onChange?: () => void;
}

const ContactInfo: React.FC<ContactInfoProps> = ({
  email,
  address,
  isLoggedIn,
  onLogout,
  onChange,
  method,
}) => {
  
  const router = useRouter();

  return (
    <div className="  flex flex-col gap-[10px] ">
      <div className="flex justify-between p-[10px] bg-[#FCFCFF] rounded-[4px]">
        <p>
          <strong className="text-[#B0A6BD] text-[16px] font-medium">
            Contact
          </strong>{" "}
          <span className=" text-[16px] font-normal text-[#383838]">
            {email}
          </span>
        </p>
        {!isLoggedIn ? (
          <button
            className="text-[#697586] text-[16px] font-normal"
            onClick={()=>router.push("/Account/contactinformation")}
          >
            Change
          </button>
        ) : (
          <Link
            className="text-[#697586] hover:underline text-[16px] font-normal"
            href="#"
            onClick={onLogout}
          >
            Logout
          </Link>
        )}
      </div>

      {address && (
        <div className="flex justify-between  p-[10px]  bg-[#FCFCFF]">
          <p>
            <strong className="text-[#B0A6BD] text-[16px] font-normal">
              Ship to
            </strong>{" "}
            {address}
          </p>
          <button
            className="text-[#697586] text-[16px] font-normal"
            onClick={() => router.push("/Account/addresses")}
            >
            Change
          </button>
        </div>
      )}

      {method && (
        <div className="flex justify-between  p-[10px]  bg-[#FCFCFF]">
          <p>
            <strong className="text-[#B0A6BD] text-[16px] font-normal">
              Method
            </strong>{" "}
            {method}
          </p>
          <button
            className="text-[#697586] text-[16px] font-normal"
            onClick={() => {}}
          >
            Change
          </button>
        </div>
      )}
    </div>
  );
};

export default ContactInfo;
