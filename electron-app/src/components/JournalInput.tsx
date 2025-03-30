import { Input } from "@chakra-ui/react";

const JournalInput = ({ value, onChange, onEnter }) => (
  <Input
    id="journal-input"
    placeholder="Write your three sentences..."
    size="lg"
    width="400px"
    bg="white"
    color="black"
    _dark={{
      bg: "gray.700",
      color: "white",
      placeholder: { color: "gray.400" },
    }}
    boxShadow="md"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") onEnter();
      else if (e.key === "ArrowDown") {
        document.getElementById("tag-input")?.focus();
      }
    }}
  />
);

export default JournalInput;
