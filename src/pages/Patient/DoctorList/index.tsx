import DoctorListCard from "@nepMeds/components/Patient/DoctorList";
import { useSpecializationRegisterData } from "@nepMeds/service/nepmeds-specialization";

const DoctorList = () => {
  const { data: specializaionData = [] } = useSpecializationRegisterData();
  return <DoctorListCard data={specializaionData} />;
};

export default DoctorList;
