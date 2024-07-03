"use client";
// src/components/Header/index.tsx
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineStarOutline } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetOverlay,
} from "@/components/ui/sheet";
import CustomInput from "../CustomInput";
import { IDigimonInfos } from "@/interfaces/Digimon";
import { X } from "lucide-react";

function Header() {
  const [favoriteDigimons, setFavoriteDigimons] = useState<IDigimonInfos[]>([]);
  const [filteredDigimons, setFilteredDigimons] = useState<IDigimonInfos[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadFavoritesFromLocalStorage();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sheetRef.current &&
        !sheetRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
    setFilteredDigimons(storedFavorites);
  };

  const handleStarClick = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    const updatedFavorites = favoriteDigimons.filter(
      (digimon) => digimon.id !== id
    );
    setFavoriteDigimons(updatedFavorites);
    setFilteredDigimons(updatedFavorites);
    localStorage.removeItem(`favoriteDigimon-${id}`);
  };

  const toggleSheet = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    const filtered = favoriteDigimons.filter((digimon) =>
      digimon.name.toLowerCase().includes(searchValue)
    );
    setFilteredDigimons(filtered);
  };

  return (
    <header className="w-full bg-zinc-900 min-h-[15vh] flex items-center justify-between px-[5%]">
      <Link href="/" passHref>
        <div className="cursor-pointer">
          <Image
            src="/digilogo.png"
            width={140}
            height={100}
            alt="Digimon logo"
          />
        </div>
      </Link>

      <Sheet>
        <SheetTrigger onClick={toggleSheet}>
          <Image
            src="/Digivice_tri.webp"
            width={60}
            height={60}
            alt="Digivice"
            className="cursor-pointer"
          />
        </SheetTrigger>
        {isOpen && (
          <>
            <SheetOverlay onClick={() => setIsOpen(false)} />
            <SheetContent
              ref={sheetRef}
              className="bg-zinc-900 border-none text-white flex flex-col gap-y-2"
            >
              <SheetHeader>
                <SheetTitle className="text-white flex items-center gap-x-1">
                  Digimons Favoritos <MdOutlineStarOutline />
                </SheetTitle>
              </SheetHeader>
              <CustomInput onChange={handleInputChange} />
              <ul className="w-[100%] flex flex-col justify-start gap-3 mt-[10px] overflow-y-auto">
                {filteredDigimons.map((digimon) => (
                  <li
                    key={digimon.id}
                    className="flex items-center gap-x-2 hover:shadow-inner hover:shadow-white cursor-pointer"
                  >
                    <div className="flex items-center gap-x-2">
                      <Image
                        src={digimon.images[0].href}
                        alt={digimon.name}
                        width={70}
                        height={70}
                      />
                      <p>{digimon.name}</p>
                    </div>
                    <AiFillStar
                      className="text-yellow-500 cursor-pointer"
                      onClick={(e) => handleStarClick(e, digimon.id)}
                    />
                  </li>
                ))}
              </ul>
              <SheetClose className="absolute top-4 right-4 opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </SheetClose>
            </SheetContent>
          </>
        )}
      </Sheet>
    </header>
  );
}

export default Header;
