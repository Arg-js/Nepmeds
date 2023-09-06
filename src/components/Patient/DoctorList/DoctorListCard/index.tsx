import { Flex, Text, Card, Box, Image, Grid, GridItem } from "@chakra-ui/react";
import {
  LocationIcon,
  PayementIcon,
  StethoscopeIcon,
} from "@nepMeds/assets/svgs";
import { colors } from "@nepMeds/theme/colors";
import doctorImage from "@nepMeds/assets/images/userAvatar.png";
import { Dispatch, SetStateAction, useMemo } from "react";
import { IDoctorListResult } from "@nepMeds/service/nepmeds-patient-doctorList";
import { AxiosError } from "axios";

export enum Size {
  sm,
  lg,
}

const DoctorListCard: React.FC<{
  data: IDoctorListResult;
  size: number;
  setDoctorId?: Dispatch<SetStateAction<number>>;
  doctorId?: number;
  error?: AxiosError;
}> = ({ data, size, setDoctorId, doctorId }) => {
  // const widthBase = size === Size.sm ? "285px" : "150px";
  // const widthMd = size === Size.sm ? "302px" : "296px";

  // const pyBase = size === Size.sm ? "3" : "5";
  // const pyMd = size === Size.sm ? "3" : "5";

  // const pxBase = size === Size.sm ? "3" : "3";
  // const pxMd = size === Size.sm ? "3" : "8";

  // const cursorValue = size === Size.sm ? "auto" : "pointer";

  const doctorDetails = useMemo(
    () => [
      {
        id: 1,
        icon: <LocationIcon />,
        // description: `${data.municipality}, ${data.district}`,
        description: ` ${data.district}`,
      },
      {
        id: 2,
        icon: <StethoscopeIcon />,
        description: data.experience && `${data.experience} years experience`,
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
      cursor={`${size === Size.sm ? "auto" : "pointer"}`}
      boxShadow={
        doctorId === data.id
          ? ` rgba(0, 0, 0, 0.05) 0px 10px 24px, ${colors.primary} 0px 0px 0px 0.5px`
          : "none"
      }
      // w={{ base: "inherit", xl: "550px" }}
    >
      <Card
        sx={{
          "&:hover": {
            boxShadow: `${
              size === Size.lg &&
              ` rgba(0, 0, 0, 0.05) 0px 10px 24px 0px, ${colors.primary} 0px 0px 0px 0.5px`
            }`,
          },
        }}
        variant={"elevated"}
        // w={size === Size.sm ? "238px" : "550px"}
        w={"full"}
      >
        <Grid
          // templateColumns={size === Size.sm ? "238px" : "repeat(5, 1fr)}"}
          templateColumns={size === Size.sm ? "1fr" : "repeat(5, 1fr)}"}
          templateRows={size === Size.sm ? "1fr 1fr" : "1fr"}
          columnGap={4}
          h={size === Size.sm ? "310px" : "176px"}
          borderRadius={0.5}
        >
          <GridItem colSpan={2} h={size === Size.sm ? "159px" : "inherit"}>
            {/* TODO: what happens when width and height not provided in image */}
            <Image
              src={data.profile_picture ?? doctorImage}
              alt="doctorImage"
              w={"full"}
              // w={size === Size.sm ? "238px" : "296px"}
              h={size === Size.sm ? "159px" : "176px"}
              objectFit={"cover"}
            />
          </GridItem>

          <GridItem colSpan={3} py={4} px={2}>
            <Text
              size="md"
              fontWeight={700}
              fontSize={"sm"}
              color={colors.dark_blue}
              textTransform={"capitalize"}
            >
              {data.name}
            </Text>
            {/* TODO: generic component for dash */}
            <Flex gap={`${size === Size.sm ? "0" : "1"}`} direction={"column"}>
              <Text
                fontWeight={400}
                fontSize={`${size === Size.sm ? "10px" : "xs"}`}
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
                fontWeight={400}
                fontSize={`${size === Size.sm ? "10px" : "xs"}`}
              >
                {data.workplace}
              </Text>
            </Flex>

            <Flex
              direction={"column"}
              gap={`${size === Size.sm ? "1" : "2"}`}
              mt={3}
            >
              {doctorDetails.map(doctorDetail => {
                return (
                  !!doctorDetail.description && (
                    <Flex gap={2} key={doctorDetail.id}>
                      <Box>{doctorDetail.icon}</Box>
                      <Text
                        fontWeight={400}
                        fontSize={`${size === Size.sm ? "11px" : "13px"}`}
                        color={colors.gray_text}
                      >
                        {doctorDetail.description}
                      </Text>
                    </Flex>
                  )
                );
              })}
            </Flex>
          </GridItem>
        </Grid>
      </Card>
    </Flex>
  );
};

export default DoctorListCard;
