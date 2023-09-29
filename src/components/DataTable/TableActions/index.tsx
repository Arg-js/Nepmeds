import { Flex, IconButton, Tooltip } from "@chakra-ui/react";
import {
  AcceptIcon,
  PasswordKey,
  RejectIcon,
  ViewIcon,
} from "@nepMeds/assets/svgs";
import { colors } from "@nepMeds/theme/colors";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const TableActions = ({
  onView,
  onReject,
  onAccept,
  onEdit,
  onDelete,
  onChangePassword,
}: ITableActions) => {
  return (
    <Flex alignItems={"center"} justifyContent="center">
      {!!onChangePassword && (
        <Tooltip hasArrow placement="top" label="Change Password">
          <IconButton
            height={"min-content"}
            aria-label="Change Password"
            icon={<PasswordKey />}
            onClick={onChangePassword}
            sx={{
              bg: "transparent",
              "&:hover": {
                bg: "transparent",
              },
            }}
          />
        </Tooltip>
      )}
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

      {!!onEdit && (
        <Tooltip hasArrow placement="top" label="Edit">
          <IconButton
            height={"min-content"}
            aria-label="view"
            icon={

              <AiOutlineEdit size={20} fill={colors.blue_100} />
            }
            onClick={onEdit}
            sx={{
              bg: "transparent",
              "&:hover": {
                bg: "transparent",
              },
            }}
          />
        </Tooltip>
      )}
      {!!onDelete && (
        <Tooltip hasArrow placement="top" label="Delete">
          <IconButton
            height={"min-content"}
            aria-label="view"
            icon={<AiOutlineDelete size={20} fill={colors.red} />}
            onClick={onDelete}
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
  onEdit?: () => void;
  onDelete?: () => void;
  onChangePassword?: () => void;
}

export default TableActions;
