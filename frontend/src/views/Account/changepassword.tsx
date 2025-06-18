"use client";

import AccountLayout from "@/components/account/AccountLayout";
import ChangePasswordForm from "@/components/account/ChangePasswordForm";
import { Suspense } from "react";

const ContactInformation = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AccountLayout>
        <ChangePasswordForm />
      </AccountLayout>
    </Suspense>
  );
};

export default ContactInformation;
