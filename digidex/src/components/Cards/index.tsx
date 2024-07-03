// src/components/Cards/index.tsx
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useColor } from "color-thief-react";
import { IDigimonInfos } from "@/interfaces/Digimon";
import Link from "next/link";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

export function Cards({
  digimon,
  onToggleFavorite,
}: {
  digimon: IDigimonInfos;
  onToggleFavorite: () => void;
}) {
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

  const [isStarred, setIsStarred] = useState(false);

  useEffect(() => {
    const favorite = localStorage.getItem(`favoriteDigimon-${digimon.id}`);
    setIsStarred(!!favorite);
  }, [digimon.id]);

  const handleStarClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isStarred) {
      localStorage.setItem(
        `favoriteDigimon-${digimon.id}`,
        JSON.stringify(digimon)
      );
    } else {
      localStorage.removeItem(`favoriteDigimon-${digimon.id}`);
    }
    setIsStarred(!isStarred);
    onToggleFavorite(); // Atualiza o estado do favorito no componente pai (Home)
  };

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
          onClick={handleStarClick}
          className="absolute bottom-2 right-2 text-xl cursor-pointer"
        >
          {isStarred ? (
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
