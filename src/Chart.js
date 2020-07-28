import React from "react";
import { Chart } from "react-charts";
import { Typography, Divider } from "@material-ui/core";

export function MyChart({ history }) {
  const data1 = React.useMemo(
    () => [
      {
        label: "KDA",
        data: history.map((item) => {
          return [
            history.indexOf(item) + 1,
            item.kda[1] !== 0
              ? parseFloat((item.kda[0] + item.kda[2]) / item.kda[1]).toFixed(2)
              : item.kda[0] + item.kda[2],
          ];
        }),
      },
      {
        label: "Mạng hạ gục",
        data: history.map((item) => {
          return [history.indexOf(item) + 1, item.kda[0]];
        }),
      },
      {
        label: "Chết",
        data: history.map((item) => {
          return [history.indexOf(item) + 1, item.kda[1]];
        }),
      },
      {
        label: "Hỗ trợ",
        data: history.map((item) => {
          return [history.indexOf(item) + 1, item.kda[2]];
        }),
      },
    ],
    [history]
  );
  
  

  const series = React.useMemo(
    () => ({
      showPoints: false,
    }),
    []
  );
  const axes = React.useMemo(
    () => [
      {
        primary: true,
        type: "ordinal",
        position: "bottom",
      },
      {
        type: "linear",
        position: "left",
      },
    ],
    []
  );

  return (
    <div>
      <div
        style={{
          // width: "400px",
          height: "400px",
        }}
      >
        <Typography variant="h5">
          Thống kê KDA {history.length} trận gần đây
        </Typography>
        <Chart series={series} data={data1} axes={axes} primaryCursor tooltip />
        {/* */}
      </div>
      <br />
      <br />
      <Divider />
      <br />

    </div>
  );
}
