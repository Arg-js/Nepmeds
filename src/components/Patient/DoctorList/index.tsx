import { Flex, Text, Card, Box, Image } from "@chakra-ui/react";
import {
  LocationIcon,
  PayementIcon,
  StethoscopeIcon,
} from "@nepMeds/assets/svgs";
import { Specialization } from "@nepMeds/service/nepmeds-specialization";
import { colors } from "@nepMeds/theme/colors";
import { useMemo } from "react";

const DoctorListCard: React.FC<{ data: Specialization[] }> = ({ data }) => {
  const doctorDetails = useMemo(
    () => [
      {
        id: 1,
        icon: <LocationIcon />,
        description: "Naxal, Kathmandu",
      },
      {
        id: 2,
        icon: <StethoscopeIcon />,
        description: "10 years experience",
      },
      {
        id: 3,
        icon: <PayementIcon />,
        description: "Rs. 500",
      },
    ],
    [data]
  );
  return (
    <Flex gap={5} my={10}>
      <Card variant={"elevated"}>
        <Flex>
          <Box width={"296px"} height={"215px"}>
            <Image src="/src/assets/images/doctor.png"></Image>
          </Box>
          <Flex
            width={"377px"}
            height={"215px"}
            direction={"column"}
            gap={4}
            py={5}
            px={8}
          >
            <Text
              size="md"
              fontWeight={700}
              fontSize={"16px"}
              color={colors.dark_blue}
            >
              Dr. Ramesh Poudel
            </Text>
            <Flex gap={1} direction={"column"}>
              <Text fontWeight={400} fontSize={"12px"}>
                MBBS, MD - General Medicine - Cardiology
              </Text>
              <Text fontWeight={500} fontSize={"12px"}>
                Chitwan Medical College
              </Text>
            </Flex>
            <Flex direction={"column"} gap={3}>
              {doctorDetails.map(doctorDetail => {
                return (
                  <Flex gap={4} key={doctorDetail.id}>
                    {doctorDetail.icon}
                    <Text
                      fontWeight={400}
                      fontSize={"13px"}
                      color={colors.gray_text}
                    >
                      {doctorDetail.description}
                    </Text>
                  </Flex>
                );
              })}
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};

export default DoctorListCard;
