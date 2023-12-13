import { useEffect, useState } from "react";
import { useAddPrescription } from "../usePrescriptionForm";
import { useFieldArray } from "react-hook-form";
import {
  Flex,
  IconButton,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Divider,
} from "@chakra-ui/react";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import FloatinglabelTextArea from "@nepMeds/components/Form/FloatingLabeltextArea";
import { colors } from "@nepMeds/theme/colors";
import { CgAddR } from "react-icons/cg";
import {
  IPrescriptionInfo,
  useDeleteDrugReferralInfo,
} from "@nepMeds/service/nepmeds-prescription";

const BetaDrug = ({
  appointment_id,
  drug_referral,
  follow_up,
  setTabIndex,
  isEditable,
}: {
  // If appointment_id is undefined, then it is a follow up
  appointment_id?: string;
  follow_up?: string;
  drug_referral: IPrescriptionInfo["drug_referral"] | undefined;
  setTabIndex: React.Dispatch<React.SetStateAction<number>>;
  isEditable?: boolean;
}) => {
  const {
    drugReferralInfoForm: { handleSubmit, register, control, setValue },
    drugReferralInfoLoading,
    onSubmitDrugReferralInfo: onSubmit,
  } = useAddPrescription();
  const [tabIdx, setTabIdx] = useState(0);
  const { mutate, isLoading: deleteLoading } = useDeleteDrugReferralInfo();

  const { fields, append, remove } = useFieldArray({ control, name: "drug" });

  const handleRemoveDrug = (index: number) => {
    if (drug_referral && drug_referral[index]) {
      const { id } = drug_referral[index];
      mutate(id ?? "");
    }
    remove(index);
    setTabIdx(index === 0 ? 0 : index - 1);
  };

  useEffect(() => {
    if (drug_referral?.length && drug_referral.length > 0) {
      setValue("drug", drug_referral);
    }
  }, [drug_referral]);

  return (
    <div>
      <form
        onSubmit={handleSubmit(() =>
          onSubmit({
            doctor_consult: appointment_id ?? "",
            follow_up: follow_up ?? "",
          }).then(() => setTabIndex(prev => prev + 1))
        )}
      >
        <Tabs
          index={tabIdx}
          onChange={index => setTabIdx(index)}
          variant={"enclosed"}
          p={0}
        >
          <TabList
            alignItems={"center"}
            overflowY="hidden"
            gap={1}
            sx={{
              scrollbarWidth: "none",
              "::-webkit-scrollbar": {
                display: "none",
              },
            }}
            p={0}
          >
            {fields?.map((field, index) => (
              <Tab key={field.id} fontSize={"sm"} flexShrink={0}>
                Drug {index + 1}
              </Tab>
            ))}
            {fields?.length < 10 && isEditable && (
              <IconButton
                aria-label=""
                icon={<CgAddR color={colors.primary} />}
                variant={"outline"}
                my={1}
                color={colors.primary}
                borderColor={colors.primary}
                onClick={() => {
                  setTabIdx(fields.length);
                  append({
                    dose: "",
                    frequency: "",
                    medicine: "",
                    remarks: "",
                  });
                }}
              />
            )}
          </TabList>

          <TabPanels>
            {fields?.map((field, index) => (
              <TabPanel key={field.id} gap={2} padding={0} paddingTop={2}>
                <Flex gap={2} mb={2} flexDirection={"column"}>
                  <FloatingLabelInput
                    label="Medicine"
                    name={`drug.${index}.medicine`}
                    register={register}
                    isDisabled={!isEditable}
                  />

                  <FloatingLabelInput
                    label="Dose"
                    name={`drug.${index}.dose`}
                    register={register}
                    isDisabled={!isEditable}
                  />

                  <FloatingLabelInput
                    label="Frequency"
                    name={`drug.${index}.frequency`}
                    register={register}
                    isDisabled={!isEditable}
                  />

                  <FloatinglabelTextArea
                    flex={1}
                    label="Remarks"
                    name={`drug.${index}.remarks`}
                    isDisabled={!isEditable}
                    register={register}
                    style={{
                      background: colors.forminput,
                      border: "none",
                    }}
                  />
                </Flex>
                <Divider />
                {isEditable && (
                  <Flex
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    mt={1}
                  >
                    <Button
                      variant={"outline"}
                      color={colors.primary}
                      borderColor={colors.primary}
                      fontWeight={"bold"}
                      onClick={() => setTabIndex(prev => prev + 1)}
                    >
                      Skip
                    </Button>
                    {fields?.length > 1 && (
                      <Button
                        onClick={() => {
                          handleRemoveDrug(index);
                        }}
                        variant={"outline"}
                        color={"red"}
                        borderColor={"red"}
                        isLoading={deleteLoading}
                      >
                        Remove
                      </Button>
                    )}
                    <Button type="submit" isLoading={drugReferralInfoLoading}>
                      Next
                    </Button>
                  </Flex>
                )}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </form>
    </div>
  );
};

export default BetaDrug;
