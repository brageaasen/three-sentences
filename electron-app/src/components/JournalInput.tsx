import { Textarea } from "@chakra-ui/react";
import { useRef, useEffect } from "react";

const JournalInput = ({ value, onChange, onEnter }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <Textarea
      ref={textareaRef}
      id="journal-input"
      placeholder="Write your three sentences..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          onEnter();
        } else if (e.key === "ArrowDown") {
          document.getElementById("tag-input")?.focus();
        }
      }}
      size="lg"
      width="100%"
      maxLength={300}
      maxW="600px"
      minH="30px"
      maxH="400px"
      fontSize="lg"
      fontWeight="medium"
      resize="none"
      overflow="hidden"
      padding="4"
      bg="white"
      borderRadius="lg"
      border="1px solid"
      borderColor="gray.300"
      _focus={{
        borderColor: "blue.400",
        boxShadow: "sm",
      }}
      _dark={{
        bg: "gray.700",
        borderColor: "gray.600",
        color: "white",
        placeholder: { color: "gray.400" },
        _focus: {
          borderColor: "blue.300",
          boxShadow: "sm",
        },
      }}
    />
  );
};

export default JournalInput;
