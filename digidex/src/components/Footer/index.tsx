import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="w-full bg-zinc-900 min-h-[15vh] flex flex-col sm:flex-row items-center justify-around px-[5%] py-[10px] text-white gap-4 sm:gap-0">
      <Link
        href="https://github.com/M12gthb"
        className="flex items-center gap-4 text-base"
      >
        <Avatar className="w-[60px] h-[60px]">
          <AvatarImage
            src="/My-Image.jpeg"
            className="object-cover w-full h-full"
          />
        </Avatar>
        <p>Dev: Matheus Barros</p>
      </Link>
      <p className="text-xs">
        Digimon and other media relating to the franchise are registered
        trademarks of Bandai.
      </p>
      <Link href="https://digimon.net/reference_en/">
        <Image
          src="/pngwing.com.png"
          width={70}
          height={70}
          alt="Digivice"
          className="cursor-pointer"
        />
      </Link>
    </footer>
  );
}

export default Footer;
