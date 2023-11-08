import React, { useState } from "react";
import {useHistory} from "react-router-dom";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";


const Search = styled("div")(({ theme }) => ({
  position: "relative", // Change position to relative
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "hsla(302, 19%, 77%, 0.7)",
  "&:hover": {
    backgroundColor: "alpha(theme.palette.common.white, 0.25)",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(10),
  },
})); 

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(1.5),
  height: "100%",
  position: "absolute",
  top: "50%", // Position at the vertical center
  transform: "translateY(-50%)", // Translate up by 50% of its height
  pointerEvents: "none",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(0.5, 1, 1, 1),
    paddingLeft: `calc(1em + ${theme.spacing(10)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1, 2), // Adjust the padding for smaller screens
      fontSize: "16px", // Adjust the font size for smaller screens
    },
    "&::placeholder": {
      fontSize: "16px",
    },
  },
}));

function MSearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const history = useHistory();

  const handleSearch = async () => {
    // navigate(`/search/${searchTerm}`
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchTerm}`
      );
      const data = await response.json();
      console.log("Search result:", data.results);
      setSearchResults(data.results);
      history.push(`/search/${searchTerm}`); // Navigate to the search results page
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
      <Box
        component="ul"
        sx={{
          position: "relative",
          display: "flex",
          flexWrap: "wrap",
          pl: 0,
          justifyContent: "center", // Center the search result boxes
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
              maxWidth: "300px", // Adjust the maximum width of each search result box
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
    </Search>
  );
}

export default MSearchBar;