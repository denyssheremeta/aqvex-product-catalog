import { Outlet } from "react-router-dom";
import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";
import { Toast } from "../toast/Toast";
import { useToast } from "../../hooks/useToast";

export const AppLayout = () => {
  const { message, isVisible } = useToast();

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <Toast message={message} isVisible={isVisible} />
    </>
  );
};
