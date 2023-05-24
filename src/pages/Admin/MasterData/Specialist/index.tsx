import { SearchIcon } from "@chakra-ui/icons";
import {
  Badge,
  Button,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { svgs } from "@nepMeds/assets/svgs";
import { DataTable } from "@nepMeds/components/DataTable";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import MultiSelect from "@nepMeds/components/Form/MultiSelect";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import {
  Specialization,
  useSaveSpecialization,
  useSpecializationData,
} from "@nepMeds/service/nepmeds-specialization";
import { useGetSymptoms } from "@nepMeds/service/nepmeds-symptoms";
import { colors } from "@nepMeds/theme/colors";
import { CellContext } from "@tanstack/react-table";
import { Fragment, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Symptom name is required!"),
  keyword: yup.string().required("Symptom keyword is required"),
});

const Specializations = () => {
  const { data: symptomList = [] } = useGetSymptoms();
  const { data: specialization = [] } = useSpecializationData();
  const saveSpecializationAction = useSaveSpecialization();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [searchFilter, setSearchFilter] = useState("");

  const symptomsOptions = symptomList.map(s => ({
    label: s.name,
    value: s.id,
  }));

  const formMethods = useForm({
    defaultValues: {
      id: null as number | null,
      name: "",
      symptom: [] as { label: string; value: string }[],
    },
    resolver: yupResolver(schema),
  });

  const columns = [
    {
      header: "S.N.",
      accessorFn: (_cell: CellContext<any, any>, index: number) => {
        return index + 1;
      },
    },
    {
      header: "Specialization Name",
      accessorKey: "name",
    },
    {
      header: "Symptom",
      cell: (cell: CellContext<Specialization, any>) => {
        return (
          <HStack>
            {cell.row.original.symptom.map(s => (
              <Badge key={s.keyword} textTransform="initial" fontWeight="light">
                {s.keyword}
              </Badge>
            ))}
          </HStack>
        );
      },
    },
    {
      header: "Actions",
      cell: (cell: CellContext<Specialization, any>) => {
        return (
          <HStack justifyContent="center">
            <IconButton
              aria-label="edit"
              variant="ghost"
              size="sm"
              w="auto"
              onClick={() => {
                formMethods.reset({
                  ...cell.row.original,
                  symptom: cell.row.original.symptom.map(s => ({
                    label: s.name,
                    value: s.id.toString(),
                  })),
                });
                onOpen();
              }}
            >
              <AiOutlineEdit size={20} fill={colors.blue_100} />
            </IconButton>
            <IconButton aria-label="delete" variant="ghost" size="sm" w="auto">
              <AiOutlineDelete size={20} fill={colors.red} />
            </IconButton>
          </HStack>
        );
      },
    },
  ];

  const onSaveSpecialization = async () => {
    try {
      const isValid = formMethods.trigger();
      if (!isValid) return;

      await saveSpecializationAction.mutateAsync({
        id: formMethods.getValues("id")?.toString() || null,
        name: formMethods.getValues("name"),
        consultation_fees: "kjh",
        symptom: formMethods
          .getValues("symptom")
          .map(s => s.value)
          .join(""),
      });
      onClose();
      toastSuccess("Specialization saved successfully!");
    } catch (error) {
      toastFail("Failed to save Specialization!");
    }
  };

  return (
    <Fragment>
      <HStack justifyContent="space-between">
        <Text fontWeight="medium">Specializations</Text>

        <HStack>
          <InputGroup w="auto">
            <InputLeftElement pointerEvents="none" h={8}>
              <SearchIcon color="gray.300" boxSize={3} />
            </InputLeftElement>
            <Input
              w={40}
              h={8}
              onChange={({ target: { value } }) => setSearchFilter(value)}
            />
          </InputGroup>

          <Button
            size="sm"
            w="auto"
            variant="outline"
            fontWeight="light"
            onClick={() => {
              onOpen();
              formMethods.reset({});
            }}
          >
            Add Specialization
          </Button>
        </HStack>
      </HStack>

      <DataTable
        columns={columns}
        data={specialization}
        filter={{ globalFilter: searchFilter }}
      />

      <ModalComponent
        size="sm"
        isOpen={isOpen}
        onClose={onClose}
        heading={
          <HStack>
            <svgs.logo_small />
            <Text>
              {formMethods.getValues("name") ? "Edit" : "Add"} Specialization
            </Text>
          </HStack>
        }
        footer={
          <HStack w="100%" gap={3}>
            <Button variant="outline" onClick={onClose} flex={1}>
              Discard
            </Button>
            <Button
              flex={1}
              onClick={onSaveSpecialization}
              background={colors.primary}
              color={colors.white}
              isLoading={saveSpecializationAction.isLoading}
            >
              Save
            </Button>
          </HStack>
        }
      >
        <VStack>
          <FormProvider {...formMethods}>
            <FloatingLabelInput
              label="Specialization"
              name="name"
              register={formMethods.register}
            />

            <MultiSelect
              placeholder=""
              label="Symptoms"
              name="symptom"
              required
              options={symptomsOptions}
              selectControl={formMethods.control}
            />
          </FormProvider>
        </VStack>
      </ModalComponent>
    </Fragment>
  );
};

export default Specializations;
