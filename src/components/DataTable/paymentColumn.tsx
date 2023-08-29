import Icon from "@chakra-ui/icon";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import { Badge, Box, Flex, HStack, Text } from "@chakra-ui/layout";
import { Tag } from "@chakra-ui/tag";
import { Tooltip } from "@chakra-ui/tooltip";
import { STATUSTYPE } from "@nepMeds/config/enum";
import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";
import { IAllPaymentResponse } from "@nepMeds/service/nepmeds-payment";
import { Specialization } from "@nepMeds/service/nepmeds-specialization";
import { colors } from "@nepMeds/theme/colors";
import { appendServerUrl } from "@nepMeds/utils/getImageUrl";
import { CellContext } from "@tanstack/table-core";
import { Show } from "react-iconly";
import { NavigateFunction, generatePath } from "react-router";

interface PendingCellContextSearch {
  user: {
    first_name: string;
    middle_name: string;
    last_name: string;
  };
}

export const allPaymentColumn = (navigate: NavigateFunction) => {
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
      header: "Instant Rate",
      cell: ({ row }: CellContext<IAllPaymentResponse, any>) => {
        return (
          <Text pl={"12px"}>
            {" "}
            {row?.original?.doctor_amount_detail?.instant_amount
              ? `Rs. ${row?.original?.doctor_amount_detail?.instant_amount}`
              : "-"}
          </Text>
        );
      },
    },
    {
      header: "Schedule Rate",
      cell: ({ row }: CellContext<IAllPaymentResponse, any>) => {
        return (
          <Text pl={"12px"}>
            {row?.original?.doctor_amount_detail?.schedule_amount
              ? `Rs. ${row?.original?.doctor_amount_detail?.schedule_amount}`
              : "-"}
          </Text>
        );
      },
    },
    {
      header: "Payment Method",
      cell: ({ row }: CellContext<IAllPaymentResponse, any>) => {
        return (
          <Flex gap={3}>
            {row?.original?.payment_modes?.map(e => (
              <Image
                key={e.id}
                src={appendServerUrl(e.image)}
                width={"30px"}
                height={"30px"}
                aspectRatio={"auto"}
              />
            ))}
          </Flex>
        );
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
      cell: ({ row }: CellContext<IAllPaymentResponse, any>) => {
        return (
          <HStack justifyContent={"center"}>
            <Tooltip label="View Doctor">
              <span>
                <Icon
                  as={Show}
                  fontSize={20}
                  cursor="pointer"
                  onClick={() => {
                    navigate(
                      generatePath(NAVIGATION_ROUTES.DOC_PROFILE, {
                        id: row.original.id?.toString(),
                      })
                    );
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

export const pendingPaymentColumn = (
  onClick: (
    isApproved: boolean,
    doctorInfo: { id: string; name: string }
  ) => void,
  navigate: NavigateFunction
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
      header: "Instant Rate",
      cell: ({ row }: CellContext<IAllPaymentResponse, any>) => {
        return (
          <Text pl={"12px"}>
            {" "}
            {row?.original?.doctor_amount_detail?.instant_amount
              ? `Rs. ${row?.original?.doctor_amount_detail?.instant_amount}`
              : "-"}
          </Text>
        );
      },
    },
    {
      header: "Schedule Rate",
      cell: ({ row }: CellContext<IAllPaymentResponse, any>) => {
        return (
          <Text pl={"12px"}>
            {row?.original?.doctor_amount_detail?.schedule_amount
              ? `Rs. ${row?.original?.doctor_amount_detail?.schedule_amount}`
              : "-"}
          </Text>
        );
      },
    },
    {
      header: "Payment Method",
      cell: ({ row }: CellContext<IAllPaymentResponse, any>) => {
        return (
          <Flex gap={3}>
            {row?.original?.payment_modes?.map(e => (
              <Image
                key={e.id}
                src={appendServerUrl(e.image)}
                width={"30px"}
                height={"30px"}
                aspectRatio={"auto"}
              />
            ))}
          </Flex>
        );
      },
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: (cell: CellContext<IAllPaymentResponse, any>) => {
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
                        id: cell.row.original.id?.toString(),
                      })
                    );
                  }}
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
                      id: cell.row.original.doctor_amount_detail?.id?.toString(),
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
                      id: cell.row.original.doctor_amount_detail?.id?.toString(),
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

export const approvedPaymentColumn = (navigate: NavigateFunction) => {
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
      header: "Instant Rate",
      cell: ({ row }: CellContext<IAllPaymentResponse, any>) => {
        return (
          <Text pl={"12px"}>
            {" "}
            {row?.original?.doctor_amount_detail?.instant_amount
              ? `Rs. ${row?.original?.doctor_amount_detail?.instant_amount}`
              : "-"}
          </Text>
        );
      },
    },
    {
      header: "Schedule Rate",
      cell: ({ row }: CellContext<IAllPaymentResponse, any>) => {
        return (
          <Text pl={"12px"}>
            {row?.original?.doctor_amount_detail?.schedule_amount
              ? `Rs. ${row?.original?.doctor_amount_detail?.schedule_amount}`
              : "-"}
          </Text>
        );
      },
    },

    {
      header: "Payment Method",
      cell: ({ row }: CellContext<IAllPaymentResponse, any>) => {
        return (
          <Flex gap={3}>
            {row?.original?.payment_modes?.map(e => (
              <Image
                key={e.id}
                src={appendServerUrl(e.image)}
                width={"30px"}
                height={"30px"}
                aspectRatio={"auto"}
              />
            ))}
          </Flex>
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
          </HStack>
        );
      },
    },
  ];
};

export const rejectedPaymentColumns = (navigate: NavigateFunction) => {
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
      header: "Instant Rate",
      cell: ({ row }: CellContext<IAllPaymentResponse, any>) => {
        return (
          <Text pl={"12px"}>
            {" "}
            {row?.original?.doctor_amount_detail?.instant_amount
              ? `Rs. ${row?.original?.doctor_amount_detail?.instant_amount}`
              : "-"}
          </Text>
        );
      },
    },
    {
      header: "Schedule Rate",
      cell: ({ row }: CellContext<IAllPaymentResponse, any>) => {
        return (
          <Text pl={"12px"}>
            {row?.original?.doctor_amount_detail?.schedule_amount
              ? `Rs. ${row?.original?.doctor_amount_detail?.schedule_amount}`
              : "-"}
          </Text>
        );
      },
    },
    {
      header: "Reason",
      accessorKey: "specialization",
      cell: ({ row }: CellContext<{ rejected_remarks: string }, any>) => {
        const rejected_remarks = row?.original?.rejected_remarks ?? "";

        return (
          <Box display={"flex"} flexWrap={"wrap"}>
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
            <Tooltip label="View Doctor">
              <span>
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
              </span>
            </Tooltip>
          </HStack>
        );
      },
    },
  ];
};
