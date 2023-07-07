import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
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
import DoctorDetail from "@nepMeds/components/DoctorDetail/DoctorDetail";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import MultiSelect from "@nepMeds/components/Form/MultiSelect";
import { RejectionForm } from "@nepMeds/components/FormComponents";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";

import { useApproveDoc } from "@nepMeds/service/nepmeds-approve-doc";
import { useFakePagination } from "@nepMeds/service/nepmeds-approved-doctor-list";
import { useDoctorDetail } from "@nepMeds/service/nepmeds-doctor-detail";
import { useRejectDoc } from "@nepMeds/service/nepmeds-reject-doc";
import { useSpecializationData } from "@nepMeds/service/nepmeds-specialization";
import { colors } from "@nepMeds/theme/colors";
import { CellContext, ColumnDef, PaginationState } from "@tanstack/react-table";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IoFunnelOutline } from "react-icons/io5";

const ApprovedDocList = () => {
  const {
    isOpen: isDetailsModalOpen,
    // onOpen: onDetailsModalOpen,
    onClose: onDetailsModalClose,
  } = useDisclosure();
  const {
    isOpen: isRejectModalOpen,
    onOpen: onRejectModalOpen,
    onClose: onRejectModalClose,
  } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  // const navigate = useNavigate();
  const [_isRejected, setIsRejected] = React.useState(false);
  const rejectModal = () => {
    setIsRejected(true);
    onDetailsModalClose();
    onRejectModalOpen();
  };
  const acceptDoctor = () => {
    onDetailsModalClose();
  };
  const RejectDoctor = () => {
    onRejectModalClose();
  };
  const approvePendingDoc = useApproveDoc();

  const rejectPendingDoc = useRejectDoc();
  const onSubmitForm = async () => {
    try {
      const isValid = await formMethods.trigger("remarks");
      if (!isValid) return;

      const val = formMethods.getValues("remarks");
      await rejectPendingDoc.mutateAsync({
        id: id ?? "",
        remarks: val,
      });
      onRejectModalClose();
      toastSuccess("Doctor Rejected!");
      formMethods.reset();
    } catch (error) {
      toastFail("Doctor cannot be rejected. Try Again!!");
    }
  };
  const formMethods = useForm();
  // const deleteDoctorMethod = useDeleteDoctorData();

  // const handleDeleteDoctor = async (id: number) => {
  //   const deleteDoctorResponse = await deleteDoctorMethod.mutateAsync(id);

  //   if (deleteDoctorResponse) {
  //     toastSuccess("Academic data deleted successfully");
  //   } else {
  //     toastFail("Failed to delete academic information!");
  //   }
  // };
  // interface CellContextSearch {
  //   user: {
  //     first_name: string;
  //     middle_name: string;
  //     last_name: string;
  //   };
  // }
  const columns = React.useMemo<
    ColumnDef<{ id: string; name: string; tagline: string }>[]
  >(
    () => [
      {
        header: "S.N",
        accessorFn: (_cell: CellContext<any, any>, index: number) => {
          return index + 1;
        },
      },
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Tag Line",
        accessorKey: "tagline",
      },
    ],
    []
  );

  // const { data, isLoading } = useApprovedDoctorList();
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 1,
    pageSize: 10,
  });

  const { data, isLoading } = useFakePagination({
    page: pageIndex,
    perPage: pageSize,
  });

  const [searchFilter, setSearchFilter] = useState("");
  const [id] = React.useState("");
  const { data: specialization = [] } = useSpecializationData();
  const { data: detail, isLoading: isFetching } = useDoctorDetail(id);
  const specializationList = specialization.map(s => ({
    label: s.name,
    value: s.id,
  }));
  if (isLoading)
    return (
      <Spinner
        style={{ margin: "0 auto", textAlign: "center", display: "block" }}
      />
    );

  console.log("first");

  return (
    <>
      <HStack justifyContent="space-between">
        <Text fontWeight="medium">Registered Doctors</Text>
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
      <DataTable
        columns={columns}
        data={data || []}
        filter={{ globalFilter: searchFilter }}
        pagination={{
          manual: true,
          pageParams: { pageIndex, pageSize },
          pageCount: 20,
          onChangePagination: setPagination,
        }}
      />
      <ModalComponent
        alignment="left"
        size="2xl"
        approve
        reject
        isOpen={isDetailsModalOpen}
        onClose={acceptDoctor}
        heading={
          <HStack>
            <svgs.logo_small />
            <Text>Doctor Info</Text>
          </HStack>
        }
        primaryText="Verify"
        secondaryText="On Hold"
        otherAction={rejectModal}
        onApiCall={() => {
          onDetailsModalClose();
          approvePendingDoc.mutateAsync(id ?? "");
          toastSuccess("Doctor Approved");
        }}
      >
        {isFetching ? (
          <Spinner
            style={{ margin: "0 auto", textAlign: "center", display: "block" }}
          />
        ) : (
          <DoctorDetail {...detail} />
        )}
      </ModalComponent>

      <ModalComponent
        isOpen={isRejectModalOpen}
        onClose={RejectDoctor}
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
              variant="outline"
              onClick={RejectDoctor}
              flex={1}
              border="2px solid"
              borderColor={colors.primary}
              color={colors.primary}
              fontWeight={400}
            >
              Cancel
            </Button>
            <Button
              flex={1}
              onClick={async () => {
                try {
                  const isValid = await formMethods.trigger("remarks");
                  if (!isValid) return;

                  const val = formMethods.getValues("remarks");
                  await rejectPendingDoc.mutateAsync({
                    id: id ?? "",
                    remarks: val,
                  });
                  onRejectModalClose();
                  toastSuccess("Doctor Rejected!");
                  formMethods.reset();
                } catch (error) {
                  toastFail("Doctor cannot be rejected. Try Again!!");
                }
              }}
              background={colors.primary}
              color={colors.white}
            >
              Done
            </Button>
          </HStack>
        }
        primaryText="Done"
        secondaryText="Cancel"
        otherAction={onRejectModalClose}
      >
        <FormProvider {...formMethods}>
          <RejectionForm onSubmit={formMethods.handleSubmit(onSubmitForm)} />
        </FormProvider>
      </ModalComponent>
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
            >
              Cancel
            </Button>
            <Button
              bg={"#13ADE1"}
              color={"white"}
              w={"150px"}
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
            <MultiSelect
              placeholder=""
              label="Specialization"
              name="Specialization"
              required
              register={formMethods.register}
              options={specializationList}
              selectControl={formMethods.control}
            />
            <Flex width={"100%"} pt={"25px"} pb={"25px"}>
              <FloatingLabelInput
                label="From"
                name="fromDate"
                register={formMethods.register}
                type="date"
              />
              <FloatingLabelInput
                label="To"
                name="toDate"
                register={formMethods.register}
                type="date"
              />
            </Flex>
          </FormProvider>
        </VStack>
      </ModalComponent>
    </>
  );
};

export default ApprovedDocList;
