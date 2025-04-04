import {
  Container,
  Heading,
  Text,
  Button,
  Flex,
  Box,
  useColorModeValue,
  SimpleGrid,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useEffect, useState, useMemo } from "react";
import SearchBar from "./SearchBar";
import TagFilter from "./TagFilter";
import EditEntryModal from "./EditEntryModal";

interface JournalEntry {
  id: string;
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
  const [searchTerm, setSearchTerm] = useState("");
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
  const uniqueTags = useMemo(
    () => Array.from(new Set(entries.flatMap((entry) => entry.tags))),
    [entries],
  );

  // Filter entries by tag if selected
  const filteredEntries = filterTag
    ? entries.filter((entry) => entry.tags.includes(filterTag))
    : entries;

  // Further filter entries by search term (case-insensitive)
  const searchedEntries = useMemo(() => {
    if (!searchTerm.trim()) return filteredEntries;
    return filteredEntries.filter((entry) =>
      entry.text.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [filteredEntries, searchTerm]);

  // Sort entries so that new entries appear at the top
  const sortedEntries = useMemo(() => {
    return [...searchedEntries].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [searchedEntries]);

  const cardBg = useColorModeValue("white", "gray.800");
  const cardBorder = useColorModeValue("gray.200", "gray.700");

  return (
    <Container maxW="container.xl" py={8}>
      {/* Header */}
      <Flex justify="space-between" align="center" mb={8}>
        <Heading as="h1" size="xl">
          Journal Overview
        </Heading>
        <Button onClick={onBack} variant="outline" colorScheme="blue">
          Back
        </Button>
      </Flex>

      {/* Search Bar */}
      <Box maxW="600px" mx="auto" mb={6}>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </Box>

      {/* Tag Filter */}
      <TagFilter
        filterTag={filterTag}
        setFilterTag={setFilterTag}
        uniqueTags={uniqueTags}
      />

      {/* Entries List in a Responsive Grid */}
      {loading ? (
        <Flex justify="center" align="center" minH="200px">
          <Text>Loading...</Text>
        </Flex>
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : sortedEntries.length === 0 ? (
        <Text>No journal entries found.</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mt={6}>
          {sortedEntries.map((entry) => (
            <Box
              key={entry.id}
              p={6}
              bg={cardBg}
              borderWidth="1px"
              borderColor={cardBorder}
              borderRadius="lg"
              shadow="md"
              position="relative"
              transition="transform 0.2s"
              _hover={{ transform: "scale(1.02)" }}
            >
              {/* Edit Icon positioned at the top right */}
              <IconButton
                aria-label="Edit entry"
                icon={<EditIcon />}
                size="sm"
                position="absolute"
                top={2}
                right={2}
                onClick={() => {
                  setEditingEntry(entry);
                  setIsEditModalOpen(true);
                }}
              />
              <Text
                fontSize="sm"
                color={useColorModeValue("gray.500", "gray.400")}
              >
                {new Date(entry.date).toLocaleString()}
              </Text>
              <Text mt={2} fontSize="lg">
                {entry.text}
              </Text>
              {entry.tags?.length > 0 && (
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
        </SimpleGrid>
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

      {/* Edit Entry Modal */}
      <EditEntryModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        entry={editingEntry}
        onSave={async (updatedEntry: JournalEntry) => {
          const res = await fetch(
            `http://localhost:5235/entries/${updatedEntry.id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(updatedEntry),
            },
          );
          if (!res.ok) {
            console.error("Failed to update entry");
          } else {
            // Refresh entries from backend after successful update
            const fetchEntries = async () => {
              const res = await fetch("http://localhost:5235/entries");
              const data = await res.json();
              setEntries(data);
            };
            await fetchEntries();
          }
          setIsEditModalOpen(false);
        }}
      />
    </Container>
  );
};

export default JournalOverview;
