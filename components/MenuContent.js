import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import { useMenu } from "../context/menuContext";
import Swal from "sweetalert2";

const mainListItems = [
  { text: "Dashboard", to: "/dash", icon: <HomeRoundedIcon /> },
  { text: "Convites", to: "/analytics", icon: <AnalyticsRoundedIcon /> },
  { text: "Convidados", to: "/clients", icon: <PeopleRoundedIcon /> },
  { text: "Presentes", to: "/tasks", icon: <AssignmentRoundedIcon /> },
];

const secondaryListItems = [
  { text: "Configurações", to: "/settings", icon: <SettingsRoundedIcon /> },
  { text: "Sobre", to: "/about", icon: <InfoRoundedIcon /> },
  { text: "Feedback", to: "/feedback", icon: <HelpRoundedIcon /> },
];

export default function MenuContent() {
  const { selectedInvitationExternalId } = useMenu();

  const { selectedMenu, setSelectedMenu } = useMenu();

  function handlePageChange(targetPage) {
    const isSamePage = targetPage === selectedMenu;
    const hasActiveFilter = !!selectedInvitationExternalId;

    if (isSamePage) return;

    const shouldShowAlert = hasActiveFilter;

    if (shouldShowAlert) {
      Swal.fire({
        title: "Atenção",
        text: "Ao sair, o filtro ativo será removido. Você tem certeza?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, desejo sair",
      }).then((result) => {
        if (result.isConfirmed) {
          setSelectedMenu(targetPage);
        }
      });
    } else {
      setSelectedMenu(targetPage);
    }
  }

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              component="a"
              selected={selectedMenu === item.text}
              onClick={() => handlePageChange(item.text)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              component="a"
              selected={selectedMenu === item.text}
              onClick={() => handlePageChange(item.text)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
