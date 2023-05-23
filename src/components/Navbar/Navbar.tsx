import { Search2Icon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Divider,
  Flex,
  HStack,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Home, Notification } from "react-iconly";

import Input from "@nepMeds/components/Form/Input";
import { colors } from "@nepMeds/theme/colors";

const Navbar = () => {
  const { register } = useForm();
  return (
    <>
      <Stack p={"15px 21px"} background="white">
        <HStack>
          <Box w={"60%"}>
            <Text fontWeight={"500"} fontSize={"20px"} color={"#45464E"}>
              Dashboard
            </Text>
          </Box>
          <Box w={"20%"}>
            <Input
              height={"32px"}
              borderRadius={"8px"}
              name="search"
              register={register}
              type="text"
              border="none"
              endIcons={
                <Icon
                  mr={"18px"}
                  fontSize={20}
                  color={colors.blue_100}
                  as={Search2Icon}
                />
              }
              backgroundColor={colors.blue_10}
              placeholder="Search"
            />
          </Box>
          <Flex alignItems={"center"} w={"5%"}>
            <Notification
              size="large"
              set="bulk"
              primaryColor={colors.blue_100}
            />
          </Flex>
          <Flex gap={"20px"} alignItems={"center"}>
            <Text fontSize={{ sm: "12px", xl: "18px", base: "16px" }}>
              Rahul Maharjan
            </Text>
            <Avatar size="md" />
          </Flex>
        </HStack>
        <Divider mt={"14px"} />
        <Box>
          <Home set="bulk" primaryColor={colors.blue_100} />
        </Box>
      </Stack>
    </>
  );
};

export default Navbar;
