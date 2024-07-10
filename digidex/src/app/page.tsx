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
import {
  selectLevel,
  selectTypes,
  selectAttribute,
  selectField,
  selectDate,
} from "./data/selectItens";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@/components/ui/popover";
import Image from "next/image";

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
    setCurrentTypeLevel,
    setCurrentAttributeLevel,
    setCurrentFieldLevel,
    setCurrentDateLevel,
    loading,
    errorCards,
  } = useDigimonContext();

  const [searchInput, setSearchInput] = useState("");
  const LoadingArray = Array.from({ length: 12 }, (_, index) => index);

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

  const handleTypeFilter = (type: string) => {
    setCurrentTypeLevel(type);
    if (type !== "All") {
      const filteredDigimons = digimonsInfos.filter(
        (digimon) => digimon.types && digimon.types.some((t) => t.type === type)
      );
      applyFiltersAndSort(filteredDigimons);
    } else {
      applyFiltersAndSort(digimonsInfos);
    }
  };

  const handleAtributeFilter = (attribute: string) => {
    setCurrentAttributeLevel(attribute);
    if (attribute !== "All") {
      const filteredDigimons = digimonsInfos.filter(
        (digimon) =>
          digimon.attributes &&
          digimon.attributes.some((t) => t.attribute === attribute)
      );
      applyFiltersAndSort(filteredDigimons);
    } else {
      applyFiltersAndSort(digimonsInfos);
    }
  };

  const handleFiledFilter = (field: string) => {
    setCurrentFieldLevel(field);
    if (field !== "All") {
      const filteredDigimons = digimonsInfos.filter(
        (digimon) =>
          digimon.fields && digimon.fields.some((t) => t.field === field)
      );
      applyFiltersAndSort(filteredDigimons);
    } else {
      applyFiltersAndSort(digimonsInfos);
    }
  };

  const handleDateFilter = (date: string) => {
    setCurrentDateLevel(date);
    if (date !== "All") {
      const filteredDigimons = digimonsInfos.filter(
        (digimon) => digimon.releaseDate === date
      );
      applyFiltersAndSort(filteredDigimons);
    } else {
      applyFiltersAndSort(digimonsInfos);
    }
  };

  if (errorCards) {
    return (
      <main className="bg-zinc-800 min-h-[70vh] p-4 flex items-center flex-col">
        <section className="border-none mb-5 flex flex-col md:flex-row w-full gap-2.5 items-center justify-center">
          <CustomInputHome
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchTerm}
          />
          <div className="flex flex-col md:flex-row gap-2.5">
            <Select onValueChange={handleLevelFilter}>
              <SelectTrigger className="w-[180px] h-9 bg-black text-cyan-50 border-none rounded-sm">
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
              <SelectTrigger className="w-[180px] h-9 bg-black text-cyan-50 border-none rounded-sm">
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
              Filtros personalizados
            </PopoverTrigger>
            <PopoverContent className="bg-black">
              <div className="w-full h-full flex flex-col gap-1">
                <div className="flex flex-col gap-2">
                  <h2 className="text-white">Type</h2>
                  <Select onValueChange={handleTypeFilter}>
                    <SelectTrigger className="w-full h-9 bg-black text-cyan-50 rounded-sm">
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent className="bg-black text-cyan-50 border-none cursor-pointer w-full">
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
                  <Select onValueChange={handleAtributeFilter}>
                    <SelectTrigger className="w-full h-9 bg-black text-cyan-50 rounded-sm">
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
                  <Select onValueChange={handleFiledFilter}>
                    <SelectTrigger className="w-full h-9 bg-black text-cyan-50 rounded-sm">
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
                  <Select onValueChange={handleDateFilter}>
                    <SelectTrigger className="w-full h-9 bg-black text-cyan-50 rounded-sm">
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
              </div>
            </PopoverContent>
          </Popover>
        </div>
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
    <main className="bg-zinc-800 min-h-[70vh] p-4 flex items-center flex-col">
      <section className="border-none mb-5 flex flex-col md:flex-row w-full gap-2.5 items-center justify-center">
        <CustomInputHome
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchTerm}
        />
        <div className="flex flex-col md:flex-row gap-2.5">
          <Select onValueChange={handleLevelFilter}>
            <SelectTrigger className="w-[180px] h-9 bg-black text-cyan-50 border-none rounded-sm">
              <SelectValue placeholder="Filter" />
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
            <SelectTrigger className="w-[180px] h-9 bg-black text-cyan-50 border-none rounded-sm">
              <SelectValue placeholder="ordering" />
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
                descendant
              </SelectItem>
              <SelectItem
                className="bg-black text-cyan-50 border-none cursor-pointer"
                value="ascId"
              >
                ascending
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>
      <div className="h-15 flex items-center w-full mb-7 justify-center">
        <Popover>
          <PopoverTrigger className="w-[250px] h-10  bg-blue-500 text-white rounded">
            Custom filters
          </PopoverTrigger>
          <PopoverContent className="bg-black">
            <div className="w-full h-full flex flex-col gap-1">
              <div className="flex flex-col gap-2">
                <h2 className="text-white">Type</h2>
                <Select onValueChange={handleTypeFilter}>
                  <SelectTrigger className="w-full h-9 bg-black text-cyan-50 rounded-sm">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent className="bg-black text-cyan-50 border-none cursor-pointer w-full">
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
                <Select onValueChange={handleAtributeFilter}>
                  <SelectTrigger className="w-full h-9 bg-black text-cyan-50 rounded-sm">
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
                <Select onValueChange={handleFiledFilter}>
                  <SelectTrigger className="w-full h-9 bg-black text-cyan-50 rounded-sm">
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
                <Select onValueChange={handleDateFilter}>
                  <SelectTrigger className="w-full h-9 bg-black text-cyan-50 rounded-sm">
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
            </div>
          </PopoverContent>
        </Popover>
      </div>
      {loading ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-[10px]">
          {LoadingArray.map((index) => (
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
