import { STATUSTYPE } from "@nepMeds/config/enum";

const doctorStatus = (status: string | undefined) => {
  return {
    isApproved: status === STATUSTYPE.approved.toString(),
    isPending: status === STATUSTYPE.pending.toString(),
    isRejected: status === STATUSTYPE.rejected.toString(),
  };
};

export default doctorStatus;
