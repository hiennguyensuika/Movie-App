import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import {useNavigate} from "react-router-dom";


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "hsla(302, 19%, 77%, 0.7)",
  "&:hover": {
    backgroundColor: "alpha(theme.palette.common.white, 0.25)",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "250px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(10),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(3, 1),
  height: "100%",
  position: "absolute",
  pointerEvents: "none"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(3, 2.5, 2.5, 2.5),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    marginRight: "100px",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
    "&::placeholder":{
      fontSize:"20px",
    }
  },
}));


function MSearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
const navigate = useNavigate();

  const handleSearch = async () => {
    navigate(`search/${searchTerm}`)
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchTerm}`
      );
      const data = await response.json();
      console.log("Search result:", data.results);
      setSearchTerm(data.results);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  const handleChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  
    if (searchTerm.trim() === "") {
      setSearchTerm([]);
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
        // value={searchTerm}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />

    </Search>
  );
}

export default MSearchBar;
