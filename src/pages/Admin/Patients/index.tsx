import { Text } from "@chakra-ui/react";
import { DataTable } from "@nepMeds/components/DataTable";
import { patientColumn } from "@nepMeds/components/DataTable/Columns";
import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";
import { useGetPatientDetails } from "@nepMeds/service/nepmeds-doctor-patient";

const Patients = () => {
  const { data: patient, isFetching } = useGetPatientDetails();
  return (
    <WrapperBox style={{ margin: "5", borderRadius: "12px", py: "4", px: "9" }}>
      <>
        <Text variant={"tableHeading"}>Total Patient</Text>
        <DataTable
          data={patient?.results || []}
          isLoading={isFetching}
          columns={patientColumn()}
        />
      </>
    </WrapperBox>
  );
};

export default Patients;
