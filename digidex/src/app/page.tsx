"use client";
import React from "react";
import { useDigimonContext } from "@/context/DigimonContext";
import { Button } from "@/components/ui/button";
import Cards from "@/components/Cards";

function Home() {
  const { displayedDigimons, loadMoreDigimons, searchTerm } =
    useDigimonContext();

  const filteredDigimons = displayedDigimons.filter((digimon) =>
    digimon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="bg-zinc-800 min-h-[65vh] mt-[5vh] p-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-[10px]">
        {filteredDigimons.map((digimon) => (
          <li key={digimon.id} className="flex justify-center">
            <Cards digimon={digimon} />
          </li>
        ))}
      </ul>
      {filteredDigimons.length < displayedDigimons.length && (
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
