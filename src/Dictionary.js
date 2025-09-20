import React, { useState } from "react";
import axios from "axios";
import Results from "./Results";
import SavedWords from "./SavedWords";

export default function Dictionary() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [savedWords, setSavedWords] = useState([]);

  // Update input field
  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }

  // Search API
  async function search(event) {
    event.preventDefault();
    if (!keyword) return; // avoid empty search
    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`
      );
      setResults(response.data[0]); // take first result
    } catch (error) {
      setResults(null); // clear result on error
      alert(
        "Sorry, we couldn't find the word you were looking for. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  // Save a word (avoid duplicates)
  function handleSave(wordData) {
    if (!savedWords.some((item) => item.word === wordData.word)) {
      setSavedWords([...savedWords, wordData]);
    }
  }

  // Remove one word
  function handleRemove(word) {
    setSavedWords(savedWords.filter((item) => item.word !== word));
  }

  // Clear all words
  function handleClear() {
    setSavedWords([]);
  }

  // CSV Export for Anki
  function handleExport() {
    const headers = ["Front", "Back"];

    const rows = savedWords.map((item) => {
      // ------------------
      // FRONT SIDE
      // ------------------
      const word = `**${item.word}**`; // bold
      const phonetic =
        item.phonetic ||
        (item.meanings[0]?.phonetic ? item.meanings[0].phonetic : "");

      // Front = word + phonetic
      const front = `${word}${phonetic ? "\n" + phonetic : ""}`;

      // ------------------
      // BACK SIDE
      // ------------------
      const backParts = item.meanings.map((m, i) => {
        const definition = `• ${m.partOfSpeech}: ${m.definitions[0]?.definition}`;

        // Examples (up to 2)
        const examples = m.definitions
          .slice(0, 2)
          .map((d, idx) => `• Example ${idx + 1}: ${d.example || "(none)"}`)
          .join("\n");

        const collocations = m.collocations
          ? `• Collocations: ${m.collocations.join(", ")}`
          : "";
        const synonyms = m.synonyms?.length
          ? `• Synonyms: ${m.synonyms.join(", ")}`
          : "";
        const antonyms = m.antonyms?.length
          ? `• Antonyms: ${m.antonyms.join(", ")}`
          : "";
        const morphology = m.morphology ? `• Morphology: ${m.morphology}` : "";

        return [
          definition,
          examples,
          collocations,
          synonyms,
          antonyms,
          morphology,
        ]
          .filter(Boolean)
          .join("\n");
      });

      const back = backParts.join("\n\n");

      return [front, back];
    });

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows]
        .map((e) => `"${e[0]}","${e[1].replace(/"/g, '""')}"`)
        .join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "flashcards.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      <SavedWords
        savedWords={savedWords}
        onRemove={handleRemove}
        onClear={handleClear}
        onExport={handleExport}
      />

      {loading && <p>Loading...</p>}
    </div>
  );
}
