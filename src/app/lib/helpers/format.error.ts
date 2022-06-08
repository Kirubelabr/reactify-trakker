export const formatErrorMessage = (error: any) => {
  return (
    (error?.response && error.response?.data && error.response.data?.message) ||
    error?.message ||
    error?.toString() ||
    'ERROR OCCURRED'
  );
};
