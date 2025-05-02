import { CssBaseline } from "@mui/material";
import { alpha, Box, Stack } from "@mui/material";

import SideMenu from "./components/sideMenu";
import AppNavbar from "./components/appNavbar";
import Header from "./components/header";
import MainGrid from "./components/mainGrid";
import AppTheme from "../../themes/appTheme";

export default function AdminPage(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <SideMenu />
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <AppNavbar />
          <Box
            component="main"
            sx={(theme) => ({
              flexGrow: 1,
              backgroundColor: theme.vars
                ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                : alpha(theme.palette.background.default, 1),
              overflow: "auto",
            })}
          >
            <Stack
              spacing={2}
              sx={{
                alignItems: "center",
                mx: 3,
                pb: 5,
                mt: { xs: 8, md: 0 },
              }}
            >
              <Header />
              <MainGrid />
            </Stack>
          </Box>
        </Box>
      </Box>
    </AppTheme>
  );
}
