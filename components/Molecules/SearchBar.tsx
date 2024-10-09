import React from "react";
import { Input } from "../Atoms/Input";
import { HiMagnifyingGlass } from "react-icons/hi2";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
}) => (
  <Input
    icon={<HiMagnifyingGlass />}
    type="text"
    placeholder="Search"
    value={value}
    onChange={e => onChange(e.target.value)}
    onKeyDown={e => {
      if (e.key === "Enter") {
        onSearch();
      }
    }}
  />
);
