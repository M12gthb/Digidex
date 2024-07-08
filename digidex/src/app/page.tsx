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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  selectLevel,
  selectTypes,
  selectAttribute,
  selectField,
  selectDate,
} from "./data/selectItens";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@radix-ui/react-label";

const Home = () => {
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
    <main className="bg-zinc-800 min-h-[70vh] p-4">
      <section className="border-none mb-5 flex flex-col md:flex-row w-full gap-2.5 items-center justify-center">
        <CustomInputHome
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchTerm}
        />
        <div className="flex flex-col md:flex-row gap-2.5">
          <Select onValueChange={handleLevelFilter}>
            <SelectTrigger className="w-[180px] h-9 bg-black text-cyan-50 border-none">
              <SelectValue placeholder="Filtro" />
            </SelectTrigger>
            <SelectContent className="bg-black text-cyan-50 border-none cursor-pointer">
              {selectLevel.map((item) => (
                <SelectItem
                  key={item.value}
                  className="bg-black text-cyan-50 border-none cursor-pointer"
                  value={item.value}
                >
                  {item.label}
                </SelectItem>
              ))}
              <SelectItem
                className="bg-black text-cyan-50 border-none cursor-pointer"
                value="xAntibody"
              >
                X-Antibody
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
              <SelectItem
                className="bg-black text-cyan-50 border-none cursor-pointer"
                value="desId"
              >
                descendente
              </SelectItem>
              <SelectItem
                className="bg-black text-cyan-50 border-none cursor-pointer"
                value="ascId"
              >
                ascendente
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>
      <div className="h-15 flex items-center w-full mb-7 justify-center">
        <Popover>
          <PopoverTrigger className="w-[250px] h-10  bg-blue-500 text-white rounded">
            Filtro personalizado
          </PopoverTrigger>
          <PopoverContent className="bg-black">
            <form className="w-full h-full flex flex-col gap-2" typeof="submit">
              <div className="flex flex-col gap-2">
                <h2 className="text-white">X-Antibody</h2>
                <RadioGroup defaultValue="x-false" className="flex">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="x-true"
                      id="option-one"
                      className="bg-white"
                    />
                    <Label htmlFor="option-one" className="text-white">
                      true
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="x-false"
                      id="option-two"
                      className="bg-white"
                    />
                    <Label htmlFor="option-two" className="text-white">
                      false
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-white">Level</h2>
                <Select>
                  <SelectTrigger className="w-[180px] h-9 bg-black text-cyan-50 rounded-sm">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent className="bg-black text-cyan-50 border-none cursor-pointer">
                    {selectLevel.map((item) => (
                      <SelectItem
                        key={item.value}
                        className="bg-black text-cyan-50 border-none cursor-pointer"
                        value={item.value}
                      >
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-white">Type</h2>
                <Select>
                  <SelectTrigger className="w-[180px] h-9 bg-black text-cyan-50 rounded-sm">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent className="bg-black text-cyan-50 border-none cursor-pointer">
                    {selectTypes.map((item) => (
                      <SelectItem
                        key={item.value}
                        className="bg-black text-cyan-50 border-none cursor-pointer"
                        value={item.value}
                      >
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-white">Attribute</h2>
                <Select>
                  <SelectTrigger className="w-[180px] h-9 bg-black text-cyan-50 rounded-sm">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent className="bg-black text-cyan-50 border-none cursor-pointer">
                    {selectAttribute.map((item) => (
                      <SelectItem
                        key={item.value}
                        className="bg-black text-cyan-50 border-none cursor-pointer"
                        value={item.value}
                      >
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-white">Fields</h2>
                <Select>
                  <SelectTrigger className="w-[180px] h-9 bg-black text-cyan-50 rounded-sm">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent className="bg-black text-cyan-50 border-none cursor-pointer">
                    {selectField.map((item) => (
                      <SelectItem
                        key={item.value}
                        className="bg-black text-cyan-50 border-none cursor-pointer"
                        value={item.value}
                      >
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-white">Date of realease</h2>
                <Select>
                  <SelectTrigger className="w-[180px] h-9 bg-black text-cyan-50 rounded-sm">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent className="bg-black text-cyan-50 border-none cursor-pointer">
                    {selectDate.map((item) => (
                      <SelectItem
                        key={item.value}
                        className="bg-black text-cyan-50 border-none cursor-pointer"
                        value={item.value}
                      >
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button className="mt-4 p-2 bg-blue-500 text-white rounded">
                Pesquisar
              </Button>
            </form>
          </PopoverContent>
        </Popover>
      </div>
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
};

export default Home;
