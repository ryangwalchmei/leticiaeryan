import { useState } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import MuiToolbar from "@mui/material/Toolbar";
import { tabsClasses } from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useMenu } from "contexts/menuContext";
import MenuButton from "../menuButton";
import SideMenuMobile from "../sideMenu/sideMenuMobile";
import { useNotifications } from "contexts/notificationsContext";

const Toolbar = styled(MuiToolbar)({
  width: "100%",
  padding: "12px",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  justifyContent: "center",
  gap: "12px",
  flexShrink: 0,
  [`& ${tabsClasses.flexContainer}`]: {
    gap: "8px",
    p: "8px",
    pb: 0,
  },
});

export default function AppNavbar() {
  const { selectedMenu, menuListItems } = useMenu();
  const { notificationsSummary } = useNotifications();

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        display: { xs: "auto", md: "none" },
        boxShadow: 0,
        bgcolor: "background.paper",
        backgroundImage: "none",
        borderBottom: "1px solid",
        borderColor: "divider",
        top: "var(--template-frame-height, 0px)",
      }}
    >
      <Toolbar variant="regular">
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            flexGrow: 1,
            width: "100%",
            gap: 1,
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{ justifyContent: "center", mr: "auto" }}
          >
            <Box
              sx={{
                width: "1.5rem",
                height: "1.5rem",
                bgcolor: "black",
                borderRadius: "999px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                backgroundImage:
                  "linear-gradient(135deg, hsl(210, 98%, 60%) 0%, hsl(210, 100%, 35%) 100%)",
                color: "hsla(210, 100%, 95%, 0.9)",
                border: "1px solid",
                borderColor: "hsl(210, 100%, 55%)",
                boxShadow: "inset 0 2px 5px rgba(255, 255, 255, 0.3)",
              }}
            >
              {
                menuListItems.mainListItems.find(
                  (option) => option.name == selectedMenu,
                )?.Icon
              }
            </Box>
            <Typography
              variant="h4"
              component="h1"
              sx={{ color: "text.primary" }}
            >
              {selectedMenu}
            </Typography>
          </Stack>
          <MenuButton
            showBadge={notificationsSummary.is_contains_unread}
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuRoundedIcon />
          </MenuButton>
          <SideMenuMobile open={open} toggleDrawer={setOpen} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
