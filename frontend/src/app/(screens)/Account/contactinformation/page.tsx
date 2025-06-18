"use client"

import { Suspense } from "react";
import AccountLayout from "../../../../components/account/AccountLayout";
import ContactInformationForm from '../../../../components/account/ContactInformationForm'

const ContactInformation = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>

    <AccountLayout>
      <ContactInformationForm />
    </AccountLayout>    </Suspense>

  );
};

export default ContactInformation;
