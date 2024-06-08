import { Outlet } from "react-router-dom";
import "./App.css";
import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const App = () => {
  return (
    <div className="layout">
      <Nav />
      <SkeletonTheme baseColor="#d9d9d9" highlightColor="#eee">
        <main>
          <Outlet />
        </main>
      </SkeletonTheme>
      <Footer />
    </div>
  );
};
