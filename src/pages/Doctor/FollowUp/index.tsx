import { Button, Grid, Text, useDisclosure } from "@chakra-ui/react";
import { DataTable } from "@nepMeds/components/DataTable";
import { columns } from "@nepMeds/components/DataTable/Columns/Doctor/FollowUp";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";
import SearchInput from "@nepMeds/components/Search";
import { useDebounce } from "@nepMeds/hooks/useDebounce";
import {
  useCreateFollowUp,
  useGetFollowUp,
} from "@nepMeds/service/nepmeds-followup";
import { colors } from "@nepMeds/theme/colors";
import { formatDateToString } from "@nepMeds/utils/TimeConverter/timeConverter";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FollowUpForm from "./Component/followUpForm";

// Format date to fit to BE api
const nextDayDate = formatDateToString(
  new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
);
const defaultValues = {
  availabilityDate: nextDayDate,
};

const FollowUp = () => {
  // PAGINATION PARAMS
  const [pageParams, setPageParams] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [id, setId] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const debouncedInputValue = useDebounce(searchValue, 500);

  // TODO: remove the null as unknown as number
  const [selectedAvailability, setSelectedAvailability] = useState<number>(
    null as unknown as number
  );

  const formMethods = useForm({
    defaultValues,
  });

  const { reset } = formMethods;
  const { isOpen, onOpen, onClose } = useDisclosure();

  // React Query
  // FETCH DOCTOR ID
  const { mutateAsync: createFollowUp, isLoading } = useCreateFollowUp();
  const { data: followUP, isFetching } = useGetFollowUp({
    pageSize: pageParams.pageSize,
    pageIndex: pageParams.pageIndex,
    search: debouncedInputValue,
  });

  // React Query Ends

  const onModalClose = () => {
    reset(defaultValues);
    setSelectedAvailability(null as unknown as number);
    onClose();
  };

  const onCreateFollowUp = async () => {
    await createFollowUp({
      id,
      availability: selectedAvailability,
    });
    onModalClose();
  };
  return (
    <>
      <ModalComponent
        size={"2xl"}
        heading={<>Add Follow Up</>}
        isOpen={isOpen}
        onClose={onModalClose}
        footer={
          <>
            <Button variant={"reset"} flex={1} onClick={onModalClose}>
              Cancel
            </Button>
            <Button flex={1} onClick={onCreateFollowUp} isLoading={isLoading}>
              Add
            </Button>
          </>
        }
      >
        <FormProvider {...formMethods}>
          <FollowUpForm
            formMethods={formMethods}
            selectedAvailability={selectedAvailability}
            setSelectedAvailability={setSelectedAvailability}
          />
        </FormProvider>
      </ModalComponent>
      <WrapperBox
        style={{ margin: "5", borderRadius: "12px", py: "4", px: "9" }}
      >
        <>
          {/* Table Header */}
          <Grid display={"flex"} justifyContent={"space-between"}>
            <Text color={colors.blue_100} variant="tableHeading">
              Follow Up
            </Text>
            <SearchInput
              setSearchValue={setSearchValue}
              setPageParams={setPageParams}
            />
          </Grid>

          {/* Table Header Ends */}

          <DataTable
            data={followUP?.results || []}
            columns={columns({ setId, onOpen, pageParams })}
            isLoading={isFetching}
            pagination={{
              manual: true,
              pageParams: {
                pageIndex: pageParams.pageIndex,
                pageSize: pageParams.pageSize,
              },
              pageCount: followUP?.page_count,
              onChangePagination: setPageParams,
            }}
          />
        </>
      </WrapperBox>
    </>
  );
};

export default FollowUp;
