import { Button } from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";

export const ApproveButton = ({ children, ...props }: any) => {
  return (
    <Button
      backgroundColor={colors.green_button}
      borderRadius={12}
      size="sm"
      fontWeight="400"
      color={colors.white}
      height={10}
      w="100%"
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
      fontWeight="400"
      color={colors.error}
      height={10}
      w="100%"
      {...props}
    >
      {children}
    </Button>
  );
};

export const CustomButton = ({
  children,
  backgroundColor = colors.green_button,
  borderRadius = 12,
  size = "sm",
  fontWeight = "400",
  color = colors.white,
  hoverbg = colors.green_light,
  ...props
}: any) => {
  return (
    <Button
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
      size={size}
      fontWeight={fontWeight}
      color={color}
      height={10}
      w="100%"
      p={2}
      _hover={{ bg: hoverbg }}
      display={"flex"}
      // TODO: this might effect other parts of the code
      // justifyContent={"space-around"}
      {...props}
    >
      {children}
    </Button>
  );
};
