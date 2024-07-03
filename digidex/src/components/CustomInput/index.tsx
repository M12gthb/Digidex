import React from "react";
import { Input } from "@/components/ui/input";
import { IoSearchSharp } from "react-icons/io5";

interface CustomInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function CustomInput({ onChange }: CustomInputProps) {
  return (
    <div className="border-none bg-zinc-700 rounded h-[40px] text-gray-300 relative">
      <Input
        type="search"
        placeholder="Pesquise seu digimon aqui..."
        className="border-none h-[100%] placeholder-custom text-xs sm:text-sm"
        onChange={onChange}
      />
      <IoSearchSharp className="absolute top-[13px] right-[16px]" />
    </div>
  );
}

export default CustomInput;
