"use client";

import { usePathname } from "next/navigation";
import { FC, useState } from "react";

import { Button } from "@/components/ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/Command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { SIDEBAR_ITEMS } from "@/config";
import { Category } from "@prisma/client";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ScrollArea } from "./ui/ScrollArea";

interface DirectoryMenuProps {
  followingCategories: Category[];
  categories: Category[];
}

const DirectoryMenu: FC<DirectoryMenuProps> = ({
  followingCategories,
  categories,
}) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function getPath() {
    const path = pathname.split("/");
    if (path.includes("submit")) {
      return "Create Post";
    } else if (path.includes("categories")) {
      return (
        <>
          <div className="rounded-full overflow-hidden h-[25px] w-[25px]">
            <Image
              src={
                categories.find((category) => {
                  return category.url === path[2];
                })?.image!
              }
              alt="Category Icon"
              width={50}
              height={50}
              sizes="100vw"
              className="h-full w-auto rounded-full object-cover"
            />
          </div>
          {
            categories.find((category) => {
              return category.url === path[2];
            })?.name
          }
        </>
      );
    } else {
      const Icon = SIDEBAR_ITEMS.find((item) => {
        return (
          item.label === path[1].charAt(0).toUpperCase() + path[1].slice(1)
        );
      })?.icon!;
      return (
        <div className="flex justify-start items-center">
          <Icon className="xl:mr-2.5" strokeWidth={1} />
          <span className="hidden xl:inline">
            {path[1].charAt(0).toUpperCase() + path[1].slice(1)}
          </span>
        </div>
      );
    }
  }

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between items-center"
          >
            {getPath()}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0">
          <Command className="relative rounded-lg border z-50 overflow-visible">
            <CommandInput
              className="outline-none border-none focus:border-none focus:outline-none ring-0"
              placeholder="Filter"
            />

            <ScrollArea
              className={`${followingCategories.length > 5 && "h-[250px]"}`}
            >
              {/* <CommandList> */}
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Navigation">
                {SIDEBAR_ITEMS.map((item) => (
                  <CommandItem key={item.label} className="w-full h-full">
                    <Link
                      href={`${item.href}`}
                      className="flex items-center w-full"
                    >
                      <item.icon className="mr-2.5 inline" strokeWidth={1} />
                      <span>{item.label}</span>
                    </Link>
                  </CommandItem>
                ))}
              </CommandGroup>
              {followingCategories.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup heading="Following">
                    {followingCategories.map((category) => (
                      <CommandItem
                        key={category.id}
                        className="w-full h-full py-0"
                      >
                        <Link
                          href={`/categories/${category.url}`}
                          className="h-full w-full py-1.5 flex items-center"
                        >
                          <div className="rounded-full overflow-hidden h-[25px] w-[25px] mr-2">
                            <Image
                              src={category.image}
                              alt="Category Icon"
                              width={50}
                              height={50}
                              sizes="100vw"
                              className="inline h-full w-auto rounded-full object-cover"
                            />
                          </div>
                          {category.name}
                        </Link>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
              {/* </CommandList> */}
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default DirectoryMenu;
