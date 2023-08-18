import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { svgs } from "@nepMeds/assets/svgs";
import { DataTable } from "@nepMeds/components/DataTable";
import { paymentRateColumn } from "@nepMeds/components/DataTable/columns";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import Select from "@nepMeds/components/Form/Select";
// import { useDebounce } from '@nepMeds/hooks/useDebounce';
import { useGetAmountList } from "@nepMeds/service/nepmeds-payment";
import { colors } from "@nepMeds/theme/colors";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IoFunnelOutline } from "react-icons/io5";
import useAmountForm from "../useAmountForm";

paymentRateColumn;

const PaymentRate = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [, setSearchFilter] = useState("");
  const { data: amountList, isSuccess } = useGetAmountList();
  // const debouncedInputValue = useDebounce(searchFilter, 500);

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const formMethods = useForm();
  const {
    formMethods: { formState, trigger, getValues, register, reset },
    handleSubmitAmount,
    addLoading,
  } = useAmountForm();

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [, setFilterValue] = useState<any>({});

  const handleFilter = async (isReset: boolean) => {
    if (!isReset) {
      setFilterValue({
        from_date: formMethods.getValues("fromDate"),
        to_date: formMethods.getValues("toDate"),
        specialization: formMethods.getValues("Specialization"),
      });
    } else {
      setFilterValue({});
      formMethods.reset({});
    }

    onModalClose();
  };

  const handleFormSubmit = async () => {
    const isValid = await trigger();
    if (!isValid) return;

    handleSubmitAmount({ value: getValues(), closeModal: closeAmountModal });
  };

  const closeAmountModal = () => {
    onClose();
    reset();
  };

  return (
    <div>
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
                onClick={() => handleFilter(true)}
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
                options={[]}
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

      {isOpen && (
        <ModalComponent
          isOpen={isOpen}
          onClose={closeAmountModal}
          size={"md"}
          heading={
            <HStack>
              <svgs.logo_small />

              <Text>Choose Your Rate</Text>
            </HStack>
          }
          footer={
            <HStack w={"full"} justifyContent={"space-around"}>
              <Button
                outlineColor={"#13ADE1"}
                borderRadius={"12px"}
                color={colors.primary}
                bg={colors.white}
                w={"150px"}
                onClick={closeAmountModal}
              >
                Cancel
              </Button>
              <Button
                borderRadius={"12px"}
                bg={colors.primary}
                color={colors.white}
                w={"150px"}
                type="submit"
                mr={1}
                variant={"solid"}
                h={"45px"}
                onClick={handleFormSubmit}
                isLoading={addLoading}
              >
                Done
              </Button>
            </HStack>
          }
        >
          <VStack h={"auto"}>
            <form style={{ width: "96%", marginTop: "10px" }}>
              <Stack gap={2} bg={colors.white} w={"100%"}>
                <FloatingLabelInput
                  label="Instant Rate"
                  name="instant_amount"
                  placeholder="Enter the Instant rate"
                  type="number"
                  required
                  register={register}
                  rules={{
                    required: "Please Enter the Instant rate",
                  }}
                  error={formState?.errors?.instant_amount?.message}
                />
                <FloatingLabelInput
                  label="Schedule Rate"
                  name="schedule_amount"
                  placeholder="Enter the Schedule rate"
                  type="number"
                  required
                  register={register}
                  rules={{
                    required: "Please Enter Schedule rate",
                  }}
                  error={formState?.errors?.schedule_amount?.message}
                />
              </Stack>
            </form>
          </VStack>
        </ModalComponent>
      )}

      {amountList && amountList?.length > 1 && (
        <Box
          h={"84vh"}
          width={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
          display={"flex"}
        >
          <VStack>
            <svgs.InCompletePayment />
            <Heading color={colors.red}>Rate hasn’t been added</Heading>
            <Text>You can get started by clicking the Add button.</Text>
            <VStack>
              <Button
                bg={colors.primary}
                color={colors.white}
                w={"200px"}
                mt={5}
                h={"45px"}
                sx={{
                  "&:hover": { bg: colors.primary },
                }}
                onClick={onOpen}
              >
                Add Rate
              </Button>
            </VStack>
          </VStack>
        </Box>
      )}

      <HStack justifyContent="space-between">
        <Text fontWeight="medium">Rate</Text>
        <HStack>
          <InputGroup w="190px" borderColor={colors.grey_dark}>
            <InputLeftElement pointerEvents="none" h={8}>
              <SearchIcon color={colors.grey_dark} boxSize={4} />
            </InputLeftElement>
            <Input
              w={40}
              h={8}
              onChange={({ target: { value } }) => {
                setSearchFilter(value);
                setPagination({ pageIndex: 0, pageSize });
              }}
            />
          </InputGroup>
          <Button
            color={colors.grey_dark}
            bg={colors.white}
            outlineColor={colors.grey_dark}
            h={8}
            onClick={onModalOpen}
          >
            <IoFunnelOutline pointerEvents={"none"} />
            &nbsp; Filter
          </Button>
        </HStack>
      </HStack>

      {isSuccess && (
        <DataTable
          columns={paymentRateColumn()}
          data={amountList ?? []}
          pagination={{
            manual: true,
            pageParams: { pageIndex, pageSize },
            // pageCount: data?.page_count,
            pageCount: 0,
            onChangePagination: setPagination,
          }}
        />
      )}
    </div>
  );
};

export default PaymentRate;
