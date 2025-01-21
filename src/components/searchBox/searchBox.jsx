// import React, { useState } from "react";
// import axios from "axios";
// import "./searchBox.css";

// function SearchBox() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const debounce = (func, delay) => {
//     let timer;
//     return (args) => {
//       clearTimeout(timer);
//       timer = setTimeout(() => func(args), delay);
//     };
//   };
//   const fetchSuggestions = async (query) => {
//     if (query.length === 0) {
//       setSuggestions([]);
//       return;
//     }
//     setIsLoading(true);

//     try {
//       const response = await axios.get("http://localhost:3002/search", {
//         params: { title: query },
//       });

//       setSuggestions(response.data);
//     } catch (error) {
//       console.error("Error fetching suggestions:", error);
//       setSuggestions([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const debouncedFetchSuggestions = debounce(fetchSuggestions, 500);

//   const handleChange = (e) => {
//     const query = e.target.value;
//     setSearchQuery(suggestions);
//     debouncedFetchSuggestions(query);
//   };

//   const handleBlur = () => {
//     setTimeout(() => {
//       setSuggestions([]);
//     }, 200);
//   };
//   // Modified handleSuggestionClick to properly update the input value
//   //   const handleSuggestionClick = (suggestion) => {
//   //     // Immediately update the search query
//   //     setSearchQuery(suggestion);
//   //     // Clear suggestions
//   //     setSuggestions([]);
//   //     // Clear the loading state if it's set
//   //     setIsLoading(false);
//   //   };

//   //   // Modified to use mousedown instead of blur to prevent race conditions
//   //   const handleBlur = () => {
//   //     setTimeout(() => {
//   //       setSuggestions([]);
//   //     }, 200);
//   //   };
//   return (
//     <div className="flex flex-col mt-2 search-container h-10 relative">
//       <input
//         type="text"
//         className="search-box rounded-lg text-sm pl-2 h-12 w-[70rem]"
//         placeholder="Search products"
//         value={searchQuery}
//         onChange={handleChange}
//         onBlur={handleBlur}
//       />

//       {isLoading && <div className="loading-spinner">Loading...</div>}

//       {suggestions.length > 0 ? (
//         <div className="suggestions-box rounded-lg bg-[#F5F5F5] shadow-md mt-10 absolute z-10 w-full">
//           {suggestions.map((suggestion, index) => (
//             <div
//               key={index}
//               className="suggestion-item p-2 hover:bg-gray-200 cursor-pointer"
//             >
//               {suggestion}
//             </div>
//           ))}
//         </div>
//       ) : searchQuery && !isLoading ? (
//         <div>No results found</div>
//       ) : null}
//     </div>
//   );
// }

// export default SearchBox;


// import React, { useState } from "react";
// import axios from "axios";
// import "./searchBox.css";

// function SearchBox() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const debounce = (func, delay) => {
//     let timer;
//     return (...args) => {
//       clearTimeout(timer);
//       timer = setTimeout(() => func(...args), delay);
//     };
//   };

//   const fetchSuggestions = async (query) => {
//     if (query.length === 0) {
//       setSuggestions([]);
//       return;
//     }
//     setIsLoading(true);

//     try {
//       const response = await axios.get("http://localhost:3002/search", {
//         params: { title: query },
//       });

//       setSuggestions(response.data.length > 0 ? response.data : []);
//     } catch (error) {
//       console.error("Error fetching suggestions:", error);
//       setSuggestions([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const debouncedFetchSuggestions = debounce(fetchSuggestions, 500);

//   const handleChange = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     debouncedFetchSuggestions(query);
//   };

//   const handleBlur = () => {
//     setTimeout(() => {
//       setSuggestions([]);
//     }, 200);
//   };

//   const handleSuggestionClick = (suggestion) => {
//     setSearchQuery(suggestion);
//     setSuggestions([]);
//   };

//   return (
//     <div className="flex flex-col mt-2 search-container h-10 relative">
//       <input
//         type="text"
//         className="search-box rounded-lg text-sm pl-2 h-12 w-[70rem]"
//         placeholder="Search products"
//         value={searchQuery}
//         onChange={handleChange}
//         onBlur={handleBlur}
//       />

//       {isLoading && <div className="loading-spinner">Loading...</div>}

//       {suggestions.length > 0 ? (
//         <div className="suggestions-box rounded-lg bg-[#F5F5F5] shadow-md mt-10 absolute z-10 w-full">
//           {suggestions.map((suggestion, index) => (
//             <div
//               key={index}
//               className="suggestion-item p-2 hover:bg-gray-200 cursor-pointer"
//               onMouseDown={() => handleSuggestionClick(suggestion)} // Use onMouseDown to prevent blur issues
//             >
//               {suggestion}
//             </div>
//           ))}
//         </div>
//       ) : (
//         searchQuery &&
//         !isLoading && <div className="no-results">No results found</div>
//       )}
//     </div>
//   );
// }

// export default SearchBox;
import React, { useState } from "react";
import axios from "axios";
import "./searchBox.css";

function SearchBox() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const fetchSuggestions = async (query) => {
    if (query.length === 0) {
      setSuggestions([]);
      return;
    }
    setIsLoading(true);

    try {
      const response = await axios.get("http://localhost:3002/search", {
        params: { title: query },
      });

      setSuggestions(response.data.length > 0 ? response.data : []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 500);

  const handleChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedFetchSuggestions(query);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion); // Update input with the selected suggestion
    setSuggestions([]); // Clear suggestions to avoid "No results found"
  };

  const handleBlur = () => {
    setTimeout(() => {
      setSuggestions([]);
    }, 200);
  };

  return (
    <div className="flex flex-col mt-2 search-container h-10 relative">
      <input
        type="text"
        className="search-box rounded-lg text-sm pl-2 h-12 w-[70rem]"
        placeholder="Search products"
        value={searchQuery}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      {isLoading && <div className="loading-spinner">Loading...</div>}

      {suggestions.length > 0 ? (
        <div className="suggestions-box rounded-lg bg-[#F5F5F5] shadow-md mt-10 absolute z-10 w-full">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion-item p-2 hover:bg-gray-200 cursor-pointer"
              onMouseDown={() => handleSuggestionClick(suggestion)} // Prevent blur conflict
            >
              {suggestion}
            </div>
          ))}
        </div>
      ) : searchQuery && !isLoading && suggestions.length === 0 ? (
        <div className="no-results">No results found</div>
      ) : null}
    </div>
  );
}

export default SearchBox;
