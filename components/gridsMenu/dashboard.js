import { Box, Grid, Stack, Typography } from "@mui/material";
import StatCard from "../StatCard";
import HighlightedCard from "../HighlightedCard";
import SessionsChart from "../SessionsChart";
import { Gauge, PieChart } from "@mui/x-charts";
// import PageViewsBarChart from "../PageViewsBarChart";
// import ChartUserByCountry from "../ChartUserByCountry";
import { Copyright } from "@mui/icons-material";
import { useMenu } from "../../context/menuContext";
import { useData } from "../../context/dataContexts";
import Link from "next/link";
import dynamic from "next/dynamic";

const ChartOnlyClient = dynamic(() => import("../components/ChartOnlyClient"), {
  ssr: false,
});

export default function DashboardGrid() {
  const { informations } = useMenu();
  const { guestList, confirmationSummary } = useData();

  const dataCards = [
    {
      title: "Convites Criados",
      value: `${confirmationSummary.invitation.total}`,
      interval: `de ${informations.maxInvitation} convites`,
      chart: (
        <Gauge
          color="primary"
          cornerRadius="50%"
          text={({ value }) => `${value}%`}
          value={
            Math.round(
              (Number(confirmationSummary.invitation.total) /
                informations.maxInvitation) *
                100,
            ) || 0
          }
        />
      ),
    },
    {
      title: "Entrega dos Convites Digitais",
      value: `${confirmationSummary.invitation.confirmed}`,
      interval: `de ${confirmationSummary.invitation.total} convites`,
      chart: (
        <PieChart
          series={[
            {
              data: [
                {
                  id: 0,
                  value: confirmationSummary.invitation.pending,
                  label: "Pendentes",
                },
                {
                  id: 1,
                  value: confirmationSummary.invitation.confirmed,
                  label: "entregues",
                },
                {
                  id: 2,
                  value: confirmationSummary.invitation.declined,
                  label: "não entregues",
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
      value: confirmationSummary.guest.confirmed,
      interval: `de ${confirmationSummary.guest.total} convidados`,
      chart: (
        <PieChart
          series={[
            {
              data: [
                {
                  id: 0,
                  value: confirmationSummary.guest.pending,
                  label: "Pendentes",
                },
                {
                  id: 1,
                  value: confirmationSummary.guest.confirmed,
                  label: "Confirmado",
                },
                {
                  id: 2,
                  value: confirmationSummary.guest.declined,
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
      value: `${confirmationSummary.gifts.receivedCount}`,
      interval: `e ${confirmationSummary.gifts.pending || 0} foram prometidos`,
      trend: "neutral",
      chart: (
        <PieChart
          series={[
            {
              data: [
                {
                  id: 1,
                  value: confirmationSummary.gifts.receivedCount,
                  label: "Recebidos",
                },
                {
                  id: 0,
                  value: confirmationSummary.gifts.available,
                  label: "Disponíveis",
                },
                {
                  id: 2,
                  value: confirmationSummary.gifts.pending,
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
  const guestCategories = {
    Padrinho: { rol: "Padrinho", value: 0, confirmated: 0, rejeited: 0 },
    Madrinha: { rol: "Madrinha", value: 0, confirmated: 0, rejeited: 0 },
    Família: { rol: "Família", value: 0, confirmated: 0, rejeited: 0 },
    Amigos: { rol: "Amigos", value: 0, confirmated: 0, rejeited: 0 },
    Músico: { rol: "Músico", value: 0, confirmated: 0, rejeited: 0 },
    Testemunha: { rol: "Testemunha", value: 0, confirmated: 0, rejeited: 0 },
  };

  guestList?.forEach((guest) => {
    const status = guest.confirmation_status;
    const update = (key) => {
      guestCategories[key].value++;
      if (status === "confirmed") guestCategories[key].confirmated++;
      if (status === "declined") guestCategories[key].rejeited++;
    };

    if (guest?.is_bestman) update("Padrinho");
    if (guest?.is_bridesmaid) update("Madrinha");
    if (guest?.is_family) update("Família");
    if (guest?.is_friend) update("Amigos");
    if (guest?.is_musician) update("Músico");
    if (guest?.is_witness) update("Testemunha");
  });

  const result = Object.values(guestCategories);

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* cards */}
      <Typography component="h4" variant="h4" sx={{ mb: 2 }}>
        Olá, Letícia
      </Typography>

      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(4) }}
      >
        {dataCards?.map((card, index) => (
          <Grid item key={index} xs={12} sm={6} lg={3}>
            <StatCard {...card} />
          </Grid>
        ))}
        <Grid item xs={12} sm={6} lg={3}>
          <HighlightedCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <SessionsChart
            title={"Confirmações por categoria"}
            subtitle={"Contando cada convidado em todos suas guestCategories"}
            value={confirmationSummary.guest.confirmed}
            Chart={<ChartOnlyClient result={result} />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          {/* <PageViewsBarChart /> */}
        </Grid>
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}></Typography>
      <Grid container spacing={2} columns={12}>
        <Grid item xs={12} lg={9}></Grid>
        <Grid item xs={12} lg={3}>
          <Stack gap={2} direction={{ xs: "column", sm: "row", lg: "column" }}>
            {/* <ChartUserByCountry /> */}
          </Stack>
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
      <Link href={"https://gwalchmei.com.br"} target="_blank">
        gwalchmei.com.br
      </Link>
    </Box>
  );
}
