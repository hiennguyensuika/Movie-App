import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "hsla(37, 87%, 19%, 1)",
  "&:hover": {
    backgroundColor: "alpha(theme.palette.common.white, 0.25)",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(70),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(4.5, 0.5, 0.5, 0.5),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    marginRight: "100px",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
    "&::placeholder":{
      fontSize:"25px;"
    }
  },
}));

function MSearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchTerm}`
      );
      const data = await response.json();
      console.log("Search result:", data.results);
      setSearchResults(data.results);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  const handleChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  
    if (searchTerm.trim() === "") {
      setSearchResults([]);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={searchTerm}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
     <Box component="ul" sx={{ display: "flex", flexWrap: "wrap", pl: 0 }}>
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
              width: 300,
            }}
          >
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} width="100%" />
            <h2>{movie.title}</h2>
            <p>{movie.overview.length > 150 ? `${movie.overview.substring(0, 150)}...` : movie.overview}</p>
          </Box>
        ))}
      </Box>
    </Search>
  );
}

export default MSearchBar;
