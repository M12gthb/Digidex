"use client";
import React from "react";
import { useDigimonContext } from "@/context/DigimonContext";
import { Button } from "@/components/ui/button";
import Cards from "@/components/Cards";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomInputHome from "@/components/CustomInputPage";

function Home() {
  const {
    displayedDigimons,
    digimonsInfos,
    loadMoreDigimons,
    pageDigimons,
    searchTerm,
    setSearchTerm,
    setCurrentFilterLevel,
    setCurrentSortOrder,
    applyFiltersAndSort,
  } = useDigimonContext();

  const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (!term) {
      applyFiltersAndSort(digimonsInfos);
    } else {
      const find = digimonsInfos.filter((digimon) =>
        digimon.name.toLowerCase().includes(term.toLowerCase())
      );
      applyFiltersAndSort(find);
    }
  };

  const handleSortOrder = (order: string) => {
    setCurrentSortOrder(order);
    applyFiltersAndSort(displayedDigimons);
  };

  const handleLevelFilter = (level: string) => {
    setCurrentFilterLevel(level);
    if (level === "All") {
      applyFiltersAndSort(digimonsInfos);
    } else {
      const filteredDigimons = digimonsInfos.filter(
        (digimon) =>
          digimon.levels && digimon.levels.some((lvl) => lvl.level === level)
      );
      applyFiltersAndSort(filteredDigimons);
    }
  };

  return (
    <main className="bg-zinc-800 min-h-[65vh] mt-[5vh] p-4">
      <section className="border-none mb-10 flex flex-col md:flex-row w-full gap-2.5 items-center justify-center">
        <CustomInputHome onChange={handleInputSearch} value={searchTerm} />
        <div className="flex flex-col md:flex-row gap-2.5">
          <Select onValueChange={handleLevelFilter}>
            <SelectTrigger className="w-[180px] h-9 bg-black text-cyan-50 border-none">
              <SelectValue placeholder="Nível" />
            </SelectTrigger>
            <SelectContent className="bg-black text-cyan-50 border-none cursor-pointer">
              <SelectItem
                className="bg-black text-cyan-50 border-none cursor-pointer"
                value="All"
              >
                All
              </SelectItem>
              <SelectItem
                className="bg-black text-cyan-50 border-none cursor-pointer"
                value="Baby I"
              >
                Baby I
              </SelectItem>
              <SelectItem
                className="bg-black text-cyan-50 border-none cursor-pointer"
                value="Baby II"
              >
                Baby II
              </SelectItem>
              <SelectItem
                className="bg-black text-cyan-50 border-none cursor-pointer"
                value="Child"
              >
                Child
              </SelectItem>
              <SelectItem
                className="bg-black text-cyan-50 border-none cursor-pointer"
                value="Adult"
              >
                Adult
              </SelectItem>
              <SelectItem
                className="bg-black text-cyan-50 border-none cursor-pointer"
                value="Perfect"
              >
                Perfect
              </SelectItem>
              <SelectItem
                className="bg-black text-cyan-50 border-none cursor-pointer"
                value="Ultimate"
              >
                Ultimate
              </SelectItem>
              <SelectItem
                className="bg-black text-cyan-50 border-none cursor-pointer"
                value="Armor"
              >
                Armor
              </SelectItem>
              <SelectItem
                className="bg-black text-cyan-50 border-none cursor-pointer"
                value="Unknown"
              >
                Unknown
              </SelectItem>
              <SelectItem
                className="bg-black text-cyan-50 border-none cursor-pointer"
                value="Hybrid"
              >
                Hybrid
              </SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={handleSortOrder}>
            <SelectTrigger className="w-[180px] h-9 bg-black text-cyan-50 border-none">
              <SelectValue placeholder="Ordenação" />
            </SelectTrigger>
            <SelectContent className="bg-black text-cyan-50 border-none cursor-pointer">
              <SelectItem
                className="bg-black text-cyan-50 border-none cursor-pointer"
                value="asc"
              >
                a to z
              </SelectItem>
              <SelectItem
                className="bg-black text-cyan-50 border-none cursor-pointer"
                value="des"
              >
                z to a
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-[10px]">
        {pageDigimons.map((digimon) => (
          <li key={digimon.id} className="flex justify-center">
            <Cards digimon={digimon} />
          </li>
        ))}
      </ul>
      {pageDigimons.length < displayedDigimons.length && (
        <div className="w-full flex items-center justify-center">
          <Button
            onClick={loadMoreDigimons}
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Carregar mais Digimons
          </Button>
        </div>
      )}
    </main>
  );
}

export default Home;
