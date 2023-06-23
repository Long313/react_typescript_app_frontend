import { ReactNode } from "react";
import style from "./layout.module.scss";
import Navbar from "../Navbar";
import SubNavigate from "../SubNavigate";

interface LayoutProps {
  children: ReactNode;
}
function Layout({ children }: LayoutProps) {
  const storedUser = localStorage.getItem("loggedInUser");
  return (
    <div className={style.layout}>
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;
