import { Box } from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";
import React from "react";

const BoxWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box bg={colors.white} m={5} p={8} pt={3} borderRadius={10}>
      {children}
    </Box>
  );
};

export default BoxWrapper;
