"use client";
import { IDigimonInfos } from "@/interfaces/Digimon";
import { api } from "@/services/api";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
      <h1 className="w-full text-3xl text-center text-gray-200 mt-3 mb-6 flex items-center justify-center">
        {digimon.name}
      </h1>
      <div className="flex items-center flex-col sm:flex-row mb-3 sm:px-4 gap-3">
        <Image
          src={digimon.images[0].href}
          alt={digimon.name}
          width={250}
          height={250}
          className="rounded-sm sm:w-[400px] sm:h-[400px] flex"
        />
        <div className="flex flex-col sm:items-start h-full gap-3  sm:w-full min-h-[250px] px-2">
          {digimon.levels.length > 0 ? (
            <h1 className="text-3xl text-white text-center">
              Level: {digimon.levels[0].level}
            </h1>
          ) : (
            <h1 className="text-3xl text-white text-center">
              Level: Desconhecido
            </h1>
          )}

          {digimon.types.length > 0 ? (
            <h1 className="text-3xl text-white text-center">
              Type: {digimon.types[0].type}
            </h1>
          ) : (
            <h1 className="text-3xl text-white">Type: Desconhecido</h1>
          )}

          {digimon.xAntibody == true ? (
            <h1 className="text-3xl text-white text-center">X-Antibody</h1>
          ) : null}

          {digimon.attributes.length > 0 ? (
            <div className="flex gap-2 items-center justify-center">
              <h1 className="text-3xl text-white text-center">
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
          <h1 className="text-3xl text-white text-center sm:text-start">
            Year of Release:
            {" " + digimon.releaseDate}
          </h1>
          <h1 className="text-3xl text-white text-center mb-3">Fields: </h1>
          {digimon.fields.length > 0 ? (
            <ul className="w-full grid grid-cols-1 sm:text-sm sm:grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-2">
              {digimon.fields.map((field, index) => (
                <li key={index} className="flex gap-2 items-center">
                  {field.field == "Metal Empire" ? (
                    <Image src={"/Me.webp"} width={50} height={50} alt="ME" />
                  ) : null}
                  {field.field == "Nature Spirits" ? (
                    <Image src={"/NS.webp"} width={50} height={50} alt="NS" />
                  ) : null}
                  {field.field == "Nightmare Soldiers" ? (
                    <Image src={"/NSo.webp"} width={50} height={50} alt="NSo" />
                  ) : null}
                  {field.field == "Unknown" ? (
                    <Image
                      src={"/desconhecidoCampo.png"}
                      width={50}
                      height={50}
                      alt="Unknown"
                    />
                  ) : null}
                  {field.field == "Dragon's Roar" ? (
                    <Image src={"/DR.webp"} width={50} height={50} alt="DR" />
                  ) : null}
                  {field.field == "Dark Area" ? (
                    <Image src={"/DA.png"} width={50} height={50} alt="DA" />
                  ) : null}
                  {field.field == "Wind Guardians" ? (
                    <Image src={"/WG.webp"} width={50} height={50} alt="WG" />
                  ) : null}
                  {field.field == "Deep Savers" ? (
                    <Image src={"/DS.webp"} width={50} height={50} alt="DS" />
                  ) : null}
                  {field.field == "Virus Busters" ? (
                    <Image src={"/VB.webp"} width={50} height={50} alt="VB" />
                  ) : null}
                  {field.field == "Jungle Troopers" ? (
                    <Image src={"/JT.webp"} width={50} height={50} alt="JT" />
                  ) : null}
                  <h1 className="text-1xl text-white">{field.field}</h1>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      {digimon.descriptions.length > 0 ? (
        <div>
          <h1 className="w-full text-3xl text-center text-gray-300 mt-7 mb-6 flex items-center justify-center">
            Digimon Description
          </h1>
          <p className="w-full text-sm px-4 text-white mb-6">
            {digimon.descriptions[1].description}
          </p>
        </div>
      ) : null}

      {digimon.skills.length > 0 ? (
        <ul className="w-full px-6 mb-6">
          <h1 className="w-full text-3xl text-center text-gray-300 mt-7 mb-6 flex items-center justify-center">
            Skills
          </h1>
          {digimon.skills.map((skill) => (
            <Accordion type="single" key={skill.id} collapsible>
              <AccordionItem
                className="text-base px-2 text-center text-gray-200 "
                value={"item-" + String(skill.id)}
              >
                <AccordionTrigger>{skill.skill}</AccordionTrigger>
                <AccordionContent>{skill.description}</AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Digimon;
