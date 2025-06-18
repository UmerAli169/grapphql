"use client"
import { Suspense } from "react";
import AccountLayout from "../../../../components/account/AccountLayout";
import ChangePasswordForm from '../../../../components/account/ChangePasswordForm'

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
