import { Button, Grid, Text, useDisclosure } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { DataTable } from "@nepMeds/components/DataTable";
import { columns } from "@nepMeds/components/DataTable/Columns/Doctor/FollowUp";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import SearchInput from "@nepMeds/components/Search";
import { useDebounce } from "@nepMeds/hooks/useDebounce";
import { useCreateFollowUp } from "@nepMeds/service/nepmeds-doctor-availability";
import { useGetFollowUp } from "@nepMeds/service/nepmeds-followup";
import { colors } from "@nepMeds/theme/colors";
import { formatDateToString } from "@nepMeds/utils/TimeConverter/timeConverter";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FollowUpFormNew } from "./Component/FollowUpFromNew";
import * as Yup from "yup";

// Format date to fit to BE api
const nextDayDate = formatDateToString(
  new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
);
const currentDate = formatDateToString(new Date(new Date().getTime()));

const defaultValues = {
  from_time: "",
  to_time: "",
  date: nextDayDate,
};

const schema = Yup.object().shape({
  from_time: Yup.string().required("This field is required"),
});

const FollowUp = ({ type }: { type: number }) => {
  // PAGINATION PARAMS
  const [pageParams, setPageParams] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [id, setId] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const debouncedInputValue = useDebounce(searchValue, 500);

  // TODO: remove the null as unknown as number
  // const [selectedAvailability, setSelectedAvailability] = useState<number>(
  //   null as unknown as number
  // );

  const formMethods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { reset, handleSubmit } = formMethods;
  const { isOpen, onOpen, onClose } = useDisclosure();

  // React Query
  // FETCH DOCTOR ID
  const { mutateAsync: createFollowUp, isLoading } = useCreateFollowUp();
  const { data: followUP, isFetching } = useGetFollowUp({
    pageSize: pageParams.pageSize,
    pageIndex: pageParams.pageIndex,
    search: debouncedInputValue,
    date: type ? currentDate : "",
  });

  // React Query Ends

  const onModalClose = () => {
    reset(defaultValues);
    // setSelectedAvailability(null as unknown as number);
    onClose();
  };

  const onCreateFollowUp = async (data: typeof defaultValues) => {
    await createFollowUp({
      ...data,
      id: +id,
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
            <Button
              flex={1}
              onClick={handleSubmit(onCreateFollowUp)}
              isLoading={isLoading}
            >
              Add
            </Button>
          </>
        }
      >
        <FormProvider {...formMethods}>
          {/* <FollowUpForm
            formMethods={formMethods}
            selectedAvailability={selectedAvailability}
            setSelectedAvailability={setSelectedAvailability}
          /> */}
          <FollowUpFormNew formMethods={formMethods} />
        </FormProvider>
      </ModalComponent>

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
    </>
  );
};

export default FollowUp;
