type RequestButton = {
  name: string;
  type: string;
  category?: string;
  isLoading: boolean;
  commission: number;
  mutateRideFunction?: () =>  void
} | null;
