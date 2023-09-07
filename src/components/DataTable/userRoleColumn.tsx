import { Box, Switch, Tag, Text } from "@chakra-ui/react";
import { IUserRoleAdmin } from "@nepMeds/service/nepmeds-admin-userrole";
import { colors } from "@nepMeds/theme/colors";
import { CellContext } from "@tanstack/react-table";

//Appointment Column
export const doctorRoleColumn = () => {
  return [
    {
      header: "S.N",
      accessorFn: (_cell: CellContext<IUserRoleAdmin, any>, index: number) => {
        return index + 1;
      },
      size: 2,
    },
    {
      header: "Doctor's Name",
      accessorKey: "name",
      cell: ({ row }: CellContext<IUserRoleAdmin, any>) => {
        return row?.original?.name;
      },
    },

    {
      header: "Specialization",
      accessorKey: "specialization",
      cell: ({ row }: CellContext<IUserRoleAdmin, any>) => {
        const specialization = row?.original?.specialization_names?.map(
          data => (
            <Tag
              key={data.id}
              color={colors.main}
              bg={colors.lightish_blue}
              m={"1px"}
            >
              {data.name}
            </Tag>
          )
        );
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
      header: "Approval Date",
      accessorKey: "patient_name",
      cell: ({ row }: CellContext<IUserRoleAdmin, any>) => {
        return (
          <Text pl={"12px"}>{row?.original?.payment_approved_date ?? "-"}</Text>
        );
      },
    },

    {
      header: "Contact No.",
      cell: ({ row }: CellContext<IUserRoleAdmin, any>) => {
        return <Text pl={"12px"}>{row?.original?.mobile_number}</Text>;
      },
    },
    {
      header: "Email",
      cell: ({ row }: CellContext<IUserRoleAdmin, any>) => {
        return <Text pl={"12px"}>{row?.original?.email}</Text>;
      },
    },
    {
      header: "Status",
      cell: ({ row }: CellContext<IUserRoleAdmin, any>) => {
        return <Switch isChecked={row?.original?.status} size="sm" />;
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
