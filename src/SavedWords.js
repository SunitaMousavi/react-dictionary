import React from "react";

export default function SavedWords({
  savedWords,
  onRemove,
  onClear,
  onExport,
}) {
  return (
    <div className="SavedWords">
      <h2>Saved Words ({savedWords.length})</h2>

      {savedWords.length === 0 ? (
        <p>No saved words yet — click “Save Word” to add one.</p>
      ) : (
        <ul>
          {savedWords.map((item, index) => (
            <li key={index}>
              <strong>{item.word}:</strong>{" "}
              {item.meanings[0]?.definitions[0]?.definition || "—"}
              <button onClick={() => onRemove(item.word)}>❌</button>
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
  );
}
