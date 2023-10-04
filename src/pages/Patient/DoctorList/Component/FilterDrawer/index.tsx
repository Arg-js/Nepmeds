import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
} from "@chakra-ui/react";
import React, { MutableRefObject } from "react";

const FilterDrawer: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  btnRef: MutableRefObject<null>;
}> = ({ isOpen, onClose, btnRef }) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Filter</DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default FilterDrawer;
