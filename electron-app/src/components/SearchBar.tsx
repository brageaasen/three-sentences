import { Input } from "@chakra-ui/react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar = ({ searchTerm, setSearchTerm }: SearchBarProps) => {
  return (
    <Input
      placeholder="Search entries..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      size="md"
      mb={6}
      variant="filled"
    />
  );
};

export default SearchBar;
