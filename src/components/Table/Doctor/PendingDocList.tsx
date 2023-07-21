import { SearchIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  Center,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { svgs } from "@nepMeds/assets/svgs";
import { DataTable } from "@nepMeds/components/DataTable";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import Select from "@nepMeds/components/Form/Select";
import { useDebounce } from "@nepMeds/hooks/useDebounce";
import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";
import { useDoctorList } from "@nepMeds/service/nepmeds-doctorlist";
import { Specialization } from "@nepMeds/service/nepmeds-specialization";
import { colors } from "@nepMeds/theme/colors";
import { CellContext, PaginationState } from "@tanstack/react-table";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Show } from "react-iconly";
import { IoFunnelOutline } from "react-icons/io5";
import { generatePath, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ISpecializationList } from "./DoctorsList";

interface CellContextSearch {
  user: {
    first_name: string;
    middle_name: string;
    last_name: string;
  };
}
interface Props {
  specializationList: ISpecializationList[];
}

const schema = yup.object().shape({
  remarks: yup.string().required("Remarks  is required!"),
});

const PendingDocList = ({ specializationList }: Props) => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [filterValue, setFilterValue] = useState<any>({
    status: "pending",
  });

  const [searchFilter, setSearchFilter] = useState("");

  const debouncedInputValue = useDebounce(searchFilter, 500);

  const { data, isLoading, isSuccess } = useDoctorList({
    ...filterValue,
    page_no: pageIndex + 1,
    page_size: pageSize,
    name: debouncedInputValue,
  });

  const handleFilter = async (isReset: boolean) => {
    if (!isReset) {
      setFilterValue({
        from_date: formMethods.getValues("fromDate"),
        to_date: formMethods.getValues("toDate"),
        specialization: formMethods.getValues("Specialization"),
      });
    } else {
      setFilterValue({
        status: "pending",
      });
      formMethods.reset({});
    }

    onModalClose();
  };

  const formMethods = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();
  const columns = React.useMemo(
    () => [
      {
        header: "S.N",
        accessorFn: (_cell: CellContext<any, any>, index: number) => {
          return index + 1;
        },
      },
      {
        header: "Doctor's Name",
        accessorKey: "first_name",
        accessorFn: (_cell: CellContextSearch) => {
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
            data => data.name
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
        accessorKey: "profile_status",
        cell: ({ row }: CellContext<{ is_approved: boolean }, any>) => {
          const { is_approved } = row.original;
          return (
            <Badge
              colorScheme={is_approved ? "green" : "red"}
              p={1}
              borderRadius={20}
              fontSize={11}
              w={24}
              textAlign="center"
              textTransform="capitalize"
            >
              {is_approved ? "Approved" : "Not approved"}
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
                  formMethods.reset(cell.row.original);
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
    ],
    []
  );

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  return (
    <>
      {isModalOpen && (
        <ModalComponent
          isOpen={isModalOpen}
          onClose={onModalClose}
          size={"xl"}
          heading={
            <HStack>
              <svgs.logo_small />
              <Text>Filter</Text>
            </HStack>
          }
          footer={
            <HStack w={"full"} justifyContent={"flex-end"}>
              <Button
                outlineColor={"#13ADE1"}
                borderRadius={"12px"}
                color={"#13ADE1"}
                w={"150px"}
                mr={1}
                onClick={() => handleFilter(true)}
              >
                Reset
              </Button>
              <Button
                outlineColor={"#13ADE1"}
                borderRadius={"12px"}
                color={"#13ADE1"}
                w={"150px"}
              >
                Cancel
              </Button>
              <Button
                bg={"#13ADE1"}
                color={"white"}
                w={"150px"}
                onClick={() => handleFilter(false)}
                borderRadius={"12px"}
                sx={{
                  "&:hover": { bg: "#13ADE1", color: "white" },
                }}
              >
                Done
              </Button>
            </HStack>
          }
        >
          <VStack h={"auto"}>
            <FormProvider {...formMethods}>
              <Select
                placeholder="select specialization"
                label="Specialization"
                name="Specialization"
                required
                register={formMethods.register}
                options={specializationList}
              />
              <Box display={"flex"} width={"100%"}>
                <FloatingLabelInput
                  label="From"
                  name="fromDate"
                  register={formMethods.register}
                  type="date"
                />
                <Box ml={1}>
                  <FloatingLabelInput
                    label="To"
                    name="toDate"
                    register={formMethods.register}
                    type="date"
                  />
                </Box>
              </Box>
            </FormProvider>
          </VStack>
        </ModalComponent>
      )}

      <HStack justifyContent="space-between">
        <Text fontWeight="medium">Pending Doctors</Text>

        <HStack>
          <InputGroup w="190px" borderColor={colors.grey_dark}>
            <InputLeftElement pointerEvents="none" h={8}>
              <SearchIcon color={colors.grey_dark} boxSize={4} />
            </InputLeftElement>
            <Input
              w={40}
              h={8}
              onChange={({ target: { value } }) => setSearchFilter(value)}
            />
          </InputGroup>
          <Button
            color={colors.grey_dark}
            bg={colors.white}
            outlineColor={colors.grey_dark}
            h={8}
            onClick={() => {
              onModalOpen();
            }}
          >
            <IoFunnelOutline pointerEvents={"none"} />
            &nbsp; Filter
          </Button>
        </HStack>
      </HStack>
      {isSuccess && (
        <DataTable
          columns={columns}
          data={data?.results ?? []}
          filter={{ globalFilter: searchFilter }}
          pagination={{
            manual: true,
            pageParams: { pageIndex, pageSize },
            pageCount: data?.page_count,
            onChangePagination: setPagination,
          }}
        />
      )}
      {isLoading && (
        <Center>
          <Spinner />
        </Center>
      )}
      {data?.count === 0 && <Box>No Result Found!</Box>}
    </>
  );
};

export default PendingDocList;
