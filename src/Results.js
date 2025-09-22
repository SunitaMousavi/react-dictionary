import React, { useState, useEffect } from "react";

// FontAwesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as solidBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";

export default function Results({ results, onSave, savedWords }) {
  // STATE
  const [isSaved, setIsSaved] = useState(false);

  // Update isSaved whenever results or savedWords change
  useEffect(() => {
    if (results) {
      const saved = savedWords.some((item) => item.word === results.word);
      setIsSaved(saved);
    }
  }, [results, savedWords]);

  // Return null if no results
  if (!results) return null;

  // Handlers
  const playAudio = (url) => {
    if (url) new Audio(url).play();
  };

  // Toggle save/unsave
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

  // Render
  return (
    <div className="Results">
      {/* Word Card */}
      <div className="card word-card">
        {/* Bookmark Button */}
        <button
          onClick={toggleSave}
          aria-label={isSaved ? "Unsave word" : "Save word"}
          className="bookmark-btn">
          <FontAwesomeIcon
            icon={isSaved ? solidBookmark : regularBookmark}
            size="2xl"
          />
        </button>

        {/* Word + Phonetics */}
        <div className="word-info">
          <h2 className="word">{results.word}</h2>
          <div className="phonetics">
            {results.phonetics?.map((p, i) => (
              <div key={i} className="phonetic-item">
                {p.text && <span className="phonetic-text">{p.text}</span>}
                {p.audio && (
                  <button
                    onClick={() => playAudio(p.audio)}
                    aria-label={`Play pronunciation for ${results.word}`}
                    className="audio-btn">
                    <FontAwesomeIcon icon={faVolumeHigh} size="lg" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Meanings Card */}
      <div className="card meanings-card">
        {results.meanings?.map((meaning, index) => (
          <div key={index} className="meaning">
            <h4 className="part-of-speech">{meaning.partOfSpeech}</h4>
            <ul className="definitions">
              {meaning.definitions.map((def, i) => (
                <li key={i} className="definition">
                  <span>{def.definition}</span>
                  {def.example && <em className="example"> — {def.example}</em>}
                </li>
              ))}
            </ul>

            {meaning.synonyms?.length > 0 && (
              <p className="synonyms">
                <strong>Synonyms:</strong> {meaning.synonyms.join(", ")}
              </p>
            )}
            {meaning.antonyms?.length > 0 && (
              <p className="antonyms">
                <strong>Antonyms:</strong> {meaning.antonyms.join(", ")}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
