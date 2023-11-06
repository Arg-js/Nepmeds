import {
  AccordionItem as ChakraAccordionItem,
  AccordionButton,
  AccordionPanel,
  Flex,
  Checkbox,
  Text,
} from "@chakra-ui/react";

const AccordionItem = ({
  data,
  reference,
  filterParams,
  paginationParams,
  itemKey,
  label,
  filterRefKey,
}: {
  data: any;
  reference: any;
  filterParams: any;
  paginationParams: any;
  itemKey: any;
  label: string;
  filterRefKey: any;
}) => {
  return (
    <ChakraAccordionItem>
      <AccordionButton>
        <Text fontWeight={600} fontSize={"md"} mb={3}>
          {label}
        </Text>
      </AccordionButton>
      <AccordionPanel>
        {data.map((item: any, index: number) => {
          return (
            <Flex gap={4} key={item[itemKey]} mb={2}>
              <Checkbox
                ref={element => {
                  if (element) reference[filterRefKey].current[index] = element;
                }}
                isChecked={reference?.[filterRefKey]?.current[index]?.checked}
                onChange={e => {
                  filterParams((prev: any) =>
                    e.target.checked
                      ? [...prev, item[itemKey]]
                      : prev.filter((item: any) => item !== item[itemKey]),
                  );
                  paginationParams((prev: any) => ({
                    ...prev,
                    page: 1,
                  }));
                }}
              />
              <Text fontWeight={500} fontSize={"13px"}>
                {item.label}
              </Text>
            </Flex>
          );
        })}
      </AccordionPanel>
    </ChakraAccordionItem>
  );
};

export default AccordionItem;
