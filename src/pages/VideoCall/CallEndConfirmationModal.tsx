import {
  Button,
  HStack,
  Image,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import { ConfirmationImage } from "@nepMeds/assets/svgs";
import { colors } from "@nepMeds/theme/colors";
import { ForwardedRef, forwardRef, useImperativeHandle } from "react";
import { images } from "@nepMeds/assets/images";

interface ComponentProps {
  onClick: () => void;
}

const CallEndConfirmationModal = forwardRef(function CallEndConfirmationModal(
  { onClick }: ComponentProps,
  ref: ForwardedRef<{ onRefOpen(): void }>
) {
  const { isOpen, onClose, onOpen } = useDisclosure({});

  useImperativeHandle(
    ref,
    () => {
      return {
        onRefOpen() {
          onOpen();
        },
      };
    },
    []
  );

  return (
    <ModalComponent
      heading={
        <HStack>
          <Image src={images.smallLogo} width={"30px"} />

          <Text>End Call</Text>
        </HStack>
      }
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <HStack w="100%" gap={3}>
          <Button flex={1} onClick={onClose} variant={"primaryOutline"}>
            No
          </Button>
          <Button
            flex={1}
            onClick={onClick}
            borderColor={colors.red}
            color={colors.red}
            variant={"primaryOutline"}
          >
            Yes
          </Button>
        </HStack>
      }
    >
      <VStack gap={3}>
        <ConfirmationImage />
        <Text>Are you sure you want to end this call?</Text>
      </VStack>
    </ModalComponent>
  );
});

export default CallEndConfirmationModal;
