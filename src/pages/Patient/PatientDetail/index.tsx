import StatusBadge from "@nepMeds/components/Common/StatusBadge";
import TableActions from "@nepMeds/components/DataTable/TableActions";
import { ADMINAPPOINTMENT, CallState, STATUSTYPE } from "@nepMeds/config/enum";
import { removeSeconds } from "@nepMeds/helper/checkTimeRange";
import { IPaginationParams } from "@nepMeds/service/nepmeds-faq";
import { CellContext } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";
import { CellProps } from "react-table";

// TODO: move this to some utils
// Function to convert seconds to minutes and remaining seconds
function secondsToMinSec(seconds: number) {
  // Calculate minutes
  const minutes = Math.floor(seconds / 60);

  // Calculate remaining seconds
  const remainingSeconds = Math.round(seconds % 60);

  // Return an object with minutes and remaining seconds
  return `${minutes} : ${remainingSeconds}`;
}

export const columns = ({
  pagination,
  setAppointmentId,
  onOpen,
  onEditModalOpen,
}: {
  pagination: IPaginationParams;
  setAppointmentId: Dispatch<SetStateAction<string>>;
  onOpen: () => void;
  onEditModalOpen: () => void;
}) => {
  return [
    {
      header: "S.N.",
      accessorFn: (_cell: CellContext<number, number>, index: number) => {
        return `${pagination.pageSize * pagination.pageIndex + (index + 1)}.`;
      },
    },
    {
      header: "Doctor name",
      accessorKey: "doctor",
    },
    {
      header: "Appointment Date",
      accessorKey: "appointment_date",
    },
    {
      header: "Appointment Time",
      accessorKey: "appointment_endtime",
      cell: ({
        row,
      }: CellProps<{
        appointment_starttime: string;
        appointment_endtime: string;
      }>) => {
        const startTime = row.original?.appointment_starttime;
        return startTime
          ? `${removeSeconds(startTime)} -
                    ${removeSeconds(row.original?.appointment_endtime)}`
          : "-";
      },
    },
    {
      header: "Call Type",
      accessorKey: "call_type",
      cell: ({ row }: CellProps<{ call_type: string }>) =>
        ADMINAPPOINTMENT[
          row.original?.call_type as keyof typeof ADMINAPPOINTMENT
        ],
    },
    {
      header: "Appointment Status",
      accessorKey: "appointment_status",
      cell: ({ row }: CellProps<{ appointment_status: string }>) => (
        <StatusBadge
          customProps={{
            status: row.original?.appointment_status,
          }}
        />
      ),
    },
    {
      header: "Call Duration (mins)",
      accessorKey: "call_duration",
      cell: ({ row }: CellProps<{ call_duration: string }>) => {
        const seconds = row.original?.call_duration;
        return secondsToMinSec(parseFloat(seconds));
      },
    },
    {
      header: "Call Status",
      // TODO: alternative to this
      accessorKey: "call_status",
      cell: ({ row }: CellProps<{ call_status: string }>) =>
        row.original.call_status
          ? CallState[row.original.call_status as keyof typeof CallState]
          : "-",
    },
    {
      header: "Follow Up",
      accessorKey: "follow_up",
      cell: ({ row }: CellProps<{ follow_up: boolean }>) => (
        <StatusBadge
          customProps={{
            status: row.original?.follow_up ? "1" : "3",
            badgeText: {
              "1": "Yes",
              "3": "No",
            },
          }}
        />
      ),
    },
    {
      header: "Actions",
      accessorKey: "id",
      cell: ({
        row,
      }: CellProps<{
        id: string;
        appointment_status: STATUSTYPE;
        can_reschedule: boolean;
        doctor_id: string;
      }>) => {
        const appointmentStatus = row.original?.appointment_status;
        const isEditDisabled = [
          STATUSTYPE.pending,
          STATUSTYPE.rejected,
        ].includes(+appointmentStatus);
        const onEdit = () => {
          setAppointmentId(row.original?.id);
          onEditModalOpen();
        };
        return (
          <TableActions
            onView={() => {
              setAppointmentId(row.original?.id);
              onOpen();
            }}
            onReschedule={{
              canReschedule: row?.original?.can_reschedule,
              state: {
                appointment_id: row?.original?.id,
                doctor_id: row?.original?.doctor_id,
              },
            }}
            onEdit={!isEditDisabled ? onEdit : undefined}
            editText={"Upload lab reports"}
          />
        );
      },
    },
  ];
};
