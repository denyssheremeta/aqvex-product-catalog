import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ToastContext } from "./toast-context";

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => window.clearTimeout(timeoutId);
  }, [isVisible, message]);

  const value = useMemo(
    () => ({
      isVisible,
      message,
      showToast: (nextMessage: string) => {
        setMessage(nextMessage);
        setIsVisible(true);
      },
    }),
    [isVisible, message],
  );

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};
