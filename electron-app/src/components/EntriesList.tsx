import {
  Box,
  Flex,
  VStack,
  Text,
  HStack,
  Button,
  Spinner,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi"; // Visual fallback icon

interface Entry {
  date: string;
  text: string;
  tags?: string[];
}

interface EntriesListProps {
  loading: boolean;
  sortedEntries: Entry[];
  error: string | null;
  cardBg: string;
  cardBorder: string;
}

const EntriesList = ({
  loading,
  sortedEntries,
  error,
  cardBg,
  cardBorder,
}: EntriesListProps) => {
  const mutedText = useColorModeValue("gray.500", "gray.400");

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="200px">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justify="center" align="center" minH="200px">
        <Text color="red.500" fontSize="md">
          {error}
        </Text>
      </Flex>
    );
  }

  if (sortedEntries.length === 0) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        py={10}
        minH="200px"
        color={mutedText}
      >
        <Icon as={FiSearch} boxSize={8} mb={4} opacity={0.6} />
        <Text fontSize="lg" fontWeight="medium">
          No entries found
        </Text>
        <Text fontSize="sm" textAlign="center" maxW="sm" mt={1}>
          Try adjusting your search or filters to see more results.
        </Text>
      </Flex>
    );
  }

  return (
    <VStack spacing={6} align="stretch">
      {sortedEntries.map((entry, index) => (
        <Box
          key={index}
          p={6}
          bg={cardBg}
          borderWidth="1px"
          borderColor={cardBorder}
          borderRadius="lg"
          boxShadow="sm"
          transition="all 0.2s ease"
          _hover={{ transform: "scale(1.02)", boxShadow: "md" }}
        >
          <Text fontSize="sm" color={mutedText}>
            {new Date(entry.date).toLocaleString()}
          </Text>
          <Text mt={2} fontSize="lg" fontWeight="medium">
            {entry.text}
          </Text>
          {entry.tags?.length > 0 && (
            <HStack spacing={2} mt={3} wrap="wrap">
              {entry.tags.map((tag, i) => (
                <Button
                  key={i}
                  size="xs"
                  variant="solid"
                  colorScheme="blue"
                  borderRadius="full"
                >
                  #{tag}
                </Button>
              ))}
            </HStack>
          )}
        </Box>
      ))}
    </VStack>
  );
};

export default EntriesList;
