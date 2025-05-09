import * as React from "react";
import Button from "@mui/material/Button";
import { FaDownload, FaPlus } from "react-icons/fa";
import { useMenu } from "contexts/menuContext";
import { useCreateData } from "contexts/createDataContext";
import { useData } from "contexts/getDataContext";

export default function CustomButtonCreate() {
  const { selectedMenu } = useMenu();
  const { exportInvitations } = useData();
  const { invitations } = useCreateData();

  const { createNewInvitation } = invitations;

  function ButtonWhereInvitation() {
    return (
      <>
        <Button
          variant="outlined"
          size="small"
          startIcon={<FaPlus fontSize="small" />}
          sx={{ minWidth: "fit-content" }}
          onClick={() => createNewInvitation()}
        >
          Criar um novo Convite
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<FaDownload fontSize="small" />}
          sx={{ minWidth: "fit-content" }}
          onClick={() => exportInvitations()}
        >
          Exportar Convites
        </Button>
      </>
    );
  }

  function ButtonWhereGuests() {
    return (
      <Button
        variant="outlined"
        size="small"
        startIcon={<FaPlus fontSize="small" />}
        sx={{ minWidth: "fit-content" }}
        onClick={() => {}}
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
