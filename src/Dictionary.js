import React, { useState } from "react";
import axios from "axios";
import Definition from "./Definition";
import "./Dictionary.css";

export default function Dictionary() {
  const [keyword, setKeyword] = useState("");
  const [definition, setDefinition] = useState(null);

  function handleResponse(response) {
    console.log(response.data);
    setDefinition(response.data.meanings[0].definition);
  }

  function handleError(error) {
    console.error("Error fetching the definition:", error);
    setDefinition(null);
    alert(
      "Sorry, we couldn't find the definition for the word you were looking for."
    );
  }

  function search(event) {
    event.preventDefault();

    // https://www.shecodes.io/learn/apis/dictionary
    const apiKey = "f9006f5eft0a33fd9693b7da488a8o99";
    const apiUrl = `https://api.shecodes.io/dictionary/v1/define?word=${keyword}&key=${apiKey}`;
    axios.get(apiUrl).then(handleResponse).catch(handleError);
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
            autoFocus={true}
            onChange={handleKeywordChange}
          />
          <input type="submit" value="SEARCH" />
        </form>
        <Definition results={definition} />
      </div>
    </div>
  );
}
