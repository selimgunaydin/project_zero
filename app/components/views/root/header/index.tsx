import { Notification } from "@/app/assets/icons";
import DrawerHamburger from "@/app/components/drawer";
import DropdownElement from "@/app/components/dropdown";
import Search from "@/app/components/search";
import Image from "next/image";
import Link from "next/link";
import { header_data } from "./mockData";
import SessionStatus from "./sessionStatus";

export default async function Header() {
  const type = header_data?.header_type || "default";

  if (type === "spread") {
    return (
      <div className="w-full border-b bg-white z-20 sticky top-0">
        <div className="container py-3 w-full grid grid-cols-12 items-center">
          <div className="col-span-3 flex justify-start items-center">
            <Link href={header_data?.brand?.link || "/"}>
              {header_data?.brand?.logo ? (
                <Image
                  src={header_data?.brand?.logo}
                  width={header_data?.brand?.width}
                  height={header_data?.brand?.height}
                  alt={header_data?.brand?.alt}
                />
              ) : (
                <span className="text-4xl font-bold">PZ</span>
              )}
            </Link>
          </div>

          <div className="col-span-9 flex lg:hidden items-center justify-end gap-8">
            <DrawerHamburger
              data={header_data?.hamburger_menu}
              blur={header_data?.hamburger_menu_blur}
              placement={header_data?.hamburger_menu_placement}
            />
          </div>
          <div className="col-span-9 hidden lg:flex items-center justify-end gap-8">
            {header_data?.categories && header_data.categories.length > 0 && (
              <ul className="col-span-7 flex justify-around items-center gap-8">
                {header_data.categories
                  .sort((a, b) => a.order - b.order)
                  .map((category) => {
                    if (category?.dropdown) {
                      return (
                        <li
                          key={category.id}
                          className={Object.values(
                            header_data.category_styles || {}
                          ).join(" ")}
                        >
                          <DropdownElement
                            title={category.name}
                            content={category.dropdown_items}
                          />
                        </li>
                      );
                    }

                    return (
                      <li
                        key={category.id}
                        className={Object.values(
                          header_data.category_styles || {}
                        ).join(" ")}
                      >
                        <Link href={category.link || "#"}>
                          <span>{category.name}</span>
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            )}

            <div className="flex justify-end items-center gap-4">
              {header_data?.properties?.search?.show && (
                <Search
                  className="sm:max-w-[12rem]"
                  placeholder="Search"
                  iconSize={18}
                />
              )}
              <Notification
                visible={header_data?.properties?.notification?.show}
              />
              <SessionStatus />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full border-b bg-white z-20 sticky top-0">
      <div className="container py-3 w-full grid grid-cols-12 items-center">
        <div className="col-span-2 flex justify-start items-center">
          <Link href={header_data?.brand?.link || "/"}>
            {header_data?.brand?.logo ? (
              <Image
                src={header_data?.brand?.logo}
                width={header_data?.brand?.width}
                height={header_data?.brand?.height}
                alt={header_data?.brand?.alt}
              />
            ) : (
              <span className="text-3xl font-bold">PZ</span>
            )}
          </Link>
        </div>

        <div className="col-span-10 flex lg:hidden items-center justify-end gap-8">
          <DrawerHamburger
            data={header_data?.hamburger_menu}
            blur={header_data?.hamburger_menu_blur}
            placement={header_data?.hamburger_menu_placement}
          />
        </div>
        <div className="col-span-10 hidden w-full lg:block">
          <div className="grid grid-cols-12 col-span-7 items-center gap-8">
            {header_data?.categories && header_data.categories.length > 0 && (
              <ul className="col-span-9 flex w-full justify-around items-center">
                {header_data.categories
                  .sort((a, b) => a.order - b.order)
                  .map((category) => {
                    if (category?.dropdown) {
                      return (
                        <li
                          key={category.id}
                          className={Object.values(
                            header_data.category_styles || {}
                          ).join(" ")}
                        >
                          <DropdownElement
                            title={category.name}
                            content={category.dropdown_items}
                          />
                        </li>
                      );
                    }

                    return (
                      <li
                        key={category.id}
                        className={Object.values(
                          header_data.category_styles || {}
                        ).join(" ")}
                      >
                        <Link href={category.link || "#"}>
                          <span>{category.name}</span>
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            )}

            <div className="col-span-3 w-full flex justify-end items-center gap-4">
              {header_data?.properties?.search?.show && (
                <Search
                  placeholder="Search"
                  className="sm:max-w-[10rem]"
                  iconSize={18}
                />
              )}
              <Notification
                visible={header_data?.properties?.notification?.show}
              />
              <SessionStatus />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
