import { IRegisterFields } from "@nepMeds/components/FormComponents/RegistrationForm/RegistrationForm";
import { toastFail } from "@nepMeds/components/Toast";
import {
  useValidateBasicInfo,
  useValidatePrimaryInfo,
} from "@nepMeds/service/nepmeds-register";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";
import { imageToBase64 } from "@nepMeds/utils/imgToBase64";

const useRegisterValidate = () => {
  //validate
  const validateBasic = useValidateBasicInfo();
  const validatePrimary = useValidatePrimaryInfo();

  const validateBasicInfo = async (values: IRegisterFields) => {
    try {
      const profilePicture = values?.profile_picture?.[0];

      await validateBasic.mutateAsync({
        confirm_password: values?.confirm_password,
        password: values?.password,
        first_name: values?.first_name,
        last_name: values?.last_name,
        middle_name: values?.middle_name,
        profile_picture: profilePicture
          ? await imageToBase64(profilePicture)
          : "",
        title: values?.title,
      });
    } catch (error) {
      const err = serverErrorResponse(error);
      toastFail(err);
      throw err;
    }
  };

  const validatePrimaryInfo = async (values: IRegisterFields) => {
    try {
      const idFontImage = values?.id_front_image?.[0];
      const idBackImage = values?.id_back_image?.[0];

      await validatePrimary.mutateAsync({
        bio_detail: values?.bio_detail,
        date_of_birth: values?.date_of_birth,
        district: values?.district,
        email: values?.email,
        gender: values?.gender,
        id_back_image: idBackImage ? await imageToBase64(idBackImage) : "",
        id_front_image: idFontImage ? await imageToBase64(idFontImage) : "",
        id_issued_date: values?.id_issued_date,
        id_issued_district: values?.id_issued_district,
        id_number: values?.id_number,
        id_type: values?.id_type,
        mobile_number: values?.mobile_number,
        municipality: values?.municipality,
        pan_number: values?.pan_number,
        province: values?.province,
        specialization: values?.specialization_names.map(s => Number(s.value)),
        tole: values?.tole,
        ward: values?.ward,
        verified_id:
          values?.doctor_id?.toString() === "0"
            ? ""
            : values?.doctor_id?.toString(),
      });
    } catch (error) {
      const err = serverErrorResponse(error);
      toastFail(err);
      throw err;
    }
  };

  return {
    validateBasicInfo,
    validateLoading: validateBasic.isLoading || validatePrimary.isLoading,
    validatePrimaryInfo,
  };
};

export default useRegisterValidate;
