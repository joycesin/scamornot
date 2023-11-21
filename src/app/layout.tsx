"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
// import "@mantine/core/styles.css";
// import "@mantine/core/styles/global.css";
import { MantineProvider } from "@mantine/core";
import NavBar from "../components/NavBar";

// export const metadata = {
//   title: "My Mantine app",
//   description: "I have followed setup instructions carefully",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <NavBar
          links={[
            {
              link: "/",
              label: "Home",
            },
            {
              link: "/statistics",
              label: "Statistics",
            },
            {
              link: "/contribute",
              label: "Contribute",
            },
          ]}
        />
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
