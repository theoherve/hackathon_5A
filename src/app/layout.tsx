import Providers from "@/app/Components/Providers";
import "@/app/globals.css";
import React from "react";
import Header from "./ui/Header";

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body>
      <Providers>
        <Header />
        <div className="p-4">{children}</div>
      </Providers>
    </body>
  </html>
);

export default RootLayout;
