import Providers from "@/app/Components/Providers";
import "@/app/globals.css";
import React from "react";

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body>
      <Providers>{children}</Providers>
    </body>
  </html>
);

export default RootLayout;
