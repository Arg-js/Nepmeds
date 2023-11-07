import { Box, Text } from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";

const Wrapper = ({ children, title, subtitle }: IWrapper) => {
  return (
    <Box
      bg={colors.grey}
      boxShadow={"0px 4px 32px rgba(61, 70, 112, 0.08)"}
      // borderRadius={6}
      overflow={"auto"}
      background="#fff"
      h="inherit"
      width={"100%"}
    >
      <Box px={16} py={23} bgColor={colors.white}>
        <Box borderBottom={`1px solid ${colors.grey_90}`} mb={6}>
          <Text fontSize={"2xl"} color={colors.grey_50} fontWeight={400} mb={2}>
            {title}
          </Text>
          <Text pb={6} color={colors.grey_50} fontWeight={400}>
            {subtitle}
          </Text>
        </Box>
        <Box>{children}</Box>
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
