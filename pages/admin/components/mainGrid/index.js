import { useMenu } from "contexts/menuContext";
import InvitationsGrid from "./invitationsGrid";
import GuestsGrid from "./guestGrid";
import DashboardGrid from "./dashboardGrid";

export default function MainGrid() {
  const { selectedMenu } = useMenu();

  switch (selectedMenu) {
    case "Dashboard":
      return <DashboardGrid />;
    case "Convites":
      return <InvitationsGrid />;
    case "Convidados":
      return <GuestsGrid />;
    default:
      break;
  }
}
