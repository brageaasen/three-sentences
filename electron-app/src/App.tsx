import { Box, Flex, VStack, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import ColorModeToggle from "./components/ColorModeToggle";
import JournalInput from "./components/JournalInput";
import TagsInput from "./components/TagsInput";

function App() {
  const [text, setText] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const toast = useToast();

  const handleSave = async () => {
    if (!text.trim()) return;

    try {
      await fetch("http://localhost:5235/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          date: new Date().toISOString(),
          tags,
        }),
      });

      setText("");
      setTagInput("");
      setTags([]);

      toast({
        title: "Saved!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      console.error("Error saving entry:", err);
      toast({
        title: "Error saving entry",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      height="100vh"
      bg="gray.50"
      _dark={{ bg: "gray.800" }}
      position="relative"
    >
      <Box position="absolute" top={4} right={4}>
        <ColorModeToggle />
      </Box>

      <Flex height="100%" align="center" justify="center">
        <VStack spacing={4}>
          <JournalInput value={text} onChange={setText} onEnter={handleSave} />
          <TagsInput
            tags={tags}
            setTags={setTags}
            tagInput={tagInput}
            setTagInput={setTagInput}
          />
          <Text fontSize="sm" color="gray.500" alignSelf="flex-end">
            {text.length}/300 characters
          </Text>
        </VStack>
      </Flex>
    </Box>
  );
}

export default App;
