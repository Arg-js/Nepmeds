import {
  HStack,
  IconButton,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { svgs } from "@nepMeds/assets/svgs";
import { DataTable } from "@nepMeds/components/DataTable";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import FloatinglabelTextArea from "@nepMeds/components/Form/FloatingLabeltextArea";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import { Symptom, useGetSymptoms } from "@nepMeds/service/nepmeds-symptoms";
import { colors } from "@nepMeds/theme/colors";
import { CellContext } from "@tanstack/react-table";
import { Fragment, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const Symptoms = () => {
  const { data: symptomList = [] } = useGetSymptoms();
  const [symptomData, setSymptomData] = useState<Symptom | null>(null);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const formMethods = useForm({
    defaultValues: {
      name: "",
      keyword: "",
    },
  });

  const columns = [
    {
      header: "S.N.",
      accessorFn: (_cell: CellContext<Symptom, any>, index: number) => {
        return index + 1;
      },
    },
    {
      header: "Symptom Name",
      accessorKey: "name",
    },
    {
      header: "Keyword",
      accessorKey: "keyword",
    },
    {
      header: "Actions",
      cell: (cell: CellContext<any, any>) => {
        return (
          <HStack justifyContent="center">
            <IconButton
              aria-label="edit"
              variant="ghost"
              size="sm"
              w="auto"
              onClick={() => {
                setSymptomData(cell.row.original);
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

  return (
    <Fragment>
      <DataTable columns={columns} data={symptomList} />

      <ModalComponent
        size="sm"
        isOpen={isOpen}
        onClose={onClose}
        heading={
          <HStack>
            <svgs.logo_small />
            <Text>{symptomData ? "Edit" : "Add"} Symptoms</Text>
          </HStack>
        }
        primaryText="Save"
        secondaryText="Discard"
      >
        <VStack>
          <FormProvider {...formMethods}>
            <FloatingLabelInput
              label="Symptom"
              name="name"
              register={formMethods.register}
            />

            <FloatinglabelTextArea
              label="Keywords"
              name="keyword"
              register={formMethods.register}
            />
          </FormProvider>
        </VStack>
      </ModalComponent>
    </Fragment>
  );
};

export default Symptoms;
