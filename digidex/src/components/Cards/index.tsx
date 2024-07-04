import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useColor } from "color-thief-react";
import { IDigimonInfos } from "@/interfaces/Digimon";
import Link from "next/link";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { useDigimonContext } from "@/context/DigimonContext";

export function Cards({ digimon }: { digimon: IDigimonInfos }) {
  const { toggleFavorite, favoriteDigimons } = useDigimonContext();
  const { data: color } = useColor(
    `/api/proxy?url=${encodeURIComponent(digimon.images[0].href)}`,
    "hex",
    {
      crossOrigin: "anonymous",
    }
  );

  const gradientBackground = color
    ? `linear-gradient(to bottom right, ${color}, #ffffff)`
    : "linear-gradient(to bottom right, #ffffff, #ffffff)";

  const isFavorite = favoriteDigimons.some((fav) => fav.id === digimon.id);

  return (
    <Link
      href={`/digimon/${digimon.id}`}
      className="w-[200px] h-[250px] relative group"
    >
      <Card
        className="w-[200px] h-[250px] mb-[10px] py-[10px] px-0 flex items-center flex-col"
        style={{
          backgroundImage: gradientBackground,
          border: "none",
          borderRadius: "12px",
        }}
      >
        <CardContent className="p-0">
          <Image
            src={
              digimon.images[0].href
                ? `/api/proxy?url=${encodeURIComponent(digimon.images[0].href)}`
                : "/images.png"
            }
            alt={digimon.name}
            width={100}
            height={80}
            className="object-cover rounded-sm w-[100%]"
            crossOrigin="anonymous"
          />
        </CardContent>
        <CardHeader className="drop-shadow-2xl">
          <CardTitle className="text-xs text-slate-800 drop-shadow-xl">
            {digimon.name}
          </CardTitle>
        </CardHeader>
        <div
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(digimon);
          }}
          className="absolute bottom-2 right-2 text-xl cursor-pointer"
        >
          {isFavorite ? (
            <AiFillStar className="text-yellow-500" />
          ) : (
            <AiOutlineStar className="text-yellow-500 group-hover:block hidden" />
          )}
        </div>
      </Card>
    </Link>
  );
}

export default Cards;
