"use client";
import React, { useEffect, useState } from "react";
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
import { IDigimonInfos } from "@/interfaces/Digimon";
import { Cards } from "@/components/Cards";

function Header() {
  const [favoriteDigimons, setFavoriteDigimons] = useState<IDigimonInfos[]>([]);

  useEffect(() => {
    loadFavoritesFromLocalStorage();
    window.addEventListener("favoriteDigimonUpdated", handleFavoritesUpdate);
    return () => {
      window.removeEventListener(
        "favoriteDigimonUpdated",
        handleFavoritesUpdate
      );
    };
  }, []);

  const loadFavoritesFromLocalStorage = () => {
    const storedFavorites = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("favoriteDigimon-")) {
        const favoriteDigimon = localStorage.getItem(key);
        if (favoriteDigimon) {
          storedFavorites.push(JSON.parse(favoriteDigimon));
        }
      }
    }
    setFavoriteDigimons(storedFavorites);
  };

  const handleFavoritesUpdate = () => {
    loadFavoritesFromLocalStorage();
  };

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
          <ul className="w-full overflow-y-auto">
            {favoriteDigimons.map((digimon) => (
              <Link
                href={`/digimon/${digimon.id}`}
                key={digimon.id}
                className="flex justify-center mb-2"
              >
                <Cards digimon={digimon} />
              </Link>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </header>
  );
}

export default Header;
