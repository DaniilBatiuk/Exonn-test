import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Tabs } from "../Tabs/Tabs";

import "./Layout.scss";
import { dropdownMenuClick } from "./helpers/dropdownMenuClick";

export const Layout: React.FC = () => {
  return (
    <div className="wrapper" id="wrapper" onClick={dropdownMenuClick}>
      <main className="main">
        <aside className="aside"></aside>
        <div className="main__content">
          <Tabs />
          <section className="main__section">
            <Outlet />
          </section>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};
