import React, { useEffect, useState } from "react";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import Grid from "@mui/material/Grid";
import TrendingCardGroup from "../components/TrendingCardGroup";
import Category from "../components/Category";

function HomePage() {
  const [loadingTrending, setLoadingTrending] = useState();
  const [trendingList, setTrendingList] = useState([]);
  const [cutInitial, setCutInitial] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingTrending(true);
        const res = await apiService.get(
          `/trending/all/day?api_key=${API_KEY}`
        );
        const result = res.data.results;
        setTrendingList(result);
        setCutInitial([...result].splice(16, 4));
        setLoadingTrending(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, []);

  return (
    <Grid
    container
    direction="column"
    justifyContent="center"
    alignItems="center"
    sx={{
      minHeight: "100vh",
      bgColor: "hsla(341, 18%, 3%, 1)",
      padding: "1rem",
    }}
  >
    <Grid
      item
      xs={12}
      sm={10}
      md={8}
      lg={6}
      xl={4}
      sx={{
        width: "100%",
        maxWidth: "100%",
      }}
    >
      <TrendingCardGroup
        trendingList={trendingList}
        cutInitial={cutInitial}
        loadingTrending={loadingTrending}
      />
    </Grid>

    <Grid
      item
      mt={5}
      xs={12}
      sm={10}
      md={8}
      lg={6}
      xl={4}
      sx={{
        width: "100%",
        maxWidth: "100%",
      }}
    >
      <Category />
    </Grid>
  </Grid>
);
}
export default HomePage;

