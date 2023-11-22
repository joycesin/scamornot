import React from "react";
import NavBar from "./NavBar";
import { Footer, Text } from "@mantine/core";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <NavBar
        links={[
          {
            link: "/",
            label: "Home",
          },
          // {
          //   link: "/statistics",
          //   label: "Statistics",
          // },
          {
            link: "/contribute",
            label: "Contribute",
          },
        ]}
      />
      {children}
    </>
  );
}

export default Layout;
