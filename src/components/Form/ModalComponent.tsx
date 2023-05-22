import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";

const ModalComponent = ({
  heading,
  children,
  primaryText,
  secondaryText,
  isOpen,
  onClose,
  size,
}: IModalProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={size}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{heading}</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign="center">{children}</ModalBody>

          <ModalFooter justifyContent="center">
            <Button
              mr={3}
              background={colors.primary}
              color={colors.white}
              borderRadius={12}
              size="md"
            >
              {primaryText}
            </Button>
            {secondaryText && <Button variant="ghost">{secondaryText}</Button>}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

interface IModalProps {
  heading: JSX.Element;
  children: JSX.Element | JSX.Element[];
  primaryText: string;
  secondaryText?: string;
  isOpen: boolean;
  onClose: () => void;
  size?: ModalProps["size"];
}

export default ModalComponent;
