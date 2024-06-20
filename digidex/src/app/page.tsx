"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";

export default function Home() {
  const [digimos, setDigimons] = useState([]);
  console.log(digimos);

  const getDigimons = async () => {
    const response = await api.get("/digimon?pageSize=1460");
    setDigimons(response.data.content);
  };

  useEffect(() => {
    getDigimons();
  }, []);

  return <main className=" bg-zinc-800 min-h-[70vh]"></main>;
}
