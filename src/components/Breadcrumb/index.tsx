import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  BreadcrumbItem,
  Breadcrumb,
  BreadcrumbLink,
  Text,
  Flex,
  Box,
  Icon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { colors } from "@nepMeds/theme/colors";
interface IBreadCrumb {
  items: { name: string; route: string }[];
  goBack?: string;
  title: { name: string; route: string };
}

export const BreadCrumb = ({ items, title }: IBreadCrumb) => {
  const navigate = useNavigate();

  return (
    <Box pb={6}>
      <Flex justifyContent="space-between" alignItems="center" height={4}>
        <Breadcrumb spacing={1} separator={""}>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Flex alignItems={"center"}>
                <Text
                  fontWeight={600}
                  color={colors.primary}
                  fontSize="sm"
                  onClick={() => navigate(title.route)}
                >
                  {title?.name}
                </Text>
                {!!items.length && (
                  <Icon
                    as={ChevronRightIcon}
                    color={colors.gray}
                    fontSize="xl"
                    pb={0.5}
                    ml={2}
                  />
                )}
              </Flex>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {items.map((item, i) => (
            <BreadcrumbItem key={i}>
              <BreadcrumbLink onClick={() => navigate(item.route)}>
                <Text
                  fontWeight={600}
                  color={colors.primary}
                  fontSize={items.length - 1 === i ? "md" : "14px"}
                >
                  {item.name}
                </Text>
              </BreadcrumbLink>
              {items.length - 1 !== i && (
                <Icon
                  as={ChevronRightIcon}
                  color={colors.gray}
                  fontSize="xl"
                  pb={0.5}
                  ml={2}
                />
              )}
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      </Flex>
    </Box>
  );
};
