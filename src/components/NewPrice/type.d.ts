type RequestButton = {
  name: string;
  type: string;
  category?: string;
  isLoading: boolean;
  mutateRideFunction?: () =>  void
} | null;
