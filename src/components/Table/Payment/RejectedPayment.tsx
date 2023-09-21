import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { svgs } from "@nepMeds/assets/svgs";
import { DataTable } from "@nepMeds/components/DataTable";
import { rejectedPaymentColumns } from "@nepMeds/components/DataTable/Columns";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import Select from "@nepMeds/components/Form/Select";
import { STATUSTYPE } from "@nepMeds/config/enum";
import { useDebounce } from "@nepMeds/hooks/useDebounce";
import { useGetPaymentList } from "@nepMeds/service/nepmeds-payment";
import { colors } from "@nepMeds/theme/colors";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IoFunnelOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import { ISpecializationList } from "@nepMeds/components/Table/Payment/PaymentList";

interface Props {
  specializationList: ISpecializationList[];
}

const RejectedPaymentList = ({ specializationList }: Props) => {
  const formMethods = useForm();

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const navigate = useNavigate();

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [filterValue, setFilterValue] = useState<any>({
    status: STATUSTYPE.rejected,
  });

  const [searchFilter, setSearchFilter] = useState("");
  const debouncedInputValue = useDebounce(searchFilter, 500);

  const { data, isLoading, isSuccess } = useGetPaymentList({
    ...filterValue,
    page_no: pageIndex + 1,
    page_size: pageSize,
    name: debouncedInputValue,
    enabled: true,
    payment_status: "3",
  });

  const handleFilter = async (isReset: boolean) => {
    if (!isReset) {
      setFilterValue({
        status: STATUSTYPE.rejected,
        from_date: formMethods.getValues("fromDate"),
        to_date: formMethods.getValues("toDate"),
        specialization: formMethods.getValues("Specialization"),
      });
    } else {
      setFilterValue({
        status: STATUSTYPE.rejected,
      });
      formMethods.reset({});
    }

    onModalClose();
  };

  return (
    <>
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
              variant={"reset"}
              w={"150px"}
              onClick={() => handleFilter(true)}
            >
              Reset
            </Button>

            <Button
              variant={"primaryOutline"}
              onClick={() => handleFilter(true)}
              w={"150px"}
            >
              Cancel
            </Button>
            <Button w={"150px"} onClick={() => handleFilter(false)}>
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

      <HStack justifyContent="space-between">
        <Text fontWeight="medium">Rejected Payments</Text>

        <HStack>
          <InputGroup w="190px" borderColor={colors.grey_dark}>
            <InputLeftElement pointerEvents="none" h={8}>
              <SearchIcon color={colors.grey_dark} boxSize={4} />
            </InputLeftElement>
            <Input
              w={40}
              h={8}
              placeholder="Search"
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
          columns={rejectedPaymentColumns(navigate)}
          data={data?.results ?? []}
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

export default RejectedPaymentList;
