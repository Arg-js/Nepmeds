import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import NepmedsLogoIcon from "@nepMeds/assets/images/logo1.png";
import { colors } from "@nepMeds/theme/colors";

const Wrapper = ({ children, title, subtitle }: IWrapper) => {
  return (
    <Flex
      background={colors.white}
      borderRadius="12px"
      alignItems="center"
      justifyContent="center"
      direction="column"
      w={443}
      margin="0 auto"
      p={8}
      gap={12}
    >
      <Flex gap={2} direction="column" alignItems="center">
        <Image src={NepmedsLogoIcon} width={90} />
        <Heading as="h6" fontSize="xl" fontFamily="Poppins" fontWeight={500}>
          {title}
        </Heading>
        <Text fontSize="sm" color={colors.black_30}>
          {subtitle}
        </Text>
      </Flex>
      {children}
    </Flex>
  );
};

interface IWrapper {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}
export default Wrapper;
