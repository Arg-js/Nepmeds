import { Image, Heading, Flex, Text } from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";
import LoginForm from "../FormComponents/LoginForm/LoginForm";
const LoginCard = () => {
  return (
    <>
      <Flex
        background={colors.white}
        borderRadius="12px"
        alignItems="center"
        justifyContent="center"
        direction="column"
        w="30%"
        margin="0 auto"
        p={8}
        gap={8}
      >
        <Image src="../src/assets/images/logo1.png" width="60px" />
        <Flex direction="column" gap={3} alignItems="center">
          <Heading
            as="h6"
            fontSize="1.4em"
            fontFamily="Poppins"
            fontWeight={500}
          >
            Welcome back!
          </Heading>
          <Text fontSize="sm" color={colors.black_30}>
            Login to your account
          </Text>
        </Flex>

        <LoginForm />
      </Flex>
    </>
  );
};

export default LoginCard;
