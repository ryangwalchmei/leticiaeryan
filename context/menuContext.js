import { createContext, useContext, useEffect, useState } from "react";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import { FaPeopleLine } from "react-icons/fa6";
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

  const menuOptions = [
    {
      name: "Dashboard",
      Icon: <DashboardRoundedIcon color="inherit" sx={{ fontSize: "1rem" }} />,
    },
    {
      name: "Convidados",
      Icon: <FaPeopleLine color="inherit" sx={{ fontSize: "1rem" }} />,
    },
    {
      name: "Presentes",
      Icon: <DashboardRoundedIcon color="inherit" sx={{ fontSize: "1rem" }} />,
    },
    {
      name: "Convites",
      Icon: <DashboardRoundedIcon color="inherit" sx={{ fontSize: "1rem" }} />,
    },
  ];

  return (
    <MenuContext.Provider
      value={{
        selectedMenu,
        informations,
        selectedInvitationExternalId,
        menuOptions,
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
