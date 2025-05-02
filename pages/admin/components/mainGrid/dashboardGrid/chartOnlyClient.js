import { BarChart } from "@mui/x-charts";

export default function ChartOnlyClient({ result }) {
  if (!result || result.length === 0) return <p></p>;
  console.log("Dados recebidos:", result);

  return (
    <BarChart
      dataset={result}
      yAxis={[{ scaleType: "band", dataKey: "rol" }]}
      series={[{ dataKey: "confirmated" }]}
      colors={["green"]}
      layout="horizontal"
      xAxis={[{ label: "Nº Convidados" }]}
      height={400}
      width={656}
    />
  );
}
