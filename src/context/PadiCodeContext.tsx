"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface VerifiedPromo {
  verified: boolean;
  code: string;
}

interface PadiCodeContextType {
  verifiedPromoCode: VerifiedPromo | null;
  setVerifiedPromoCode: (promo: VerifiedPromo | null) => void;
}

const PadiCodeContext = createContext<PadiCodeContextType | undefined>(
  undefined
);

export const useVerifiedPromo = () => {
  const context = useContext(PadiCodeContext);
  if (!context) {
    throw new Error("useVerifiedPromo must be used within a PadiCodeProvider");
  }
  return context;
};

interface PadiCodeProviderProps {
  children: ReactNode;
}

export const PadiCodeProvider: React.FC<PadiCodeProviderProps> = ({
  children,
}) => {
  const [verifiedPromoCode, setVerifiedPromoCode] =
    useState<VerifiedPromo | null>(null);

  return (
    <PadiCodeContext.Provider
      value={{ verifiedPromoCode, setVerifiedPromoCode }}
    >
      {children}
    </PadiCodeContext.Provider>
  );
};
