import { Outlet } from "react-router-dom";

import MainNavigation from "../Components/Navigation/MainNavigation";

function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
