import React, { useState } from "react";
import axios from "axios";
import Results from "./Resutls";

export default function Dictionary() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [savedWords, setSavedWords] = useState([]);

  function handleKeywordChange(response) {
    setKeyword(response.target.value);
  }

  async function search(event) {
    event.preventDefault();
    if (!keyword) return; // don't search empty keyword
    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`
      );
      setResults(response.data[0]); // store first result in state
    } catch (error) {
      setResults(null); // clear previous result if error
      alert(
        "Sorry, we couldn't find the word you were looking for. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleSave(word, meaning) {
    if (!savedWords.some((item) => item.word === word)) {
      setSavedWords([...savedWords, { word, meaning }]);
    }
  }

  return (
    <div className="Dictionary">
      <input
        type="text"
        placeholder="Type a word..."
        value={keyword}
        autoFocus={true}
        onChange={handleKeywordChange}
      />
      <button onClick={search}>Search</button>

      <Results results={results} onSave={handleSave} />
      {loading && <p>Loading...</p>}
    </div>
  );
}
