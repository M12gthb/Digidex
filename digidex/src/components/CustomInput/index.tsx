import React, { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { IoSearchSharp } from "react-icons/io5";

interface CustomInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ onChange, value }) => {
  return (
    <div className="border-none bg-zinc-700 rounded h-[40px] text-gray-300 relative">
      <Input
        type="search"
        placeholder="Pesquise seu digimon aqui..."
        className="border-none h-[100%] placeholder-custom text-xs sm:text-sm"
        value={value}
        onChange={onChange}
      />
      <IoSearchSharp className="absolute top-[8px] right-[10px] sm:top-[10px]" />
    </div>
  );
};

export default CustomInput;
