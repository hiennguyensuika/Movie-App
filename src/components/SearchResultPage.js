import React from "react";
import Box from "@mui/material/Box";

function SearchResultsPage({ searchResults }) {
  return (
    <Box
      component="ul"
      sx={{
        position: "relative",
        display: "flex",
        flexWrap: "wrap",
        pl: 0,
        justifyContent: "center",
      }}
    >
      {searchResults.map((movie) => (
        <Box
          key={movie.id}
          component="li"
          sx={{
            bgColor: "background.paper",
            boxShadow: 1,
            p: 2,
            m: 1,
            borderRadius: 2,
            width: "100%",
            maxWidth: "300px",
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

export default SearchResultsPage;