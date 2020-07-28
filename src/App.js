import React, { useState } from "react";
import "./App.css";
import {
  TextField,
  Button,
  Container,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import Axios from "axios";
import { queues } from "./queues";
import moment from "moment";
import "moment/locale/vi";
import { champions } from "./champion";
import { MyChart } from "./Chart";
function App() {
  const [ingame, setIngame] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(5);
  const handleChange = (e, value) => {
    setIngame(e.target.value);
  };

  const handleSetLimit = (e, value) => {
    setLimit(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let something = [];
    setLoading(true);
    ingame === null || ingame === ""
      ? alert("Điền ingame vào")
      : Axios.get(
          `https://cors-anywhere.herokuapp.com/https://acs-garena.leagueoflegends.com/v1/players?name=${ingame}&region=VN`
        )
          .then((response) => {
            return Axios.get(
              `https://cors-anywhere.herokuapp.com/https://acs-garena.leagueoflegends.com/v1/stats/player_history/VN/${response.data.accountId}?begIndex=0&endIndex=20&queue=4&queue=42&queue=410&queue=420&queue=440`
            );
          })
          .then((result1) => {
            let data = result1.data.games.games.map((item) => {
              return {
                time: moment(item.gameCreation).format("L"),
                realTime: item.gameCreation,
                duration: `${Math.floor(item.gameDuration / 60)}:${
                  item.gameDuration - Math.floor(item.gameDuration / 60) * 60
                }`,
                queue: queues.find((queue) => {
                  return queue.id === item.queueId;
                }).name,
                result: item.participants[0].stats.win,
                championName: Object.keys(champions[0]).filter((champ) => {
                  return (
                    parseInt(champions[0][champ].key) ===
                    item.participants[0].championId
                  );
                })[0],
                role: item.participants[0].timeline.role,
                kda: [
                  item.participants[0].stats.kills,
                  item.participants[0].stats.deaths,
                  item.participants[0].stats.assists,
                  item.participants[0].stats.deaths !== 0
                    ? item.participants[0].stats.kills +
                      item.participants[0].stats.assists /
                        item.participants[0].stats.deaths
                    : item.participants[0].stats.kills +
                      item.participants[0].stats.assists,
                ],
                items: [
                  item.participants[0].stats.item0,
                  item.participants[0].stats.item1,
                  item.participants[0].stats.item2,
                  item.participants[0].stats.item3,
                  item.participants[0].stats.item4,
                  item.participants[0].stats.item5,
                  item.participants[0].stats.item6,
                ],
                spells: [
                  item.participants[0].spell1Id,
                  item.participants[0].spell2Id,
                ],
                longest_time_living: item.participants[0].stats.longestTimeSpentLiving,
                vision_score: item.participants[0].stats.visionScore,
                
              };
            });
            something.push(...data);
            return Axios.get(
              `https://cors-anywhere.herokuapp.com/https://acs-garena.leagueoflegends.com/v1/stats/player_history/VN/${result1.data.accountId}?begIndex=21&endIndex=41&queue=4&queue=42&queue=410&queue=420&queue=440`
            );
          })
          .then((result2) => {
            let data1 = result2.data.games.games.map((item) => {
              return {
                time: moment(item.gameCreation).format("L"),
                realTime: item.gameCreation,
                duration: `${Math.floor(item.gameDuration / 60)}:${
                  item.gameDuration - Math.floor(item.gameDuration / 60) * 60
                }`,
                queue: queues.find((queue) => {
                  return queue.id === item.queueId;
                }).name,
                result: item.participants[0].stats.win,
                championName: Object.keys(champions[0]).filter((champ) => {
                  return (
                    parseInt(champions[0][champ].key) ===
                    item.participants[0].championId
                  );
                })[0],
                role: item.participants[0].timeline.role,
                kda: [
                  item.participants[0].stats.kills,
                  item.participants[0].stats.deaths,
                  item.participants[0].stats.assists,
                ],
                items: [
                  item.participants[0].stats.item0,
                  item.participants[0].stats.item1,
                  item.participants[0].stats.item2,
                  item.participants[0].stats.item3,
                  item.participants[0].stats.item4,
                  item.participants[0].stats.item5,
                  item.participants[0].stats.item6,
                ],
              };
            });
            something.push(...data1);
            setHistory(
              something
                .sort((a, b) => {
                  return new Date(b.realTime) - new Date(a.realTime);
                })
                .slice(0, limit)
            );
            setLoading(false);
          });
  };
  return (
    <div>
      <p className="App">
        <h1>LMHT Analytics</h1>
        <FormControl>
          <TextField label="Ingame" onChange={handleChange} />
        </FormControl>
        <FormControl style={{ width: 100, marginLeft: 10 }}>
          <InputLabel id="demo-simple-select-helper-label">
            Số trận xem
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={limit}
            onChange={handleSetLimit}
          >
            <MenuItem value={5}>
              <em>-- Chọn</em>
            </MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={40}>40</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" onClick={handleSubmit}>
          Tìm kiếm
        </Button>
        <p> {loading ? "Loading..." : ""}</p>
      </p>
      <Container>
        {history.length > 0 ? (
          <div>
            <MyChart history={history.reverse()} />
            <br />
            <br />
            <section>
              <div>
                {(history.filter((item) => {
                  return item.result === true;
                }).length /
                  history.length) *
                  100}{" "}
                % tỉ lệ thắng
              </div>
              {/* <div>{<p>Hello World</p>}</div> */}
            </section>
          </div>
        ) : (
          ""
        )}
        <br />
        <br />

        <br />
        {history.map((item) => {
          return (
            <div>
              <Grid
                container
                spacing={1}
                style={{ padding: 10, border: "1px solid gainsboro" }}
              >
                <Grid item xs={12} lg={1}>
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/10.14.1/img/champion/${item.championName}.png`}
                    style={{ width: 50, height: 50 }}
                    alt="champuon"
                  />
                </Grid>
                <Grid item xs={12} lg={1} style={{ paddingTop: 20 }}>
                  <span>
                    {item.kda[0]}/{item.kda[1]}/{item.kda[2]}
                    <br />
                    {item.kda[1] !== 0
                      ? parseFloat(
                          (item.kda[0] + item.kda[2]) / item.kda[1]
                        ).toFixed(2)
                      : item.kda[0] + item.kda[2]}
                  </span>
                  <br />
                  <span style={{ color: item.result ? "green" : "red" }}>
                    <b>{item.result ? "Thắng" : "Thua"}</b>
                  </span>
                </Grid>
                <Grid xs={12} item lg={5} style={{ display: "flex" }}>
                  {item.items
                    ? item.items.map((num) => {
                        return num !== 0 ? (
                          <img
                            style={{ margin: 4, width: 50, height: 50 }}
                            alt="do"
                            src={`https://ddragon.leagueoflegends.com/cdn/10.14.1/img/item/${num}.png`}
                          />
                        ) : (
                          ""
                        );
                      })
                    : ""}
                </Grid>
                <Grid item xs={12} lg={1} style={{ paddingTop: 20 }}>
                  <span>{item.time}</span>
                  <br />
                  <span>{item.duration}</span>
                </Grid>
              </Grid>
            </div>
          );
        })}
      </Container>
    </div>
  );
}

export default App;
