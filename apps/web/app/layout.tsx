import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "./context/UserContext";
import { ContractProvider } from "./context/ContractContext";
// import ConnectWallet from "./components/connectWallet";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fiducia",
  description: "Fiducia is a decentralized finance platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
      <ContractProvider>
        <body className={inter.className}>
        
          
          {children}
          
        </body>
      </ContractProvider>
      </UserProvider>
    </html>
  );
}