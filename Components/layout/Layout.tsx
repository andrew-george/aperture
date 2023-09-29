import { ReactNode } from "react";
import { useAppSelector } from "../../hooks/hooks";
import useDataFromLocalStorage from "../../hooks/useDataFromLocalStorage";
import CartModal from "../cart/CartModal";
import Footer from "./Footer";
import Header from "./Header";
import SideMenu from "./SideMenu";

function Layout({ children }: { children: ReactNode }) {
  const { isCartModalOpen, isSideMenuOpen } = useAppSelector(
    (state) => state.ui,
  );

  useDataFromLocalStorage();

  return (
    <div className="bg-[url(/assets/bg-mesh-gradient.png)] bg-cover -z-50">
      <div className="flex flex-col font-sans font-normal min-h-screen h-full w-screen transition-all duration-500 text-white select-none">
        {isCartModalOpen && <CartModal />}
        {isSideMenuOpen && <SideMenu />}
        <Header />
        <div className="h-4/5 flex-grow">{children}</div>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
