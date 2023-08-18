import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Badge, Box, HStack, Icon, Tag, Tooltip } from "@chakra-ui/react";
import { STATUSTYPE } from "@nepMeds/config/enum";
import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";
import { IGetDoctorList } from "@nepMeds/service/nepmeds-doctorlist";
import { IAllPaymentResponse } from "@nepMeds/service/nepmeds-payment";
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

export const pendingColumns = (
  navigate: NavigateFunction,
  onClick: (
    isApproved: boolean,
    doctorInfo: { id: string; name: string }
  ) => void
) => {
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
              bg={colors.lightish_blue}
              mx={"1px"}
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
      accessorKey: "actions",
      cell: (cell: CellContext<any, any>) => {
        return (
          <HStack>
            <Tooltip label="View Doctor">
              <span>
                <Icon
                  as={Show}
                  fontSize={20}
                  mt={2}
                  cursor="pointer"
                  onClick={() => {
                    navigate(
                      generatePath(NAVIGATION_ROUTES.DOC_PROFILE, {
                        id: cell.row.original.id,
                      })
                    );
                  }}
                />
              </span>
            </Tooltip>
            <Tooltip label="Approve Doctor">
              <span>
                <Icon
                  as={CheckIcon}
                  fontSize={16}
                  cursor="pointer"
                  color={colors.green_light}
                  onClick={() => {
                    onClick(true, {
                      id: cell.row.original.id,
                      name:
                        cell.row.original.user.first_name +
                        " " +
                        cell.row.original.user.last_name,
                    });
                  }}
                />
              </span>
            </Tooltip>
            <Tooltip label="Reject Doctor">
              <span>
                <Icon
                  as={CloseIcon}
                  fontSize={14}
                  color={colors.red}
                  cursor="pointer"
                  onClick={() => {
                    onClick(false, {
                      id: cell.row.original.id,
                      name:
                        cell.row.original.user.first_name +
                        " " +
                        cell.row.original.user.last_name,
                    });
                  }}
                />
              </span>
            </Tooltip>
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
            <Tag
              key={data.id}
              color={colors.main}
              bg={colors.lightish_blue}
              mx={"1px"}
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
            <Tag
              key={data.id}
              color={colors.main}
              bg={colors.lightish_blue}
              mx={"1px"}
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
        const isApproved =
          status?.toString() === STATUSTYPE.approved?.toString();
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
              mb={1}
              color={colors.main}
              bg={colors.lightish_blue}
              mx={"1px"}
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

// Payment Column
export const allPaymentColumn = () => {
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
              mx={"1px"}
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
      header: "Instant Rate",
      cell: ({ row }: CellContext<{ data: IAllPaymentResponse }, any>) => {
        return row?.original?.data?.instant_amount;
      },
    },
    {
      header: "Schedule Rate",
      cell: ({ row }: CellContext<{ data: IAllPaymentResponse }, any>) => {
        return row?.original?.data?.schedule_amount;
      },
    },
    {
      header: "Status",
      accessorKey: "payment_status",
      cell: ({ row }: CellContext<any, any>) => {
        const { payment_status: status } = row.original;
        const isApproved =
          STATUSTYPE[status?.toString() as keyof typeof STATUSTYPE]?.toString();

        return (
          <Badge
            colorScheme={
              isApproved === "pending"
                ? "yellow"
                : isApproved === "approved"
                ? "green"
                : "red"
            }
            p={1}
            borderRadius={20}
            fontSize={11}
            w={24}
            textAlign="center"
            textTransform="capitalize"
          >
            {isApproved === "pending"
              ? "Pending"
              : isApproved === "approved"
              ? "Approved"
              : "Not approved"}
          </Badge>
        );
      },
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: () => {
        return (
          <HStack>
            <Icon as={Show} fontSize={20} cursor="pointer" onClick={() => {}} />
          </HStack>
        );
      },
    },
  ];
};

export const pendingPaymentColumn = (
  onClick: (
    isApproved: boolean,
    doctorInfo: { id: string; name: string }
  ) => void
) => {
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
              bg={colors.lightish_blue}
              mx={"1px"}
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
      accessorKey: "actions",
      cell: (cell: CellContext<any, any>) => {
        return (
          <HStack>
            <Tooltip label="View Doctor">
              <span>
                <Icon
                  as={Show}
                  fontSize={20}
                  mt={2}
                  cursor="pointer"
                  onClick={() => {}}
                />
              </span>
            </Tooltip>
            <Tooltip label="Approve Payment">
              <span>
                <Icon
                  as={CheckIcon}
                  fontSize={16}
                  cursor="pointer"
                  color={colors.green_light}
                  onClick={() => {
                    onClick(true, {
                      id: cell.row.original.id,
                      name:
                        cell.row.original.user.first_name +
                        " " +
                        cell.row.original.user.last_name,
                    });
                  }}
                />
              </span>
            </Tooltip>
            <Tooltip label="Reject Payment">
              <span>
                <Icon
                  as={CloseIcon}
                  fontSize={14}
                  color={colors.red}
                  cursor="pointer"
                  onClick={() => {
                    onClick(false, {
                      id: cell.row.original.id,
                      name:
                        cell.row.original.user.first_name +
                        " " +
                        cell.row.original.user.last_name,
                    });
                  }}
                />
              </span>
            </Tooltip>
          </HStack>
        );
      },
    },
  ];
};

