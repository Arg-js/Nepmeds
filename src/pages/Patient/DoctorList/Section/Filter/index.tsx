import { Box, Checkbox, Divider, Flex, Text } from "@chakra-ui/react";
import { useSpecializationRegisterData } from "@nepMeds/service/nepmeds-specialization";
// import { useGetSymptoms } from "@nepMeds/service/nepmeds-symptoms";
import { colors } from "@nepMeds/theme/colors";
import { Dispatch, SetStateAction } from "react";

const GenderList = [
  { label: "Male Doctor", value: "1" },
  { label: "Female Doctor", value: "2" },
];

const DoctorListFilter: React.FC<{
  setGender: Dispatch<SetStateAction<string>>;
  setSpecialization: Dispatch<SetStateAction<Array<string>>>;
}> = ({ setGender, setSpecialization }) => {
  // REACT QUERIES
  // const { data: symptomData = [] } = useGetSymptoms();
  const { data: specializaionData = [] } = useSpecializationRegisterData();
  // REACT QUERIES END
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
            <Flex gap={4} key={gender.value}>
              <Checkbox
                onChange={e => e.target.checked && setGender(gender.value)}
              />
              <Text fontWeight={500} fontSize={"13px"}>
                {gender.label}
              </Text>
            </Flex>
          );
        })}
        <Box>
          <Text fontWeight={600} fontSize={"16px"} mb={3}>
            Specialization
          </Text>
          {specializaionData.map(specialization => {
            return (
              <Flex gap={4} key={specialization.id} mb={2}>
                <Checkbox
                  onChange={e =>
                    e.target.checked
                      ? setSpecialization(prev => {
                          prev.push(specialization.name);
                          return prev;
                        })
                      : setSpecialization(prev => {
                          return prev.filter(
                            item => item !== specialization.name
                          );
                        })
                  }
                />
                <Text fontWeight={500} fontSize={"13px"}>
                  {specialization.name}
                </Text>
              </Flex>
            );
          })}
        </Box>
        <Box>
          <Text fontWeight={600} fontSize={"16px"} mb={3}>
            Health Concern
          </Text>
          {specializaionData.map(specialization => {
            return (
              <Flex gap={4} key={specialization.id} mb={2}>
                <Checkbox
                // onChange={e =>
                //   e.target.checked && setSpecialization(specialization.name)
                // }
                />
                <Text fontWeight={500} fontSize={"13px"}>
                  {specialization.name}
                </Text>
              </Flex>
            );
          })}
        </Box>
      </Flex>
    </Box>
  );
};

export default DoctorListFilter;
