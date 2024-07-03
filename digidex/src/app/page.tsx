"use client";
// src/pages/home.tsx
import React, { useEffect, useState } from "react";
import { api } from "@/services/api";
import { IDigimon, IDigimonInfos } from "@/interfaces/Digimon";
import { Button } from "@/components/ui/button";
import Cards from "@/components/Cards";

function Home() {
  const [digimons, setDigimons] = useState<IDigimon[]>([]);
  const [digimonsInfos, setDigimonsInfos] = useState<IDigimonInfos[]>([]);
  const [displayedDigimons, setDisplayedDigimons] = useState<IDigimonInfos[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(0);

  const DIGIMONS_PER_PAGE = 12;

  const getDigimons = async () => {
    try {
      const response = await api.get("/digimon?pageSize=1460");
      setDigimons(response.data.content);
      console.log(digimons);
      const infosPromises = response.data.content.map(
        async (element: IDigimon) => {
          const responseInfos = await api.get(element.href);
          return responseInfos.data;
        }
      );

      const infos = await Promise.all(infosPromises);
      setDigimonsInfos(infos);
      setDisplayedDigimons(infos.slice(0, DIGIMONS_PER_PAGE));
    } catch (err) {
      console.error(err);
    }
  };

  const loadMoreDigimons = () => {
    const nextPage = currentPage + 1;
    const newDigimons = digimonsInfos.slice(
      nextPage * DIGIMONS_PER_PAGE,
      (nextPage + 1) * DIGIMONS_PER_PAGE
    );
    setDisplayedDigimons([...displayedDigimons, ...newDigimons]);
    setCurrentPage(nextPage);
  };

  const toggleFavorite = (updatedDigimon: IDigimonInfos) => {
    const updatedList = digimonsInfos.map((digimon) =>
      digimon.id === updatedDigimon.id ? updatedDigimon : digimon
    );
    setDigimonsInfos(updatedList);
  };

  useEffect(() => {
    getDigimons();
  }, []);

  return (
    <main className="bg-zinc-800 min-h-[65vh] mt-[5vh] p-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-[10px]">
        {displayedDigimons.map((digimon) => (
          <li key={digimon.id} className="flex justify-center">
            <Cards
              digimon={digimon}
              onToggleFavorite={() => toggleFavorite(digimon)}
            />
          </li>
        ))}
      </ul>
      {displayedDigimons.length < digimonsInfos.length && (
        <div className="w-[100%] flex items-center justify-center">
          <Button
            onClick={loadMoreDigimons}
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Carregar mais digimons
          </Button>
        </div>
      )}
    </main>
  );
}

export default Home;
