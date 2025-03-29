import { Box, Button, Input, VStack, useToast } from "@chakra-ui/react";
import { useState } from "react";

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
    >
      <VStack spacing={4}>
        <Input
          placeholder="Write your three sentences..."
          size="lg"
          width="400px"
          bg="white"
          boxShadow="md"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSave();
            }
          }}
        />
      </VStack>
    </Box>
  );
}

export default App;
