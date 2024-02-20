import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Checkbox,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@nepMeds/assets/svgs";
import {
  Specialization,
  Symptom,
  useSpecializationRegisterData,
} from "@nepMeds/service/nepmeds-specialization";
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
  { label: "Male Doctor", value: "Male", id: 0, name: "Male" },
  { label: "Female Doctor", value: "Female", id: 1, name: "Female" },
  { label: "Others", value: "Other", id: 2, name: "Other" },
];

export interface IDateParams {
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

export interface IPaginationParams {
  setPageParams: Dispatch<SetStateAction<IPageParams>>;
  pageParams: IPageParams;
}

export interface IFilterParams {
  setGender: Dispatch<SetStateAction<string[]>>;
  setSpecialization: Dispatch<SetStateAction<string[]>>;
  setSymptom: Dispatch<SetStateAction<string[]>>;
  setSearchValue: Dispatch<SetStateAction<string>>;
  setDateParams: Dispatch<SetStateAction<IDateParams>>;
}
interface IRefIterface {
  genderFiltersRef: MutableRefObject<HTMLInputElement[]>;
  specializationFiltersRef: MutableRefObject<HTMLInputElement[]>;
  symptomFiltersRef: MutableRefObject<HTMLInputElement[]>;
  dateFromRef: RefObject<HTMLInputElement>;
  dateToRef: RefObject<HTMLInputElement>;
}
const DoctorListFilter: React.FC<{
  filterParams: IFilterParams;
  paginationParams: IPaginationParams;
  dateParams: IDateParams;
  reference: IRefIterface;
}> = ({ filterParams, paginationParams, reference }) => {
  const location = useLocation();
  const state = location.state as ILocationState;

  // REACT QUERIES
  const { data: symptomData = [] } = useGetSymptoms();
  const { data: specializationData = [] } = useSpecializationRegisterData();
  // REACT QUERIES END
  type AccordionData = "name" | "ref" | "setterFunc";
  interface IAPIData {
    datas: Array<Specialization> | Array<Symptom> | typeof GenderList;
  }

  const accordionData: Array<Record<AccordionData, string> & IAPIData> = [
    {
      name: "Gender",
      datas: GenderList,
      ref: "genderFiltersRef",
      setterFunc: "setGender",
    },
    {
      name: "Specialization",
      datas: specializationData ?? [],
      ref: "specializationFiltersRef",
      setterFunc: "setSpecialization",
    },
    {
      name: "Health Concern",
      datas: symptomData ?? [],
      ref: "symptomFiltersRef",
      setterFunc: "setSymptom",
    },
  ];
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
          {/* <Grid
            templateColumns={{ md: "1fr", xl: "max-content 1fr" }}
            gap={4}
            mb={4}
          >
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
          </Grid> */}

          {/*  */}
          <Accordion defaultIndex={[0, 1, 2]} allowMultiple>
            {accordionData.map(item => {
              const count = (
                reference as unknown as Record<
                  string,
                  MutableRefObject<HTMLInputElement[]>
                >
              )[item.ref]?.current.reduce((count, item) => {
                if (item.checked === true) {
                  return count + 1;
                }
                return count;
              }, 0);

              return (
                <AccordionItem border={"none"} key={item.name}>
                  <AccordionButton
                    sx={{
                      textAlign: "center",
                      "&:hover": {
                        bg: colors.blue_10,
                      },
                    }}
                  >
                    <Flex justifyContent={"space-between"} width={"100%"}>
                      <Flex
                        direction={{ base: "row", lg: "column", xl: "row" }}
                      >
                        <Text
                          fontWeight={600}
                          fontSize={"md"}
                          mb={3}
                          flex="1"
                          textAlign="left"
                        >
                          {item.name}
                        </Text>
                        <Flex>
                          {count > 0 && (
                            <Text
                              fontWeight={600}
                              fontSize={"md"}
                              mb={3}
                              textAlign="center"
                              mx={1}
                              bgColor={colors.primary}
                              borderRadius={"100%"}
                              width={"20px"}
                            >
                              {count}
                            </Text>
                          )}
                        </Flex>
                      </Flex>

                      <AccordionIcon />
                    </Flex>
                  </AccordionButton>
                  <AccordionPanel
                    maxH={"45dvh"}
                    overflowY={"auto"}
                    css={{
                      "&::-webkit-scrollbar": {
                        width: "4px",
                      },
                      "&::-webkit-scrollbar-track": {
                        width: "6px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        background: `${colors.light_blue}`,
                        borderRadius: "24px",
                      },
                      overflowY: "scroll",
                    }}
                  >
                    {item.datas.map((data, index: number) => {
                      return (
                        <Flex gap={4} key={data.id} mb={2}>
                          <Checkbox
                            ref={element => {
                              if (element)
                                (
                                  reference as unknown as Record<
                                    string,
                                    MutableRefObject<HTMLInputElement[]>
                                  >
                                )[item.ref].current[index] = element;
                            }}
                            isChecked={
                              (
                                reference as unknown as Record<
                                  string,
                                  MutableRefObject<HTMLInputElement[]>
                                >
                              )[item.ref]?.current[index]?.checked
                            }
                            onChange={e => {
                              const updateFilter = (prev: string[]) =>
                                e.target.checked
                                  ? [...prev, data.name]
                                  : prev.filter(item => item !== data.name);

                              switch (item.name) {
                                case "Gender":
                                  filterParams.setGender(prev =>
                                    updateFilter(prev)
                                  );
                                  break;
                                case "Specialization":
                                  filterParams.setSpecialization(prev =>
                                    updateFilter(prev)
                                  );
                                  break;
                                default:
                                  filterParams.setSymptom(prev =>
                                    updateFilter(prev)
                                  );
                              }

                              paginationParams.setPageParams({
                                ...paginationParams.pageParams,
                                page: 1,
                              });
                            }}
                          />
                          <Text fontWeight={500} fontSize={"13px"}>
                            {data.name}
                          </Text>
                        </Flex>
                      );
                    })}
                  </AccordionPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
          <Flex gap={2} justifyContent="center" wrap={"wrap"}></Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default DoctorListFilter;
