import { Outlet } from "react-router-dom";
// import "./MainLayout.scss";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="layout flex flex-col min-h-screen">
      <Header />
      <main className="relative flex-1 ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
