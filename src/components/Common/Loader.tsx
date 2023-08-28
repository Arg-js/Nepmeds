import { Flex, FlexProps, Spinner } from "@chakra-ui/react";

const CenterLoader = (flexProps: FlexProps) => {
  return (
    <Flex justifyContent={"center"} {...flexProps}>
      <Spinner />
    </Flex>
  );
};

export default CenterLoader;
