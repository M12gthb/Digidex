"use client";
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
import { X } from "lucide-react";
import { useDigimonContext } from "@/context/DigimonContext";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const {
    favoriteDigimons,
    toggleFavorite,
    searchTermHeader,
    setSearchTermHeader,
  } = useDigimonContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTermHeader(e.target.value);
  };

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

  const toggleSheet = () => {
    setIsOpen(!isOpen);
  };

  const handleLiClick = (e: React.MouseEvent, digimonId: number) => {
    if (
      (e.target as HTMLElement).tagName !== "svg" &&
      (e.target as HTMLElement).tagName !== "path"
    ) {
      window.location.href = `/digimon/${digimonId}`;
      setIsOpen(false);
    }
  };

  const filteredDigimons = favoriteDigimons.filter((digimon) =>
    digimon.name.toLowerCase().includes(searchTermHeader.toLowerCase())
  );

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
              <CustomInput onChange={handleChange} value={searchTermHeader} />
              <ul className="w-[107%] flex flex-col justify-start gap-3 mt-[10px] overflow-y-hidden pr-3">
                {filteredDigimons.map((digimon) => (
                  <li
                    key={digimon.id}
                    className="flex items-center gap-x-2 hover:shadow-inner hover:shadow-white cursor-pointer text-[0.7rem] sm:text-[1rem] justify-between"
                    onClick={(e) => handleLiClick(e, digimon.id)}
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
                      className="text-yellow-500 cursor-pointer hover:text-transparent"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(digimon);
                      }}
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
