"use client";

import { HambuergerIcon } from "@/app/assets/icons";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  useDisclosure,
} from "@nextui-org/react";
import DropdownElement from "../dropdown";
import Link from "next/link";

function DrawerHamburger({ data, blur, placement }: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  if (!data) return null;

  return (
    <>
      <Button onPress={onOpen} variant="light" size="sm">
        <HambuergerIcon width={24} height={24} />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement={placement || "right"}
        onOpenChange={onOpenChange}
        backdrop={blur ? "blur" : "opaque"}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                {data?.title?.name}
              </DrawerHeader>
              <DrawerBody className="mb-8">
                {data?.content?.categories &&
                  data?.content.categories.length > 0 && (
                    <ul className="col-span-7 flex flex-col justify-around items-start gap-4">
                      {data?.content.categories
                        .sort((a: any, b: any) => a.order - b.order)
                        .map((category: any) => {
                          if (category?.dropdown) {
                            return (
                              <li
                                key={category.id}
                                className={Object.values(
                                  data?.content.category_styles || {}
                                ).join(" ")}
                              >
                                <DropdownElement
                                  title={category.name}
                                  content={category.dropdown_items}
                                  type="drawer-list"
                                />
                              </li>
                            );
                          }

                          return (
                            <li
                              key={category.id}
                              className={Object.values(
                                data?.content.category_styles || {}
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
              </DrawerBody>
              {data?.footer && (
                <DrawerFooter>
                  {data?.footer?.buttons?.map((button: any) => (
                    <Button
                      key={button?.id}
                      color={button?.color}
                      variant={button?.variant}
                      onPress={onClose}
                    >
                      {button?.title}
                    </Button>
                  ))}
                </DrawerFooter>
              )}
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default DrawerHamburger;
