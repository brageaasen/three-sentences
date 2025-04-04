import { VStack, Box, Text, HStack, Button, useColorModeValue } from "@chakra-ui/react";

interface JournalEntry {
  id: string;
  text: string;
  date: string;
  tags: string[];
}

interface EntriesListProps {
  loading: boolean;
  error: string | null;
  sortedEntries: JournalEntry[];
  cardBg: string;
  cardBorder: string;
  onEdit: (entry: JournalEntry) => void; // new callback prop
}

const EntriesList = ({ loading, error, sortedEntries, cardBg, cardBorder, onEdit }: EntriesListProps) => {
  if (loading) {
    return (
      <Box minH="200px" display="flex" justifyContent="center" alignItems="center">
        {/* Spinner could go here */}
        <Text>Loading...</Text>
      </Box>
    );
  }
  if (error) {
    return <Text color="red.500">{error}</Text>;
  }
  if (sortedEntries.length === 0) {
    return <Text>No journal entries found.</Text>;
  }
  return (
    <VStack spacing={6} align="stretch">
      {sortedEntries.map((entry, index) => (
        <Box
          key={entry.id || index}
          p={6}
          bg={cardBg}
          borderWidth="1px"
          borderColor={cardBorder}
          borderRadius="lg"
          shadow="md"
          transition="transform 0.2s"
          _hover={{ transform: "scale(1.02)" }}
        >
          <Text fontSize="sm" color={useColorModeValue("gray.500", "gray.400")}>
            {new Date(entry.date).toLocaleString()}
          </Text>
          <Text mt={2} fontSize="lg">
            {entry.text}
          </Text>
          {entry.tags?.length > 0 && (
            <HStack spacing={2} mt={3}>
              {entry.tags.map((tag, i) => (
                <Button key={i} size="xs" variant="solid" colorScheme="blue">
                  #{tag}
                </Button>
              ))}
            </HStack>
          )}
          <Button
            mt={3}
            size="sm"
            onClick={() => onEdit(entry)}
            colorScheme="teal"
          >
            Edit
          </Button>
        </Box>
      ))}
    </VStack>
  );
};

export default EntriesList;
