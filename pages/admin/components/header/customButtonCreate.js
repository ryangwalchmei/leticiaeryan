import * as React from "react";
import Button from "@mui/material/Button";
import { FaDownload, FaFilter, FaPlus } from "react-icons/fa";
import { useMenu } from "contexts/menuContext";
import { useCreateData } from "contexts/createDataContext";
import { useData } from "contexts/getDataContext";
import Swal from "sweetalert2";
import { Switch } from "@mui/material";

export default function CustomButtonCreate() {
  const { selectedMenu, setSelectedMenu } = useMenu();
  const {
    exportInvitations,
    isFilterConfirmedGuests,
    setIsFilterConfirmedGuests,
  } = useData();
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
    function navigateToInvitation() {
      setSelectedMenu("Convites");
      Swal.fire("Você precisa adicionar um convidado em um convite.");
    }

    return (
      <>
        <Button
          variant="outlined"
          size="small"
          startIcon={<FaPlus fontSize="small" />}
          sx={{ minWidth: "fit-content" }}
          onClick={() => navigateToInvitation()}
        >
          Criar um novo Convidado
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<FaFilter fontSize="small" />}
          sx={{ minWidth: "fit-content" }}
        >
          Filtrar Confirmados
          <Switch
            checked={isFilterConfirmedGuests}
            defaultValue={false}
            onChange={(e) => setIsFilterConfirmedGuests(e.target.checked)}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Button>
      </>
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
