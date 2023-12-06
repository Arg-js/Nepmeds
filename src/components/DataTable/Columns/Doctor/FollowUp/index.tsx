import TableActions from "@nepMeds/components/DataTable/TableActions";
import { CellProps } from "react-table";
import { IPaginationParams } from "@nepMeds/service/nepmeds-faq";
import { Dispatch, SetStateAction } from "react";
import { Flex } from "@chakra-ui/react";
import { CallState } from "@nepMeds/config/enum";

export const columns = ({
  setId,
  onOpen,
  pageParams,
}: {
  pageParams: IPaginationParams;
  setId: Dispatch<SetStateAction<string>>;
  onOpen: () => void;
}) => {
  return [
    {
      header: "S.N.",
      accessorFn: (_: unknown, index: number) => {
        return `${pageParams.pageIndex * pageParams.pageSize + (index + 1)}.`;
      },
    },
    {
      header: "FollowUp Date",
      cell: ({
        row,
      }: CellProps<{ followup_availability: { date: string } }>) => {
        return row.original?.followup_availability?.date ?? "-";
      },
    },
    {
      header: "FollowUp Time",
      cell: ({
        row,
      }: CellProps<{
        followup_availability: { from_time: string; to_time: string };
      }>) => {
        const followUpAvailability = row.original?.followup_availability;
        return followUpAvailability
          ? `${followUpAvailability.from_time.slice(
              0,
              5
            )} - ${followUpAvailability.to_time.slice(0, 5)}`
          : "-";
      },
    },
    { header: "Patient Name", accessorKey: "patient_name" },
    { header: "Last Appointment Date", accessorKey: "last_appointment_date" },
    {
      header: "Actions",
      cell: ({
        row,
      }: CellProps<{
        id: string;
        is_callable: boolean;
        caller_id: string;
        receiver_id: string;
      }>) => {
        const onEdit = () => {
          setId(row.original?.id);
          onOpen();
        };
        const state = {
          caller_user: row.original?.caller_id,
          receiver_user: row.original?.receiver_id,
          follow_up_id: row.original?.id,
          call_state: CallState.INITIATE,
        };
        return (
          <Flex justifyContent={"center"} alignItems={"center"} gap={1}>
            <TableActions
              onEdit={onEdit}
              onCall={{ state, isCallable: row?.original?.is_callable }}
            />
          </Flex>
        );
      },
    },
  ];
};
