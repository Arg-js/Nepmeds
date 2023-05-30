import { IGetDoctorProfile } from "@nepMeds/service/nepmeds-doctor-profile";
import EditBasic from "./EditDoctor/EditBasic";
import EditPrimary from "./EditDoctor/EditPrimary";
import EditAcademic from "./EditDoctor/EditAcademic";
import EditCertification from "./EditDoctor/EditCertification";
import EditExperience from "./EditDoctor/EditExperience";

export const DocUpdateProfile = ({
  doctorProfileData,
}: {
  doctorProfileData: IGetDoctorProfile;
}) => {
  return (
    <>
      <EditBasic doctorProfileData={doctorProfileData} />
      <EditPrimary doctorProfileData={doctorProfileData} />
      <EditAcademic doctorProfileData={doctorProfileData} />
      <EditCertification doctorProfileData={doctorProfileData} />
      <EditExperience doctorProfileData={doctorProfileData} />
    </>
  );
};

export default DocUpdateProfile;
