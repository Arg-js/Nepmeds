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
  align,
  onApiCall,
  onClose,
  otherAction,
}: IModalProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent style={{ maxWidth: "700px" }}>
          <ModalHeader>{heading}</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            style={{
              width: align ? "50%" : "100%",
              margin: align ? "0 auto" : "initial",
              textAlign: align ? "center" : "initial",
            }}
          >
            {children}
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button
              mr={3}
              onClick={onApiCall || onClose}
              background={colors.primary}
              color={colors.white}
              borderRadius={12}
              size="md"
            >
              {primaryText}
            </Button>
            {secondaryText && (
              <Button variant="ghost" onClick={otherAction}>
                {secondaryText}
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

interface IModalProps {
  heading: JSX.Element;
  align: boolean;
  children: JSX.Element | JSX.Element[];
  primaryText: string;
  secondaryText?: string;
  isOpen: boolean;
  onClose: () => void;
  onApiCall?: () => void;
  otherAction?: () => void;
}

export default ModalComponent;
