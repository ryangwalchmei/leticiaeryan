import { Card, CardContent, Typography, Box } from "@mui/material";
import React from "react";

export default function StatCard({
  title,
  value,
  interval,
  chart,
  trend = "neutral",
}) {
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle2" gutterBottom>
          {title}
        </Typography>
        <Typography
          variant="h5"
          fontWeight="bold"
          color={
            trend === "positive"
              ? "green"
              : trend === "negative"
                ? "red"
                : "textPrimary"
          }
        >
          {value}
        </Typography>
        {interval && (
          <Typography variant="body2" color="textSecondary">
            {interval}
          </Typography>
        )}
        {chart && (
          <Box mt={2} display="flex" justifyContent="center">
            {chart}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
