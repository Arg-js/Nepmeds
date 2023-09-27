import { Image } from "@chakra-ui/image";
import { Box, Flex, HStack, Text } from "@chakra-ui/layout";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Tag } from "@chakra-ui/tag";
import StatusBadge from "@nepMeds/components/Common/StatusBadge";
import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";
import { IAllPaymentResponse } from "@nepMeds/service/nepmeds-payment";
import { Specialization } from "@nepMeds/service/nepmeds-specialization";
import { colors } from "@nepMeds/theme/colors";
import { appendServerUrl } from "@nepMeds/utils/getImageUrl";
import { CellContext, PaginationState } from "@tanstack/table-core";
import { NavigateFunction, generatePath } from "react-router";
import { Link } from "react-router-dom";
import TableActions from "@nepMeds/components/DataTable/TableActions/index";

export const allPaymentColumn = (
  onClick: (
    isApproved: boolean,
    doctorInfo: { id: string; name: string }
  ) => void,
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
      cell: ({ row }: CellContext<IAllPaymentResponse, any>) => {
        return (
          <ChakraLink
            color={colors.primary}
            _hover={{
              textDecoration: "underline",
            }}
            as={Link}
            to={generatePath(NAVIGATION_ROUTES.DOC_PROFILE, {
              id: row?.original?.id.toString(),
            })}
          >
            {row?.original?.user?.first_name +
              " " +
              row?.original?.user?.last_name}
          </ChakraLink>
        );
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

        return (
          <StatusBadge
            customProps={{
              status,
            }}
          />
        );
      },
    },
    {
      header: "Actions",
      cell: ({ row }: CellContext<IAllPaymentResponse, any>) => {
        return (
          <HStack>
            {+row?.original?.payment_status === +1 && (
              <TableActions
                onView={() => {
                  navigate(
                    generatePath(NAVIGATION_ROUTES.AMOUNT_HISTORY, {
                      id: row?.original?.id?.toString(),
                    })
                  );
                }}
              />
            )}

            {Number(row?.original?.payment_status) !== Number(1) && (
              <>
                <TableActions
                  onAccept={() => {
                    onClick(true, {
                      id: row.original.doctor_amount_detail?.id?.toString(),
                      name:
                        row.original.user.first_name +
                        " " +
                        row.original.user.last_name,
                    });
                  }}
                />
                <TableActions
                  onReject={() => {
                    onClick(false, {
                      id: row.original.doctor_amount_detail?.id?.toString(),
                      name:
                        row.original.user.first_name +
                        " " +
                        row.original.user.last_name,
                    });
                  }}
                />
              </>
            )}
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
      cell: ({ row }: CellContext<IAllPaymentResponse, any>) => {
        return (
          <ChakraLink
            color={colors.primary}
            _hover={{
              textDecoration: "underline",
            }}
            as={Link}
            to={generatePath(NAVIGATION_ROUTES.DOC_PROFILE, {
              id: row?.original?.id.toString(),
            })}
          >
            {row?.original?.user?.first_name +
              " " +
              row?.original?.user?.last_name}
          </ChakraLink>
        );
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
      cell: (cell: CellContext<IAllPaymentResponse, any>) => {
        return (
          <HStack>
            <TableActions
              onView={() => {
                navigate(
                  generatePath(NAVIGATION_ROUTES.AMOUNT_HISTORY, {
                    id: cell?.row?.original?.id?.toString(),
                  }),
                  { state: { status: cell?.row?.original?.payment_status } }
                );
              }}
            />
            <TableActions
              onAccept={() => {
                onClick(true, {
                  id: cell.row.original.doctor_amount_detail?.id?.toString(),
                  name:
                    cell.row.original.user.first_name +
                    " " +
                    cell.row.original.user.last_name,
                });
              }}
            />
            <TableActions
              onReject={() => {
                onClick(false, {
                  id: cell.row.original.doctor_amount_detail?.id?.toString(),
                  name:
                    cell.row.original.user.first_name +
                    " " +
                    cell.row.original.user.last_name,
                });
              }}
            />
          </HStack>
        );
      },
    },
  ];
};

export const approvedPaymentColumn = (
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
      cell: ({ row }: CellContext<IAllPaymentResponse, any>) => {
        return (
          <ChakraLink
            color={colors.primary}
            _hover={{
              textDecoration: "underline",
            }}
            as={Link}
            to={generatePath(NAVIGATION_ROUTES.DOC_PROFILE, {
              id: row?.original?.id.toString(),
            })}
          >
            {row?.original?.user?.first_name +
              " " +
              row?.original?.user?.last_name}
          </ChakraLink>
        );
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
      cell: (cell: CellContext<any, any>) => {
        return (
          <HStack>
            <TableActions
              onView={() => {
                navigate(
                  generatePath(NAVIGATION_ROUTES.AMOUNT_HISTORY, {
                    id: cell?.row?.original?.id?.toString(),
                  }),
                  { state: { status: cell?.row?.original?.payment_status } }
                );
              }}
            />
          </HStack>
        );
      },
    },
  ];
};

export const rejectedPaymentColumns = (
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
      cell: ({ row }: CellContext<IAllPaymentResponse, any>) => {
        return (
          <ChakraLink
            color={colors.primary}
            _hover={{
              textDecoration: "underline",
            }}
            as={Link}
            to={generatePath(NAVIGATION_ROUTES.DOC_PROFILE, {
              id: row?.original?.id.toString(),
            })}
          >
            {row?.original?.user?.first_name +
              " " +
              row?.original?.user?.last_name}
          </ChakraLink>
        );
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
      cell: (cell: CellContext<any, any>) => {
        return (
          <HStack>
            <TableActions
              onView={() => {
                navigate(
                  generatePath(NAVIGATION_ROUTES.AMOUNT_HISTORY, {
                    id: cell?.row?.original?.id?.toString(),
                  }),
                  { state: { status: cell?.row?.original?.payment_status } }
                );
              }}
            />
          </HStack>
        );
      },
    },
  ];
};
