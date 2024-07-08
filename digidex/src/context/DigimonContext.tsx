"use client";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { IDigimon, IDigimonInfos } from "@/interfaces/Digimon";
import { api } from "@/services/api";

interface DigimonContextProps {
  digimons: IDigimonInfos[];
  digimonsInfos: IDigimonInfos[];
  displayedDigimons: IDigimonInfos[];
  pageDigimons: IDigimonInfos[];
  searchTerm: string;
  searchTermHeader: string;
  setSearchTerm: (term: string) => void;
  setSearchTermHeader: (term: string) => void;
  setDisplayedDigimons: Dispatch<SetStateAction<IDigimonInfos[]>>;
  setPagedDigimons: Dispatch<SetStateAction<IDigimonInfos[]>>;
  setDigimons: Dispatch<SetStateAction<IDigimonInfos[]>>;
  loadMoreDigimons: () => void;
  toggleFavorite: (updatedDigimon: IDigimonInfos) => void;
  favoriteDigimons: IDigimonInfos[];
  DIGIMONS_PER_PAGE: number;
  setCurrentSortOrder: Dispatch<SetStateAction<string>>;
  setCurrentFilterLevel: Dispatch<SetStateAction<string>>;
  setCurrentTypeLevel: Dispatch<SetStateAction<string>>;
  setCurrentAttributeLevel: Dispatch<SetStateAction<string>>;
  setCurrentFieldLevel: Dispatch<SetStateAction<string>>;
  setCurrentDateLevel: Dispatch<SetStateAction<string>>;
  applyFiltersAndSort: (digimons: IDigimonInfos[]) => IDigimonInfos[];
  currentSortOrder: string;
  currentFilterLevel: string;
  currentTypeLevel: string;
  currentAttributeLevel: string;
  currentFieldLevel: string;
  currentDateLevel: string;
}

const DigimonContext = createContext<DigimonContextProps | undefined>(
  undefined
);

export const DigimonProvider = ({ children }: { children: ReactNode }) => {
  const [digimons, setDigimons] = useState<IDigimonInfos[]>([]);
  const [digimonsInfos, setDigimonsInfos] = useState<IDigimonInfos[]>([]);
  const [displayedDigimons, setDisplayedDigimons] = useState<IDigimonInfos[]>(
    []
  );
  const [pageDigimons, setPagedDigimons] = useState<IDigimonInfos[]>([]);
  const [favoriteDigimons, setFavoriteDigimons] = useState<IDigimonInfos[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermHeader, setSearchTermHeader] = useState("");
  const [currentFilterLevel, setCurrentFilterLevel] = useState<string>("All");
  const [currentTypeLevel, setCurrentTypeLevel] = useState<string>("All");
  const [currentAttributeLevel, setCurrentAttributeLevel] =
    useState<string>("All");
  const [currentFieldLevel, setCurrentFieldLevel] = useState<string>("All");
  const [currentDateLevel, setCurrentDateLevel] = useState<string>("All");
  const [currentSortOrder, setCurrentSortOrder] = useState<string>("All");
  const DIGIMONS_PER_PAGE = 12;

  useEffect(() => {
    const getDigimons = async () => {
      try {
        const response = await api.get("/digimon?pageSize=1460");
        const digimonData = response.data.content;
        setDigimons(digimonData);

        const infosPromises = digimonData.map(async (element: IDigimon) => {
          const responseInfos = await api.get(element.href);
          return responseInfos.data;
        });

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

  useEffect(() => {
    const filteredAndSorted = applyFiltersAndSort(digimonsInfos);
    setDisplayedDigimons(filteredAndSorted);
    setPagedDigimons(filteredAndSorted.slice(0, DIGIMONS_PER_PAGE));
  }, [
    digimonsInfos,
    searchTerm,
    currentFilterLevel,
    currentTypeLevel,
    currentAttributeLevel,
    currentFieldLevel,
    currentDateLevel,
    currentSortOrder,
  ]);

  const loadFavoritesFromLocalStorage = () => {
    const storedFavorites: IDigimonInfos[] = [];
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
    const newDigimons = displayedDigimons.slice(
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

  const applyFiltersAndSort = (digimons: IDigimonInfos[]) => {
    let filtered = digimons;

    if (searchTerm) {
      filtered = filtered.filter((digimon) =>
        digimon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (currentFilterLevel === "xAntibody") {
      filtered = filtered.filter((element) => element.xAntibody === true);
    } else if (currentFilterLevel !== "All") {
      filtered = filtered.filter(
        (digimon) =>
          digimon.levels &&
          digimon.levels.some((level) => level.level === currentFilterLevel)
      );
    }

    if (currentTypeLevel !== "All") {
      filtered = filtered.filter(
        (digimon) =>
          digimon.types &&
          digimon.types.some((type) => type.type === currentTypeLevel)
      );
    }

    if (currentAttributeLevel !== "All") {
      filtered = filtered.filter(
        (digimon) =>
          digimon.attributes &&
          digimon.attributes.some(
            (attribute) => attribute.attribute === currentAttributeLevel
          )
      );
    }

    if (currentFieldLevel !== "All") {
      filtered = filtered.filter(
        (digimon) =>
          digimon.fields &&
          digimon.fields.some((field) => field.field === currentFieldLevel)
      );
    }

    if (currentDateLevel !== "All") {
      filtered = filtered.filter(
        (digimon) => digimon.releaseDate === currentDateLevel
      );
    }

    const sorted = filtered.sort((a, b) => {
      if (currentSortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else if (currentSortOrder === "des") {
        return b.name.localeCompare(a.name);
      } else if (currentSortOrder === "desId") {
        return b.id - a.id;
      } else {
        return a.id - b.id;
      }
    });

    return sorted;
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
        setDisplayedDigimons,
        setPagedDigimons,
        DIGIMONS_PER_PAGE,
        setDigimons,
        setCurrentSortOrder,
        setCurrentFilterLevel,
        applyFiltersAndSort,
        currentSortOrder,
        currentFilterLevel,
        currentTypeLevel,
        setCurrentTypeLevel,
        currentAttributeLevel,
        setCurrentAttributeLevel,
        currentFieldLevel,
        setCurrentFieldLevel,
        setCurrentDateLevel,
        currentDateLevel,
        setSearchTermHeader,
        searchTermHeader,
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
