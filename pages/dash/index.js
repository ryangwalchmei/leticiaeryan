import { CssBaseline } from "@mui/material";
import { alpha, Box, Stack } from "@mui/system";
import AppNavbar from "../../components/AppNavbar";
import Header from "../../components/Header";
import SideMenu from "../../components/SideMenu";
import {
  chartsCustomizations,
  datePickersCustomizations,
} from "../../components/theme/customizations";
import AppTheme from "../../components/theme/sharedThemes/AppTheme";

import MainGrid from "../../components/MainGrid";
import { useMenu } from "../../context/menuContext";

const xThemeComponents = {
  ...chartsCustomizations,
  ...datePickersCustomizations,
};

export default function Dash(props) {
  const { selectedMenu, setSelectedMenu } = useMenu();

  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <SideMenu selected={selectedMenu} onSelect={setSelectedMenu} />
        <AppNavbar />
        {/* Main content */}
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
    </AppTheme>
  );
}
