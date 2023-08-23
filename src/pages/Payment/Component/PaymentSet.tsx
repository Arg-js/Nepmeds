import {
  Box,
  Button,
  HStack,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";

import { svgs } from "@nepMeds/assets/svgs";
import Checkbox from "@nepMeds/components/Form/Checkbox";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import {
  useGetPaymentMethods,
  useGetPaymentMethodsList,
} from "@nepMeds/service/nepmeds-payment";
import { colors } from "@nepMeds/theme/colors";
import { useState } from "react";
import { Controller } from "react-hook-form";
import usePaymentForm from "../usePaymentForm";
import PaymentCard from "./PaymentCard";

const PaymentSet = () => {
  const [activeMethod, setActiveMethod] = useState<string>("0");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { data: methods, isLoading: methodsLoading } = useGetPaymentMethods();
  const { data: paymentMethods } = useGetPaymentMethodsList();

  const {
    formMethods: {
      reset,
      handleSubmit,
      register,
      control,
      setValue,
      formState,
      trigger,
      watch,
    },
    isLoading,
    handleEditPayment,
    handleSubmitPayment,
    setPaymentValue,
    handleDeteltePayment,
  } = usePaymentForm();

  const modalMethods = {
    closeModal: () => {
      setActiveMethod("0");
      reset({});
      setValue("is_primary_method", false);
    },
    openModal: (id: string) => setActiveMethod(id),
    isOpen: activeMethod !== "0",
    isEsewaOrKhalti: activeMethod === "1" || activeMethod === "2",
    isBank: activeMethod === "3",
    isEsewa: activeMethod === "1",
    isKhalti: activeMethod === "2",
  };

  const handleFormSubmit = async () => {
    const isValid = await trigger();
    if (!isValid) return;

    const data = paymentMethods?.find(
      e => e.payment_mode?.toString() === activeMethod
    );

    handleSubmit(value =>
      isEditing
        ? handleEditPayment({
            value,
            id: data?.id?.toString() ?? "",
            onSuccess: modalMethods.closeModal,
          })
        : handleSubmitPayment({ value, id: activeMethod })
    )().then(() => modalMethods.closeModal());
  };

  const validateLength = (type: string, value: string | null) => {
    if (value && value?.length > 10) {
      return `${type} ID must be at most 10 digit long.`;
    } else if (value && value?.length < 10) {
      return `${type} ID must be at least 10 digit long.`;
    }
    return true;
  };

  return (
    <Box bg={colors.white}>
      {methodsLoading && <Spinner />}
      <Box h={"80vh"} bg={colors.white}>
        <SimpleGrid minChildWidth="420px" spacing={10}>
          {methods?.map(x => {
            return (
              <PaymentCard
                key={x.id}
                name={x.name}
                image={x.image ?? ""}
                data={paymentMethods?.find(
                  e => e.payment_mode?.toString() === x.id?.toString()
                )}
                onClickEdit={() => {
                  const data = paymentMethods?.find(
                    e => e.payment_mode?.toString() === x.id?.toString()
                  );
                  modalMethods.openModal(x.id.toString());
                  setIsEditing(!!data);
                  data && setPaymentValue(data as any);
                }}
                onClickDelete={() => {
                  const data = paymentMethods?.find(
                    e => e.payment_mode?.toString() === x.id?.toString()
                  );
                  data?.id && handleDeteltePayment(data?.id?.toString());
                }}
              />
            );
          })}
        </SimpleGrid>
      </Box>

      {modalMethods.isOpen && (
        <ModalComponent
          isOpen={modalMethods.isOpen}
          onClose={modalMethods.closeModal}
          size={"md"}
          heading={
            <HStack>
              <svgs.logo_small />
              <Text>Edit Payment Details</Text>
            </HStack>
          }
          footer={
            <HStack w={"full"} justifyContent={"space-around"}>
              <Button
                outlineColor={"#13ADE1"}
                borderRadius={"12px"}
                color={colors.primary}
                bg={colors.white}
                w={"150px"}
                onClick={modalMethods.closeModal}
              >
                Cancel
              </Button>
              <Button
                borderRadius={"12px"}
                bg={colors.primary}
                color={colors.white}
                w={"150px"}
                type="submit"
                onClick={handleFormSubmit}
                mr={1}
                variant={"solid"}
                h={"45px"}
                isLoading={isLoading}
              >
                Done
              </Button>
            </HStack>
          }
        >
          <VStack h={"auto"}>
            <form style={{ width: "96%", marginTop: "10px" }}>
              {modalMethods.isEsewa && (
                <>
                  <FloatingLabelInput
                    label="Esewa Id"
                    name="epayment_id"
                    register={register}
                    required
                    rules={{
                      required: "Please Enter Esewa Id",
                      validate: () =>
                        validateLength("Khalti", watch("epayment_id")),
                    }}
                    error={formState?.errors?.epayment_id?.message}
                  />
                  <Controller
                    render={({ field: { value, ref, ...fieldValues } }) => (
                      <Checkbox
                        label="Set Primary Payment Method"
                        control={control}
                        {...fieldValues}
                        checked={value}
                      />
                    )}
                    name={`is_primary_method`}
                    control={control}
                  />
                </>
              )}

              {modalMethods.isKhalti && (
                <>
                  <FloatingLabelInput
                    label="Khalti ID"
                    name="epayment_id"
                    register={register}
                    required
                    type="number"
                    rules={{
                      required: "Please Enter Khalti Id",
                      validate: () =>
                        validateLength("Khalti", watch("epayment_id")),
                    }}
                    error={formState?.errors?.epayment_id?.message}
                  />
                  <Controller
                    render={({ field: { value, ref, ...fieldValues } }) => (
                      <Checkbox
                        label="Set Primary Payment Method"
                        control={control}
                        {...fieldValues}
                        checked={value}
                      />
                    )}
                    name="is_primary_method"
                    control={control}
                  />
                </>
              )}

              {modalMethods.isBank && (
                <VStack spacing={5}>
                  <FloatingLabelInput
                    label="Bank Name"
                    name="bank_name"
                    register={register}
                    required
                    rules={{
                      required: "Please Enter Bank Name",
                    }}
                    error={formState?.errors?.bank_name?.message}
                  />
                  <FloatingLabelInput
                    label="Account No."
                    name="account_number"
                    register={register}
                    required
                    rules={{
                      required: "Please Enter Account Number",
                    }}
                    error={formState?.errors?.account_number?.message}
                  />
                  <FloatingLabelInput
                    label="Account Holder Name"
                    name="account_holder_name"
                    register={register}
                    required
                    rules={{
                      required: "Please Enter Account Holder Name",
                    }}
                    error={formState?.errors?.account_holder_name?.message}
                  />
                  <FloatingLabelInput
                    label="Branch Name"
                    name="branch_name"
                    register={register}
                    required
                    rules={{
                      required: "Please Enter Branch Name",
                    }}
                    error={formState?.errors?.branch_name?.message}
                  />
                  <Controller
                    render={({ field: { value, ref, ...fieldValues } }) => (
                      <Checkbox
                        label="Set Primary Payment Method"
                        control={control}
                        {...fieldValues}
                        checked={value}
                      />
                    )}
                    name="is_primary_method"
                    control={control}
                  />
                </VStack>
              )}
            </form>
          </VStack>
        </ModalComponent>
      )}
    </Box>
  );
};

export default PaymentSet;
