import {
  Box,
  Input,
  HStack,
  Tag,
  TagCloseButton,
  useToast,
} from "@chakra-ui/react";

interface TagFilterProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  tagInput: string;
  setTagInput: (input: string) => void;
}

const MAX_TAGS = 5;

const TagsInput = ({
  tags,
  setTags,
  tagInput,
  setTagInput,
}: TagFilterProps) => {
  const toast = useToast();

  return (
    <>
      <Input
        id="tag-input"
        placeholder="Add a tag and press Enter"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && tagInput.trim()) {
            e.preventDefault();
            if (tags.length >= MAX_TAGS) {
              if (!toast.isActive("tag-limit-warning")) {
                toast({
                  id: "tag-limit-warning",
                  title: "Tag limit reached.",
                  description: `You can only add up to ${MAX_TAGS} tags.`,
                  status: "warning",
                  duration: 2000,
                  isClosable: true,
                });
              }
              return;
            }
            const newTag = tagInput.trim().replace(/^#/, "").toLowerCase();
            if (!tags.includes(newTag)) {
              setTags([...tags, newTag]);
            }
            setTagInput("");
          } else if (e.key === "ArrowUp") {
            document.getElementById("journal-input")?.focus();
          }
        }}
        size="md"
        width="400px"
        bg="white"
        color="black"
        _dark={{
          bg: "gray.700",
          color: "white",
          placeholder: { color: "gray.400" },
        }}
      />
      <HStack spacing={2} mt={3} wrap="wrap">
        {tags.map((tag, index) => (
          <Tag
            key={index}
            borderRadius="full"
            variant="solid"
            colorScheme="blue"
          >
            #{tag}
            <TagCloseButton
              onClick={() => setTags(tags.filter((_, i) => i !== index))}
            />
          </Tag>
        ))}
      </HStack>
    </>
  );
};

export default TagsInput;
