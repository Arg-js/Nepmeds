import { Button, Grid, Text, useDisclosure } from "@chakra-ui/react";
import { DataTable } from "@nepMeds/components/DataTable";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import SearchInput from "@nepMeds/components/Search";
import TableWrapper from "@nepMeds/components/TableWrapper";
import { useDebounce } from "@nepMeds/hooks/useDebounce";
import { useCreateLabReport } from "@nepMeds/service/nepmeds-lab-report";
import {
  useGetPatientDetails,
  useGetPatientDetailsById,
} from "@nepMeds/service/nepmeds-patient-profile";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { columns } from "../../PatientDetail";
import LabReportForm from "./LabReportForm";
import PatientDetailModal from "./PatientDetailModal";
import PatientPrescriptionSkeleton from "./PatientPrescriptionSkeleton";

const PatientDetailsTable = () => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [searchValue, setSearchValue] = useState("");
  const [appointmentId, setAppointmentId] = useState("");

  const { onOpen, onClose, isOpen } = useDisclosure();
  const {
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
    isOpen: isEditModalOpen,
  } = useDisclosure();

  const debouncedValue = useDebounce(searchValue, 500);

  // REACT QUERY
  const { data: tableData, isFetching } = useGetPatientDetails({
    page: pagination.pageIndex,
    page_size: pagination.pageSize,
    search: debouncedValue,
  });
  const { data: patientDetail, isLoading } = useGetPatientDetailsById({
    appointment_id: appointmentId,
  });
  const { mutateAsync: createLabReport, isLoading: isCreatingLabReport } =
    useCreateLabReport();
  // REACT QUERY ENDS

  const onModalClose = () => {
    onEditModalClose();
    // TODO: reset({ image: new FileList() });
    reset({ image: [] as unknown as FileList });
  };
  // todo: use default value and schema
  const formMethods = useForm<{ image: FileList }>();
  const { watch, reset } = formMethods;
  const imageWatch = watch("image");

  // todo: use handleSubmit
  const onSubmitHandler = async () => {
    await createLabReport({
      image: imageWatch,
      appointment_id: +appointmentId,
    });
  };

  return (
    <TableWrapper>
      <>
        <ModalComponent
          heading={<>Detail View</>}
          isOpen={isOpen}
          onClose={onClose}
          footer={<></>}
          size={"2xl"}
        >
          {isLoading ? (
            <PatientPrescriptionSkeleton />
          ) : (
            // Todo: find another way to solve this problem
            // patientDetail: IPatientDetailById | undefined
            <PatientDetailModal patientDetail={patientDetail} />
          )}
        </ModalComponent>
        <ModalComponent
          heading={<>Add Lab Report</>}
          isOpen={isEditModalOpen}
          onClose={onModalClose}
          footer={
            <>
              <Button variant={"reset"} flex={0.5} onClick={onModalClose}>
                Cancel
              </Button>
              <Button
                flex={0.5}
                isDisabled={!imageWatch?.length}
                isLoading={isCreatingLabReport}
                onClick={async () => {
                  await onSubmitHandler();
                  onModalClose();
                }}
              >
                Add
              </Button>
            </>
          }
        >
          <LabReportForm
            formMethods={formMethods}
            appointmentId={appointmentId}
          />
        </ModalComponent>

        <Grid display={"flex"} justifyContent={"space-between"}>
          <Text variant="tableHeading">Appointment Details</Text>
          <SearchInput
            setSearchValue={setSearchValue}
            setPageParams={setPagination}
          />
        </Grid>
        <DataTable
          data={tableData?.results ?? []}
          columns={columns({
            pagination,
            setAppointmentId,
            onOpen,
            onEditModalOpen,
          })}
          isLoading={isFetching}
          pagination={{
            manual: true,
            pageParams: pagination,
            pageCount: tableData?.page_count,
            onChangePagination: setPagination,
          }}
        />
      </>
    </TableWrapper>
  );
};

export default PatientDetailsTable;
