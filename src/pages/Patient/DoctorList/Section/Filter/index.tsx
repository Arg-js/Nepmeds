import { Box, Checkbox, Divider, Flex, Text } from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";

const GenderList = ["Male Doctor", "Female Doctor"];
const FilterHeading = ["Specialization", "Health Concern"];
const DoctorListFilter = () => {
  return (
    <Box width={"277px"} border={`0.5px solid ${colors.gray_border}`} p={6}>
      <Flex direction={"column"} gap={3}>
        {/* HEADING */}
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Text fontWeight={700} fontSize={"16px"}>
            Filters
          </Text>
          <Text
            fontWeight={500}
            fontSize={"12px"}
            color={colors.primary}
            textDecoration={"underline"}
          >
            Clear All
          </Text>
        </Flex>
        <Divider />
        <Text fontWeight={600} fontSize={"16px"}>
          Gender
        </Text>
        {GenderList.map(gender => {
          return (
            <Flex gap={4} key={gender}>
              <Checkbox />
              <Text fontWeight={500} fontSize={"13px"}>
                {gender}
              </Text>
            </Flex>
          );
        })}
        {FilterHeading.map(heading => {
          return (
            <Box key={heading}>
              <Text fontWeight={600} fontSize={"16px"} mb={3}>
                {heading}
              </Text>
              {GenderList.map(gender => {
                return (
                  <Flex gap={4} key={gender} mb={2}>
                    <Checkbox />
                    <Text fontWeight={500} fontSize={"13px"}>
                      {gender}
                    </Text>
                  </Flex>
                );
              })}
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
};

export default DoctorListFilter;
