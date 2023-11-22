import { Flex, Button, Divider, Box, Text } from "@chakra-ui/react";
import { CheckBoxIcon } from "@nepMeds/assets/svgs";
import { colors } from "@nepMeds/theme/colors";

const DiscountDetailRow = ({
  label,
  value,
}: {
  label: string;
  value: number;
}) => {
  return (
    <Flex justifyContent={"space-between"}>
      <Text variant={"small600"}>{label} :</Text>
      <Text variant={"small600"}>Rs. {value}</Text>
    </Flex>
  );
};

export const DiscountDetailsSection = ({
  clearDiscount,
  bookingFee,
  discountAmount,
  discountedAmount,
}: {
  clearDiscount: () => void;
  bookingFee: number;
  discountAmount: number;
  discountedAmount: number;
}) => {
  return (
    <>
      <Box border={`2px dashed ${colors.primary}`} p={2} borderRadius={"6px"}>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Flex alignItems={"center"} gap={2}>
            <CheckBoxIcon />
            <Text
              fontWeight={500}
              fontSize={"xs"}
              color={colors.gray_text_header}
            >
              Promo Code Applied
            </Text>
          </Flex>
          <Button
            color={colors.primary}
            variant={"ghost"}
            height={"30px"}
            onClick={clearDiscount}
          >
            Undo
          </Button>
        </Flex>
      </Box>
      <DiscountDetailRow label="Booking Fee" value={bookingFee} />
      <DiscountDetailRow label="Discount Amount" value={discountAmount} />
      <Divider />
      <DiscountDetailRow label="Total Fee" value={discountedAmount} />
      <Divider />
    </>
  );
};
