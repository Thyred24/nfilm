import  "@/styles/global.css"

import Footer from "@/components/footer";
import Header from "@/components/header";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="container" >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
