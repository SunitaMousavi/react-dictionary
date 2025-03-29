import React, { useState } from "react";
import axios from "axios";
import Definition from "./Definition";
import "./Dictionary.css";

export default function Dictionary() {
  const [keyword, setKeyword] = useState("");
  const [definition, setDefinition] = useState(null);

  function handleResponse(response) {
    console.log(response.data);
    setDefinition(response.data[0]);
  }

  function search(event) {
    event.preventDefault();

    // https://dictionaryapi.dev
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;
    axios.get(apiUrl).then(handleResponse);
  }

  function handleKeywordChange(event) {
    setKeyword(event.target.value);
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
        <input type="submit" value="SEARCH" />
      </form>
      <Definition results={definition} />
    </div>
  );
}
