import { Outlet } from "react-router-dom";
import "./App.css";
import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";

export const App = () => {
  return (
    <div className="layout">
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
