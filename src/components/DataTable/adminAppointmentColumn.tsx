import { Box, Tag, Text } from "@chakra-ui/react";
import { removeSeconds } from "@nepMeds/helper/checkTimeRange";
import { IAppointmentAdmin } from "@nepMeds/service/nepmeds-appointment";
import { Specialization } from "@nepMeds/service/nepmeds-specialization";
import { colors } from "@nepMeds/theme/colors";
import { CellContext } from "@tanstack/react-table";
import StatusBadge from "../Common/StatusBadge";
import TableActions from "./TableActions";

//Appointment Column
export const appointmentColumn = () => {
  return [
    {
      header: "S.N",
      accessorFn: (
        _cell: CellContext<IAppointmentAdmin, any>,
        index: number
      ) => {
        return index + 1;
      },
      size: 2,
    },
    {
      header: "Date",
      accessorKey: "date",
    },

    {
      header: "Booking Time",
      accessorKey: "time",
      cell: ({ row: { original } }: CellContext<IAppointmentAdmin, any>) => {
        return original.from_time && original.to_time
          ? removeSeconds(original?.from_time ?? "") +
              " - " +
              removeSeconds(original?.to_time ?? "")
          : "-";
      },
    },

    {
      header: "Doctor's Name",
      accessorKey: "doctor_name",
    },
    {
      header: "Specialization",
      accessorKey: "specialization",
      cell: ({
        row,
      }: CellContext<{ specialization: Specialization[] }, any>) => {
        const specialization = row?.original?.specialization?.map(data => (
          <Tag
            key={data.id}
            color={colors.main}
            bg={colors.lightish_blue}
            m={"1px"}
          >
            {data.name}
          </Tag>
        ));
        return (
          <Box
            display={"flex"}
            flexWrap={"wrap"}
            width={"fit-content"}
            p={1}
            // background={colors.grey}
            // borderRadius={20}
          >
            <p>{specialization}</p>
          </Box>
        );
      },
    },
    {
      header: "Patient's Name",
      accessorKey: "patient_name",
    },

    {
      header: "Payment Rate (RS)",
      accessorKey: "rate",
    },
    {
      header: "Status",
      cell: ({ row }: CellContext<IAppointmentAdmin, any>) => {
        return (
          <StatusBadge
            customProps={{
              status: row?.original?.status,
              badgeText: {
                "1": "Done",
                "2": "Pending",
                "3": "Missed",
                "4": "Cancelled",
              },
            }}
          />
        );
      },
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: () => {
        return (
          <TableActions
            onView={
              () => ""
              // navigate(
              //   generatePath(NAVIGATION_ROUTES.DOC_PROFILE, {
              //     id: cell.row.original.id,
              //   })
              // )
            }
          />
        );
      },
    },
  ];
};

//Instant Consultant Column
export const instantConsultantColumn = () => {
  return [
    {
      header: "S.N",
      accessorFn: (
        _cell: CellContext<IAppointmentAdmin, any>,
        index: number
      ) => {
        return index + 1;
      },
      size: 2,
    },
    {
      header: "Date",
      accessorKey: "date",
      cell: ({ row }: CellContext<IAppointmentAdmin, any>) => {
        return row?.original?.date ?? "-";
      },
    },

    {
      header: "Booking Time",
      accessorKey: "time",
      cell: ({ row }: CellContext<IAppointmentAdmin, any>) => {
        return row?.original
          ? removeSeconds(row?.original?.from_time ?? "") +
              " - " +
              removeSeconds(row?.original?.to_time ?? "")
          : "-";
      },
    },

    {
      header: "Doctor's Name",
      accessorKey: "doctor_name",
      cell: ({ row }: CellContext<IAppointmentAdmin, any>) => {
        return <Text pl={"12px"}>{row?.original?.doctor_name}</Text>;
      },
    },
    {
      header: "Specialization",
      accessorKey: "specialization",
      cell: ({
        row,
      }: CellContext<{ specialization: Specialization[] }, any>) => {
        const specialization = row?.original?.specialization?.map(data => (
          <Tag
            key={data.id}
            color={colors.main}
            bg={colors.lightish_blue}
            m={"1px"}
          >
            {data.name}
          </Tag>
        ));
        return (
          <Box
            display={"flex"}
            flexWrap={"wrap"}
            width={"fit-content"}
            p={1}
            // background={colors.grey}
            // borderRadius={20}
          >
            <p>{specialization}</p>
          </Box>
        );
      },
    },
    {
      header: "Patient's Name",
      accessorKey: "patient_name",
      cell: ({ row }: CellContext<IAppointmentAdmin, any>) => {
        return <Text pl={"12px"}>{row?.original?.patient_name}</Text>;
      },
    },

    {
      header: "Payment Rate",
      cell: ({ row }: CellContext<IAppointmentAdmin, any>) => {
        return <Text pl={"12px"}>Rs. {row?.original?.rate}</Text>;
      },
    },
    {
      header: "Status",
      cell: ({ row }: CellContext<IAppointmentAdmin, any>) => {
        return (
          <StatusBadge
            customProps={{
              status: row?.original?.status,
              badgeText: {
                "1": "Pending",
                "2": "Confirmed",
                "3": "Completed",

                "4": "Cancelled",
              },
            }}
          />
        );
      },
    },
    {
      header: "Action",
      cell: () => {
        return "-";
      },
    },
  ];
};
