"use client";
import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { IDigimon, IDigimonInfos } from "@/interfaces/Digimon";
import { api } from "@/services/api";

interface DigimonContextProps {
  digimons: IDigimon[];
  digimonsInfos: IDigimonInfos[];
  displayedDigimons: IDigimonInfos[];
  pageDigimons: IDigimonInfos[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  loadMoreDigimons: () => void;
  toggleFavorite: (updatedDigimon: IDigimonInfos) => void;
  favoriteDigimons: IDigimonInfos[];
}

const DigimonContext = createContext<DigimonContextProps | undefined>(
  undefined
);

export const DigimonProvider = ({ children }: { children: ReactNode }) => {
  const [digimons, setDigimons] = useState<IDigimon[]>([]);
  const [digimonsInfos, setDigimonsInfos] = useState<IDigimonInfos[]>([]);
  const [displayedDigimons, setDisplayedDigimons] = useState<IDigimonInfos[]>(
    []
  );
  const [pageDigimons, setPagedDigimons] = useState<IDigimonInfos[]>([]);
  const [favoriteDigimons, setFavoriteDigimons] = useState<IDigimonInfos[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const DIGIMONS_PER_PAGE = 12;

  useEffect(() => {
    const getDigimons = async () => {
      try {
        const response = await api.get("/digimon?pageSize=1460");
        setDigimons(response.data.content);
        const infosPromises = response.data.content.map(
          async (element: IDigimon) => {
            const responseInfos = await api.get(element.href);
            return responseInfos.data;
          }
        );
        const infos = await Promise.all(infosPromises);
        setDigimonsInfos(infos);
        setDisplayedDigimons(infos.slice(0, 1460));
        setPagedDigimons(infos.slice(0, DIGIMONS_PER_PAGE));
      } catch (err) {
        console.error(err);
      }
    };
    getDigimons();
    loadFavoritesFromLocalStorage();
  }, []);

  const loadFavoritesFromLocalStorage = () => {
    const storedFavorites = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("favoriteDigimon-")) {
        const favoriteDigimon = localStorage.getItem(key);
        if (favoriteDigimon) {
          storedFavorites.push(JSON.parse(favoriteDigimon));
        }
      }
    }
    setFavoriteDigimons(storedFavorites);
  };

  const loadMoreDigimons = () => {
    const nextPage = currentPage + 1;
    const newDigimons = digimonsInfos.slice(
      nextPage * DIGIMONS_PER_PAGE,
      (nextPage + 1) * DIGIMONS_PER_PAGE
    );
    setPagedDigimons([...pageDigimons, ...newDigimons]);
    setCurrentPage(nextPage);
  };

  const toggleFavorite = (updatedDigimon: IDigimonInfos) => {
    const isFavorite = favoriteDigimons.some(
      (digimon) => digimon.id === updatedDigimon.id
    );
    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favoriteDigimons.filter(
        (digimon) => digimon.id !== updatedDigimon.id
      );
      localStorage.removeItem(`favoriteDigimon-${updatedDigimon.id}`);
    } else {
      updatedFavorites = [...favoriteDigimons, updatedDigimon];
      localStorage.setItem(
        `favoriteDigimon-${updatedDigimon.id}`,
        JSON.stringify(updatedDigimon)
      );
    }
    setFavoriteDigimons(updatedFavorites);
  };

  return (
    <DigimonContext.Provider
      value={{
        digimons,
        digimonsInfos,
        displayedDigimons,
        searchTerm,
        setSearchTerm,
        loadMoreDigimons,
        toggleFavorite,
        favoriteDigimons,
        pageDigimons,
      }}
    >
      {children}
    </DigimonContext.Provider>
  );
};

export const useDigimonContext = () => {
  const context = useContext(DigimonContext);
  if (!context) {
    throw new Error("useDigimonContext must be used within a DigimonProvider");
  }
  return context;
};
