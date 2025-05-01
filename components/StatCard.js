import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function StatCard({ title, value, interval, chart }) {
  return (
    <Card variant="outlined" sx={{ height: "100", flexGrow: 1 }}>
      <CardContent>
        <Typography component="h1" variant="subtitle1" gutterBottom>
          {title}
        </Typography>
        <Stack
          direction="column"
          sx={{ justifyContent: "space-between", flexGrow: "1", gap: 1 }}
        >
          <Stack sx={{ justifyContent: "space-between" }}>
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Typography variant="h4" component="p">
                {value}
              </Typography>
            </Stack>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {interval}
            </Typography>
          </Stack>
        </Stack>
        <Box sx={{ position: "relative", height: 100 }}>{chart}</Box>
      </CardContent>
    </Card>
  );
}

export default StatCard;
