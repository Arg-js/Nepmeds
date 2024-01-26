import TableActions from "@nepMeds/components/DataTable/TableActions/index";
import { removeSeconds } from "@nepMeds/helper/checkTimeRange";
import { IPatientHistoryById } from "@nepMeds/service/nepmeds-patient-history";
import { Dispatch, SetStateAction } from "react";
import { CellProps } from "react-table";

export const appointmentColumns = ({
  pageParams,
  setAppointmentId,
  onPrescriptionClick,
  onViewModalOpen,
}: {
  pageParams: {
    pageIndex: number;
    pageSize: number;
  };
  setAppointmentId: Dispatch<SetStateAction<string>>;
  onPrescriptionClick: () => void;
  onViewModalOpen: () => void;
}) => [
  {
    header: "S.N.",
    accessorFn: (_: unknown, index: number) => {
      return `${pageParams.pageIndex * pageParams.pageSize + (index + 1)}.`;
    },
  },
  {
    header: "Date",
    accessorKey: "availability.date",
    cell: ({ row: { original } }: CellProps<IPatientHistoryById>) => {
      return `${original?.availability?.date}`;
    },
  },
  {
    header: "Time",
    accessorKey: "availability.from_time",
    cell: ({ row: { original } }: CellProps<IPatientHistoryById>) => {
      return `${`${removeSeconds(original?.availability?.from_time ?? "")} -
                ${removeSeconds(original?.availability?.to_time ?? "")}`}`;
    },
  },
  {
    header: "Actions",
    accessorKey: "id",
    cell: ({ row: { original } }: CellProps<IPatientHistoryById>) => {
      return (
        <TableActions
          onView={() => {
            setAppointmentId(original?.id?.toString() ?? "");
            onViewModalOpen();
          }}
          onPrescription={{
            isShown: !!original?.is_prescription_available,
            onClick: () => {
              setAppointmentId(original?.id?.toString() ?? "");
              onPrescriptionClick();
            },
          }}
          flexProps={{
            justifyContent: "start",
          }}
        />
      );
    },
  },
];

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
    accessorFn: (_: unknown, index: number) => {
      return `${pageParams.pageIndex * pageParams.pageSize + (index + 1)}.`;
    },
  },
  {
    header: "Date",
    accessorKey: "availability.date",
    cell: ({ row: { original } }: CellProps<IPatientHistoryById>) => {
      return `${original?.availability?.date}`;
    },
  },
  {
    header: "Time",
    accessorKey: "availability.from_time",
    cell: ({ row: { original } }: CellProps<IPatientHistoryById>) => {
      return `${removeSeconds(original?.availability?.from_time ?? "")} -
                  ${removeSeconds(original?.availability?.to_time ?? "")}`;
    },
  },
];
