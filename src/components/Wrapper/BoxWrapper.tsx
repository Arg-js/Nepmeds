import { Box, BoxProps } from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";
import React from "react";

const BoxWrapper = ({
  children,
  boxProps,
}: {
  children: React.ReactNode;
  boxProps?: BoxProps;
}) => {
  return (
    <Box bg={colors.white} m={5} p={8} pt={3} borderRadius={10} {...boxProps}>
      {children}
    </Box>
  );
};

export default BoxWrapper;
