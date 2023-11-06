import { Button, Flex, HStack, Text, useDisclosure } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { svgs } from "@nepMeds/assets/svgs";
import { DataTable } from "@nepMeds/components/DataTable";
import FormControl from "@nepMeds/components/Form/FormControl";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import * as Yup from "yup";
import { useCreateCollege } from "@nepMeds/service/nepmeds-core";
import { FormProvider, useForm } from "react-hook-form";
import { columns } from "./collegeColumn";
import {
  useDeleteCollege,
  useGetAllCollegeDetails,
  useGetCollegeById,
  useUpdateCollege
} from "@nepMeds/service/nepmeds-college";
import { useState, useEffect } from "react";
import { toastFail } from "@nepMeds/components/Toast";
import SkeletonControl from "@nepMeds/components/Loader";
const defaultValues = { name: "" };
const schema = Yup.object().shape({
  name: Yup.string().required("This field is required")
});

const CollegeTab = ({
  onCloseModal,
  isOpenModal,
  onOpenCollegeModal
}: {
  onCloseModal: () => void;
  isOpenModal: boolean;
  onOpenCollegeModal: () => void;
}) => {
  const [id, setId] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const formMethods = useForm({ defaultValues, resolver: yupResolver(schema) });
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit
  } = formMethods;

  const {
    isOpen: isDeleteModalOpen,
    onClose: onCloseDeleteModal,
    onOpen: onOpenDeleteModal
  } = useDisclosure();

  const [paginationParams, setPaginationParams] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  // React Queries
  const { data: tableData, isFetching: isFetchingCollegeDetails } =
    useGetAllCollegeDetails({
      page: paginationParams.pageIndex + 1,
      page_size: paginationParams.pageSize
    });

  const { mutateAsync: createCollege, isLoading } = useCreateCollege();

  const { data: collegeById, isFetching: isFetchingCollege } =
    useGetCollegeById({ id });
  const { mutateAsync: updateCollege, isLoading: isUpdating } =
    useUpdateCollege();
  const { mutateAsync: deleteCollege, isLoading: isDeleting } =
    useDeleteCollege();
  // React Queries Ends

  const onModalClose = () => {
    onCloseModal();
    reset(defaultValues);
    setIsEdit(false);
  };
  const onSubmitHandler = async (data: { name: string }) => {
    try {
      if (isEdit) {
        await updateCollege({ id: +id, ...data });
      } else {
        await createCollege(data);
      }
      onModalClose();
    } catch (e) {
      toastFail("Failed to Add College");
    }
  };

  useEffect(() => {
    if (isEdit && collegeById) {
      reset({
        name: collegeById?.name
      });
    }
  }, [id, collegeById]);

  return (
    <>
      <DataTable
        data={tableData?.results ?? []}
        columns={columns({
          onOpenDeleteModal,
          setId,
          setIsEdit,
          onOpenCollegeModal
        })}
        isLoading={isFetchingCollegeDetails}
        pagination={{
          manual: true,
          pageParams: paginationParams,
          pageCount: tableData?.page_count,
          onChangePagination: setPaginationParams
        }}
      />

      {/* Add or Edit College */}
      <ModalComponent
        isOpen={isOpenModal}
        onClose={onModalClose}
        size="md"
        heading={
          <HStack>
            <svgs.logo_small />
            <Text>{`${isEdit ? "Edit" : "Add"}`} College</Text>
          </HStack>
        }
        footer={
          isFetchingCollege ? (
            <></>
          ) : (
            <HStack w={"full"} justifyContent={"flex-end"}>
              <Button variant={"reset"} flex={1} onClick={onModalClose}>
                Cancel
              </Button>
              <Button
                flex={1}
                type="submit"
                isLoading={isLoading || isUpdating}
                onClick={handleSubmit(onSubmitHandler)}
              >
                {`${isEdit ? "Edit" : "Add"}`}
              </Button>
            </HStack>
          )
        }
      >
        {isFetchingCollege ? (
          <Flex gap={6} direction="column">
            <SkeletonControl variant="skeleton" height={"30px"} length={3} />
          </Flex>
        ) : (
          <FormProvider {...formMethods}>
            <FormControl
              control="input"
              label="Name"
              name="name"
              register={register}
              required
              error={errors.name?.message ?? ""}
            />
          </FormProvider>
        )}
      </ModalComponent>

      <ModalComponent
        size="sm"
        isOpen={isDeleteModalOpen}
        onClose={onCloseDeleteModal}
        heading={
          <HStack>
            <svgs.logo_small />
            <Text>Delete College</Text>
          </HStack>
        }
        footer={
          <HStack w="100%" gap={3}>
            <Button
              variant={"primaryOutline"}
              onClick={onCloseDeleteModal}
              flex={1}
            >
              Cancel
            </Button>
            <Button
              flex={1}
              variant={"reset"}
              isLoading={isDeleting}
              onClick={async () => {
                await deleteCollege({ id });
                onCloseDeleteModal();
              }}
            >
              Delete
            </Button>
          </HStack>
        }
      >
        <Text textAlign={"center"}>
          Are you sure you want to delete the college?
        </Text>
      </ModalComponent>
    </>
  );
};

export default CollegeTab;
