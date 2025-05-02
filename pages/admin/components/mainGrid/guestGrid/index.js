import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { Copyright } from "@mui/icons-material";
import { useMenu } from "contexts/menuContext";
import TableGuests from "./tableGuests";

export default function GuestsGrid() {
  const { selectedInvitationExternalId } = useMenu();

  return (
    <>
      <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          {`${selectedInvitationExternalId ? `${selectedInvitationExternalId.name} - ` : ""}`}{" "}
          Convidados
        </Typography>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item size={12}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <TableGuests />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Copyright sx={{ my: 4 }} />
      </Box>
    </>
  );
}