export const approvedPaymentColumn = () => {
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
              mx={"1px"}
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
      header: "Instant Rate",
      cell: ({ row }: CellContext<{ data: IAllPaymentResponse }, any>) => {
        return row?.original?.data?.instant_amount;
      },
    },
    {
      header: "Schedule Rate",
      cell: ({ row }: CellContext<{ data: IAllPaymentResponse }, any>) => {
        return row?.original?.data?.schedule_amount;
      },
    },

    {
      header: "Actions",
      accessorKey: "actions",
      cell: () => {
        return (
          <HStack>
            <Icon as={Show} fontSize={20} cursor="pointer" onClick={() => {}} />
          </HStack>
        );
      },
    },
  ];
};

export const rejectedPaymentColumns = () => {
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
              mx={"1px"}
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
      header: "Instant Rate",
      cell: ({ row }: CellContext<{ data: IAllPaymentResponse }, any>) => {
        return row?.original?.data?.instant_amount;
      },
    },
    {
      header: "Schedule Rate",
      cell: ({ row }: CellContext<{ data: IAllPaymentResponse }, any>) => {
        return row?.original?.data?.schedule_amount;
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
      cell: () => {
        return (
          <HStack>
            <Icon as={Show} fontSize={20} cursor="pointer" onClick={() => {}} />
          </HStack>
        );
      },
    },
  ];
};

//Rate Column
export const paymentRateColumn = () => {
  return [
    {
      header: "S.N",
      accessorFn: (_cell: CellContext<any, any>, index: number) => {
        return index + 1;
      },
    },
    {
      header: "Pending Date",
      accessorKey: "pending_date",
      accessorFn: (_cell: PendingCellContextSearch) => {
        return _cell?.user?.first_name + " " + _cell?.user?.last_name;
      },
    },

    {
      header: "Approval Date",
      accessorKey: "approval_date",
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
              mx={"1px"}
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
      header: "Status",
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
      header: "Instant Rate",
      cell: ({ row }: CellContext<{ data: IAllPaymentResponse }, any>) => {
        return row?.original?.data?.instant_amount;
      },
    },
    {
      header: "Appointment Rate",
      cell: ({ row }: CellContext<{ data: IAllPaymentResponse }, any>) => {
        return row?.original?.data?.schedule_amount;
      },
    },

    {
      header: "Actions",
      accessorKey: "actions",
      cell: () => {
        return (
          <HStack>
            <Icon as={Show} fontSize={20} cursor="pointer" onClick={() => {}} />
          </HStack>
        );
      },
    },
  ];
};
