"use client";
import { IDigimonInfos } from "@/interfaces/Digimon";
import { api } from "@/services/api";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface DigimonProps {
  params: { index: string };
}

const Digimon: React.FC<DigimonProps> = ({ params }) => {
  const [digimon, setDigimon] = useState<IDigimonInfos | undefined>(undefined);
  useEffect(() => {
    if (params.index === undefined) {
      params.index === "1";
    } else {
      const getDigimon = async () => {
        try {
          const response = await api.get(`/digimon/${params.index}`);
          setDigimon(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      getDigimon();
    }
  }, [params.index]);

  if (!digimon) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center flex-col">
        <Image src={"/grey.gif"} width={300} height={300} alt="" />
        <h1 className="text-white text-2xl">Procurando...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh]">
      <h1>{digimon.name}</h1>
      <Image
        src={digimon.images[0].href}
        alt={digimon.name}
        width={200}
        height={200}
      />
    </div>
  );
};

export default Digimon;
