import React from "react";
import AppRouter from "./router.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { useApp } from "./context/AppContext.jsx";

export default function App() {
  const { user } = useApp();

  return (
    <div className="app-shell">
      <Navbar />
      <AppRouter />
      {user && <Footer />}
    </div>
  );
}
