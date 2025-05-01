import * as React from "react";
import DashboardGrid from "./gridsMenu/dashboard";
import { useMenu } from "../context/menuContext";
import InvitationsGrid from "./gridsMenu/invitations";
import GuestsGrid from "./gridsMenu/guests";

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
