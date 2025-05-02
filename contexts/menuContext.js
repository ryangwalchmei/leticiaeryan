import { createContext, useContext, useEffect, useState } from "react";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import { FaPeopleLine, FaGifts } from "react-icons/fa6";
import { MdMailOutline } from "react-icons/md";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  const [selectedInvitationExternalId, setSelectedInvitationExternalId] =
    useState(undefined);
  const [giftList, setGiftList] = useState(undefined);

  useEffect(() => {
    if (selectedMenu !== "Convidados") {
      setSelectedInvitationExternalId(undefined);
    }
  }, [selectedMenu]);

  const informations = {
    maxInvitation: 100,
    maxGuest: 190,
    maxGuestByInvitation: 10,
    maxGifts: giftList?.length || 0,
    currentYear: new Date().getFullYear(),
  };

  const mainListItems = [
    {
      text: "Dashboard",
      to: "/dash",
      icon: <DashboardRoundedIcon size={22} />,
    },
    { text: "Convites", to: "/analytics", icon: <MdMailOutline size={22} /> },
    { text: "Convidados", to: "/clients", icon: <FaPeopleLine size={22} /> },
    { text: "Presentes", to: "/tasks", icon: <FaGifts size={22} /> },
  ];

  const secondaryListItems = [
    { text: "Configurações", to: "/settings", icon: <SettingsRoundedIcon /> },
    { text: "Sobre", to: "/about", icon: <InfoRoundedIcon /> },
    { text: "Feedback", to: "/feedback", icon: <HelpRoundedIcon /> },
  ];

  const menuListItems = {
    mainListItems,
    secondaryListItems,
  };

  return (
    <MenuContext.Provider
      value={{
        selectedMenu,
        informations,
        selectedInvitationExternalId,
        menuListItems,
        setGiftList,
        setSelectedMenu,
        setSelectedInvitationExternalId,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);
