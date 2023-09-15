import { Flex, IconButton, Tooltip } from "@chakra-ui/react";
import { AcceptIcon, RejectIcon, ViewIcon } from "@nepMeds/assets/svgs";

const TableActions = ({ onView, onReject, onAccept }: ITableActions) => {
  return (
    <Flex alignItems={"center"}>
      {!!onView && (
        <Tooltip hasArrow placement="top" label="View">
          <IconButton
            height={"min-content"}
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
        <Tooltip hasArrow placement="top" label="Accept">
          <IconButton
            height={"min-content"}
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
        <Tooltip hasArrow placement="top" label="Reject">
          <IconButton
            height={"min-content"}
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
