"use client";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
  useMemo,
  useCallback,
} from "react";
import { useMediaQuery } from "@react-hook/media-query";
import { IDigimon } from "@/interfaces/Digimon";
import { api } from "@/services/api";

interface DigimonContextProps {
  digimons: IDigimon[];
  digimonsInfos: IDigimon[];
  displayedDigimons: IDigimon[];
  pageDigimons: IDigimon[];
  searchTerm: string;
  searchTermHeader: string;
  setSearchTerm: (term: string) => void;
  setSearchTermHeader: (term: string) => void;
  setDisplayedDigimons: Dispatch<SetStateAction<IDigimon[]>>;
  setPagedDigimons: Dispatch<SetStateAction<IDigimon[]>>;
  setDigimons: Dispatch<SetStateAction<IDigimon[]>>;
  loadMoreDigimons: () => void;
  toggleFavorite: (updatedDigimon: IDigimon) => void;
  favoriteDigimons: IDigimon[];
  DIGIMONS_PER_PAGE: number;
  setCurrentSortOrder: Dispatch<SetStateAction<string>>;
  setCurrentFilterLevel: Dispatch<SetStateAction<string>>;
  setCurrentTypeLevel: Dispatch<SetStateAction<string>>;
  setCurrentAttributeLevel: Dispatch<SetStateAction<string>>;
  setCurrentFieldLevel: Dispatch<SetStateAction<string>>;
  setCurrentDateLevel: Dispatch<SetStateAction<string>>;
  applyFiltersAndSort: (digimons: IDigimon[]) => IDigimon[];
  currentSortOrder: string;
  currentFilterLevel: string;
  currentTypeLevel: string;
  currentAttributeLevel: string;
  currentFieldLevel: string;
  currentDateLevel: string;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  errorCards: boolean;
  setErrorCards: Dispatch<SetStateAction<boolean>>;
}

const DigimonContext = createContext<DigimonContextProps | undefined>(
  undefined
);

export const DigimonProvider = ({ children }: { children: ReactNode }) => {
  const [digimons, setDigimons] = useState<IDigimon[]>([]);
  const [digimonsInfos, setDigimonsInfos] = useState<IDigimon[]>([]);
  const [displayedDigimons, setDisplayedDigimons] = useState<IDigimon[]>([]);
  const [pageDigimons, setPagedDigimons] = useState<IDigimon[]>([]);
  const [favoriteDigimons, setFavoriteDigimons] = useState<IDigimon[]>([]);
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
  const [loading, setLoading] = useState(true);
  const [errorCards, setErrorCards] = useState(false);
  const DIGIMONS_PER_PAGE_SMALL = 15;
  const DIGIMONS_PER_PAGE_MEDIUM = 12;
  const DIGIMONS_PER_PAGE_LARGE = 20;

  const isMediumScreen = useMediaQuery("(max-width: 1024px)");
  const isLargeScreen = useMediaQuery("(min-width: 1280px)");

  const DIGIMONS_PER_PAGE = useMemo(() => {
    if (isLargeScreen) {
      return DIGIMONS_PER_PAGE_LARGE;
    } else if (isMediumScreen) {
      return DIGIMONS_PER_PAGE_MEDIUM;
    } else {
      return DIGIMONS_PER_PAGE_SMALL;
    }
  }, [isLargeScreen, isMediumScreen]);

  useEffect(() => {
    const getDigimons = async () => {
      try {
        const response = await api.get("/digimon?pageSize=1460");
        const digimonData = response.data.content;
        setDigimons(digimonData);
        setDigimonsInfos(digimonData);
        setDisplayedDigimons(digimonData.slice(0, 1460));
        setPagedDigimons(digimonData.slice(0, DIGIMONS_PER_PAGE));
        setErrorCards(false);
      } catch (err) {
        setErrorCards(true);
        console.error(err);
      } finally {
        setLoading(false);
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

  const loadFavoritesFromLocalStorage = useCallback(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favoriteDigimons") || "[]"
    );
    setFavoriteDigimons(storedFavorites);
  }, []);

  const toggleFavorite = useCallback((updatedDigimon: IDigimon) => {
    setFavoriteDigimons((prevFavorites) => {
      const isFavorite = prevFavorites.some(
        (digimon) => digimon.id === updatedDigimon.id
      );
      const updatedFavorites = isFavorite
        ? prevFavorites.filter((digimon) => digimon.id !== updatedDigimon.id)
        : [...prevFavorites, updatedDigimon];

      localStorage.setItem(
        "favoriteDigimons",
        JSON.stringify(updatedFavorites)
      );
      return updatedFavorites;
    });
  }, []);

  const loadMoreDigimons = useCallback(() => {
    const nextPage = currentPage + 1;
    const newDigimons = displayedDigimons.slice(
      nextPage * DIGIMONS_PER_PAGE,
      (nextPage + 1) * DIGIMONS_PER_PAGE
    );
    setPagedDigimons((prev) => [...prev, ...newDigimons]);
    setCurrentPage(nextPage);
  }, [currentPage, displayedDigimons]);

  const applyFiltersAndSort = useCallback(
    (digimons: IDigimon[]) => {
      let filtered = digimons;

      if (searchTerm) {
        filtered = filtered.filter((digimon) =>
          digimon.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      return filtered.sort((a, b) => {
        switch (currentSortOrder) {
          case "asc":
            return a.name.localeCompare(b.name);
          case "des":
            return b.name.localeCompare(a.name);
          case "desId":
            return b.id - a.id;
          default:
            return a.id - b.id;
        }
      });
    },
    [searchTerm, currentSortOrder]
  );

  const contextValue = useMemo(
    () => ({
      digimons,
      digimonsInfos,
      displayedDigimons,
      pageDigimons,
      searchTerm,
      searchTermHeader,
      setSearchTerm,
      setSearchTermHeader,
      setDisplayedDigimons,
      setPagedDigimons,
      setDigimons,
      loadMoreDigimons,
      toggleFavorite,
      favoriteDigimons,
      DIGIMONS_PER_PAGE,
      setCurrentSortOrder,
      setCurrentFilterLevel,
      setCurrentTypeLevel,
      setCurrentAttributeLevel,
      setCurrentFieldLevel,
      setCurrentDateLevel,
      applyFiltersAndSort,
      currentSortOrder,
      currentFilterLevel,
      currentTypeLevel,
      currentAttributeLevel,
      currentFieldLevel,
      currentDateLevel,
      loading,
      setLoading,
      errorCards,
      setErrorCards,
    }),
    [
      digimons,
      digimonsInfos,
      displayedDigimons,
      pageDigimons,
      searchTerm,
      searchTermHeader,
      setSearchTerm,
      setSearchTermHeader,
      setDisplayedDigimons,
      setPagedDigimons,
      setDigimons,
      loadMoreDigimons,
      toggleFavorite,
      favoriteDigimons,
      DIGIMONS_PER_PAGE,
      setCurrentSortOrder,
      setCurrentFilterLevel,
      setCurrentTypeLevel,
      setCurrentAttributeLevel,
      setCurrentFieldLevel,
      setCurrentDateLevel,
      applyFiltersAndSort,
      currentSortOrder,
      currentFilterLevel,
      currentTypeLevel,
      currentAttributeLevel,
      currentFieldLevel,
      currentDateLevel,
      loading,
      errorCards,
    ]
  );

  return (
    <DigimonContext.Provider value={contextValue}>
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
