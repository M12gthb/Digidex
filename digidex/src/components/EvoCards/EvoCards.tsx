import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useColor } from "color-thief-react";
import { IDigimonEvo } from "@/interfaces/Digimon";
import Link from "next/link";

function EvoCards({ digimon }: { digimon: IDigimonEvo }) {
  const { data: color } = useColor(digimon.image, "hex", {
    crossOrigin: "anonymous",
  });
  const gradientBackground = color
    ? `linear-gradient(to bottom right, ${color}, #ffffff)`
    : "linear-gradient(to bottom right, #ffffff, #ffffff)";

  return (
    <Link
      href={`/digimon/${digimon.id}`}
      className="w-[200px] h-[200px] relative group hover:opacity-90"
    >
      <Card
        className="w-[200px] h-[200px] mb-[10px] py-[10px] px-0 flex items-center flex-col"
        style={{
          backgroundImage: gradientBackground,
          border: "none",
          borderRadius: "12px",
        }}
      >
        <CardContent className="p-0">
          <Image
            src={digimon.image ? digimon.image : "/images.png"}
            alt={digimon.digimon}
            width={60}
            height={60}
            className="object-cover rounded-sm w-[100%]"
            crossOrigin="anonymous"
          />
        </CardContent>
        <CardHeader className="drop-shadow-2xl flex felx-col justify-center">
          <CardTitle className="text-xs text-slate-800 drop-shadow-xl">
            {digimon.digimon}
          </CardTitle>
          <p className="text-[0.6rem] text-slate-950">{digimon.condition}</p>
        </CardHeader>
        <div className="absolute bottom-2 right-2 text-xl cursor-pointer"></div>
      </Card>
    </Link>
  );
}

export default EvoCards;
