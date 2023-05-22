import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";

const ModalComponent = ({
  heading,
  children,
  primaryText,
  secondaryText,
  isOpen,
  onClose,
}: IModalProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent style={{ maxWidth: "700px" }}>
          <ModalHeader>{heading}</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            style={{ width: "50%", margin: "0 auto", textAlign: "center" }}
          >
            {children}
          </ModalBody>

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
}

export default ModalComponent;
