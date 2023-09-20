import { Box, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { BackArrowIcon } from "@nepMeds/assets/svgs";
import CenterLoader from "@nepMeds/components/Common/Loader";
import { DataTable } from "@nepMeds/components/DataTable";
import { rateHistoryColumn } from "@nepMeds/components/DataTable/Columns/rateColumn";
import PaymentAmountBox from "@nepMeds/components/Payment/PaymentRateBox";
import BoxWrapper from "@nepMeds/components/Wrapper/BoxWrapper";
import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";
import {
  useGetDoctorDetailRateHistory,
  useGetPaymentHistory,
} from "@nepMeds/service/nepmeds-payment";
import { colors } from "@nepMeds/theme/colors";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const RateHistory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { data, isLoading: historyLoading } = useGetPaymentHistory({
    id: id?.toString() ?? "",
    page_no: pageIndex + 1,
    page_size: pageSize,
  });
  const { data: doctorDetail, isLoading: docDetailLoading } =
    useGetDoctorDetailRateHistory({
      id: id?.toString() ?? "",
    });

  if (historyLoading || docDetailLoading) return <CenterLoader />;

  return (
    <div>
      <BoxWrapper>
        <Flex
          justifyContent={"start"}
          alignContent={"center"}
          my={2}
          _hover={{ cursor: "pointer" }}
          w={"150px"}
          as={"button"}
          onClick={() => {
            navigate(NAVIGATION_ROUTES.DOCTOR_LIST_PAYMENT, {
              state: {
                status: (location.state as { status: string | null })?.status,
              },
            });
          }}
        >
          <Icon as={BackArrowIcon} fontSize={"xl"} />
          <Text ml={5} fontWeight={"semibold"}>
            Go Back
          </Text>
        </Flex>
        <Flex justifyContent={"space-between"} mt={1}>
          <Flex gap={8}>
            {doctorDetail?.profile_picture && (
              <Image
                src={doctorDetail?.profile_picture}
                w={"120px"}
                h={"120px"}
              />
            )}
            <Box mt={4}>
              <Text
                fontWeight={"700"}
                fontSize={"26.8085px"}
                lineHeight={"32px"}
                color={colors.dark_1}
                mb={"4px"}
              >
                {`${doctorDetail?.name} (${doctorDetail?.title})`}
              </Text>
              <Box display={"flex"} gap={120} mt={6}>
                <Flex gap={{ base: 3, xl: 0 }}>
                  <Text
                    fontWeight={"500"}
                    fontSize={"sm"}
                    letterSpacing={"0.4px"}
                    color={"#4D4D4D"}
                    flexBasis={{ base: "18%", xl: "24%" }}
                  >
                    Experience
                  </Text>

                  <Text
                    fontWeight={"500"}
                    fontSize={"sm"}
                    color={colors?.gray_700}
                  >
                    :&nbsp;{doctorDetail?.total_experience} Years
                  </Text>
                </Flex>
                <Flex gap={{ base: 3, xl: 0 }}>
                  <Text
                    fontWeight={"500"}
                    fontSize={"sm"}
                    letterSpacing={"0.4px"}
                    color={"#4D4D4D"}
                    flexBasis={{ base: "18%", xl: "24%" }}
                  >
                    Specialization
                  </Text>

                  <Text
                    fontWeight={"500"}
                    fontSize={"sm"}
                    color={colors?.black}
                  >
                    :&nbsp;
                    {doctorDetail?.specialization_names
                      ?.map(s => s.name)
                      .join(", ")}
                  </Text>
                </Flex>
              </Box>
            </Box>
          </Flex>
          <PaymentAmountBox
            isPending={false}
            data={data?.results?.find(e => e.is_active_amount)}
          />
        </Flex>
      </BoxWrapper>

      <BoxWrapper>
        <DataTable
          columns={rateHistoryColumn({ pageIndex, pageSize })}
          data={data?.results ?? []}
          pagination={{
            manual: true,
            pageParams: { pageIndex, pageSize },
            pageCount: data?.page_count,
            onChangePagination: setPagination,
          }}
        />
      </BoxWrapper>
    </div>
  );
};

export default RateHistory;
