import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ isLoggedIn, userData, handleSignOut }) {
  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        userData={userData}
        handleSignOut={handleSignOut}
      />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
