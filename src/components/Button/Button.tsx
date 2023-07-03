import { Button } from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";

export const ApproveButton = ({ children, ...props }: any) => {
  return (
    <Button
      backgroundColor={colors.green_button}
      borderRadius={12}
      size="sm"
      w="100%"
      color={colors.white}
      fontWeight="400"
      height={10}
      {...props}
    >
      {children}
    </Button>
  );
};

export const RejectButton = ({ children, ...props }: any) => {
  return (
    <Button
      {...props}
      borderColor={colors.error}
      border="1px solid"
      background="transparent"
      borderRadius={12}
      size="sm"
      w="100%"
      color={colors.error}
      fontWeight="400"
      height={10}
      {...props}
    >
      {children}
    </Button>
  );
};

export const CustomButton = ({
  children,
  backgroundColor = colors.green_button,
  color = colors.white,
  borderRadius = 12,
  size = "sm",
  fontWeight = "400",
  hoverbg = colors.green_light,
  ...props
}: any) => {
  return (
    <Button
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
      size={size}
      display={"flex"}
      justifyContent={"space-around"}
      w="100%"
      p={2}
      color={color}
      fontWeight={fontWeight}
      _hover={{ bg: hoverbg }}
      height={10}
      {...props}
    >
      {children}
    </Button>
  );
};
