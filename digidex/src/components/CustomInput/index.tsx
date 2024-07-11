import React, { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { IoSearchSharp } from "react-icons/io5";

interface CustomInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ onChange, value }) => {
  return (
    <div className="border-none bg-zinc-700 rounded h-[40px] min-w-[205px] text-gray-300 relative">
      <Input
        type="search"
        placeholder="Search for your digimon here..."
        className="border-none h-[100%] placeholder-custom text-xs sm:text-xs"
        value={value}
        onChange={onChange}
      />
      <IoSearchSharp className="absolute top-[12px] right-[7px] sm:top-[12px]" />
    </div>
  );
};

export default CustomInput;
