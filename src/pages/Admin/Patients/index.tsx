import { Text } from "@chakra-ui/react";
import { DataTable } from "@nepMeds/components/DataTable";
import { patientColumn } from "@nepMeds/components/DataTable/Columns";
import TableWrapper from "@nepMeds/components/TableWrapper";
import { useGetPatientDetails } from "@nepMeds/service/nepmeds-doctor-patient";

const Patients = () => {
  const { data: patient, isFetching } = useGetPatientDetails();
  return (
    <TableWrapper>
      <>
        <Text variant={"tableHeading"}>Total Patient</Text>
        <DataTable
          data={patient?.results || []}
          isLoading={isFetching}
          columns={patientColumn()}
        />
      </>
    </TableWrapper>
  );
};

export default Patients;
