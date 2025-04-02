import { Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionHeading = motion(Heading);

const AnimatedLogo = () => (
  <MotionHeading
    fontSize="6xl"
    textAlign="center"
    initial={{ opacity: 0, scale: 0.8 }} // Removed y property
    animate={{
      opacity: 1,
      scale: [1, 1.05, 1], // Only fading and subtle scaling
    }}
    transition={{
      default: { duration: 1, ease: "easeIn" },
      scale: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 },
    }}
    mb={8}
  >
    Three Sentences
  </MotionHeading>
);

export default AnimatedLogo;

