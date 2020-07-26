import React from "react";
import { Chart } from "react-charts";
import { Typography } from "@material-ui/core";

export function MyChart({ history }) {
  const data = React.useMemo(
    () => [
      {
        label: "Series 2",
        data: history.map((item) => {
          return [history.indexOf(item) + 1, item.kda[3]];
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
        type: "linear",
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
    <div
      style={{
        width: "400px",
        height: "400px",
      }}
    >
      <Typography variant="h5">Thống kê KDA 40 trận gần đây</Typography>
      <Chart series={series} data={data} axes={axes} primaryCursor tooltip />
      {/* */}
    </div>
  );
}
