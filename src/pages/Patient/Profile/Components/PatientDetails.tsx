import { Flex, Grid, Image, Text } from "@chakra-ui/react";
import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";
import { colors } from "@nepMeds/theme/colors";
import userAvatar from "@nepMeds/assets/images/userAvatar.png";

const PatientDetails = () => {
  return (
    <WrapperBox style={{ margin: "5", borderRadius: "12px", py: "4", px: "9" }}>
      <Flex direction={"column"} gap={5}>
        <Text fontWeight={600} fontSize={"md"}>
          General Information
        </Text>
        <Image
          boxSize="120px"
          src={userAvatar}
          objectFit={"cover"}
          objectPosition={"top"}
          borderRadius={"full"}
          alignSelf={"center"}
        />
        <Flex
          mx={2}
          bg={colors.primary}
          color={colors.white}
          fontWeight={600}
          fontSize={"md"}
          height={"auto"}
          py={1}
          justifyContent={"center"}
          alignItems={"center"}
          transform={"skew(-15deg)"}
          textAlign={"center"}
          textTransform={"capitalize"}
        >
          Brikram Shah
        </Flex>
        <Text variant="sm400" color={colors.black_30}>
          PERSONAL INFORMATION
        </Text>
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            lg: "repeat(1, 1fr)",
            xl: "repeat(2, 1fr)",
          }}
        >
          {/* TODO: check if this can be refactored */}
          <Text variant="md600" color={colors.black_60}>
            Age:
          </Text>
          <Text variant="sm400" color={colors.black_60}>
            32
          </Text>
          <Text variant="md600" color={colors.black_60}>
            Gender:
          </Text>
          <Text variant="sm400" color={colors.black_60}>
            Male
          </Text>
          <Text variant="md600" color={colors.black_60}>
            Date of Birth:
          </Text>
          <Text variant="sm400" color={colors.black_60}>
            02/02/1999
          </Text>
        </Grid>
        <Text variant="sm400" color={colors.black_30}>
          CONTACT INFORMATION
        </Text>
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            lg: "repeat(1, 1fr)",
            xl: "repeat(2, 1fr)",
          }}
        >
          <Text variant="md600" color={colors.black_60}>
            Contact:
          </Text>
          <Text variant="sm400" color={colors.black_60}>
            9860465367
          </Text>
          <Text variant="md600" color={colors.black_60}>
            Email:
          </Text>
          <Text variant="sm400" color={colors.black_60}>
            bishal@gmail.com
          </Text>
          <Text variant="md600" color={colors.black_60}>
            Address:
          </Text>
          <Text variant="sm400" color={colors.black_60}>
            Kupondole, Lalitpur
          </Text>
        </Grid>
      </Flex>
    </WrapperBox>
  );
};

export default PatientDetails;
