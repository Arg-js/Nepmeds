import { Box, Flex, Grid, GridItem, Text, Button } from "@chakra-ui/react";
import { BackArrowIcon } from "@nepMeds/assets/svgs";
import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";
import { colors } from "@nepMeds/theme/colors";
import "react-calendar/dist/Calendar.css";
import "@nepMeds/assets/styles/reactCalender.css";
import "@nepMeds/assets/styles/Patient/index.css";
import Header from "@nepMeds/pages/Patient/Section/Header";
import { useParams } from "react-router-dom";
import {
  IDoctorListById,
  useGetDoctorListById,
} from "@nepMeds/service/nepmeds-patient-doctorList";
import { useGetAvailability } from "@nepMeds/service/nepmeds-patient-doctor-availability";
import { useState } from "react";
import { formatDateToString } from "@nepMeds/utils/TimeConverter/timeConverter";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PatientDetail, { defaultValues } from "./components/PatientDetail";
import DoctorAvailability from "./components/DoctorAvailability";
import TransactionBox from "@nepMeds/components/Payment/TransactionBox";
import { useForm } from "react-hook-form";
import Input from "@nepMeds/components/Form/Input";
import {
  IDiscountBasicDetails,
  useGetDiscountByCode,
} from "@nepMeds/service/nepmeds-discount";
import {
  calcDiscountedAmount,
  DiscountDetailSkeleton,
  DiscountDetailsSection,
} from "./components/DiscountDetails";
import DoctorDetailView from "@nepMeds/components/DocProfile/DoctorDetailView";
const currentDate = formatDateToString(new Date());

const DoctorDetails = () => {
  const { id = "" } = useParams();
  const [formState, setFormState] = useState(0);
  const [date, setDate] = useState(new Date());
  const [selectedAvailability, setSelectedAvailability] = useState<number[]>(
    []
  );
  const [discountDetails, setDiscountDetails] =
    useState<IDiscountBasicDetails | null>(null);

  // REACT QUERIES
  const { data: doctorList } = useGetDoctorListById({
    id: +id,
    target_date: formatDateToString(date) || currentDate,
  });
  const { data: availability, isFetching: isAvailabilityFetching } =
    useGetAvailability({
      id: +id,
      target_date: formatDateToString(date) || currentDate,
    });
  const {
    mutateAsync: discountCode,
    isLoading,
    isSuccess,
  } = useGetDiscountByCode();
  // REACT QUERIES END

  const bookedDates = availability?.filter(data => {
    return selectedAvailability.includes(data.id);
  });

  const schema = Yup.object({
    full_name: Yup.string().required("This field is required"),
    // TODO: need to make sure if this is required or not
    // age: Yup.number()
    //   .max(115, "age must be at most 115 years")
    //   .positive("age must be greater than zero")
    //   .typeError("age must be a number"),
    symptoms: Yup.array()
      .required("This field is required")
      .min(1, "This field is required"),
  });
  const formProps = useForm({ defaultValues, resolver: yupResolver(schema) });
  const couponCode = formProps.watch("coupon");

  const { bookingFee, discountAmount, discountedAmount } = calcDiscountedAmount(
    {
      doctorInfo: doctorList,
      discountDetails,
      selectedAvailability,
    }
  );

  const onDiscountCouponApplied = async () => {
    try {
      const response = await discountCode({
        code: couponCode,
        doctor_id: +id,
      });
      setDiscountDetails(response.data.data);
    } catch (e) {
      setDiscountDetails(null);
      formProps.setValue("coupon", "");
    }
  };

  return (
    <Box bg={colors.white} height={"100vh"}>
      <Header />
      <WrapperBox>
        <Grid
          templateColumns={{ lg: "repeat(3,1fr)", xl: "repeat(12,1fr)" }}
          justifyContent={"center"}
          gap={5}
        >
          <GridItem colSpan={{ lg: 2, xl: 7 }}>
            <DoctorDetailView id={id} />
          </GridItem>

          <GridItem colSpan={{ lg: 1, xl: 5 }}>
            {formState === 0 && (
              <DoctorAvailability
                setFormState={setFormState}
                setDate={setDate}
                date={date}
                isAvailabilityFetching={isAvailabilityFetching}
                availability={availability}
                selectedAvailability={selectedAvailability}
                setSelectedAvailability={setSelectedAvailability}
              />
            )}
            {bookedDates && formState === 1 && (
              <PatientDetail
                doctorList={doctorList}
                bookedDates={bookedDates}
                setFormState={setFormState}
                formProps={formProps}
              />
            )}
            {formState === 2 && (
              <WrapperBox
                backgroundColor={colors.white}
                border={`2px solid ${colors.gray_border}`}
                style={{
                  px: { base: "0", md: "2", xl: "4" },
                  py: 4,
                  height: "auto",
                  borderTopRadius: 3,
                }}
              >
                <>
                  <Flex gap={4} alignItems={"center"}>
                    <BackArrowIcon
                      cursor={"pointer"}
                      onClick={() => setFormState(1)}
                    />
                    <Text
                      fontWeight={600}
                      fontSize={"md"}
                      color={colors.dark_blue}
                    >
                      Please choose your payment method
                    </Text>
                  </Flex>

                  {/* Discount Code*/}
                  <Flex direction={"column"} gap={3} mt={4}>
                    <Text variant={"small600"}>Promo Codes</Text>
                    <Flex alignItems={"center"} gap={2}>
                      <Input
                        name={"coupon"}
                        register={formProps.register}
                        placeholder={"Enter Promo Code"}
                      />
                      <Button
                        height={"40px"}
                        borderRadius={"5px"}
                        onClick={onDiscountCouponApplied}
                      >
                        Apply
                      </Button>
                    </Flex>
                    {isLoading ? (
                      <DiscountDetailSkeleton />
                    ) : (
                      isSuccess && (
                        <DiscountDetailsSection
                          bookingFee={bookingFee}
                          discountAmount={discountAmount}
                          discountedAmount={discountedAmount}
                          clearDiscount={() => {
                            formProps.setValue("coupon", "");
                            setDiscountDetails(null);
                          }}
                        />
                      )
                    )}
                  </Flex>
                  {/* Discount Code Ends */}

                  <Text variant={"small600"} mt={8} mb={4}>
                    Select Payment Method
                  </Text>

                  <TransactionBox
                    appointmentData={{
                      ...formProps.getValues(),
                      availabilities: selectedAvailability,
                      total_amount_paid:
                        discountedAmount ||
                        (doctorList?.schedule_rate
                          ? +doctorList?.schedule_rate
                          : 0) * selectedAvailability.length,
                      symptoms: formProps
                        .getValues()
                        ?.symptoms.map(({ value }) => +value),
                      old_report_file:
                        formProps.getValues()?.old_report_file?.[0],
                      doctor: doctorList?.id as number,
                    }}
                    doctorInfo={doctorList as IDoctorListById}
                  />
                </>
              </WrapperBox>
            )}
          </GridItem>
        </Grid>
      </WrapperBox>
    </Box>
  );
};

export default DoctorDetails;
