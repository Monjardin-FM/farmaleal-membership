import { useAsyncFn } from "react-use";
import { createMembership } from "../services/createMembership";

export const usePaymentMembership = () => {
  const [{ error, loading }, paymentMembership] = useAsyncFn(createMembership, [
    createMembership,
  ]);
  return { error, loading, paymentMembership };
};
