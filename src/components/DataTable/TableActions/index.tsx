import { Flex, IconButton, Tooltip } from "@chakra-ui/react";
import { AcceptIcon, RejectIcon, ViewIcon } from "@nepMeds/assets/svgs";

const TableActions = ({ onView, onReject, onAccept }: ITableActions) => {
  return (
    <Flex>
      {!!onView && (
        <Tooltip hasArrow label="view">
          <IconButton
            aria-label="view"
            icon={<ViewIcon />}
            onClick={onView}
            sx={{
              bg: "transparent",
              "&:hover": {
                bg: "transparent",
              },
            }}
          />
        </Tooltip>
      )}
      {!!onAccept && (
        <Tooltip hasArrow label="accept">
          <IconButton
            aria-label="view"
            icon={<AcceptIcon />}
            onClick={onAccept}
            sx={{
              bg: "transparent",
              "&:hover": {
                bg: "transparent",
              },
            }}
          />
        </Tooltip>
      )}
      {!!onReject && (
        <Tooltip hasArrow label="reject">
          <IconButton
            aria-label="view"
            icon={<RejectIcon />}
            onClick={onReject}
            sx={{
              bg: "transparent",
              "&:hover": {
                bg: "transparent",
              },
            }}
          />
        </Tooltip>
      )}
    </Flex>
  );
};

interface ITableActions {
  onView?: () => void;
  onAccept?: () => void;
  onReject?: () => void;
}

export default TableActions;
