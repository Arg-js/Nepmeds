import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { DeleteTrashImage, svgs } from "@nepMeds/assets/svgs";
import { DataTable } from "@nepMeds/components/DataTable";
import { adminRoleColumn } from "@nepMeds/components/DataTable/userRoleColumn";
import FloatingPassword from "@nepMeds/components/Form/FloatingPassword";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import {
  IAdminSingleDetail,
  IAdminUserList,
  useDeleteAdminUser,
  useGetSingleAdminUser,
  useGetUserRoleAdmin,
  useUpdateAdminUser,
} from "@nepMeds/service/nepmeds-admin-userrole";
import { colors } from "@nepMeds/theme/colors";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import AdminModal from "./AdminModal";
import useAdminForm from "./useAdminForm";

const RoleAdmin = () => {
  const [adminUser, setAdminUser] = useState<IAdminUserList>();
  const [pageParams, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { data, isLoading } = useGetUserRoleAdmin({
    page_no: pageParams?.pageIndex + 1,
    page_size: pageParams?.pageSize,
  });
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();
  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
  } = useDisclosure();
  const {
    isOpen: isChangePasswordModalOpen,
    onOpen: onChangePasswordModalOpen,
    onClose: onChangePasswordModalClose,
  } = useDisclosure();

  const deleteAdmin = useDeleteAdminUser();
  const singleAdminData = useGetSingleAdminUser({
    id: adminUser?.id?.toString() ?? "",
    enabled: isEditModalOpen,
  });
  const updateAdmin = useUpdateAdminUser();
  const {
    passwordFormMethods: {
      reset,
      register,
      handleSubmit,
      formState: { errors },
      getValues,
    },
    validateConfirmPassword,
    confirmpasswordVisible,
    setConfirmpasswordVisible,
    passwordVisible,
    setPasswordVisible,
  } = useAdminForm();

  const onSubmitHandler = (data: IAdminSingleDetail) => {
    updateAdmin.mutate(
      { id: adminUser?.id?.toString() ?? "", data },
      {
        onSuccess: () => {
          setAdminUser(undefined);
          onEditModalClose();
        },
      }
    );
  };

  const resetAndClose = () => {
    reset();
    onChangePasswordModalClose();
  };

  return (
    <div>
      {/* delete modal */}
      <ModalComponent
        size="sm"
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalClose}
        heading={
          <HStack>
            <svgs.logo_small />
            <Text>Delete Admin</Text>
          </HStack>
        }
        footer={
          <HStack w="100%" gap={3}>
            <Button
              variant={"primaryOutline"}
              onClick={onDeleteModalClose}
              flex={1}
            >
              Cancel
            </Button>
            <Button
              flex={1}
              variant={"reset"}
              onClick={async () => {
                deleteAdmin.mutate(adminUser?.id?.toString() ?? "", {
                  onSuccess: () => {
                    onDeleteModalClose();
                  },
                });
              }}
              isLoading={deleteAdmin.isLoading}
            >
              Confirm
            </Button>
          </HStack>
        }
      >
        <Box>
          <DeleteTrashImage />
          Are you sure you want to delete{" "}
          <Text fontWeight="bold" display="inline">
            {adminUser?.name}
          </Text>
          ?
        </Box>
      </ModalComponent>

      {/* Edit Admin Modal */}
      <AdminModal
        isLoading={updateAdmin.isLoading}
        isOpen={isEditModalOpen}
        onClose={onEditModalClose}
        onSubmitHandler={onSubmitHandler}
        editData={singleAdminData.data?.data}
      />

      {/* Change Password Modal */}
      <ModalComponent
        size={"2xl"}
        heading={
          <HStack>
            <svgs.logo_small />
            <Text>Change Password</Text>
          </HStack>
        }
        isOpen={isChangePasswordModalOpen}
        onClose={resetAndClose}
        footer={
          <HStack w="100%">
            <Button variant={"primaryOutline"} w="100%" onClick={resetAndClose}>
              Cancel
            </Button>
            <Button
              w="100%"
              isLoading={isLoading}
              onClick={handleSubmit(() => {
                //TODO: API call after api is made
              })}
            >
              Confirm
            </Button>
          </HStack>
        }
      >
        <form>
          <Flex direction={"column"} alignItems={"center"} gap={8}>
            <FloatingPassword
              label="Password"
              isRequired
              isVisible={passwordVisible}
              onToggleVisibility={() => setPasswordVisible(!passwordVisible)}
              name="password"
              register={register}
              style={{ background: colors.forminput, border: "none" }}
              rules={{
                required: "Password is required.",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long.",
                },
              }}
              error={errors.password?.message}
            />

            <FloatingPassword
              label="Confirm Password"
              isRequired
              isVisible={confirmpasswordVisible}
              onToggleVisibility={() =>
                setConfirmpasswordVisible(!confirmpasswordVisible)
              }
              name="confirm_password"
              register={register}
              style={{ background: colors.forminput, border: "none" }}
              rules={{
                required: "Confirm password is required.",
                validate: () =>
                  validateConfirmPassword(
                    getValues("password"),
                    getValues("confirm_password")
                  ),
              }}
              error={errors.confirm_password?.message}
            />
          </Flex>
        </form>
      </ModalComponent>

      <DataTable
        isLoading={isLoading}
        columns={adminRoleColumn({
          pageParams,
          onModalOpen: {
            onDeleteModalOpen,
            onEditModalOpen,
            onChangePasswordModalOpen,
          },
          setAdminUser,
        })}
        data={data?.results ?? []}
        pagination={{
          manual: true,
          pageParams,
          pageCount: data?.page_count,
          onChangePagination: setPagination,
        }}
      />
    </div>
  );
};

export default RoleAdmin;
