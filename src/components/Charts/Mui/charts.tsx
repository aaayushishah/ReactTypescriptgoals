import { PieChart } from "@mui/x-charts/PieChart";
import Header from "../../Header/Header";
import { Box, Container } from "@mui/material";
import { BarChart, LineChart } from "@mui/x-charts";

const dataPie = [
  { id: 0, value: 10, label: "series A" },
  { id: 1, value: 15, label: "series B" },
  { id: 2, value: 20, label: "series C" },
];
const Muicharts = () => {
  return (
    <>
      <Container sx={{ display: "flex", gap: "200px" }}>
        <Box>
          <PieChart
            series={[
              {
                arcLabel: (item) => `${item.label} (${item.value})`,
                data: dataPie,
              },
            ]}
            width={400}
            height={400}
          />
        </Box>
        <Box>
          <BarChart
            xAxis={[
              { scaleType: "band", data: ["group A", "group B", "group C"] },
            ]}
            series={[
              { data: [4, 3, 5] },
              { data: [1, 6, 3] },
              { data: [2, 5, 6] },
            ]}
            width={500}
            height={400}
          />
        </Box>
      </Container>
      <Container sx={{ display: "flex", gap: "200px" }}>
        <Box>
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
              },
            ]}
            width={400}
            height={400}
          />
        </Box>
        <Box>
          <LineChart
            xAxis={[{ data: [1, 10, 30, 50, 70, 90, 100] }]}
            yAxis={[
              { id: "linearAxis", scaleType: "linear" },
              { id: "logAxis", scaleType: "log" },
            ]}
            series={[
              { yAxisKey: "linearAxis", data: [1, 10, 30, 50, 70, 90, 100], label: "linear" },
              { yAxisKey: "logAxis", data: [1, 10, 30, 50, 70, 90, 100], label: "log" },
            ]}
            leftAxis="linearAxis"
            rightAxis="logAxis"
            width={500}
            height={400}
          />
        </Box>
      </Container>
    </>
  );
};

export default Header(Muicharts);
