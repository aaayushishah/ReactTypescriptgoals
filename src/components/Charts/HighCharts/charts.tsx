import Header from "../../Header/Header";
import { Box, Container } from "@mui/material";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useState } from "react";
import exporting from "highcharts/modules/exporting";
exporting(Highcharts);
// Load Highcharts modules
// require("highcharts/indicators/indicators")(Highcharts);
// require("highcharts/indicators/pivot-points")(Highcharts);
// require("highcharts/indicators/macd")(Highcharts);
// require("highcharts/modules/exporting")(Highcharts);
// require("highcharts/modules/map")(Highcharts);
const lineChartOptions: Highcharts.Options = {
  title: {
    text: "Simple Chart",
  },
  series: [
    {
      type: "line",
      data: [4, 2, 3, 5.5, 2.5, 6, 1, 3],
    },
    {
      type: "line",
      data: [2, 4, 5, 3, 1, 4, 5, 1],
    },
    {
      type: "line",
      data: [5, 6, 3, 2, 1, 2, 2, 2],
    },
  ],
  plotOptions: {
    series: {
      events: {
        click: (e) => {
          console.log("click event called: ", e.point);
        },
      },
    },
  },
};
const pieChartOptions: Highcharts.Options = {
  chart: {
    plotShadow: false,
    type: "pie",
  },
  title: {
    text: "Browser market shares in May, 2020",
    align: "left",
  },
  tooltip: {
    pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
  },
  accessibility: {
    point: {
      valueSuffix: "%",
    },
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      dataLabels: {
        enabled: true,
        format: "<b>{point.name}</b>: {point.percentage:.1f} %",
      },
    },
    series: {
      cursor: "pointer",
      point: {
        events: {
          click: (e) => {
            // console.log(this);
            console.log(e.point.name);
            console.log(e.point.y);
          },
        },
      },
    },
  },
  series: [
    {
      type: "pie",
      name: "Brands",
      data: [
        {
          name: "Chrome",
          y: 70.67,
          sliced: true,
          selected: true,
        },
        {
          name: "Edge",
          y: 14.77,
        },
        {
          name: "Firefox",
          y: 4.86,
        },
        {
          name: "Safari",
          y: 2.63,
        },
        {
          name: "Internet Explorer",
          y: 1.53,
        },
        {
          name: "Opera",
          y: 1.4,
        },
        {
          name: "Sogou Explorer",
          y: 0.84,
        },
        {
          name: "QQ",
          y: 0.51,
        },
        {
          name: "Other",
          y: 2.6,
        },
      ],
    },
  ],
};
const defaultLiveChartOptions: Highcharts.Options = {
  title: {
    text: "Live Chart",
  },
  series: [
    {
      type: "line",
      data: [1, 2, 3],
    },
  ],
  plotOptions: {
    series: {
      events: {
        click: (e) => {
          console.log("click event called: ", e.point);
        },
      },
    },
  },
};
const HighCharts = (props: HighchartsReact.Props) => {
  const [liveChartOptions, setLiveChartOptions] = useState<any>(
    defaultLiveChartOptions
  );
  useEffect(() => {
    let interval = setInterval(
      () =>
        setLiveChartOptions({
          title: { text: "Live Chart" },
          series: [
            {
              type: "line",
              data: [Math.random() * 3, Math.random() * 3, Math.random() * 3],
            },
            {
              type: "line",
              data: [Math.random() * 2, Math.random() * 2, Math.random() * 2],
            },
          ],
        }),
      1500
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <Container sx={{ display: "flex", gap: "200px" }}>
        <Box sx={{ width: "500px", height: "500px" }}>
          <HighchartsReact
            highcharts={Highcharts}
            options={lineChartOptions}
            // ref={chartComponentRef}
            {...props}
          />
        </Box>
        <Box sx={{ width: "500px", height: "500px" }}>
          <HighchartsReact
            highcharts={Highcharts}
            options={pieChartOptions}
            // ref={chartComponentRef}
            {...props}
          />
        </Box>
      </Container>
      <Container sx={{ display: "flex", gap: "200px" }}>
        <Box>
          <HighchartsReact highcharts={Highcharts} options={liveChartOptions} />
        </Box>
        <Box></Box>
      </Container>
    </>
  );
};

export default Header(HighCharts);
