import { Outlet } from "react-router-dom";
// import "./MainLayout.scss";
import Header from "../components/Header/Header";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <main className="flex-1 flex flex-col ">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
