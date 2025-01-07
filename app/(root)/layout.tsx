import React from "react";
import Header from "../components/views/root/header";
import Footer from "../components/views/root/footer";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="container flex-grow">{children}</div>
      <Footer />
    </>
  );
}
