import { Flex, Text, Card, Box, Image } from "@chakra-ui/react";
import {
  LocationIcon,
  PayementIcon,
  StethoscopeIcon,
} from "@nepMeds/assets/svgs";
import { colors } from "@nepMeds/theme/colors";
import doctorImage from "@nepMeds/assets/images/doctor.png";
import { Dispatch, SetStateAction, useMemo } from "react";
import { IDoctorListResult } from "@nepMeds/service/nepmeds-patient-doctorList";

export enum Size {
  sm,
  lg,
}

const DoctorListCard: React.FC<{
  data: IDoctorListResult;
  size: number;
  setDoctorId?: Dispatch<SetStateAction<number>>;
}> = ({ data, size, setDoctorId }) => {
  const doctorDetails = useMemo(
    () => [
      {
        id: 1,
        icon: <LocationIcon />,
        description: data.workplace,
      },
      {
        id: 2,
        icon: <StethoscopeIcon />,
        description: `${data.experience} years experience`,
      },
      {
        id: 3,
        icon: <PayementIcon />,
        description: `Rs. ${data.schedule_rate}`,
      },
    ],
    [data]
  );

  return (
    <Flex
      gap={5}
      mb={3}
      onClick={() => {
        setDoctorId && setDoctorId(data.id);
      }}
      cursor={"pointer"}
      sx={{
        "&:hover": {
          border: `1px solid ${colors.primary}`,
        },
      }}
    >
      <Card variant={"elevated"}>
        <Flex direction={`${size === Size.sm ? "column" : "row"}`}>
          <Box
            width={`${size === Size.sm ? "302px" : "296px"}`}
            height={`${size === Size.sm ? "159px" : "215px"}`}
          >
            {/* TODO: what happens when width and height not provided in image */}
            <Image
              src={doctorImage}
              alt="doctorImage"
              objectFit={"cover"}
              width={`${size === Size.sm ? "302px" : "296px"}`}
              height={`${size === Size.sm ? "159px" : "215px"}`}
            />
          </Box>
          <Flex
            width={`${size === Size.sm ? "302px" : "377px"}`}
            height={`${size === Size.sm ? "159px" : "215px"}`}
            direction={"column"}
            gap={`${size === Size.sm ? "2" : "4"}`}
            py={`${size === Size.sm ? "3" : "5"}`}
            px={`${size === Size.sm ? "3" : "8"}`}
          >
            <Text
              size="md"
              fontWeight={700}
              fontSize={"16px"}
              color={colors.dark_blue}
            >
              {data.name}
            </Text>
            {/* TODO: generic component for dash */}
            <Flex gap={`${size === Size.sm ? "0" : "1"}`} direction={"column"}>
              <Text
                fontWeight={400}
                fontSize={`${size === Size.sm ? "11px" : "12px"}`}
              >
                {data &&
                  data.specialization_names &&
                  data.specialization_names.map(
                    (specialization_name, index) => {
                      return `${
                        index === data.specialization_names.length - 1 ||
                        data.specialization_names.length === 0
                          ? specialization_name.name
                          : `${specialization_name.name} - `
                      }  `;
                    }
                  )}
              </Text>
              <Text
                fontWeight={500}
                fontSize={`${size === Size.sm ? "11px" : "12px"}`}
              >
                Chitwan Medical College
              </Text>
            </Flex>

            <Flex direction={"column"} gap={`${size === Size.sm ? "1" : "3"}`}>
              {doctorDetails.map(doctorDetail => {
                return (
                  <Flex gap={4} key={doctorDetail.id}>
                    {doctorDetail.icon}
                    <Text
                      fontWeight={400}
                      fontSize={`${size === Size.sm ? "11px" : "13px"}`}
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
