import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function SearchResult() {
  const { search } = useParams();
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${search}`
      );
      const data = await response.json();
      console.log("Search result:", data.results);
      setMovies(data.results);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  useEffect(() => {
    handleSearch();
  },[handleSearch]);

  return (
    <Box
      component="ul"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        pl: 0,
        justifyContent: "center",
      }}
    >
      {movies.map((movie) => (
        <Box
          key={movie.id}
          sx={{
            bgColor: "background.paper",
            boxShadow: 1,
            p: 2,
            m: 1,
            borderRadius: 2,
            width: "100%",
            maxWidth: 300, // Limit the width of each search result box
          }}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            width="100%"
          />
          <h2>{movie.title}</h2>
          <p>
            {movie.overview.length > 150
              ? `${movie.overview.substring(0, 150)}...`
              : movie.overview}
          </p>
        </Box>
      ))}
    </Box>
  );
}

export default SearchResult;