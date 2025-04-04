import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

interface JournalEntry {
  id: string;
  text: string;
  date: string;
  tags: string[];
}

interface EditEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  entry: JournalEntry | null;
  onSave: (updatedEntry: JournalEntry) => Promise<void>;
}

const EditEntryModal = ({
  isOpen,
  onClose,
  entry,
  onSave,
}: EditEntryModalProps) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (entry) {
      setText(entry.text);
    }
  }, [entry]);

  const handleSave = async () => {
    if (entry) {
      // Create updated entry with new text
      const updatedEntry = { ...entry, text };
      // Call the onSave callback (which should handle the PUT request)
      await onSave(updatedEntry);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Journal Entry</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Update your entry..."
            size="md"
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditEntryModal;
