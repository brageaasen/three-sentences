import {
  Container,
  Heading,
  Text,
  Button,
  Flex,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState, useMemo } from "react";
import SearchBar from "./SearchBar";
import TagFilter from "./TagFilter";
import EntriesList from "./EntriesList";

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
  const [searchTerm, setSearchTerm] = useState(""); // Search state

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
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Tag Filter */}
      <TagFilter
        filterTag={filterTag}
        setFilterTag={setFilterTag}
        uniqueTags={uniqueTags}
      />

      {/* Entries List */}
      <EntriesList
        loading={loading}
        sortedEntries={sortedEntries}
        error={error}
        cardBg={useColorModeValue("white", "gray.800")}
        cardBorder={useColorModeValue("gray.200", "gray.700")}
      />

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
    </Container>
  );
};

export default JournalOverview;
