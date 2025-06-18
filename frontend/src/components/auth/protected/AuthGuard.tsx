"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { LoginModal } from "../modals/LoginModal";
import { RecoverPasswordModal } from "../modals/RecoverPasswordModal";
import { RegisterModal } from "../modals/RegisterModal";
import { ResetPasswordModal } from "../modals/ResetPasswordModal";
import { useSearchParams } from "next/navigation";

interface AuthGuardProps {
  children: React.ReactNode;
  activeModal: string;
  closeModal: () => void;
  setActiveModal: (modal: string) => void;
}

export const AuthGuard = ({ children, activeModal, closeModal, setActiveModal }: AuthGuardProps) => {
  const user = useAuthStore((state) => state.user);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isLoading, setIsLoading] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    if (!user) {
      setIsLoginOpen(true);
    }
  }, [user]);

  if (isLoading) return null;

  return user ? (
    <>{children}</>
  ) : (
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
        <RegisterModal isOpen onClose={closeModal} onLoginClick={() => setActiveModal("login")} />
      )}

      {activeModal === "recover" && (
        <RecoverPasswordModal isOpen onClose={closeModal} onLoginClick={() => setActiveModal("login")} />
      )}

      {token && (
        <ResetPasswordModal
          isOpen
          onClose={() => setActiveModal("login")}
          token={token}
          setToken={() => {}}
        />
      )}
    </>
  );
};
