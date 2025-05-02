import { useMenu } from "contexts/menuContext";
import InvitationsGrid from "./invitationsGrid";
import GuestsGrid from "./guestGrid";

export default function MainGrid() {
  const { selectedMenu } = useMenu();

  switch (selectedMenu) {
    case "Dashboard":
      return;
    case "Convites":
      return <InvitationsGrid />;
    case "Convidados":
      return <GuestsGrid />;
    default:
      break;
  }
}
