import React from "react";
import { Outlet } from "react-router-dom";
import PageTransition from "./PageTransition/PageTransition";

const Layout = () => {
  return (
    <>

      <main>
        <Outlet />
      </main>

      <PageTransition />
    </>
  );
};

export default Layout;