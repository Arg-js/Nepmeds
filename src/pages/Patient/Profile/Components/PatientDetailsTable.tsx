import { Grid, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import { DataTable } from "@nepMeds/components/DataTable";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";
import SearchInput from "@nepMeds/components/Search";
import { useDebounce } from "@nepMeds/hooks/useDebounce";
import {
  useGetPatientDetails,
  useGetPatientDetailsById,
} from "@nepMeds/service/nepmeds-patient-profile";
import { useState } from "react";
import { columns } from "../../PatientDetail";
import PatientDetailModal from "./PatientDetailModal";

const PatientDetailsTable = () => {
  // TODO: api development in progress
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [searchValue, setSearchValue] = useState("");
  const [appointmentId, setAppointmentId] = useState("");

  const { onOpen, onClose, isOpen } = useDisclosure();

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
  // REACT QUERY ENDS

  return (
    <WrapperBox style={{ margin: "5", borderRadius: "12px", py: "4", px: "9" }}>
      <>
        <ModalComponent
          heading={<>Detail View</>}
          isOpen={isOpen}
          onClose={onClose}
          footer={<></>}
          size={"2xl"}
        >
          {isLoading ? (
            <Spinner />
          ) : (
            <PatientDetailModal patientDetail={patientDetail} />
          )}
        </ModalComponent>
        <Grid display={"flex"} justifyContent={"space-between"}>
          <Text variant="tableHeading">Patient Details</Text>
          <SearchInput
            setSearchValue={setSearchValue}
            setPageParams={setPagination}
          />
        </Grid>
        <DataTable
          data={tableData?.results ?? []}
          columns={columns({ pagination, setAppointmentId, onOpen })}
          isLoading={isFetching}
          pagination={{
            manual: true,
            pageParams: pagination,
            pageCount: tableData?.page_count,
            onChangePagination: setPagination,
          }}
        />
      </>
    </WrapperBox>
  );
};

export default PatientDetailsTable;
