import {Inter, Poppins} from "next/font/google";
import "./globals.css";
import {ClerkProvider} from "@clerk/nextjs";
import Layout from "@/components/Layout";

const poppins = Poppins({subsets: ["latin"], weight:["400"]})
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Edwin",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {

  return (
      <ClerkProvider>
        <html lang="en">
          <body className={poppins.className}>
            <Layout>
                {children}
            </Layout>
          </body>
        </html>
      </ClerkProvider>
  );
}
