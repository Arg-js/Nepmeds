import { Button, Flex, Icon, IconButton } from "@chakra-ui/react";
import { useAddPrescription } from "./usePrescriptionForm";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import { colors } from "@nepMeds/theme/colors";
import FloatinglabelTextArea from "@nepMeds/components/Form/FloatingLabeltextArea";
import { useFieldArray } from "react-hook-form";
import { DeleteIcon } from "@nepMeds/assets/svgs";
import {
  IPrescriptionInfo,
  useDeleteDrugReferralInfo,
} from "@nepMeds/service/nepmeds-prescription";
import { useEffect } from "react";
import { AddIcon } from "@chakra-ui/icons";

const DrugReferralForm = ({
  appointment_id,
  drug_referral,
}: {
  appointment_id: string;
  drug_referral: IPrescriptionInfo["drug_referral"] | undefined;
}) => {
  const {
    drugReferralInfoForm: { handleSubmit, register, control, setValue },
    drugReferralInfoLoading,
    onSubmitDrugReferralInfo: onSubmit,
  } = useAddPrescription();
  const { mutate } = useDeleteDrugReferralInfo();

  const { fields, append, remove } = useFieldArray({ control, name: "drug" });

  const handleRemoveDrug = (index: number) => {
    if (drug_referral && drug_referral[index]) {
      const { id } = drug_referral[index];
      mutate(id ?? "");
    }
    remove(index);
  };

  useEffect(() => {
    if (drug_referral?.length && drug_referral.length > 0) {
      setValue("drug", drug_referral);
    }
  }, [drug_referral]);

  return (
    <form
      onSubmit={handleSubmit(() =>
        onSubmit({
          doctor_consult: appointment_id,
        })
      )}
    >
      {fields?.map((field, index) => (
        <Flex key={field.id} gap={2}>
          <Flex gap={2} mb={2} flexDirection={"column"} minW={"94%"}>
            <Flex gap={1}>
              <FloatingLabelInput
                label="Medicine"
                name={`drug.${index}.medicine`}
                required
                register={register}
                style={{
                  background: colors.forminput,
                  border: "none",
                }}
                rules={{
                  required: "Medicine is required.",
                }}
              />

              <FloatingLabelInput
                label="Dose"
                name={`drug.${index}.dose`}
                required
                register={register}
                style={{
                  background: colors.forminput,
                  border: "none",
                }}
                rules={{
                  required: "Dose is required.",
                }}
              />

              <FloatingLabelInput
                label="Frequency"
                name={`drug.${index}.frequency`}
                register={register}
                required
                style={{
                  background: colors.forminput,
                  border: "none",
                }}
                rules={{
                  required: "Frequency is required.",
                }}
              />
            </Flex>

            <FloatinglabelTextArea
              flex={1}
              label="Remarks"
              name={`drug.${index}.remarks`}
              required
              register={register}
              style={{
                background: colors.forminput,
                border: "none",
              }}
              rules={{
                required: "Remarks is required.",
              }}
            />
          </Flex>
          <Flex
            justifyContent={"center"}
            flexDirection={"column"}
            gap={2}
            alignItems={"center"}
          >
            {fields.length - 1 === index && index < 10 && (
              <IconButton
                aria-label=""
                icon={<AddIcon color={colors.primary} />}
                variant={"outline"}
                color={colors.primary}
                borderColor={colors.primary}
                w={"1.5"}
                onClick={() => {
                  append({
                    dose: "",
                    frequency: "",
                    medicine: "",
                    remarks: "",
                  });
                }}
              />
            )}
            {fields.length !== 1 && (
              <Button
                type="button"
                variant={"ghost"}
                _hover={{ background: "transparent" }}
                onClick={() => handleRemoveDrug(index)}
              >
                <Icon as={DeleteIcon} fontSize={28} color={colors.error} />
              </Button>
            )}
          </Flex>
        </Flex>
      ))}

      <Button type="submit" isLoading={drugReferralInfoLoading}>
        Save
      </Button>
    </form>
  );
};

export default DrugReferralForm;
