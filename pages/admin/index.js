import { CssBaseline } from "@mui/material";
import { Box } from "@mui/system";
import SideMenu from "./components/sideMenu";

export default function AdminPage() {
  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <Box
          component="main"
          sx={() => ({
            flexGrow: 1,
            overflow: "auto",
          })}
        >
          <SideMenu />
        </Box>
      </Box>
    </>
  );
}
