import React, { useState } from "react";
import axios from "axios";
import Results from "./Results";
import "./Dictionary.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Dictionary() {
  // Stores user input word
  const [keyword, setKeyword] = useState("");
  // Stores API response
  const [results, setResults] = useState(null);

  function handleResponse(response) {
    console.log(response.data);
    // Save API response to state
    setResults(response.data);
  }

  function search(event) {
    event.preventDefault();

    // https://www.shecodes.io/learn/apis/dictionary
    const apiKey = process.env.REACT_APP_DICTIONARY_API_KEY;
    const apiUrl = `https://api.shecodes.io/dictionary/v1/define?word=${keyword}&key=${apiKey}`;
    axios.get(apiUrl).then(handleResponse);
  }

  function handleKeywordChange(event) {
    // Update keyword as the user types
    setKeyword(event.target.value.trim());
  }

  return (
    <div className="Dictionary">
      <form onSubmit={search}>
        <input
          type="search"
          placeholder="ENTER A WORD"
          autoFocus={true}
          onChange={handleKeywordChange}
        />
        <button type="submit" className="SearchButton" aria-label="Search">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ color: "#fdf8e8" }}
            size="2xl"
          />
        </button>
      </form>
      <Results results={results} />
    </div>
  );
}
