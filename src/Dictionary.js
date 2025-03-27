import React, { useState } from "react";
import axios from "axios";
import "./Dictionary.css";

export default function Dictionary() {
  const [keyword, setKeyword] = useState(null);

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
          <input type="search" placeholder="ENTER A WORD" autoFocus="on" />
          <input type="submit" value="SEARCH" onChange={handleKeywordChange} />
        </form>
      </div>
    </div>
  );
}
