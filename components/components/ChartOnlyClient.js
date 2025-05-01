import { BarChart } from "@mui/x-charts";

export default function ChartOnlyClient({ result }) {
  return (
    <BarChart
      dataset={result}
      yAxis={[{ scaleType: "band", dataKey: "rol", domainLimit: "nice" }]}
      series={[{ dataKey: "confirmated" }]}
      colors={["green"]}
      layout="horizontal"
      xAxis={[{ label: "Nº Convidados" }]}
      height={400}
      width={656}
    />
  );
}
