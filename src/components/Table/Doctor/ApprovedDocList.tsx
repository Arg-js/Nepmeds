import { SearchIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
  useDisclosure,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { svgs } from "@nepMeds/assets/svgs";
import { DataTable } from "@nepMeds/components/DataTable";
import DoctorDetail from "@nepMeds/components/DoctorDetail/DoctorDetail";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import MultiSelect from "@nepMeds/components/Form/MultiSelect";
import { RejectionForm } from "@nepMeds/components/FormComponents";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";

import { useApproveDoc } from "@nepMeds/service/nepmeds-approve-doc";
import { useApprovedDoctorList } from "@nepMeds/service/nepmeds-approved-doctor-list";
import { useDoctorDetail } from "@nepMeds/service/nepmeds-doctor-detail";
import { useDeleteDoctorData } from "@nepMeds/service/nepmeds-doctorlist";
import { useRejectDoc } from "@nepMeds/service/nepmeds-reject-doc";
import { useSpecializationRegisterData } from "@nepMeds/service/nepmeds-specialization";
import { colors } from "@nepMeds/theme/colors";
import { CellContext, PaginationState } from "@tanstack/react-table";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Delete, Show } from "react-iconly";
import { IoFunnelOutline } from "react-icons/io5";
import { generatePath, useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();
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
  const deleteDoctorMethod = useDeleteDoctorData();

  const handleDeleteDoctor = async (id: number) => {
    const deleteDoctorResponse = await deleteDoctorMethod.mutateAsync(id);

    if (deleteDoctorResponse) {
      toastSuccess("Academic data deleted successfully");
    } else {
      toastFail("Failed to delete academic information!");
    }
  };
  interface CellContextSearch {
    user: {
      first_name: string;
      middle_name: string;
      last_name: string;
    };
  }
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
          return (
            _cell?.user?.first_name +
            " " +
            _cell?.user?.middle_name +
            " " +
            _cell?.user?.last_name
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
        cell: ({ row }: CellContext<{ specialization: [] }, any>) => {
          const specialization = row?.original?.specialization ?? "";

          return (
            <Box
              display={"flex"}
              flexWrap={"wrap"}
              // width={"fit-content"}
              // p={1}
              // background={colors.grey}
              // borderRadius={20}
            >
              <p>{specialization.join(", ")}</p>
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
            <>
              <Icon
                as={Show}
                fontSize={20}
                cursor="pointer"
                onClick={() => {
                  formMethods.reset(cell.row.original);
                  // // onDetailsModalOpen();
                  setId(cell.row.original.id);
                  // navigate(NAVIGATION_ROUTES.DOC_PROFILE);
                  navigate(
                    generatePath(NAVIGATION_ROUTES.DOC_PROFILE, {
                      id: cell.row.original.id,
                    })
                  );

                  // navigate(`${"/doc-profile"}`)
                }}
              />

              <Icon
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
              />
            </>
          );
        },
      },
    ],
    []
  );

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { data, isLoading } = useApprovedDoctorList({
    page_no: pageIndex + 1,
  });
  const [searchFilter, setSearchFilter] = useState("");
  const [id, setId] = React.useState("");
  const { data: specialization = [] } = useSpecializationRegisterData();
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
