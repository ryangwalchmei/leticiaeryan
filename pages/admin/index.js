import { CssBaseline } from "@mui/material";
import { Box } from "@mui/system";
import SideMenu from "./components/sideMenu";
import AppNavbar from "./components/appNavbar";

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
          <AppNavbar />
        </Box>
      </Box>
    </>
  );
}
