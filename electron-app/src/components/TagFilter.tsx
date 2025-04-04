import { Box, Text, HStack, Button, useColorModeValue } from "@chakra-ui/react";

interface TagFilterProps {
  filterTag: string;
  setFilterTag: (term: string) => void;
  uniqueTags: string[];
}

const TagFilter = ({ filterTag, setFilterTag, uniqueTags }: TagFilterProps) => {
  return (
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
  );
};

export default TagFilter;

