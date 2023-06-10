import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <main className="max-w-[1300px] m-auto px-[10px]">
      <Navbar />
      <Outlet />
    </main>
  );
};

export default Layout;
