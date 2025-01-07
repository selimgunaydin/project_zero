import React from "react";



import { StyledBurgerButton } from "./navbar.styles";
import { useSidebarContext } from "@/app/components/layout/layout-context";

export const BurguerButton = () => {
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <div
      className={StyledBurgerButton()}
      // open={collapsed}
      onClick={setCollapsed}
    >
      <div />
      <div />
    </div>
  );
};
