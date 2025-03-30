import {
  Input,
  HStack,
  Tag,
  TagCloseButton,
} from "@chakra-ui/react";

const TagsInput = ({ tags, setTags, tagInput, setTagInput }) => (
  <>
    <Input
      id="tag-input"
      placeholder="Add a tag and press Enter"
      value={tagInput}
      onChange={(e) => setTagInput(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && tagInput.trim()) {
          e.preventDefault();
          const newTag = tagInput.trim().replace(/^#/, "");
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

    <HStack wrap="wrap" maxW="400px">
      {tags.map((tag, index) => (
        <Tag
          key={index}
          borderRadius="full"
          variant="solid"
          colorScheme="blue"
        >
          #{tag}
          <TagCloseButton
            onClick={() =>
              setTags(tags.filter((_, i) => i !== index))
            }
          />
        </Tag>
      ))}
    </HStack>
  </>
);

export default TagsInput;
