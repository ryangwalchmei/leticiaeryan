import * as React from "react";
import NotificationsOutlined from "@mui/icons-material/NotificationAddOutlined";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import NavbarBreadcrumbs from "./breadcrumbs";
import {
  Badge,
  Divider,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import CustomButtonCreate from "./customButtonCreate";
import { useNotifications } from "contexts/notificationsContext";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function Header() {
  const {
    notificationList,
    handleReadNotification,
    notificationsSummary,
    handleReadAllNotifications,
  } = useNotifications();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
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
    <Stack
      direction="row"
      sx={{
        display: { xs: "none", md: "flex" },
        width: "100%",
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: "space-between",
        maxWidth: { sm: "100%", md: "1700px" },
        pt: 1.5,
      }}
      spacing={2}
    >
      <NavbarBreadcrumbs />
      <Stack direction="row" sx={{ gap: 1 }}>
        <CustomButtonCreate />
        <IconButton color="inherit" onClick={handleOpen}>
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
            <NotificationsOutlined />
          </Badge>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
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
    </Stack>
  );
}
