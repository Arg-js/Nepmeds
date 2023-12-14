import { Tag } from "@chakra-ui/react";
import { removeSeconds } from "@nepMeds/helper/checkTimeRange";
import { CellProps } from "react-table";

export const followUpColumns = ({
  pageParams,
}: {
  pageParams: {
    pageIndex: number;
    pageSize: number;
  };
}) => [
  {
    header: "S.N.",
    accessorFn: (_cell: unknown, index: number) => {
      return `${pageParams.pageIndex * pageParams.pageSize + (index + 1)}.`;
    },
  },
  {
    header: "Doctor Name",
    accessorKey: "doctor_name",
  },
  {
    header: "Patient Name",
    accessorKey: "patient_name",
  },
  {
    header: "Appointment Date",
    accessorKey: "last_appointment_date",
  },
  {
    header: "Symptoms",
    accessorKey: "symptoms",
    cell: ({ row }: CellProps<{ symptoms: { name: string }[] }>) =>
      row.original?.symptoms?.map(({ name }) => <Tag key={name}>{name}</Tag>),
  },
  {
    header: "FollowUp Date",
    accessorKey: "followup_availability.date",
  },
  {
    header: "FollowUp Time",
    accessorKey: "followup_availability.from_time",
    cell: ({
      row,
    }: CellProps<{
      followup_availability: { from_time: string; to_time: string };
    }>) => {
      const time = row.original.followup_availability;
      return time.from_time
        ? `${removeSeconds(time.from_time)} - ${removeSeconds(time.to_time)}`
        : "N/A";
    },
  },
];
