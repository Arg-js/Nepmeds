import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ConfirmationImage, svgs } from "@nepMeds/assets/svgs";
import { DataTable } from "@nepMeds/components/DataTable";
import { columns } from "@nepMeds/components/DataTable/Columns";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import Select from "@nepMeds/components/Form/Select";
import { RejectionForm } from "@nepMeds/components/FormComponents";
// import { STATUSTYPE } from "@nepMeds/config/enum";
import { useProfileData } from "@nepMeds/context/index";
import { useDebounce } from "@nepMeds/hooks/useDebounce";
import useDoctorStatusForm from "@nepMeds/pages/DoctorProfile/useDoctorStatusForm";
import { useDoctorList } from "@nepMeds/service/nepmeds-doctorlist";
import { colors } from "@nepMeds/theme/colors";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IoFunnelOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ISpecializationList } from "@nepMeds/components/Table/Payment/PaymentList";

interface Props {
  specializationList?: ISpecializationList[];
  showFilter?: boolean;
  type: number;
  heading: string;
}

const schema = yup.object().shape({
  remarks: yup.string().required("Remarks  is required!"),
});

const defaultValues = {
  Specialization: "",
  toDate: "",
  fromDate: "",
};

const PendingDocList = ({
  type,
  heading,
  specializationList,
  showFilter = true,
}: Props) => {
  const [pageParams, setPageParams] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [filterValue, setFilterValue] = useState<any>({
    status: type || "",
  });
  const profileData = useProfileData();
  const [doctorInfo, setDoctorInfo] = useState<{ id: string; name: string }>({
    id: "",
    name: "",
  });
  const {
    isOpen: isRejectModalOpen,
    onOpen: onRejectModalOpen,
    onClose: onRejectModalClose,
  } = useDisclosure();
  const {
    isOpen: confirmationModal,
    onOpen: onOpenConfirmation,
    onClose: onCloseConfirmation,
  } = useDisclosure();

  const [searchFilter, setSearchFilter] = useState("");

  const debouncedInputValue = useDebounce(searchFilter, 500);

  const { data, isFetching } = useDoctorList({
    ...filterValue,
    page_no: pageParams.pageIndex + 1,
    page_size: pageParams.pageSize,
    name: debouncedInputValue,
    enabled: profileData?.data?.is_superuser,
  });
  const formMethods = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const {
    ApproveDoctor,
    RejectDoctor,
    approveLoading,
    rejectLoading,
    formMethods: statusFormMethods,
  } = useDoctorStatusForm();

  const handleFilter = async (isReset: boolean) => {
    if (!isReset) {
      setFilterValue({
        status: type || "",
        from_date: formMethods.getValues("fromDate"),
        to_date: formMethods.getValues("toDate"),
        specialization: formMethods.getValues("Specialization"),
      });
      onModalClose();
    } else {
      setFilterValue({ status: type || "" });
      formMethods.reset(defaultValues);
    }
  };

  const onClick = async (
    isApproved: boolean,
    doctorInfo: { id: string; name: string }
  ) => {
    setDoctorInfo({ name: doctorInfo.name, id: doctorInfo.id });
    if (isApproved) {
      onOpenConfirmation();
      // ApproveDoctor(doctorId)
    } else {
      onRejectModalOpen();
    }
  };

  const RejectDoctorModal = () => {
    statusFormMethods.reset();
    onRejectModalClose();
  };

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
                variant={"reset"}
                w={"150px"}
                onClick={() => handleFilter(true)}
              >
                Reset
              </Button>
              <Button w={"150px"} onClick={() => handleFilter(false)}>
                Filter
              </Button>
            </HStack>
          }
        >
          <VStack h={"auto"}>
            <FormProvider {...formMethods}>
              <Select
                placeholder="Select Specialization"
                label="Specialization"
                name="Specialization"
                required
                register={formMethods.register}
                options={specializationList ?? []}
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

      {isRejectModalOpen && (
        <ModalComponent
          isOpen={isRejectModalOpen}
          onClose={RejectDoctorModal}
          approve
          reject
          size="xl"
          heading={
            <HStack>
              <svgs.logo_small />
              <Text>Remarks for rejection</Text>
            </HStack>
          }
          footer={
            <HStack w="100%" gap={3}>
              <Button
                variant="primaryOutline"
                onClick={RejectDoctorModal}
                flex={1}
              >
                Cancel
              </Button>
              <Button
                flex={1}
                onClick={statusFormMethods.handleSubmit(value =>
                  RejectDoctor({ ...value, id: doctorInfo.id }).then(() =>
                    RejectDoctorModal()
                  )
                )}
                isLoading={rejectLoading}
              >
                Done
              </Button>
            </HStack>
          }
          primaryText="Done"
          secondaryText="Cancel"
          otherAction={onRejectModalClose}
        >
          <FormProvider {...statusFormMethods}>
            <form
              onSubmit={statusFormMethods.handleSubmit(value =>
                RejectDoctor({ ...value, id: doctorInfo.id })
              )}
            >
              <RejectionForm />
            </form>
          </FormProvider>
        </ModalComponent>
      )}

      {confirmationModal && (
        <ModalComponent
          isOpen={confirmationModal}
          onClose={onCloseConfirmation}
          approve
          reject
          size="xl"
          heading={
            <HStack>
              <svgs.logo_small />
              <Text>Doctor Approval</Text>
            </HStack>
          }
          footer={
            <HStack w="100%" gap={3}>
              <Button
                flex={1}
                variant={"primaryOutline"}
                onClick={onCloseConfirmation}
              >
                Cancel
              </Button>
              <Button
                flex={1}
                onClick={statusFormMethods.handleSubmit(() =>
                  ApproveDoctor(doctorInfo.id).then(() => onCloseConfirmation())
                )}
                isLoading={approveLoading}
              >
                Yes
              </Button>
            </HStack>
          }
          primaryText="Done"
          secondaryText="Cancel"
          otherAction={onCloseConfirmation}
        >
          <Flex
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <ConfirmationImage />
            <Text fontWeight={"bold"} mt={4}>
              Are you sure you want to approve {doctorInfo.name}?
            </Text>
          </Flex>
        </ModalComponent>
      )}

      <HStack justifyContent="space-between">
        {showFilter && <Text fontWeight="medium">Pending Doctors</Text>}

        {showFilter && (
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
        )}
      </HStack>

      <DataTable
        columns={columns(navigate, pageParams, onClick)}
        isLoading={isFetching}
        data={data?.results ?? []}
        pagination={{
          manual: true,
          pageParams,
          pageCount: data?.page_count,
          onChangePagination: setPageParams,
        }}
      />
    </>
  );
};

export default PendingDocList;
