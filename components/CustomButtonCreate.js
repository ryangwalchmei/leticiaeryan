import * as React from "react";
import Button from "@mui/material/Button";
import { FaPlus } from "react-icons/fa";
import { useMenu } from "../context/menuContext";
import { useCreateData } from "../context/createDataContext";
import Swal from "sweetalert2";

export default function CustomButtonCreate() {
  const { selectedMenu, setSelectedMenu } = useMenu();
  const { invitations } = useCreateData();

  const { createNewInvitation } = invitations;

  function ButtonWhereInvitation() {
    return (
      <Button
        variant="outlined"
        size="small"
        startIcon={<FaPlus fontSize="small" />}
        sx={{ minWidth: "fit-content" }}
        onClick={() => createNewInvitation()}
      >
        Criar um novo Convite
      </Button>
    );
  }

  function ButtonWhereGuests() {
    return (
      <Button
        variant="outlined"
        size="small"
        startIcon={<FaPlus fontSize="small" />}
        sx={{ minWidth: "fit-content" }}
        onClick={() => {
          setSelectedMenu("Convites");
          Swal.fire("Selecione um convite primeiro!");
        }}
      >
        Criar um novo Convidado
      </Button>
    );
  }

  function ButtonWhereGifts() {
    return (
      <Button
        variant="outlined"
        size="small"
        startIcon={<FaPlus fontSize="small" />}
        sx={{ minWidth: "fit-content" }}
      >
        Cadastrar um novo Presente
      </Button>
    );
  }

  switch (selectedMenu) {
    case "Convites":
      return ButtonWhereInvitation();
    case "Convidados":
      return ButtonWhereGuests();
    case "Presentes":
      return ButtonWhereGifts();
    default:
      return;
  }
}
