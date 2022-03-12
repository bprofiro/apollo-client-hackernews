import { useContext } from "react";
import { SideBarDrawerContext } from "../contexts/SideBarDrawer";

export const useSideBarDrawer = () => {
  const context = useContext(SideBarDrawerContext);

  if (!context) {
    throw Error('useAuth most be used within a SideBarDrawerProvider')
  }

  return context;
}