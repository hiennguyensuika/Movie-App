// import React, { useEffect, useState } from 'react';
// import { useParams } from "react-router-dom";
// import MSearchBar from "../components/MSearchBar";

// function SearchPage() {
//     const { search } = useParams();
//     const [searchResults, setSearchResults] = useState([]);

//     useEffect(() => {
//         const getSearchMovie = async () => {
//             try {
//                 const response = await fetch(
//                     `${process.env.REACT_APP_BASE_URL}search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${search}`
//                 );
//                 const data = await response.json();
//                 setSearchResults(data.results);
//                 console.log("Search result:", data.results);
//             } catch (error) {
//                 console.error("Error searching movies:", error);
//             }
//         };
//         getSearchMovie();
//     }, [search]);

//     return (
//         <div>
//             <MSearchBar />
//             {/* Render search results */}
//             {searchResults.map((result) => (
//                 <div key={result.id}>{result.title}</div>
//             ))}
//         </div>
//     );
// }

// export default SearchPage;
