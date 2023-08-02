import { Badge, Box, HStack, Icon, Tag } from "@chakra-ui/react";
import { STATUSTYPE } from "@nepMeds/config/enum";
import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";
import { IGetDoctorList } from "@nepMeds/service/nepmeds-doctorlist";
import { Specialization } from "@nepMeds/service/nepmeds-specialization";
import { colors } from "@nepMeds/theme/colors";
import { CellContext } from "@tanstack/react-table";
import { Show } from "react-iconly";
import { NavigateFunction, generatePath } from "react-router-dom";

interface PendingCellContextSearch {
  user: {
    first_name: string;
    middle_name: string;
    last_name: string;
  };
}

export const pendingColumns = (navigate: NavigateFunction) => {
  return [
    {
      header: "S.N",
      accessorFn: (_cell: CellContext<any, any>, index: number) => {
        return index + 1;
      },
    },
    {
      header: "Doctor's Name",
      accessorKey: "first_name",
      accessorFn: (_cell: PendingCellContextSearch) => {
        return _cell?.user?.first_name + " " + _cell?.user?.last_name;
      },
    },
    {
      header: "Contact Number",
      cell: ({
        row,
      }: CellContext<
        {
          user: IBasicInfo;
        },
        any
      >) => {
        const { mobile_number } = row?.original?.user ?? "";

        return <p>{mobile_number}</p>;
      },
    },
    {
      header: "Specialization",
      accessorKey: "specialization",
      cell: ({
        row,
      }: CellContext<{ specialization_names: Specialization[] }, any>) => {
        const specialization = row?.original?.specialization_names?.map(
          data => (
            <Tag key={data.id} color={colors.main} bg={"#c4d2e8"} mx={"1px"}>
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
      header: "Actions",
      accessorKey: "actions",
      cell: (cell: CellContext<any, any>) => {
        return (
          <HStack>
            <Icon
              as={Show}
              fontSize={20}
              cursor="pointer"
              onClick={() => {
                // onDetailsModalOpen();
                navigate(
                  generatePath(NAVIGATION_ROUTES.DOC_PROFILE, {
                    id: cell.row.original.id,
                  })
                );
              }}
            />
          </HStack>
        );
      },
    },
  ];
};

export const approvedColumns = (navigate: NavigateFunction) => {
  return [
    {
      header: "S.N",
      accessorFn: (_cell: CellContext<any, any>, index: number) => {
        return index + 1;
      },
    },
    {
      header: "Doctor's Name",
      accessorKey: "first_name",
      accessorFn: (_cell: PendingCellContextSearch) => {
        return _cell?.user?.first_name + " " + _cell?.user?.last_name;
      },
    },
    {
      header: "Contact Number",
      cell: ({
        row,
      }: CellContext<
        {
          user: IBasicInfo;
        },
        any
      >) => {
        const { mobile_number } = row?.original?.user ?? "";

        return <p>{mobile_number}</p>;
      },
    },
    {
      header: "Specialization",
      accessorKey: "specialization",
      cell: ({
        row,
      }: CellContext<{ specialization_names: Specialization[] }, any>) => {
        const specialization = row?.original?.specialization_names?.map(
          data => (
            <Tag key={data.id} color={colors.main} bg={"#c4d2e8"} mx={"1px"}>
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
            borderRadius={20}
          >
            <p>{specialization}</p>
          </Box>
        );
      },
    },

    {
      header: "Actions",
      accessorKey: "actions",
      cell: (cell: CellContext<any, any>) => {
        return (
          <>
            <Icon
              as={Show}
              fontSize={20}
              cursor="pointer"
              onClick={() => {
                navigate(
                  generatePath(NAVIGATION_ROUTES.DOC_PROFILE, {
                    id: cell.row.original.id,
                  })
                );
              }}
            />
          </>
        );
      },
    },
  ];
};

export const registeredColumns = (navigate: NavigateFunction) => {
  return [
    {
      header: "S.N",
      accessorFn: (_cell: CellContext<any, any>, index: number) => {
        return index + 1;
      },
    },
    {
      header: "Doctor's Name",
      accessorKey: "first_name",
      accessorFn: (_cell: PendingCellContextSearch) => {
        return _cell?.user?.first_name + " " + _cell?.user?.last_name;
      },
    },
    {
      header: "Contact Number",
      cell: ({
        row,
      }: CellContext<
        {
          user: IBasicInfo;
        },
        any
      >) => {
        const { mobile_number } = row?.original?.user ?? "";

        return <p>{mobile_number}</p>;
      },
    },
    {
      header: "Specialization",
      accessorKey: "specialization",
      cell: ({
        row,
      }: CellContext<{ specialization_names: Specialization[] }, any>) => {
        const specialization = row?.original?.specialization_names?.map(
          data => (
            <Tag key={data.id} color={colors.main} bg={"#c4d2e8"} mx={"1px"}>
              {data.name}
            </Tag>
          )
        );
        return (
          <Box display={"flex"} flexWrap={"wrap"} width={"fit-content"} p={1}>
            <p>{specialization}</p>
          </Box>
        );
      },
    },
    {
      header: "Status",
      accessorKey: "profile_status",
      cell: ({ row }: CellContext<IGetDoctorList, any>) => {
        const { status } = row.original;
        const isApproved =
          status?.toString() === STATUSTYPE.approved.toString();
        return (
          <Badge
            colorScheme={isApproved ? "green" : "red"}
            p={1}
            borderRadius={20}
            fontSize={11}
            w={24}
            textAlign="center"
            textTransform="capitalize"
          >
            {isApproved ? "Approved" : "Not approved"}
          </Badge>
        );
      },
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: (cell: CellContext<any, any>) => {
        return (
          <HStack>
            <Icon
              as={Show}
              fontSize={20}
              cursor="pointer"
              onClick={() => {
                navigate(
                  generatePath(NAVIGATION_ROUTES.DOC_PROFILE, {
                    id: cell.row.original.id,
                  })
                );
              }}
            />
          </HStack>
        );
      },
    },
  ];
};

export const rejectedColumns = (navigate: NavigateFunction) => {
  return [
    {
      header: "S.N",
      accessorFn: (_cell: CellContext<any, any>, index: number) => {
        return index + 1;
      },
    },
    {
      header: "Doctor's Name",
      accessorKey: "first_name",
      accessorFn: (_cell: PendingCellContextSearch) => {
        return _cell?.user?.first_name + " " + _cell?.user?.last_name;
      },
    },
    {
      header: "Contact Number",
      cell: ({
        row,
      }: CellContext<
        {
          user: IBasicInfo;
        },
        any
      >) => {
        const { mobile_number } = row?.original?.user ?? "";

        return <p>{mobile_number}</p>;
      },
    },
    {
      header: "Specialization",
      accessorKey: "specialization",
      cell: ({
        row,
      }: CellContext<{ specialization_names: Specialization[] }, any>) => {
        const specialization = row?.original?.specialization_names?.map(
          data => (
            <Tag
              key={data.id}
              color={colors.main}
              bg={"#c4d2e8"}
              mx={"1px"}
              m={"2px"}
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
      header: "Reason",
      accessorKey: "specialization",
      cell: ({ row }: CellContext<{ rejected_remarks: string }, any>) => {
        const rejected_remarks = row?.original?.rejected_remarks ?? "";

        return (
          <Box
            display={"flex"}
            flexWrap={"wrap"}
            // width={"fit-content"}
            // p={1}
            // background={colors.grey}
            // borderRadius={20}
          >
            <p>{rejected_remarks}</p>
          </Box>
        );
      },
    },

    {
      header: "Actions",
      accessorKey: "actions",
      cell: (cell: CellContext<any, any>) => {
        return (
          <HStack>
            <Icon
              as={Show}
              fontSize={20}
              cursor="pointer"
              onClick={() => {
                navigate(
                  generatePath(NAVIGATION_ROUTES.DOC_PROFILE, {
                    id: cell.row.original.id,
                  })
                );
              }}
            />
          </HStack>
        );
      },
    },
  ];
};
