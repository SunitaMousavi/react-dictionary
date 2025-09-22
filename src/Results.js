import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as solidBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";

export default function Results({ results, onSave, savedWords }) {
  // --- Hooks must be at top ---
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  // Update isSaved whenever results or savedWords change
  useEffect(() => {
    if (results) {
      const saved = savedWords.some((item) => item.word === results.word);
      setIsSaved(saved);
    }
  }, [results, savedWords]);

  // If no results, render nothing
  if (!results) return null;

  const playAudio = (url) => {
    if (url) new Audio(url).play();
  };

  const toggleSave = () => {
    if (isSaved) {
      onSave({ word: results.word, remove: true });
      setIsSaved(false);
    } else {
      onSave({
        word: results.word,
        phonetic: results.phonetics?.[0]?.text || "",
        audio: results.phonetics?.[0]?.audio || "",
        meanings: results.meanings.map((meaning) => ({
          partOfSpeech: meaning.partOfSpeech,
          definitions: meaning.definitions.slice(0, 2).map((d) => ({
            definition: d.definition,
            example: d.example || "",
          })),
          synonyms: meaning.synonyms || [],
          antonyms: meaning.antonyms || [],
        })),
      });
      setIsSaved(true);
    }
  };

  return (
    <div className="Results">
      {/* Word card */}
      <div className="card" style={{ position: "relative", padding: "20px" }}>
        {/* Bookmark button */}
        <button
          onClick={toggleSave}
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
          aria-label={isSaved ? "Unsave word" : "Save word"}
        >
          <FontAwesomeIcon
            icon={isSaved ? solidBookmark : regularBookmark}
            size="2x"
            color="#f9f6ef"
          />
        </button>

        {/* Word + phonetics */}
        <div className="word-info">
          <h2 className="word">{results.word}</h2>
          <div className="phonetics">
            {results.phonetics?.map((p, i) => (
              <div key={i} className="phonetic-item" style={{ marginBottom: "5px" }}>
                {p.text && <span>{p.text}</span>}
                {p.audio && (
                  <button
                    onClick={() => playAudio(p.audio)}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      marginLeft: "10px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                    aria-label={`Play pronunciation for ${results.word}`}
                  >
                    <FontAwesomeIcon
                      icon={faVolumeHigh}
                      size="lg"
                      color={hoveredIndex === i ? "rgba(133, 104, 104, 1)6ef" : "#f9f6ef"}
                    />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Meanings card */}
      <div className="card" style={{ padding: "20px", marginTop: "15px" }}>
        {results.meanings?.map((meaning, index) => (
          <div key={index}>
            <h3>{meaning.partOfSpeech}</h3>
            <ul>
              {meaning.definitions.map((def, i) => (
                <li key={i}>
                  {def.definition}
                  {def.example && <em> - {def.example}</em>}
                </li>
              ))}
            </ul>
            {meaning.synonyms?.length > 0 && (
              <p>
                <strong>Synonyms:</strong> {meaning.synonyms.join(", ")}
              </p>
            )}
            {meaning.antonyms?.length > 0 && (
              <p>
                <strong>Antonyms:</strong> {meaning.antonyms.join(", ")}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}