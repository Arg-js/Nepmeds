import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { STATUSTYPE } from "@nepMeds/config/enum";
import { IAmountListDoctor } from "@nepMeds/service/nepmeds-payment";
import { colors } from "@nepMeds/theme/colors";
import { Edit } from "react-iconly";
import StatusBadge from "../Common/StatusBadge";

const PaymentAmountBox = ({
  isPending,
  data,
  onOpen,
}: {
  isPending: boolean;
  data?: IAmountListDoctor | undefined;
  onOpen?: () => void;
}) => {
  const styles = {
    backgroundColor: isPending ? "" : colors.primary,
    color: isPending ? "" : colors.white,
    borderRadius: "5%",
    padding: "20px",
    boxShadow: "0px 0px 59px -30px rgba(0,0,0,0.39)",
    minWidth: "350px",
  };
  return (
    <Box style={styles}>
      <Flex direction={"column"} gap={3}>
        <Flex justifyContent={"space-between"} align={"center"}>
          <Box display={"flex"} gap={2}>
            <Text fontSize={"lg"} fontWeight={"bold"}>
              {isPending ? "Change Rate" : "Ongoing Rate"}
            </Text>
            {isPending && data && (
              <StatusBadge
                customProps={{
                  status: STATUSTYPE.pending.toString(),
                }}
                badgeProps={{
                  w: 16,
                }}
              />
            )}
          </Box>
          {isPending && (
            <Icon
              as={Edit}
              w={5}
              h={5}
              cursor={"pointer"}
              color={colors.green_button}
              onClick={onOpen}
            />
          )}
        </Flex>
        {data ? (
          <Box>
            <Flex my={3}>
              <Text width={"40%"}>Instant Rate</Text>
              <Text ml={4}>Rs. {data?.instant_amount ?? "-"}</Text>
            </Flex>
            <Flex>
              <Text width={"40%"}>Schedule Rate</Text>
              <Text ml={4}>Rs. {data?.schedule_amount ?? "-"}</Text>
            </Flex>
          </Box>
        ) : (
          <Text color={isPending ? colors.green_button : ""}>
            {isPending ? "No Changes Detected" : "Rate Not Set"}
          </Text>
        )}
      </Flex>
    </Box>
  );
};

export default PaymentAmountBox;
