import { Flex, IconButton, Tooltip } from "@chakra-ui/react";
import {
  AcceptIcon,
  PasswordKey,
  RejectIcon,
  RescheduleIcon,
  ViewIcon,
} from "@nepMeds/assets/svgs";
import { CallState } from "@nepMeds/config/enum";
import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";
import { colors } from "@nepMeds/theme/colors";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { MdCall } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaPrescriptionBottleAlt } from "react-icons/fa";

const TableActions = ({
  onView,
  onReject,
  onAccept,
  onEdit,
  onDelete,
  onChangePassword,
  onCall,
  onReschedule,
  onPrescription,
  isEditDisabled,
  editText,
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
        <Tooltip hasArrow placement="top" label={editText ?? "Edit"}>
          <IconButton
            isDisabled={isEditDisabled}
            height={"min-content"}
            aria-label="view"
            icon={<AiOutlineEdit size={20} fill={colors.blue_100} />}
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
      {onCall?.state && (
        <Tooltip hasArrow placement="top" label="Call">
          <>
            {onCall?.isCallable ? (
              <Link to={NAVIGATION_ROUTES.VIDEOCALL} state={onCall.state}>
                <MdCall size={"20"} color={colors.green_button} />
              </Link>
            ) : (
              <MdCall size={"20"} color={colors.gray} />
            )}
          </>
        </Tooltip>
      )}

      {!!onReschedule?.canReschedule && (
        <Tooltip hasArrow placement="top" label="Reschedule">
          <Link
            to={NAVIGATION_ROUTES.PATIENT.RESCHEDULE_APPOINTMENT}
            state={onReschedule.state}
          >
            <RescheduleIcon color={colors.primary_blue} />
          </Link>
        </Tooltip>
      )}

      {!!onPrescription?.isShown && (
        <Tooltip hasArrow placement="top" label="Prescription">
          <IconButton
            height={"min-content"}
            aria-label="view"
            icon={
              <FaPrescriptionBottleAlt size={20} fill={colors.green_light} />
            }
            onClick={onPrescription.onClick}
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
  isEditDisabled?: boolean;
  editText?: string;
  onCall?: {
    state: {
      caller_usesr?: string;
      receiver_user?: string;
      follow_up_id?: string;
      appointment_id?: string;
      call_state: CallState;
    };
    isCallable: boolean;
  };
  onReschedule?: {
    state: { appointment_id: string; doctor_id: string };
    canReschedule: boolean;
  };
  onPrescription?: {
    isShown: boolean;
    onClick?: () => void;
  };
}

export default TableActions;
