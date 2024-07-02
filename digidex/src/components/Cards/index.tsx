import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useColor } from "color-thief-react";
import { IDigimonInfos } from "@/interfaces/Digimon";
import Link from "next/link";

export function Cards({ digimon }: { digimon: IDigimonInfos }) {
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
  return (
    <Link href={`/digimon/${digimon.id}`} className="w-[200px] h-[220px]">
      <Card
        className="w-[200px] h-[220px] mb-[10px] py-[10px] px-0 flex items-center flex-col"
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
      </Card>
    </Link>
  );
}

export default Cards;
