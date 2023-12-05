import {
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { DataTable } from "@nepMeds/components/DataTable";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import {
  useCreateHospital,
  useDeleteHospital,
  useGetAllHospitalDetails,
  useGetHospitalById,
  useUpdateHospital,
} from "@nepMeds/service/nepmeds-hospital-list";
import { svgs } from "@nepMeds/assets/svgs";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SkeletonControl from "@nepMeds/components/Loader";
import HospitalForm from "./Component/HospitalForm";
import { hospitalColumns } from "@nepMeds/components/DataTable/Columns/Admin/MasterData/Hospital";
import { colors } from "@nepMeds/theme/colors";
import { SearchIcon } from "@chakra-ui/icons";
import { useDebounce } from "@nepMeds/hooks/useDebounce";

const defaultValues = {
  name: "",
  district: "",
  province: "",
};

const schema = yup.object().shape({
  name: yup.string().required("This field is required"),
  district: yup.string().required("This field is required"),
  province: yup.string().required("This field is required"),
});

const HospitalTab = ({
  onCloseHospitalModal,
  isOpenHospitalModal,
  onOpenHospitalModal,
}: {
  onCloseHospitalModal: () => void;
  isOpenHospitalModal: boolean;
  onOpenHospitalModal: () => void;
}) => {
  const formMethods = useForm({ defaultValues, resolver: yupResolver(schema) });
  const { reset, handleSubmit } = formMethods;

  const onModalClose = () => {
    onCloseHospitalModal();
    onDeleteModalClose();
    setIsEdit(false);
    setId("");
    reset(defaultValues);
  };

  const [paginationParams, setPaginationParams] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [searchValue, setSearchValue] = useState("");
  const [id, setId] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const {
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
    isOpen: isDeleteModalOpen,
  } = useDisclosure();

  const debouncedInputValue = useDebounce(searchValue, 500);

  // React Query
  const { data: tableData, isFetching } = useGetAllHospitalDetails({
    page: paginationParams.pageIndex + 1,
    page_size: paginationParams.pageSize,
    search: debouncedInputValue,
  });
  const { mutateAsync: createHospital, isLoading } = useCreateHospital();
  const { mutateAsync: updateHospital, isLoading: isUpdating } =
    useUpdateHospital();
  const { data: hospital, isFetching: isFetchingHospital } =
    useGetHospitalById(id);
  const { mutateAsync: deleteHospital, isLoading: isDeleting } =
    useDeleteHospital();
  // React Query Ends

  const onSubmitHandler = async (data: {
    name: string;
    district: string;
    province: string;
  }) => {
    try {
      if (isEdit) {
        await updateHospital({ id, ...data });
      } else {
        await createHospital(data);
      }
      onModalClose();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isEdit && hospital) {
      reset({
        name: hospital?.name,
        province: hospital?.province,
        district: hospital?.district,
      });
    }
  }, [id, hospital]);

  return (
    <>
      {/* ADD and Edit modal */}
      <ModalComponent
        heading={
          <HStack>
            <svgs.logo_small />
            <Text>{isEdit ? "Edit " : "Add "}Hospital</Text>
          </HStack>
        }
        isOpen={isOpenHospitalModal}
        onClose={onModalClose}
        footer={
          isFetchingHospital ? (
            <></>
          ) : (
            <HStack w={"full"} justifyContent={"flex-end"}>
              <Button variant={"reset"} flex={1} onClick={onModalClose}>
                Cancel
              </Button>
              <Button
                flex={1}
                isLoading={isLoading || isUpdating}
                onClick={handleSubmit(onSubmitHandler)}
              >
                {isEdit ? "Edit" : "Add"}
              </Button>
            </HStack>
          )
        }
      >
        {isFetchingHospital ? (
          <Flex gap={6} direction="column">
            <SkeletonControl variant="skeleton" height={"30px"} length={3} />
          </Flex>
        ) : (
          <FormProvider {...formMethods}>
            <HospitalForm formMethods={formMethods} />
          </FormProvider>
        )}
      </ModalComponent>
      {/* ADD and Edit modal ends*/}

      {/* Delete modal */}
      <ModalComponent
        heading={
          <HStack>
            <svgs.logo_small />
            <Text>Delete Hospital</Text>
          </HStack>
        }
        isOpen={isDeleteModalOpen}
        onClose={onModalClose}
        footer={
          <HStack w={"full"} justifyContent={"flex-end"}>
            <Button variant={"reset"} flex={1} onClick={onModalClose}>
              Cancel
            </Button>
            <Button
              flex={1}
              isLoading={isDeleting}
              onClick={async () => {
                await deleteHospital(id);
                onDeleteModalClose();
              }}
            >
              Delete
            </Button>
          </HStack>
        }
      >
        <Text textAlign={"center"}>
          Are you sure you want to delete the hospital?
        </Text>
      </ModalComponent>
      {/* Delete Modal Ends */}
      <Grid display={"flex"} justifyContent={"space-between"}>
        <GridItem alignSelf={"end"}>
          <Text fontWeight="medium" fontSize={"2xl"}>
            Hospital
          </Text>
        </GridItem>
        <GridItem display={"flex"}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color={colors.black} boxSize={3} />
            </InputLeftElement>
            <Input
              placeholder="Search"
              onChange={e => setSearchValue(e.target.value)}
            />
          </InputGroup>
        </GridItem>
      </Grid>

      <DataTable
        data={tableData?.results ?? []}
        columns={hospitalColumns({
          paginationParams,
          setIsEdit,
          setId,
          onOpenHospitalModal,
          onDeleteModalOpen,
        })}
        isLoading={isFetching}
        pagination={{
          manual: true,
          pageParams: paginationParams,
          pageCount: tableData?.page_count,
          onChangePagination: setPaginationParams,
        }}
      />
    </>
  );
};

export default HospitalTab;
