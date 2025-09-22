import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function SavedWords({
  savedWords,
  onRemove,
  onClear,
  onExport,
}) {
  return (
    <div className="SavedWords">
      <div className="card">
        <h2>Bookmarks ({savedWords.length})</h2>

        {savedWords.length === 0 ? (
          <p>No bookmark yet.</p>
        ) : (
          <ul>
            {savedWords.map((item, index) => (
              <li key={index}>
                <strong>{item.word}:</strong>{" "}
                {item.meanings[0]?.definitions[0]?.definition || "—"}
                <button
                  onClick={() => onRemove(item.word)}
                  aria-label="Remove word">
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </li>
            ))}
          </ul>
        )}

        {savedWords.length > 0 && (
          <div className="SavedWords-actions">
            <button onClick={onClear}>Clear All</button>
            <button onClick={onExport}>Export CSV</button>
          </div>
        )}
      </div>
    </div>
  );
}
