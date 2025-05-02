import { Card, CardContent, Typography, Box } from "@mui/material";
import React from "react";

export default function SessionsChart({ title, subtitle, value, Chart }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {subtitle}
          </Typography>
        )}
        {value !== undefined && (
          <Typography variant="h4" fontWeight="bold">
            {value}
          </Typography>
        )}
        <Box mt={2}>{Chart}</Box>
      </CardContent>
    </Card>
  );
}
