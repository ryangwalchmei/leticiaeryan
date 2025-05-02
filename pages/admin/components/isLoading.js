import { useData } from "contexts/getDataContext";
import React from "react";
import { CircularProgress, Box } from "@mui/material";

export default function RenderOnLoadingData({ children, dependencies }) {
  const { loadingData } = useData();

  const isLoading = dependencies?.some((dep) => loadingData[dep]);

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
