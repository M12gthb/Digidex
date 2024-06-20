import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineStarOutline } from "react-icons/md";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CustoInput from "../CustomInput";

function Header() {
  return (
    <header className="w-full bg-zinc-900 min-h-[15vh] flex items-center justify-between px-[5%]">
      <Link href="/" className="cursor-pointer">
        <Image
          src="/digilogo.png"
          width={140}
          height={100}
          alt="Digimon logo"
        />
      </Link>

      <Sheet>
        <SheetTrigger>
          <Image
            src="/Digivice_tri.webp"
            width={60}
            height={60}
            alt="Digivice"
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent className=" bg-zinc-900 border-none text-white flex flex-col gap-y-2">
          <SheetHeader>
            <SheetTitle className="text-white flex items-center gap-x-1">
              Digimons Favoritos <MdOutlineStarOutline />
            </SheetTitle>
          </SheetHeader>
          <CustoInput />
        </SheetContent>
      </Sheet>
    </header>
  );
}

export default Header;
