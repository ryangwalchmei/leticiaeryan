import { Box, Grid, Typography } from "@mui/material";
import SessionsChart from "./sessionsChart";
import { Gauge, PieChart } from "@mui/x-charts";
import dynamic from "next/dynamic";
import { useMenu } from "contexts/menuContext";
import { useData } from "contexts/getDataContext";
import StatCard from "./statCard";
import { useEffect, useMemo, useState } from "react";
import RenderOnLoadingData from "../../isLoading";

const ChartOnlyClient = dynamic(() => import("./chartOnlyClient"), {
  ssr: false,
});

export default function DashboardGrid() {
  const { informations } = useMenu();
  const { guestList, confirmationSummary = {} } = useData();

  const [guestCategories, setGuestCategories] = useState({
    Padrinho: { rol: "Padrinho", value: 0, confirmated: 0, rejeited: 0 },
    Madrinha: { rol: "Madrinha", value: 0, confirmated: 0, rejeited: 0 },
    Família: { rol: "Família", value: 0, confirmated: 0, rejeited: 0 },
    Amigos: { rol: "Amigos", value: 0, confirmated: 0, rejeited: 0 },
    Músico: { rol: "Músico", value: 0, confirmated: 0, rejeited: 0 },
    Testemunha: { rol: "Testemunha", value: 0, confirmated: 0, rejeited: 0 },
  });

  useEffect(() => {
    const baseCategories = {
      Padrinho: { rol: "Padrinho", value: 0, confirmated: 0, rejeited: 0 },
      Madrinha: { rol: "Madrinha", value: 0, confirmated: 0, rejeited: 0 },
      Família: { rol: "Família", value: 0, confirmated: 0, rejeited: 0 },
      Amigos: { rol: "Amigos", value: 0, confirmated: 0, rejeited: 0 },
      Músico: { rol: "Músico", value: 0, confirmated: 0, rejeited: 0 },
      Testemunha: { rol: "Testemunha", value: 0, confirmated: 0, rejeited: 0 },
    };

    guestList?.forEach((guest) => {
      const status = guest?.confirmation_status;
      const update = (key) => {
        baseCategories[key].value++;
        if (status === "confirmed") baseCategories[key].confirmated++;
        if (status === "declined") baseCategories[key].rejeited++;
      };

      if (guest?.is_bestman) update("Padrinho");
      if (guest?.is_bridesmaid) update("Madrinha");
      if (guest?.is_family) update("Família");
      if (guest?.is_friend) update("Amigos");
      if (guest?.is_musician) update("Músico");
      if (guest?.is_witness) update("Testemunha");
    });

    setGuestCategories(baseCategories);
  }, [guestList]);

  const dataCards = [
    {
      title: "Convites Criados",
      value: String(confirmationSummary?.invitation?.total || 0),
      interval: `de ${informations?.maxInvitation || 0} convites`,
      chart: (
        <Gauge
          color="primary"
          cornerRadius="50%"
          text={({ value }) => `${value}%`}
          value={Math.round(
            ((confirmationSummary?.invitation?.total || 0) /
              (informations?.maxInvitation || 1)) *
              100,
          )}
        />
      ),
    },
    {
      title: "Entrega dos Convites Digitais",
      value: String(confirmationSummary?.invitation?.confirmed || 0),
      interval: `de ${confirmationSummary?.invitation?.total || 0} convites`,
      chart: (
        <PieChart
          series={[
            {
              data: [
                {
                  id: 0,
                  value: confirmationSummary?.invitation?.pending || 0,
                  label: "Pendentes",
                },
                {
                  id: 1,
                  value: confirmationSummary?.invitation?.confirmed || 0,
                  label: "Entregues",
                },
                {
                  id: 2,
                  value: confirmationSummary?.invitation?.declined || 0,
                  label: "Não entregues",
                },
              ],
              highlightScope: { faded: "global", highlighted: "item" },
            },
          ]}
          colors={["gray", "green", "lightcoral"]}
          height={100}
          width={200}
        />
      ),
    },
    {
      title: "Convidados Confirmados",
      value: String(confirmationSummary?.guest?.confirmed || 0),
      interval: `de ${confirmationSummary?.guest?.total || 0} convidados`,
      chart: (
        <PieChart
          series={[
            {
              data: [
                {
                  id: 0,
                  value: confirmationSummary?.guest?.pending || 0,
                  label: "Pendentes",
                },
                {
                  id: 1,
                  value: confirmationSummary?.guest?.confirmed || 0,
                  label: "Confirmado",
                },
                {
                  id: 2,
                  value: confirmationSummary?.guest?.declined || 0,
                  label: "Rejeitado",
                },
              ],
            },
          ]}
          colors={["gray", "green", "lightcoral"]}
          width={200}
          height={100}
        />
      ),
    },
    {
      title: "Presentes ganhos",
      value: String(confirmationSummary?.gifts?.receivedCount || 0),
      interval: `e ${confirmationSummary?.gifts?.pending || 0} foram prometidos`,
      chart: (
        <PieChart
          series={[
            {
              data: [
                {
                  id: 1,
                  value: confirmationSummary?.gifts?.receivedCount || 0,
                  label: "Recebidos",
                },
                {
                  id: 0,
                  value: confirmationSummary?.gifts?.available || 0,
                  label: "Disponíveis",
                },
                {
                  id: 2,
                  value: confirmationSummary?.gifts?.pending || 0,
                  label: "Pendentes",
                },
              ],
            },
          ]}
          colors={["green", "gray", "lightcoral"]}
          width={200}
          height={100}
        />
      ),
    },
  ];

  const result = useMemo(
    () => Object.values(guestCategories),
    [guestCategories],
  );

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography component="h4" variant="h4" sx={{ mb: 2 }}>
        Olá, Letícia
      </Typography>

      <RenderOnLoadingData
        dependencies={[
          "isLoadingInvitations",
          "isLoadingGuests",
          "isLoadingGifts",
        ]}
      >
        <Grid container spacing={2} columns={12} sx={{ mb: 4 }}>
          {dataCards.map((card, index) => (
            <Grid item key={index} xs={12} sm={6} lg={3}>
              <StatCard {...card} />
            </Grid>
          ))}

          <Grid item xs={12} md={6}>
            <SessionsChart
              title="Confirmações por categoria"
              subtitle="Contando cada convidado em todas as suas categorias"
              value={confirmationSummary?.guest?.confirmed || 0}
              Chart={<ChartOnlyClient result={result} />}
            />
          </Grid>
        </Grid>
      </RenderOnLoadingData>
    </Box>
  );
}
