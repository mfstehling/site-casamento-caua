import { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import "./globals.css";
import { Header } from "@/components/organisms/Header";

export const metadata = {
  title: "Cauã & Laís",
  description: "Nosso grande dia",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt">
      <body>
        <ChakraProvider>
          <Header />
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
}
