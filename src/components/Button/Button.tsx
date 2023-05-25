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
