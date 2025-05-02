import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { Copyright } from "@mui/icons-material";
import TableInvitations from "./tableInvitations";
import RenderOnLoadingData from "../../isLoading";
// import Card from "../../pages/admin/components/card";
// import TableInvitations from "./tableInvitations";

export default function InvitationsGrid() {
  return (
    <>
      <RenderOnLoadingData
        dependencies={[
          "isLoadingInvitations",
          "isLoadingGuests",
          "isLoadingGifts",
        ]}
      >
        <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
          <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
            Letícia e Ryan - Convites
          </Typography>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item size={12}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <TableInvitations />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Copyright sx={{ my: 4 }} />
        </Box>
      </RenderOnLoadingData>
    </>
  );
}
