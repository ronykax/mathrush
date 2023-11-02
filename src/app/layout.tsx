import "./globals.css";

import { Metadata } from "next";
import { Poppins } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";

const font = Poppins({ weight: "400", subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Math Rush",
  description: "Speed run through 20 math problems"
}

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout;