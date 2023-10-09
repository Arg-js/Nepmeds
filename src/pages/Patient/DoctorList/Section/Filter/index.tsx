import {
  Box,
  Checkbox,
  Divider,
  Flex,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@nepMeds/assets/svgs";
import { useSpecializationRegisterData } from "@nepMeds/service/nepmeds-specialization";
import { useGetSymptoms } from "@nepMeds/service/nepmeds-symptoms";
import { colors } from "@nepMeds/theme/colors";
import React, {
  Dispatch,
  MutableRefObject,
  RefObject,
  SetStateAction,
  useEffect,
} from "react";
import { useLocation } from "react-router-dom";

const GenderList = [
  { label: "Male Doctor", value: "Male" },
  { label: "Female Doctor", value: "Female" },
  { label: "Others", value: "Other" },
];

interface IDateParams {
  from_date: string;
  to_date: string;
}

interface IPageParams {
  page: number;
  limit: number;
}

interface ILocationState {
  specialization: string;
  symptom: string;
}

const DoctorListFilter: React.FC<{
  filterParams: {
    setGender: Dispatch<SetStateAction<string[]>>;
    setSpecialization: Dispatch<SetStateAction<string[]>>;
    setSymptom: Dispatch<SetStateAction<string[]>>;
    setSearchValue: Dispatch<SetStateAction<string>>;
    setDateParams: Dispatch<SetStateAction<IDateParams>>;
  };
  paginationParams: {
    setPageParams: Dispatch<SetStateAction<IPageParams>>;
    pageParams: IPageParams;
  };
  dateParams: IDateParams;
  reference: {
    genderFiltersRef: MutableRefObject<HTMLInputElement[]>;
    specializationFiltersRef: MutableRefObject<HTMLInputElement[]>;
    symptomFiltersRef: MutableRefObject<HTMLInputElement[]>;
    dateFromRef: RefObject<HTMLInputElement>;
    dateToRef: RefObject<HTMLInputElement>;
  };
}> = ({ filterParams, dateParams, paginationParams, reference }) => {
  const location = useLocation();
  const state = location.state as ILocationState;

  // REACT QUERIES
  const { data: symptomData = [] } = useGetSymptoms();
  const { data: specializationData = [] } = useSpecializationRegisterData();
  // REACT QUERIES END

  // TODO: LOGIC IS REDUNDANT IN BOTH USE EFFECT, TRY TO MAKE A CONCISE FUNCTION FOR REUSABILITY
  useEffect(() => {
    if (state?.specialization && specializationData?.length) {
      for (let i = 0; i < specializationData.length; i++) {
        if (specializationData[i].name === state.specialization) {
          reference.specializationFiltersRef.current[i].checked = true;
        } else {
          reference.specializationFiltersRef.current[i].checked = false;
        }
      }
    }
  }, [state?.specialization, specializationData]);

  useEffect(() => {
    if (state?.symptom && symptomData?.length) {
      for (let i = 0; i < symptomData.length; i++) {
        if (symptomData[i].name === state.symptom) {
          reference.symptomFiltersRef.current[i].checked = true;
        } else {
          reference.symptomFiltersRef.current[i].checked = false;
        }
      }
    }
  }, [state?.symptom, symptomData]);

  const clearAllFilter = () => {
    for (let i = 0; i < reference?.genderFiltersRef.current.length; i++) {
      reference.genderFiltersRef.current[i].checked = false;
    }

    for (
      let i = 0;
      i < reference?.specializationFiltersRef.current.length;
      i++
    ) {
      reference.specializationFiltersRef.current[i].checked = false;
    }

    for (let i = 0; i < reference?.symptomFiltersRef.current.length; i++) {
      reference.symptomFiltersRef.current[i].checked = false;
    }

    if (reference?.dateFromRef.current && reference?.dateToRef.current) {
      reference.dateFromRef.current.value = "";
      reference.dateToRef.current.value = "";
    }
  };

  return (
    <Box display={"flex"} gap={"2"} flexDirection={"column"}>
      <InputGroup>
        <InputLeftElement>
          <SearchIcon />
        </InputLeftElement>
        <Input
          onChange={e => {
            filterParams.setSearchValue(e.target.value);
            paginationParams.setPageParams({
              ...paginationParams.pageParams,
              page: 1,
            });
          }}
          placeholder="Search by doctors name"
          fontSize={"xs"}
        />
      </InputGroup>
      <Box
        border={`0.5px solid ${colors.gray_border}`}
        p={6}
        bgColor={colors.white}
      >
        <Flex direction={"column"} gap={3}>
          {/* HEADING */}
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Text fontWeight={700} fontSize={"md"}>
              Filters
            </Text>
            <Text
              fontWeight={500}
              fontSize={"xs"}
              color={colors.primary}
              textDecoration={"underline"}
              cursor={"pointer"}
              onClick={() => {
                clearAllFilter();
                filterParams.setGender([]);
                filterParams.setSpecialization([]);
                filterParams.setSymptom([]);
                filterParams.setDateParams({
                  from_date: "",
                  to_date: "",
                });
              }}
            >
              Clear All
            </Text>
          </Flex>
          <Divider />
          {/* TODO: the content will overflow with max-content */}
          <Grid templateColumns={{ md: "1fr", xl: "max-content 1fr" }} gap={4}>
            <GridItem>
              <Text fontWeight={600} fontSize={"sm"}>
                From :
              </Text>
            </GridItem>
            <GridItem>
              <Input
                type={"date"}
                ref={reference?.dateFromRef}
                onChange={e => {
                  filterParams.setDateParams({
                    ...dateParams,
                    from_date: e.target.value,
                  });
                  paginationParams.setPageParams({
                    ...paginationParams.pageParams,
                    page: 1,
                  });
                }}
                w={"min-content"}
                size={"sm"}
                borderRadius={"6px"}
              />
            </GridItem>
            <GridItem>
              <Text fontWeight={600} fontSize={"sm"}>
                To :
              </Text>
            </GridItem>

            {/* <Text>-</Text> */}
            <GridItem>
              <Input
                type={"date"}
                ref={reference?.dateToRef}
                onChange={e => {
                  filterParams.setDateParams({
                    ...dateParams,
                    to_date: e.target.value,
                  });
                  paginationParams.setPageParams({
                    ...paginationParams.pageParams,
                    page: 1,
                  });
                }}
                w={"min-content"}
                size={"sm"}
                borderRadius={"6px"}
              />
            </GridItem>
          </Grid>
          <Flex gap={2} justifyContent="center" wrap={"wrap"}></Flex>
          <Box>
            <Text fontWeight={600} fontSize={"md"} mb={3}>
              Gender
            </Text>
            {GenderList.map((gender, index) => {
              return (
                <Flex gap={4} key={gender.value} mb={2}>
                  <Checkbox
                    ref={element => {
                      if (element)
                        reference.genderFiltersRef.current[index] = element;
                    }}
                    isChecked={
                      reference?.genderFiltersRef?.current[index]?.checked
                    }
                    onChange={e => {
                      filterParams.setGender(prev =>
                        e.target.checked
                          ? [...prev, gender.value]
                          : prev.filter(item => item !== gender.value)
                      );
                      paginationParams.setPageParams({
                        ...paginationParams.pageParams,
                        page: 1,
                      });
                    }}
                  />
                  <Text fontWeight={500} fontSize={"13px"}>
                    {gender.label}
                  </Text>
                </Flex>
              );
            })}
          </Box>
          <Box>
            <Text fontWeight={600} fontSize={"md"} mb={3}>
              Specialization
            </Text>
            {specializationData.map((specialization, index) => {
              return (
                <Flex gap={4} key={specialization.id} mb={2}>
                  <Checkbox
                    ref={element => {
                      if (element)
                        reference.specializationFiltersRef.current[index] =
                          element;
                    }}
                    isChecked={
                      reference?.specializationFiltersRef?.current[index]
                        ?.checked
                    }
                    onChange={e => {
                      filterParams.setSpecialization(prev =>
                        e.target.checked
                          ? [...prev, specialization.name]
                          : prev.filter(item => item !== specialization.name)
                      );
                      paginationParams.setPageParams({
                        ...paginationParams.pageParams,
                        page: 1,
                      });
                    }}
                  />
                  <Text fontWeight={500} fontSize={"13px"}>
                    {specialization.name}
                  </Text>
                </Flex>
              );
            })}
          </Box>
          <Box>
            <Text fontWeight={600} fontSize={"md"} mb={3}>
              Health Concern
            </Text>
            {symptomData.map((symptom, index) => {
              return (
                <Flex gap={4} key={symptom.id} mb={2}>
                  <Checkbox
                    ref={element => {
                      if (element)
                        reference.symptomFiltersRef.current[index] = element;
                    }}
                    isChecked={
                      reference?.symptomFiltersRef?.current[index]?.checked
                    }
                    onChange={e => {
                      filterParams.setSymptom(prev =>
                        e.target.checked
                          ? [...prev, symptom.name]
                          : prev.filter(item => item !== symptom.name)
                      );
                      paginationParams.setPageParams({
                        ...paginationParams.pageParams,
                        page: 1,
                      });
                    }}
                  />
                  <Text fontWeight={500} fontSize={"13px"}>
                    {symptom.name}
                  </Text>
                </Flex>
              );
            })}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default DoctorListFilter;
