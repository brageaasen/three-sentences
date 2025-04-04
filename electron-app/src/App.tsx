import { Box, Flex, VStack, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import ColorModeToggle from "./components/ColorModeToggle";
import JournalInput from "./components/JournalInput";
import TagsInput from "./components/TagsInput";
import AnimatedLogo from "./components/AnimatedLogo";
import JournalOverview from "./components/JournalOverview";

function App() {
  // Track current screen: "entry" or "overview"
  const [screen, setScreen] = useState<"entry" | "overview">("entry");

  // Journal entry and tags state
  const [text, setText] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const toast = useToast();

  const handleSave = async () => {
    if (!text.trim()) return;

    try {
      await fetch("http://localhost:5235/entries", {
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
      setScreen("overview");

      toast({
        title: "Saved!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      console.error("Error saving entry:", err);

      if (!toast.isActive("failed-saveing-warning")) {
        toast({
          id: "failed-saveing-warning",
          title: "Error saving entry",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
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

      {screen === "entry" ? (
        <Flex height="100%" align="center" justify="center">
          <VStack spacing={4}>
            <AnimatedLogo />
            <JournalInput
              value={text}
              onChange={setText}
              onEnter={handleSave}
            />
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
      ) : (
        <JournalOverview onBack={() => setScreen("entry")} />
      )}
    </Box>
  );
}

export default App;
