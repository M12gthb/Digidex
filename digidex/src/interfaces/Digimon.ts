export interface IDigimon {
  id: number;
  name: string;
  href: string;
  image: string;
}

interface IImages {
  href: string;
  transparent: boolean;
}

interface ILevels {
  id: number;
  level: string;
}

interface ITypes {
  id: number;
  attribute: string;
}

interface IAttributes {
  id: number;
  type: string;
}

interface IFields {
  id: number;
  field: string;
  image: string;
}

interface IDescriptions {
  origin: string;
  language: string;
  description: string;
}

interface ISkills {
  id: number;
  skill: string;
  translation: string;
  description: string;
}

interface IEvolutions {
  id: number;
  digimon: string;
  condition: string;
  image: string;
  url: string;
}

export interface IDigimonInfos {
  id: number;
  name: string;
  xAntibody: boolean;
  images: Array<IImages>;
  levels: Array<ILevels>;
  types: Array<ITypes>;
  attributes: Array<IAttributes>;
  fields: Array<IFields>;
  releaseDate: string;
  descriptions: Array<IDescriptions>;
  skills: Array<ISkills>;
  priorEvolutions: Array<IEvolutions>;
  nextEvolutions: Array<IEvolutions>;
  isFavorite?: boolean;
}
