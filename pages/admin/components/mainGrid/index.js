import { useMenu } from "contexts/menuContext";
import InvitationsGrid from "./invitationsGrid";

export default function MainGrid() {
  const { selectedMenu } = useMenu();

  switch (selectedMenu) {
    case "Dashboard":
      return;
    case "Convites":
      return <InvitationsGrid />;
    case "Convidados":
      return;
    default:
      break;
  }
}
