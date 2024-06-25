import '@/app/globals.css';
import React from 'react';
import Providers from "@/app/Components/Providers";

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
      <body>
          <Providers>
            {children}
          </Providers>
      </body>
  </html>
);

export default RootLayout;
