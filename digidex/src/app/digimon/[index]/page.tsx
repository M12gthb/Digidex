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
  const [loading, setLoading] = useState(true);
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
        } finally {
          setLoading(false);
        }
      };

      getDigimon();
    }
  }, [params.index]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center flex-col">
        <Image src={"/grey.gif"} width={300} height={300} alt="" />
        <h1 className="text-white text-2xl">Procurando...</h1>
      </div>
    );
  }

  if (!digimon) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center flex-col gap-3">
        <Image src={"/pngwing2.png"} width={300} height={300} alt="404" />
        <h2 className="text-white text-2xl">Digimon not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh]">
      <h1 className="w-full text-3xl text-white mt-3 mb-3 flex items-center justify-center">
        {digimon.name}
      </h1>
      <div className="flex items-center flex-col sm:flex-row mb-3 sm:px-4 gap-3">
        <Image
          src={digimon.images[0].href}
          alt={digimon.name}
          width={250}
          height={250}
          className="rounded-sm sm:w-[400px] sm:h-[400px]"
        />
        <div className="flex flex-col gap-3">
          {digimon.levels.length > 0 ? (
            <h1 className="text-3xl text-white">
              Level: {digimon.levels[0].level}
            </h1>
          ) : (
            <h1 className="text-3xl text-white">Level: Desconhecido</h1>
          )}

          {digimon.types.length > 0 ? (
            <h1 className="text-3xl text-white">
              Type: {digimon.types[0].type}
            </h1>
          ) : (
            <h1 className="text-3xl text-white">Type: Desconhecido</h1>
          )}

          {digimon.xAntibody == true ? (
            <h1 className="text-3xl text-white">Anticorpo X</h1>
          ) : null}

          {digimon.attributes.length > 0 ? (
            <div className="flex">
              <h1 className="text-3xl text-white">
                {digimon.attributes[0].attribute}
              </h1>
              {digimon.attributes[0].attribute == "Vaccine" ? (
                <Image
                  src={"/vacine.png"}
                  alt="vacine"
                  width={35}
                  height={20}
                />
              ) : null}
              {digimon.attributes[0].attribute == "Virus" ? (
                <Image src={"/virus.png"} alt="virus" width={40} height={10} />
              ) : null}
              {digimon.attributes[0].attribute == "Data" ? (
                <Image src={"/dados.png"} alt="Data" width={40} height={10} />
              ) : null}
              {digimon.attributes[0].attribute == "Free" ? (
                <Image src={"/livre.png"} alt="Free" width={25} height={10} />
              ) : null}
              {digimon.attributes[0].attribute == "Unknown" ? (
                <Image
                  src={"/desconhecido.png"}
                  alt="Unknown"
                  width={35}
                  height={15}
                />
              ) : null}
              {digimon.attributes[0].attribute == "Variable" ? (
                <Image
                  src={"/variavel.png"}
                  alt="Variable"
                  width={40}
                  height={15}
                />
              ) : null}
              {digimon.attributes[0].attribute == "No Data" ? (
                <Image
                  src={"/nodata.png"}
                  alt="No Data"
                  width={40}
                  height={15}
                  className="opacity-95"
                />
              ) : null}
            </div>
          ) : (
            <h1 className="text-3xl text-white">Atributo: Desconhecido</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Digimon;
