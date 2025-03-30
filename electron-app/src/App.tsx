import { Box, Input, VStack, useToast, Flex } from "@chakra-ui/react";
import { useState } from "react";
import ColorModeToggle from "./components/ColorModeToggle";

function App() {
  const [text, setText] = useState("");
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
        }),
      });

      toast({
        title: "Saved!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      setText("");
    } catch (err) {
      console.error("Failed to save:", err);
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
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      _dark={{ bg: "gray.800" }}
    >
      <Flex justify="flex-end" p={4}>
        <ColorModeToggle />
      </Flex>
      <Flex height="calc(100vh - 64px)" align="center" justify="center">
        <VStack spacing={4}>
          <Input
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
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
          />
        </VStack>
      </Flex>
    </Box>
  );
}

export default App;
