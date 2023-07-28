import { AuthDataContext } from "@nepMeds/context/AuthDataContext";
import { useContext } from "react";

export const useProfileData = () => useContext(AuthDataContext);
