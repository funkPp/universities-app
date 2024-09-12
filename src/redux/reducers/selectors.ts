import { RootState } from "../../types";
const selectors = {
  isLoading: (state: RootState) => state?.data?.isLoading,
};

export default selectors;
