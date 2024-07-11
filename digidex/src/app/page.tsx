"use client";
import React, { useEffect, useState } from "react";
import { useDigimonContext } from "@/context/DigimonContext";
import CustomInputHome from "@/components/CustomInputPage";
import Cards from "@/components/Cards";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Home = () => {
  const {
    displayedDigimons,
    digimonsInfos,
    loadMoreDigimons,
    pageDigimons,
    setSearchTerm,
    setCurrentSortOrder,
    applyFiltersAndSort,
    loading,
    errorCards,
  } = useDigimonContext();

  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    setSearchTerm(searchInput);
    if (!searchInput) {
      applyFiltersAndSort(digimonsInfos);
    } else {
      const filteredDigimons = digimonsInfos.filter((digimon) =>
        digimon.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      applyFiltersAndSort(filteredDigimons);
    }
  }, [searchInput, setSearchTerm, digimonsInfos, applyFiltersAndSort]);

  const handleSortOrder = (order: string) => {
    setCurrentSortOrder(order);
    applyFiltersAndSort(displayedDigimons);
  };

  const reloadPage = () => {
    window.location.reload();
  };

  if (errorCards) {
    return (
      <main className="bg-zinc-800 min-h-[70vh] p-4 flex items-center flex-col">
        <section className="border-none mb-5 flex flex-col md:flex-row w-full gap-2.5 items-center justify-center">
          <CustomInputHome
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
          />
        </section>

        <ul className="flex items-center justify-center flex-col gap-5">
          <h1 className="text-4xl text-white leading-relaxed text-center">
            Digimons not found!
          </h1>
          <Image
            src={"/alphamon.png"}
            alt="diabolomon"
            width={250}
            height={300}
          />
        </ul>
        <Button
          onClick={reloadPage}
          className="w-40 h-8 bg-blue-500 text-white mt-3"
        >
          Try again
        </Button>
      </main>
    );
  }

  return (
    <main className="bg-zinc-800 min-h-[70vh] p-4 flex items-center flex-col relative">
      <section className="border-none mb-5 flex flex-col md:flex-row w-full gap-2.5 items-center justify-center">
        <CustomInputHome
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
        />
        <div className="flex flex-col md:flex-row gap-2.5 relative">
          <Select onValueChange={handleSortOrder}>
            <SelectTrigger className="w-[180px] h-9 bg-black text-cyan-50 border-none rounded relative">
              <SelectValue placeholder="ordering" />
              <SelectContent className="absolute top-full left-0 mt-1 bg-black text-cyan-50 border-none cursor-pointer z-10">
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
                <SelectItem
                  className="bg-black text-cyan-50 border-none cursor-pointer"
                  value="desId"
                >
                  descendant
                </SelectItem>
                <SelectItem
                  className="bg-black text-cyan-50 border-none cursor-pointer"
                  value="ascId"
                >
                  ascending
                </SelectItem>
              </SelectContent>
            </SelectTrigger>
          </Select>
        </div>
      </section>

      {loading ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-[10px]">
          {Array.from({ length: 12 }, (_, index) => (
            <li
              key={index}
              className="w-[200px] h-[250px] mb-[10px] py-[10px] px-0 flex items-center flex-col bg-gray-300 dark:bg-gray-600 rounded-sm animate-pulse"
            ></li>
          ))}
        </ul>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-[10px]">
          {pageDigimons.map((digimon) => (
            <Cards key={digimon.id} digimon={digimon} />
          ))}
        </ul>
      )}
      {pageDigimons.length < displayedDigimons.length && (
        <div className="w-full flex items-center justify-center">
          <Button
            onClick={loadMoreDigimons}
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Load more digimon
          </Button>
        </div>
      )}
    </main>
  );
};

export default Home;
