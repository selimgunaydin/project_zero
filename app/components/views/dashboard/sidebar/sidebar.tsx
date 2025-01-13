import React, { useState } from "react";
import { Sidebar } from "./sidebar.styles";
import { Avatar, Tooltip } from "@nextui-org/react";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";
import { AccountsIcon } from "@/app/components/icons/sidebar/accounts-icon";
import { BalanceIcon } from "@/app/components/icons/sidebar/balance-icon";
import { ChangeLogIcon } from "@/app/components/icons/sidebar/changelog-icon";
import { CustomersIcon } from "@/app/components/icons/sidebar/customers-icon";
import { DevIcon } from "@/app/components/icons/sidebar/dev-icon";
import { FilterIcon } from "@/app/components/icons/sidebar/filter-icon";
import { HomeIcon } from "@/app/components/icons/sidebar/home-icon";
import { PaymentsIcon } from "@/app/components/icons/sidebar/payments-icon";
import { ProductsIcon } from "@/app/components/icons/sidebar/products-icon";
import { ReportsIcon } from "@/app/components/icons/sidebar/reports-icon";
import { SettingsIcon } from "@/app/components/icons/sidebar/settings-icon";
import { ViewIcon } from "@/app/components/icons/sidebar/view-icon";
import { SidebarMenu } from "./sidebar-menu";
import { useSidebarContext } from "@/app/components/layout/layout-context";
import { AcmeIcon } from "@/app/components/icons/acme-icon";
import { BottomIcon } from "@/app/components/icons/sidebar/bottom-icon";

interface Company {
  name: string;
  location: string;
  logo: React.ReactNode;
}

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();
  const [company, setCompany] = useState<Company>({
    name: "Acme Co.",
    location: "Palo Alto, CA",
    logo: <AcmeIcon />,
  });
  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <div className="flex items-center gap-2">
            {company.logo}
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-medium m-0 text-default-900 -mb-4 whitespace-nowrap">
                {company.name}
              </h3>
              <span className="text-xs font-medium text-default-500">
                {company.location}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Home"
              icon={<HomeIcon />}
              isActive={pathname === "/admin"}
              href="/admin"
            />
            <SidebarMenu title="Main Menu">
              <SidebarItem
                isActive={pathname === "/accounts"}
                title="Accounts"
                icon={<AccountsIcon />}
                href="/admin/accounts"
              />
              <SidebarItem
                isActive={pathname === "/payments"}
                title="Payments"
                icon={<PaymentsIcon />}
              />
              <CollapseItems
                icon={<BalanceIcon />}
                items={[{ title: "Hero", href: "/admin/components/hero" }, { title: "Stats", href: "/admin/components/stats" }]}
                title="Components"
              />
              <SidebarItem
                isActive={pathname === "/reports"}
                title="Reports"
                icon={<ReportsIcon />}
              />
            </SidebarMenu>

            <SidebarMenu title="General">
              <SidebarItem
                isActive={pathname === "/developers"}
                title="Developers"
                icon={<DevIcon />}
              />
              <SidebarItem
                isActive={pathname === "/view"}
                title="View Test Data"
                icon={<ViewIcon />}
              />
              <SidebarItem
                isActive={pathname === "/settings"}
                title="Settings"
                icon={<SettingsIcon />}
              />
            </SidebarMenu>

            <SidebarMenu title="Updates">
              <SidebarItem
                isActive={pathname === "/changelog"}
                title="Changelog"
                icon={<ChangeLogIcon />}
              />
            </SidebarMenu>
          </div>
          <div className={Sidebar.Footer()}>
            <Tooltip content={"Settings"} color="primary">
              <div className="max-w-fit">
                <SettingsIcon />
              </div>
            </Tooltip>
            <Tooltip content={"Adjustments"} color="primary">
              <div className="max-w-fit">
                <FilterIcon />
              </div>
            </Tooltip>
            <Tooltip content={"Profile"} color="primary">
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                size="sm"
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </aside>
  );
};
