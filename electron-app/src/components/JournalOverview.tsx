import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Button,
  Spinner,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";

interface JournalEntry {
  text: string;
  date: string;
  tags: string[];
}

interface JournalOverviewProps {
  onBack: () => void;
}

const JournalOverview = ({ onBack }: JournalOverviewProps) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterTag, setFilterTag] = useState("");

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await fetch("http://localhost:5235/entries");
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setEntries(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch entries");
      } finally {
        setLoading(false);
      }
    };
    fetchEntries();
  }, []);

  // Get unique tags for filtering
  const uniqueTags = Array.from(
    new Set(entries.flatMap((entry) => entry.tags)),
  );

  // Filter entries based on selected tag
  const filteredEntries = filterTag
    ? entries.filter((entry) => entry.tags.includes(filterTag))
    : entries;

  // Sort entries so the newest come first:
  const sortedEntries = [...filteredEntries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  // Colors for card styling
  const cardBg = useColorModeValue("white", "gray.700");
  const cardBorder = useColorModeValue("gray.200", "gray.600");

  return (
    <Box p={{ base: 4, md: 8 }} maxW="960px" mx="auto">
      {/* Header */}
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Journal Overview</Heading>
        <Button onClick={onBack} colorScheme="blue">
          Back
        </Button>
      </Flex>

      {/* Tag Filter */}
      <Box
        mb={6}
        p={4}
        bg={useColorModeValue("gray.50", "gray.800")}
        borderRadius="md"
      >
        <Text mb={2} fontWeight="semibold">
          Filter by tag:
        </Text>
        <HStack spacing={4} wrap="wrap">
          <Button
            variant={filterTag === "" ? "solid" : "outline"}
            onClick={() => setFilterTag("")}
          >
            All
          </Button>
          {uniqueTags.map((tag) => (
            <Button
              key={tag}
              variant={filterTag === tag ? "solid" : "outline"}
              onClick={() => setFilterTag(tag)}
            >
              #{tag}
            </Button>
          ))}
        </HStack>
      </Box>

      {/* Entries List */}
      {loading ? (
        <Flex justify="center" align="center" minH="200px">
          <Spinner size="xl" />
        </Flex>
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : filteredEntries.length === 0 ? (
        <Text>No journal entries found.</Text>
      ) : (
        // Sort entries so that new entries appear at the top:
        <VStack spacing={6} align="stretch">
          {sortedEntries.map((entry, index) => (
            <Box
              key={index}
              p={6}
              bg={cardBg}
              borderWidth="1px"
              borderColor={cardBorder}
              borderRadius="lg"
              shadow="md"
            >
              <Text fontSize="sm" color="gray.500">
                {new Date(entry.date).toLocaleString()}
              </Text>
              <Text mt={2} fontSize="lg">
                {entry.text}
              </Text>
              {entry.tags.length > 0 && (
                <HStack spacing={2} mt={3}>
                  {entry.tags.map((tag, i) => (
                    <Button
                      key={i}
                      size="xs"
                      variant="solid"
                      colorScheme="blue"
                    >
                      #{tag}
                    </Button>
                  ))}
                </HStack>
              )}
            </Box>
          ))}
        </VStack>
      )}

      {/* Sentiment Analysis Section */}
      <Box
        mt={10}
        p={6}
        bg={useColorModeValue("gray.50", "gray.800")}
        borderRadius="md"
      >
        <Heading size="md" mb={2}>
          Sentiment Analysis
        </Heading>
        <Text>
          This section will display sentiment trends over time, showing how your
          mood has evolved. (Coming soon...)
        </Text>
      </Box>
    </Box>
  );
};

export default JournalOverview;
