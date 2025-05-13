import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer, { drawerClasses } from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import NotificationsOutlined from "@mui/icons-material/NotificationAddOutlined";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MenuContent from "./menuContent";
import { useNotifications } from "contexts/notificationsContext";
import { Badge, IconButton, ListItemText, Menu, MenuItem } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

function SideMenuMobile({ open, toggleDrawer }) {
  const {
    notificationList,
    handleReadNotification,
    notificationsSummary,
    handleReadAllNotifications,
  } = useNotifications();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openNotifications = Boolean(anchorEl);

  const handleOpenNotifications = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseNotifications = () => {
    setAnchorEl(null);
  };

  const getIconByType = (type) => {
    switch (type) {
      case "alert":
        return <WarningAmberIcon color="warning" fontSize="small" />;
      case "info":
        return <InfoIcon color="info" fontSize="small" />;
      case "success":
        return <CheckCircleIcon color="success" fontSize="small" />;
      default:
        return <NotificationsOutlined fontSize="small" />;
    }
  };
  return (
    <Drawer
      anchor="right"
      open={open}
      variant="temporary"
      onClose={() => toggleDrawer(false)}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: "none",
          backgroundColor: "background.paper",
        },
      }}
    >
      <Stack
        sx={{
          maxWidth: "70dvw",
          height: "100%",
        }}
      >
        <Stack direction="row" sx={{ p: 2, pb: 0, gap: 1 }}>
          <Stack
            direction="row"
            sx={{ gap: 1, alignItems: "center", flexGrow: 1, p: 1 }}
          >
            <Avatar
              sizes="small"
              alt="Leticia e Ryan"
              src="/static/images/avatar/7.jpg"
              sx={{ width: 24, height: 24 }}
            />
            <Typography component="p" variant="h6">
              Letícia e Ryan
            </Typography>
          </Stack>
          <IconButton color="inherit" onClick={handleOpenNotifications}>
            <Badge
              badgeContent={notificationsSummary.total_unread}
              color="error"
              sx={{
                "& .MuiBadge-badge": {
                  animation:
                    notificationsSummary.is_contains_unread &&
                    "pulse 1.5s infinite",
                },
              }}
            >
              <NotificationsRoundedIcon />
            </Badge>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={openNotifications}
            onClose={handleCloseNotifications}
            PaperProps={{
              elevation: 4,
              sx: {
                width: 320,
                maxHeight: 400,
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#ccc",
                  borderRadius: "3px",
                },
              },
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Typography variant="subtitle1" sx={{ px: 2, py: 1 }}>
              Notificações
            </Typography>
            {!notificationsSummary.is_empty && (
              <Typography
                variant="caption"
                color="primary"
                sx={{ cursor: "pointer", alignSelf: "end" }}
                onClick={handleReadAllNotifications}
              >
                Marcar todas como lidas
              </Typography>
            )}

            <Divider />

            {notificationList.length === 0 ? (
              <MenuItem disabled>Nenhuma notificação</MenuItem>
            ) : (
              notificationList.map((notif) => (
                <MenuItem
                  key={notif.id}
                  // onClick={handleClose}
                  sx={{
                    alignItems: "flex-start",
                    backgroundColor: !notif.is_read ? "#f5f5f5" : "inherit",
                  }}
                >
                  <ListItemText
                    sx={{
                      backgroundColor: !notif.is_read ? "#f0f8ff" : "inherit",
                    }}
                    primary={
                      <Typography
                        variant="subtitle2"
                        fontWeight={notif.is_read ? "normal" : "bold"}
                      >
                        {getIconByType(notif.type)} {notif.title}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary">
                          {notif.message}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.disabled"
                          display="block"
                          mt={0.5}
                        >
                          {formatDistanceToNow(new Date(notif.datecreated), {
                            addSuffix: true,
                            locale: ptBR,
                          })}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="primary"
                          sx={{ mt: 0.5, cursor: "pointer" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReadNotification(notif.id);
                          }}
                        >
                          Ler
                        </Typography>
                      </>
                    }
                  />
                </MenuItem>
              ))
            )}
          </Menu>
        </Stack>
        <Divider />
        <Stack sx={{ flexGrow: 1 }}>
          <MenuContent />
          <Divider />
        </Stack>
        <Stack sx={{ p: 2 }}>
          <Button
            onClick={() => toggleDrawer(false)}
            variant="outlined"
            fullWidth
            startIcon={<LogoutRoundedIcon />}
          >
            Sair
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}

export default SideMenuMobile;
