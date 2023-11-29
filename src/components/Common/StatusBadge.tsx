import { Badge, BadgeProps } from "@chakra-ui/react";
import { STATUSTYPE } from "@nepMeds/config/enum";

const defaultBadgeText = {
  [STATUSTYPE.approved.toString()]: "Approved",
  [STATUSTYPE.pending.toString()]: "Pending",
  [STATUSTYPE.rejected.toString()]: "Rejected",
};

const defaultBadgeColor = {
  [STATUSTYPE.approved.toString()]: "green",
  [STATUSTYPE.pending.toString()]: "yellow",
  [STATUSTYPE.rejected.toString()]: "red",
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
