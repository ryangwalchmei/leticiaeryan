import { useData } from "contexts/getDataContext";
import React from "react";
import { CircularProgress, Box } from "@mui/material";

export default function RenderOnLoadingData({ children, dependencies }) {
  const { loadingData } = useData();

  const isLoading = Array.isArray(dependencies)
    ? dependencies.some((dep) => loadingData[dep])
    : false;

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>;
}
