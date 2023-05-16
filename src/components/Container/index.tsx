import { Container } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

const LayoutContainer: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <Container
      maxWidth="100%"
      display="flex"
      flexDirection="column"
      maxHeight="100vh"
      p={0}
      gap={20}
    >
      {children}
    </Container>
  );
};

export default LayoutContainer;
