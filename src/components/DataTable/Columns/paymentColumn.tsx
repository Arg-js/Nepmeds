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
import { STATUSTYPE } from "@nepMeds/config/enum";

export const paymentColumn = (
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
      accessorKey: "user.first_name",
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
      accessorKey: "specialization_names",
      cell: ({
        row,
      }: CellContext<{ specialization_names: Specialization[] }, any>) => {
        const specialization = row?.original?.specialization_names?.map(
          data => <Tag key={data.id}>{data.name}</Tag>
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
      accessorKey: "doctor_amount_detail.instant_amount",
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
      accessorKey: "doctor_amount_detail.schedule_amount",
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
      accessorKey: "payment_modes",
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
      accessorKey: "id",
      cell: ({ row }: CellContext<IAllPaymentResponse, any>) => {
        const isStatusPending =
          +row.original?.payment_status === +STATUSTYPE.pending;
        const onView = () => {
          navigate(
            generatePath(NAVIGATION_ROUTES.AMOUNT_HISTORY, {
              id: row?.original?.id?.toString(),
            })
          );
        };
        const onAccept = () => {
          onClick(true, {
            id: row.original.doctor_amount_detail?.id?.toString(),
            name:
              row.original.user.first_name + " " + row.original.user.last_name,
          });
        };
        const onReject = () => {
          onClick(false, {
            id: row.original.doctor_amount_detail?.id?.toString(),
            name:
              row.original.user.first_name + " " + row.original.user.last_name,
          });
        };
        return (
          <HStack>
            <TableActions
              onView={onView}
              onAccept={isStatusPending ? onAccept : undefined}
              onReject={isStatusPending ? onReject : undefined}
            />
          </HStack>
        );
      },
    },
  ];
};
