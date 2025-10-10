"use client";

import { store, persistor } from "@/lib/store/store";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastProvider } from "@/components/ui/toast";
import { AuthProvider } from "@/contexts/AuthContext";
import { PadiCodeProvider } from "@/context/PadiCodeContext";

const AppWapper = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <Provider store={store}>
        <AuthProvider>
          <PadiCodeProvider>
            <ToastProvider>{children}</ToastProvider>
          </PadiCodeProvider>
        </AuthProvider>
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <PadiCodeProvider>
            <ToastProvider>{children}</ToastProvider>
          </PadiCodeProvider>
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
};

export default AppWapper;
