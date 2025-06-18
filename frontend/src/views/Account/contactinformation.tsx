"use client"

import AccountLayout from "@/components/account/AccountLayout";
import { Suspense } from "react";


const ContactInformation = () => {
  return (
          <Suspense fallback={<p>Loading...</p>}>
    <AccountLayout>

      <ContactInformation />
    </AccountLayout>
      </Suspense>
  );
};

export default ContactInformation;
