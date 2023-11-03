import { Button, HStack, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { svgs } from "@nepMeds/assets/svgs";
import { DataTable } from "@nepMeds/components/DataTable";
import FormControl from "@nepMeds/components/Form/FormControl";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import * as Yup from "yup";
import {
  useCreateCollege,
  useGetAllCollege
} from "@nepMeds/service/nepmeds-core";
import { FormProvider, useForm } from "react-hook-form";

const defaultValues = { name: "" };
const schema = Yup.object().shape({
  name: Yup.string().required("This field is required")
});

const CollegeTab = ({
  onCloseModal,
  isOpenModal
}: {
  onCloseModal: () => void;
  isOpenModal: boolean;
}) => {
  const formMethods = useForm({ defaultValues, resolver: yupResolver(schema) });
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit
  } = formMethods;

  // React Queries
  const { data: college, isFetching } = useGetAllCollege();
  const { mutateAsync: createCollege, isLoading } = useCreateCollege();
  // React Queries Ends

  const onModalClose = () => {
    onCloseModal();
    reset(defaultValues);
  };
  const onSubmitHandler = async (data: { name: string }) => {
    try {
      await createCollege(data);
      onModalClose();
    } catch (e) {
      console.error(e);
    }
  };

  // TODO: Work in progress: API in Development
  const columns = [
    {
      header: "S.N.",
      accessorFn: (_: any, index: number) => {
        return `${index + 1}.`;
      }
    },
    { header: "Name", accessorKey: "name" }
  ];

  return (
    <>
      <DataTable
        data={college ?? []}
        columns={columns}
        isLoading={isFetching}
      />
      <ModalComponent
        heading={
          <HStack>
            <svgs.logo_small />
            <Text>Add College</Text>
          </HStack>
        }
        isOpen={isOpenModal}
        onClose={onModalClose}
        footer={
          <HStack w={"full"} justifyContent={"flex-end"}>
            <Button variant={"reset"} w={"150px"} onClick={onModalClose}>
              Cancel
            </Button>
            <Button
              w={"150px"}
              isLoading={isLoading}
              onClick={handleSubmit(onSubmitHandler)}
            >
              Create
            </Button>
          </HStack>
        }
      >
        <FormProvider {...formMethods}>
          <FormControl
            control="input"
            label="name"
            name="name"
            register={register}
            required
            error={errors.name?.message ?? ""}
          />
        </FormProvider>
      </ModalComponent>
    </>
  );
};

export default CollegeTab;
