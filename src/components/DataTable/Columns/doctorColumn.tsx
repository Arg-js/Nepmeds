import { Box } from "@chakra-ui/layout";
import { Tag } from "@chakra-ui/tag";
import StatusBadge from "@nepMeds/components/Common/StatusBadge";
import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";
import { IGetDoctorList } from "@nepMeds/service/nepmeds-doctorlist";
import { Specialization } from "@nepMeds/service/nepmeds-specialization";
import { colors } from "@nepMeds/theme/colors";
import { PaginationState } from "@tanstack/react-table";
import { CellContext } from "@tanstack/table-core";
import { NavigateFunction, generatePath } from "react-router";
import TableActions from "@nepMeds/components/DataTable/TableActions/index";

interface PendingCellContextSearch {
  user: {
    first_name: string;
    middle_name: string;
    last_name: string;
  };
}

export const pendingColumns = (
  navigate: NavigateFunction,
  onClick: (
    isApproved: boolean,
    doctorInfo: { id: string; name: string }
  ) => void,
  pageParams: PaginationState
) => {
  return [
    {
      header: "S.N",
      accessorFn: (_cell: CellContext<any, any>, index: number) => {
        return `${pageParams.pageIndex * pageParams.pageSize + (index + 1)}.`;
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
              // bg={colors.lightish_blue}
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
      header: "Actions",
      cell: (cell: CellContext<any, any>) => {
        return (
          // <HStack>
          //   <Tooltip hasArrow placement="top" label="View Doctor">
          //     <span>
          //       <Icon
          //         as={Show}
          //         fontSize={20}
          //         mt={2}
          //         cursor="pointer"
          //         onClick={() => {
          //           navigate(
          //             generatePath(NAVIGATION_ROUTES.DOC_PROFILE, {
          //               id: cell.row.original.id,
          //             })
          //           );
          //         }}
          //       />
          //     </span>
          //   </Tooltip>
          //   <Tooltip hasArrow placement="top" label="Approve Doctor">
          //     <span>
          //       <Icon
          //         as={CheckIcon}
          //         fontSize={16}
          //         cursor="pointer"
          //         color={colors.green_light}
          //         onClick={() => {
          //           onClick(true, {
          //             id: cell.row.original.id,
          //             name:
          //               cell.row.original.user.first_name +
          //               " " +
          //               cell.row.original.user.last_name,
          //           });
          //         }}
          //       />
          //     </span>
          //   </Tooltip>
          //   <Tooltip hasArrow placement="top" label="Reject Doctor">
          //     <span>
          //       <Icon
          //         as={CloseIcon}
          //         fontSize={14}
          //         color={colors.red}
          //         cursor="pointer"
          //         onClick={() => {
          //           onClick(false, {
          //             id: cell.row.original.id,
          //             name:
          //               cell.row.original.user.first_name +
          //               " " +
          //               cell.row.original.user.last_name,
          //           });
          //         }}
          //       />
          //     </span>
          //   </Tooltip>
          // </HStack>
          <TableActions
            onView={() =>
              navigate(
                generatePath(NAVIGATION_ROUTES.DOC_PROFILE, {
                  id: cell.row.original.id,
                })
              )
            }
            onAccept={() =>
              onClick(true, {
                id: cell.row.original.id,
                name:
                  cell.row.original.user.first_name +
                  " " +
                  cell.row.original.user.last_name,
              })
            }
            onReject={() =>
              onClick(false, {
                id: cell.row.original.id,
                name:
                  cell.row.original.user.first_name +
                  " " +
                  cell.row.original.user.last_name,
              })
            }
          />
        );
      },
    },
  ];
};

export const approvedColumns = (
  navigate: NavigateFunction,
  pageParams: PaginationState
) => {
  return [
    {
      header: "S.N",
      accessorFn: (_cell: CellContext<any, any>, index: number) => {
        return `${pageParams.pageIndex * pageParams.pageSize + (index + 1)}.`;
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
          // <Icon
          //   as={Show}
          //   fontSize={20}
          //   cursor="pointer"
          //   onClick={() => {
          //     navigate(
          //       generatePath(NAVIGATION_ROUTES.DOC_PROFILE, {
          //         id: cell.row.original.id,
          //       })
          //     );
          //   }}
          // />
          <TableActions
            onView={() => {
              navigate(
                generatePath(NAVIGATION_ROUTES.DOC_PROFILE, {
                  id: cell.row.original.id,
                })
              );
            }}
          />
        );
      },
    },
  ];
};

export const registeredColumns = (
  navigate: NavigateFunction,
  pageParams: PaginationState
) => {
  return [
    {
      header: "S.N",
      accessorFn: (_cell: CellContext<any, any>, index: number) => {
        return `${pageParams.pageIndex * pageParams.pageSize + (index + 1)}.`;
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
              bg={colors.lightish_blue}
              m={"1px"}
            >
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

        return (
          <StatusBadge
            customProps={{
              status: status?.toString() ?? "",
            }}
          />
        );
      },
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: (cell: CellContext<any, any>) => {
        return (
          // <HStack>
          //   <Icon
          //     as={Show}
          //     fontSize={20}
          //     cursor="pointer"
          //     onClick={() => {
          //       navigate(
          //         generatePath(NAVIGATION_ROUTES.DOC_PROFILE, {
          //           id: cell.row.original.id,
          //         })
          //       );
          //     }}
          //   />
          // </HStack>
          <TableActions
            onView={() => {
              navigate(
                generatePath(NAVIGATION_ROUTES.DOC_PROFILE, {
                  id: cell.row.original.id,
                })
              );
            }}
          />
        );
      },
    },
  ];
};

export const rejectedColumns = (
  navigate: NavigateFunction,
  pageParams: PaginationState
) => {
  return [
    {
      header: "S.N",
      accessorFn: (_cell: CellContext<any, any>, index: number) => {
        return `${pageParams.pageIndex * pageParams.pageSize + (index + 1)}.`;
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
              mb={1}
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
          // <HStack>
          //   <Icon
          //     as={Show}
          //     fontSize={20}
          //     cursor="pointer"
          //     onClick={() => {
          //       navigate(
          //         generatePath(NAVIGATION_ROUTES.DOC_PROFILE, {
          //           id: cell.row.original.id,
          //         })
          //       );
          //     }}
          //   />
          // </HStack>
          <TableActions
            onView={() => {
              navigate(
                generatePath(NAVIGATION_ROUTES.DOC_PROFILE, {
                  id: cell.row.original.id,
                })
              );
            }}
          />
        );
      },
    },
  ];
};
