import {Inter, Poppins} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const poppins = Poppins({subsets: ["latin"], weight:["400"]})
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Edwin",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {/*<Navbar />*/}
        {children}
        {/*<Footer />*/}
      </body>
    </html>
  );
}
