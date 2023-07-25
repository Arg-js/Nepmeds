import { Box, HStack, Icon, Tag } from "@chakra-ui/react";
import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";
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
    // {
    //   header: "Status",
    //   accessorKey: "profile_status",
    //   cell: ({ row }: CellContext<{ is_approved: boolean }, any>) => {
    //     const { is_approved } = row.original;
    //     return (
    //       <Badge
    //         colorScheme={is_approved ? "green" : "red"}
    //         p={1}
    //         borderRadius={20}
    //         fontSize={11}
    //         w={24}
    //         textAlign="center"
    //         textTransform="capitalize"
    //       >
    //         {is_approved ? "Approved" : "Not approved"}
    //       </Badge>
    //     );
    //   },
    // },
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
            {/* <Icon
                      as={Delete}
                      fontSize={20}
                      cursor="pointer"
                      color={colors.red}
                      onClick={() => {
                        handleDeleteDoctor(cell.row.original.id);
                        // formMethods.reset(cell.row.original);
                        // onDetailsModalOpen();
                        // setId(cell.row.original.id);
                      }}
                    /> */}
          </HStack>
        );
      },
    },
  ];
};
