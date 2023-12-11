import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  UseDisclosureProps,
  useDisclosure,
} from "@chakra-ui/react";
import CenterLoader from "@nepMeds/components/Common/Loader";
import Checkbox from "@nepMeds/components/Form/Checkbox";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import NoData from "@nepMeds/components/NoData";
import { removeSeconds } from "@nepMeds/helper/checkTimeRange";
import {
  useDeleteAvailability,
  useGetAvailabilityDetails,
} from "@nepMeds/service/nepmeds-doctor-availability";
import { formatDateToString } from "@nepMeds/utils/TimeConverter/timeConverter";
import { useState } from "react";
import { useForm } from "react-hook-form";
const AvailabilityDetails = ({
  dateRange,
  detailModal: { isOpen: isViewModalOpen, onClose: onViewModalClose },
}: {
  dateRange: {
    from_time: string;
    to_time: string;
    id: string;
  };
  detailModal: UseDisclosureProps;
}) => {
  const { register, getValues, handleSubmit, watch, control } = useForm<{
    availability_date: string;
    is_all_related_child: boolean;
  }>();
  const [id, setId] = useState("");

  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();

  const { mutateAsync, isLoading: isDeleteLoading } = useDeleteAvailability();

  const { data, isLoading } = useGetAvailabilityDetails({
    enabled: !!isViewModalOpen,
    id: dateRange.id,
    date: watch("availability_date") ?? dateRange.from_time,
  });

  const handleSubmitForm = async () => {
    await mutateAsync({
      is_all_related_child: getValues("is_all_related_child"),
      id: +id,
    }).then(() => onDeleteModalClose());
  };

  return (
    <div>
      <ModalComponent
        heading={<>Delete Availability</>}
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalClose}
        footer={
          <HStack w="100%" gap={3}>
            <Button
              flex={1}
              variant={"primaryOutline"}
              onClick={onViewModalClose}
            >
              Cancel
            </Button>
            <Button
              flex={1}
              onClick={handleSubmit(handleSubmitForm)}
              isLoading={isDeleteLoading}
            >
              Yes
            </Button>
          </HStack>
        }
      >
        <Box>Are you sure you want to delete this availability?</Box>
      </ModalComponent>

      {isViewModalOpen && (
        <ModalComponent
          size="2xl"
          isOpen={isViewModalOpen}
          onClose={onViewModalClose ?? (() => {})}
          heading={<>Availability Dates</>}
          footer={<></>}
        >
          <Box mt={1}>
            <form>
              <FloatingLabelInput
                pt={2}
                mb={2}
                name="availability_date"
                label="Date"
                register={register}
                type="date"
                min={formatDateToString(new Date(dateRange.from_time))}
                max={formatDateToString(new Date(dateRange.to_time))}
                defaultValue={formatDateToString(new Date(dateRange.from_time))}
                _hover={{ cursor: "pointer" }}
              />

              {isLoading ? (
                <CenterLoader align={"center"} mt={5} />
              ) : (
                data?.child_availability?.length && (
                  <Box mt={3}>
                    <Text>Time (Select Time to Delete)</Text>
                    <Flex flexWrap={"wrap"}>
                      {data?.child_availability?.map(item => (
                        <Button
                          key={item.id}
                          variant={"primaryOutlineFilled"}
                          borderRadius={3}
                          height={"34px"}
                          m={1}
                          onClick={() => {
                            setId(item.id?.toString());
                            onDeleteModalOpen();
                          }}
                        >
                          {removeSeconds(item?.from_time)} -
                          {removeSeconds(item?.to_time)}
                        </Button>
                      ))}
                    </Flex>
                  </Box>
                )
              )}

              {data?.child_availability?.length ? (
                <Checkbox
                  label="Do you want to delete all the instances"
                  name={"is_all_related_child"}
                  control={control}
                  justifyContent={"center"}
                  alignItems={"center"}
                />
              ) : (
                <NoData />
              )}
            </form>
          </Box>
        </ModalComponent>
      )}
    </div>
  );
};

export default AvailabilityDetails;
