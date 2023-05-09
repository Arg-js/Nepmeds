import { Box, Flex, Text, Container } from "@chakra-ui/react";
import Icon from "@nepMeds/components/Icon";
import { colors } from "@nepMeds/theme/colors";

const Wrapper = ({ children, title, subtitle }: IWrapper) => {
  return (
    <Box>
      <Box py={4} px={30}>
        <Icon name="logo" />
      </Box>
      <Box bg={colors.grey} py={12} px={30}>
        <Flex
          boxShadow={"0px 4px 32px rgba(61, 70, 112, 0.08)"}
          borderRadius={6}
          overflow={"hidden"}
        >
          <Box bg={colors.main} flex={0.2}></Box>
          <Box px={16} py={23} flex={1} bgColor={colors.white}>
            <Box borderBottom={`1px solid ${colors.grey_90}`} mb={6}>
              <Text
                fontSize={"2xl"}
                color={colors.dark_1}
                fontWeight={100}
                mb={2}
              >
                {title}
              </Text>
              <Text pb={6} color={colors.grey_50} fontWeight={400}>
                {subtitle}
              </Text>
            </Box>
            {children}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

interface IWrapper {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}
export default Wrapper;
