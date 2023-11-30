import { Box } from "@chakra-ui/react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

const TableWrapper = ({ children }: { children: ReactJSXElement }) => {
  return (
    <Box margin="5" borderRadius="12px" py="4" px="9">
      {children}
    </Box>
  );
};

export default TableWrapper;
