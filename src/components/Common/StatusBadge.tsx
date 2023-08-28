import { Badge, BadgeProps } from "@chakra-ui/react";

const defaultBadgeText = {
  "1": "Approved",
  "2": "Pending",
  "3": "Rejected",
};

const defaultBadgeColor = {
  "1": "green",
  "2": "yellow",
  "3": "red",
};

const StatusBadge = ({
  customProps,
  badgeProps,
}: {
  customProps: { status: string; badgeText?: Partial<typeof defaultBadgeText> };
  badgeProps?: BadgeProps;
}) => {
  const { status, badgeText } = customProps;
  const textObj = { ...defaultBadgeText, ...badgeText };

  const text = textObj[status as keyof typeof textObj];
  const textColor = defaultBadgeColor[status as keyof typeof defaultBadgeColor];
  return (
    <Badge
      colorScheme={textColor}
      p={1}
      borderRadius={20}
      fontSize={11}
      w={24}
      textAlign="center"
      textTransform="capitalize"
      {...badgeProps}
    >
      {text}
    </Badge>
  );
};

export default StatusBadge;
