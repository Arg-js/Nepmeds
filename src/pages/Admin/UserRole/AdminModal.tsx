import { Button, Flex, HStack, Text } from "@chakra-ui/react";
import { svgs } from "@nepMeds/assets/svgs";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import FloatingPassword from "@nepMeds/components/Form/FloatingPassword";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import Select from "@nepMeds/components/Form/Select";
import { IAdminSingleDetail } from "@nepMeds/service/nepmeds-admin-userrole";
import { colors } from "@nepMeds/theme/colors";
import { gender } from "@nepMeds/utils/choices";
import { validateDateOfBirth } from "@nepMeds/utils/time";
import { useEffect } from "react";
import useAdminForm from "./useAdminForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  onSubmitHandler: (data: any) => void;
  editData?: IAdminSingleDetail;
}

const AdminModal = ({
  isOpen,
  onClose,
  onSubmitHandler,
  isLoading,
  editData,
}: Props) => {
  const closeAndReset = () => {
    onClose();
    reset();
  };
  const {
    formMethods: {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      getValues,
    },
    validateConfirmPassword,
    passwordVisible,
    setPasswordVisible,
    confirmpasswordVisible,
    setConfirmpasswordVisible,
  } = useAdminForm();

  useEffect(() => {
    if (editData) {
      reset(editData);
    }
  }, [editData]);
  return (
    <ModalComponent
      size={"2xl"}
      heading={
        <HStack>
          <svgs.logo_small />
          <Text>Edit Admin</Text>
        </HStack>
      }
      isOpen={isOpen}
      onClose={closeAndReset}
      footer={
        <HStack w="100%">
          <Button variant={"primaryOutline"} w="100%" onClick={closeAndReset}>
            Cancel
          </Button>
          <Button
            w="100%"
            isLoading={isLoading}
            onClick={handleSubmit(onSubmitHandler)}
          >
            Confirm
          </Button>
        </HStack>
      }
    >
      <form>
        <Flex direction={"column"} alignItems={"center"} gap={8}>
          <FloatingLabelInput
            name="first_name"
            label="First Name"
            isRequired
            register={register}
            rules={{
              required: "First name is required.",
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: "First name should contain only alphabets.",
              },
            }}
            error={errors.first_name?.message}
          />
          <FloatingLabelInput
            name="middle_name"
            label="Middle Name"
            register={register}
            rules={{
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: "Middle name should contain only alphabets.",
              },
            }}
            error={errors.middle_name?.message}
          />

          <FloatingLabelInput
            name="last_name"
            label="Last Name"
            isRequired
            register={register}
            rules={{
              required: "Last name is required.",
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: "Last name should contain only alphabets.",
              },
            }}
            error={errors.last_name?.message}
          />

          <FloatingLabelInput
            name="email"
            label="Email"
            isRequired
            register={register}
            rules={{
              required: "Email is required.",
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: "Email is invalid.",
              },
            }}
            error={errors.email?.message}
          />

          <Select
            placeholder=""
            label="Gender"
            name="gender"
            register={register}
            options={gender}
            required
            style={{
              background: colors.forminput,
              border: "none",
              paddingTop: "15px",
            }}
            rules={{
              required: "Gender is required.",
            }}
            error={errors.gender?.message}
          />

          <FloatingLabelInput
            name="date_of_birth"
            label="Date of Birth"
            register={register}
            type="date"
            required
            _hover={{ cursor: "pointer" }}
            style={{
              background: colors.forminput,
              border: "none",
            }}
            rules={{
              required: "Date of Birth is required.",
              validate: () => validateDateOfBirth(getValues("date_of_birth")),
            }}
            error={errors.date_of_birth?.message}
          />

          <FloatingLabelInput
            name="mobile_number"
            label="Mobile Number"
            isRequired
            register={register}
            rules={{
              required: "Mobile No. is required.",
              min: "Mobile No. can be only 10 digit long",
              max: "Mobile No. can be only 10 digit long",
            }}
            error={errors.mobile_number?.message}
          />

          {!editData && (
            <FloatingPassword
              isVisible={passwordVisible}
              label="Password"
              isRequired
              onToggleVisibility={() => setPasswordVisible(!passwordVisible)}
              name="password"
              register={register}
              rules={{
                required: "Password is required.",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long.",
                },
              }}
              error={errors.password?.message}
            />
          )}

          {!editData && (
            <FloatingPassword
              isVisible={confirmpasswordVisible}
              label="Confirm Password"
              isRequired
              onToggleVisibility={() =>
                setConfirmpasswordVisible(!confirmpasswordVisible)
              }
              name="confirm_password"
              register={register}
              rules={{
                required: "Confirm password is required.",
                validate: () =>
                  validateConfirmPassword(
                    getValues("password"),
                    getValues("confirm_password")
                  ),
              }}
              error={errors.confirm_password?.message}
            />
          )}
        </Flex>
      </form>
    </ModalComponent>
  );
};

export default AdminModal;
