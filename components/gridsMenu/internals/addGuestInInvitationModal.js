import {
  Box,
  Button,
  Checkbox,
  Fade,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useCreateData } from "../../../context/createDataContext";

export default function ModalAddGuestInInvitation({
  selectedInvitation,
  open,
  close,
}) {
  const { createGuestForInvitation } = useCreateData().guests;

  const [selectedRoles, setPersonName] = React.useState([]);
  const [guestName, setNewGuestName] = React.useState("");
  const [guestEmail, setNewGuestEmail] = React.useState("");
  const [guestPhone, setNewGuestCell] = React.useState("");
  const [guestRoles, setRoles] = React.useState({
    is_family: false,
    is_friend: false,
    is_musician: false,
    is_witness: false,
    is_bridesmaid: false,
    is_bestman: false,
    is_bride: false,
    is_groom: false,
  });

  const [formValues, setFormValues] = React.useState({});

  useEffect(() => {
    setFormValues({
      name: guestName,
      email: guestEmail,
      cell: guestPhone,
      ...guestRoles,
      guest_of: "groom", // Supondo que "groom" seja o padrão, ajuste conforme necessário.
      invitation_id: selectedInvitation.id,
    });
  }, [guestName, guestEmail, guestPhone, guestRoles, selectedInvitation.id]);

  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 720,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleRoleSelectionChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);

    const map = {
      Família: "is_family",
      Amigo: "is_friend",
      Músico: "is_musician",
      Testemunha: "is_witness",
      Madrinha: "is_bridesmaid",
      Padrinho: "is_bestman",
      Noiva: "is_bride",
      Noivo: "is_groom",
    };

    setRoles((prevRoles) => {
      const updatedRoles = { ...prevRoles };
      value.forEach((role) => {
        const key = map[role];
        if (key) updatedRoles[key] = true;
      });
      return updatedRoles;
    });
  };

  const handleSubmit = () => {
    createGuestForInvitation(formValues);
    close();
  };

  return (
    <Modal
      open={open}
      onClose={() => close()}
      aria-labelledby="keep-mounted-modal-title"
    >
      <Fade in={open}>
        <Box sx={styleModal}>
          <Typography variant="h6">
            Criar Convidado - {selectedInvitation.name}
          </Typography>
          <Grid container spacing={2}>
            {/* Campos de Entrada */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                value={guestName}
                onChange={(e) => setNewGuestName(e.target.value)}
                label="Nome"
                variant="standard"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                value={guestEmail}
                onChange={(e) => setNewGuestEmail(e.target.value)}
                label="E-mail"
                variant="standard"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                value={guestPhone}
                onChange={(e) => setNewGuestCell(e.target.value)}
                label="Celular"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InputLabel>Tag</InputLabel>
              <Select
                fullWidth
                multiple
                value={selectedRoles}
                onChange={handleRoleSelectionChange}
                input={<OutlinedInput />}
                renderValue={(selected) => selected.join(", ")}
              >
                {[
                  "Padrinho",
                  "Madrinha",
                  "Família",
                  "Amigo",
                  "Músico",
                  "Testemunha",
                  "Dama de honra",
                ].map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={selectedRoles.includes(name)} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>

          <Box mt={3} textAlign="right">
            <Button onClick={handleSubmit} variant="outlined">
              Cadastrar
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
