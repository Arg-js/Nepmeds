import { Box } from "@chakra-ui/react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { colors } from "@nepMeds/theme/colors";

const TableWrapper = ({ children }: { children: ReactJSXElement }) => {
  return (
    <Box margin="5" borderRadius="12px" py="4" px="9" bgColor={colors.white}>
      {children}
    </Box>
  );
};

export default TableWrapper;
