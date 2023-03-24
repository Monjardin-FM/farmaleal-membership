import { useAsyncFn } from "react-use";
import { confirmMembership } from "../services/confirmMembership";

export const useConfirmMembership = () => {
  const [{ error, loading }, confirmMember] = useAsyncFn(confirmMembership, [
    confirmMembership,
  ]);
  return { error, loading, confirmMember };
};
