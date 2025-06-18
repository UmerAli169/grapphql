"use client";
import { useState, useEffect } from "react";
import { LoginModal } from "./LoginModal";
import { RecoverPasswordModal } from "./RecoverPasswordModal";
import { RegisterModal } from "./RegisterModal";
import { ResetPasswordModal } from "./ResetPasswordModal";

import { useSearchParams } from "next/navigation";

const ModalManager = ({ activeModal, closeModal, setActiveModal }: any) => {
  const searchParams = useSearchParams();
  const [token, setToken]: any = useState(searchParams.get("token"));
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (token) {
      setIsModalOpen(true);
    }
  }, [token]);

  return (
    <>
      {activeModal === "login" && (
        <LoginModal
          isOpen
          onClose={closeModal}
          onRecoverPassword={() => setActiveModal("recover")}
          onCreateAccount={() => setActiveModal("register")}
        />
      )}

      {activeModal === "register" && (
        <RegisterModal
          isOpen
          onClose={closeModal}
          onLoginClick={() => setActiveModal("login")}
        />
      )}

      {activeModal === "recover" && (
        <RecoverPasswordModal
          isOpen
          onClose={closeModal}
          onLoginClick={() => setActiveModal("login")}
        />
      )}

      {isModalOpen && token && (
        <ResetPasswordModal
          isOpen
          onClose={() => {
            setToken(null);
            setIsModalOpen(false); 
          }}
          token={token}
          setToken={setToken}
        />
      )}
    </>
  );
};

export default ModalManager;
