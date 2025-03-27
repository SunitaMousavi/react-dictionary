import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dictionary.css";

export default function Dictionary() {
  const [keyword, setKeyword] = useState("");
  const [definition, setDefinition] = useState(null);

  function handleResponse(response) {
    console.log(response.data);
  }

  function handleError(erroe) {}

  useEffect(() => {
    // Avoid making API calls with empty keyword
    if (keyword) {
      // https://www.shecodes.io/learn/apis/dictionary
      const apiKey = process.env.REACT_APP_API_KEY;
      const apiUrl = `https://api.shecodes.io/dictionary/v1/define?word=${keyword}&key=${apiKey}`;
      axios.get(apiUrl).then(handleResponse).catch(handleError);
    }
  }, [keyword]);

  function search(event) {
    event.preventDefault();
    alert("Searching for a word");
  }

  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }

  return (
    <div className="Dictionary">
      <div className="container">
        <form onSubmit={search}>
          <input
            type="search"
            placeholder="ENTER A WORD"
            autoFocus="on"
            onChange={handleKeywordChange}
          />
          <input type="submit" value="SEARCH" />
        </form>
      </div>
    </div>
  );
}
