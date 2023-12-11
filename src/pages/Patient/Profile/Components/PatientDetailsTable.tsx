import {
  Box,
  Button,
  Flex,
  FormLabel,
  Grid,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ImageCancelIcon, UploadImageIcon } from "@nepMeds/assets/svgs";
import { DataTable } from "@nepMeds/components/DataTable";
import FormControl from "@nepMeds/components/Form/FormControl";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import SearchInput from "@nepMeds/components/Search";
import TableWrapper from "@nepMeds/components/TableWrapper";
import { useDebounce } from "@nepMeds/hooks/useDebounce";
import {
  useGetPatientDetails,
  useGetPatientDetailsById,
} from "@nepMeds/service/nepmeds-patient-profile";
import { colors } from "@nepMeds/theme/colors";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { columns } from "../../PatientDetail";
import PatientDetailModal from "./PatientDetailModal";
import PatientPrescriptionSkeletion from "./PatientPrescriptionSkeletion";

const PatientDetailsTable = () => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [searchValue, setSearchValue] = useState("");
  const [appointmentId, setAppointmentId] = useState("");

  const { onOpen, onClose, isOpen } = useDisclosure();
  const {
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
    isOpen: isEditModalOpen,
  } = useDisclosure();

  const debouncedValue = useDebounce(searchValue, 500);

  // REACT QUERY
  const { data: tableData, isFetching } = useGetPatientDetails({
    page: pagination.pageIndex,
    page_size: pagination.pageSize,
    search: debouncedValue,
  });
  const { data: patientDetail, isLoading } = useGetPatientDetailsById({
    appointment_id: appointmentId,
  });
  // REACT QUERY ENDS

  const { register, watch, setValue } = useForm();
  const imageWatch = watch("image");

  return (
    <TableWrapper>
      <>
        <ModalComponent
          heading={<>Detail View</>}
          isOpen={isOpen}
          onClose={onClose}
          footer={<></>}
          size={"2xl"}
        >
          {isLoading ? (
            <PatientPrescriptionSkeletion />
          ) : (
            // Todo: find another way to solve this problem
            // patientDetail: IPatientDetailById | undefined
            <PatientDetailModal patientDetail={patientDetail} />
          )}
        </ModalComponent>
        <ModalComponent
          heading={<>Add Lab Report</>}
          isOpen={isEditModalOpen}
          onClose={onEditModalClose}
          footer={
            <>
              <Button variant={"reset"} flex={0.5}>
                Cancel
              </Button>
              <Button flex={0.5}>Add</Button>
            </>
          }
        >
          <>
            <FormLabel
              fontFamily={"500"}
              fontSize={"13px"}
              fontWeight={"Quicksand"}
            >
              Upload your lab reports :
            </FormLabel>
            <FormControl
              name={"image"}
              register={register}
              control={"input"}
              type={"file"}
              id={"image"}
              display={"none"}
              accept={"image/png, image/jpeg"}
              multiple
            />
            <Flex>
              <FormLabel
                htmlFor="image"
                cursor={"pointer"}
                border={`1px dashed ${colors.gray}`}
                width={"76px"}
              >
                <UploadImageIcon />
              </FormLabel>
              <Flex gap={4}>
                {imageWatch &&
                  Object.keys(imageWatch).map(index => (
                    <Flex key={Math.random()}>
                      <Image
                        src={
                          imageWatch &&
                          URL.createObjectURL(
                            imageWatch[index] as unknown as Blob
                          )
                        }
                        width={"76px"}
                        height={"76px"}
                        objectFit={"contain"}
                      />
                      <Box onClick={() => setValue("image", null)}>
                        {/* <Box onClick={() => removeAtIndex(index, imageWatch)}> */}
                        {/* <Box> */}
                        <ImageCancelIcon style={{ cursor: "pointer" }} />
                      </Box>
                    </Flex>
                  ))}
              </Flex>
            </Flex>
          </>
        </ModalComponent>
        <Grid display={"flex"} justifyContent={"space-between"}>
          <Text variant="tableHeading">Appointment Details</Text>
          <SearchInput
            setSearchValue={setSearchValue}
            setPageParams={setPagination}
          />
        </Grid>
        <DataTable
          data={tableData?.results ?? []}
          columns={columns({
            pagination,
            setAppointmentId,
            onOpen,
            onEditModalOpen,
          })}
          isLoading={isFetching}
          pagination={{
            manual: true,
            pageParams: pagination,
            pageCount: tableData?.page_count,
            onChangePagination: setPagination,
          }}
        />
      </>
    </TableWrapper>
  );
};

export default PatientDetailsTable;
